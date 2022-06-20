<template>
  <q-page class="q-pa-md">
    <q-card-section>
      <div class="text-h4">
        Configurações {{ elderlyRef && elderlyRef.name ? `de ${elderlyRef.name}` : "" }}
      </div>
    </q-card-section>

    <q-card-section>
      <div>
        <div class="row q-col-gutter-sm q-pb-sm">
          <q-input
            class="col-xs-12 col-xl-12"
            standout="bg-primary text-white" 
            label="Nome"
            v-model="elderlyRef.name"
            clearable
            :rules="[
              val => !!val?.trim() || 'O nome deve ser informado',
              val => val?.trim().length >= 3 || 'O nome deve possuir mais que 3 caracteres',
            ]"
          >
            <template>
              <div class="self-center full-width no-outline" tabindex="0"></div>
            </template>
          </q-input>

          <q-input
            style="padding-bottom: 20px;"
            class="col-xs-12 col-xl-12"
            standout="bg-primary text-white" 
            label="Telefone"
            v-model="elderlyRef.phoneNumber"
            clearable
            mask="(##) #####-####"
            fill-mask
          >
          <!-- :rules="[val => (val?.split(' ').join('').split('(').join('').split(')').join('').split('-').join('').split('_').join('').length || 0) >= 8 || 'O telefone deve ser informado']" -->
            <template>
              <div class="self-center full-width no-outline" tabindex="0"></div>
            </template>
          </q-input>

          <q-input
            class="col-xs-12 col-xl-12"
            standout="bg-primary text-white" 
            label="E-mail"
            v-model="elderlyRef.email"
            clearable
            :rules="[
              val => !!val?.trim() || 'O e-mail deve ser informado',
              val => val?.trim().length > 5 || 'O e-mail deve ser informado',
            ]"
          >
            <template>
              <div class="self-center full-width no-outline" tabindex="0"></div>
            </template>
          </q-input>

          <InputPassword
            label="Código de acesso"
            v-model="elderlyRef.password"
            :rules="[
              val => !!val?.trim() || 'A senha deve ser informada',
              val => (
                (
                  (val !== undefined && val !== null) &&
                  val.trim().length > 0 &&
                  (val.charAt(0).trim().length > 0 && val.charAt(val.length - 1).trim().length > 0)
                ) ||
                'A senha não pode começar ou terminar com espaços'
              ),
              val => val?.trim().length >= 8 || 'A senha deve possuir no mínimo 8 caracteres',
            ]"
          />
        </div>

        <q-card class="full-width" flat bordered>
          <div
            v-if="!isUpdate"
            class="row q-gutter-lg q-pa-lg full-width"
          >
            <div class="text-h6 text-body content-center full-width">
              A configuração do Dispenser será habilitada após o salvamento
            </div>
          </div>

          <div v-else class="row q-gutter-lg q-pa-lg full-width">
            <div class="flex justify-between content-center full-width">
              <div class="text-h6 text-body">
                Dispenser
              </div>

              <q-btn
                no-caps
                :label="hasDispenser ? 'Reconfigurar' : 'Configurar'"
                color="secondary"
                size="md"
                @click="() => showDispenserSetupDialog = true"
              />
            </div>

            <InputText
              readonly 
              label="Código do Dispenser"
              v-model="dispenserRef.dispenserIdCode"
            />
            <InputText
              readonly
              label="Quantidade de compartimentos"
              v-model="dispenserRef.dispenserSlotsQuantity"
            />
            <InputText
              readonly
              label="Rede Wi-fi conectada"
              v-model="dispenserRef.connectedWifiNetworkName"
            />
          </div>
        </q-card>
      </div>

      <div class="row q-px-lg q-pt-lg q-col-gutter-lg">
        <div class="col-xs-12 col-md-6">
          <q-btn
            no-caps
            flat
            class="full-width"
            label="Cancelar"
            color="primary"
            size="lg"
            to="/settings"
          />
        </div>
        <div class="col-xs-12 col-md-6">
          <q-btn
            no-caps
            class="full-width"
            label="Salvar"
            color="primary"
            size="lg"
            :loading="loadingRef"
            :disable="!(
              (elderlyRef.name && elderlyRef.name.trim().length >= 3) &&
              (elderlyRef.email && elderlyRef.email.trim().length > 5) &&
              (
                elderlyRef.password &&
                (
                  (elderlyRef.password !== undefined && elderlyRef.password !== null) &&
                  elderlyRef.password.trim().length > 0 &&
                  (
                    elderlyRef.password.charAt(0).trim().length > 0 &&
                    elderlyRef.password.charAt(elderlyRef.password.length - 1).trim().length > 0
                  )
                ) &&
                elderlyRef.password.length >= 8
              )
            )"
            @click="() => isUpdate
              ? handleUpdateSettings()
              : handleCreateSettings()
            "
          >
            <template v-slot:loading>
              <q-spinner-puff color="white" size="1em" />
            </template>
          </q-btn>
        </div>
      </div>
    </q-card-section>

    <DispenserSetupDialog
      v-model:showDialog="showDispenserSetupDialog"
      v-model:dispenser="dispenserRef"
      @finish="updateSessionElderliesData"
    />
  </q-page>
</template>

<script setup>
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";
import { onBeforeRouteLeave } from "vue-router";
import InputText from "src/components/InputText.vue";
import InputPassword from "src/components/InputPassword.vue";
import DispenserSetupDialog from "src/components/DispenserSetupDialog.vue";
import { registerSecondaryUser } from "src/services/firebase";
import { getElderliesByResponsible } from "src/services/user/responsible.service";
import { createElderlyUser, updateElderly } from "src/services/user/elderly.service";
import { getSettingsByElderly } from "src/services/user/user-config.service";
import { useSessionStore, useSettingsStore } from "src/stores";

const props = defineProps({
  elderly: {
    default: {},
    id: Number,
    name: String,
  }
});

const $q = useQuasar();
const router = useRouter();
const sessionStore = useSessionStore();
const settingsStore = useSettingsStore();

onBeforeRouteLeave(() => {
  settingsStore.elderly = {};
  settingsStore.dispenser = {};
  settingsStore.dispenserSetup = {};
});

const showDispenserSetupDialog = ref(
  (settingsStore.dispenserSetup?.configurationStep || 1) > 1
);

const elderlyRef = ref(props.elderly);
const dispenserRef = ref({});

const isUpdate = computed(() => !!elderlyRef.value.id);
const hasDispenser = computed(() => !!dispenserRef.value.dispenserIdCode);

if (!elderlyRef.value.id) {
  Object.assign(elderlyRef.value, settingsStore.elderly);
  Object.assign(dispenserRef.value, settingsStore.dispenser);
}
else {
  await loadSettings();
}

async function loadSettings() {
  const { data: settings } = await getSettingsByElderly(elderlyRef.value.id);

  elderlyRef.value = settings.elderly;
  dispenserRef.value = settings.dispenser;

  settingsStore.elderly = elderlyRef.value;
  settingsStore.dispenser = dispenserRef.value;
}

const loadingRef = ref(false);

async function handleCreateSettings() {
  loadingRef.value = true;

  const registerUserResponse = await registerSecondaryUser(
    elderlyRef.value.name,
    elderlyRef.value.email,
    elderlyRef.value.password,
  );

  if (!registerUserResponse.success) {
    $q.notify({ message: registerUserResponse.message });
    loadingRef.value = false;
    return;
  }

  // Dispenser é configurado depois do idoso
  const elderly = {
    nome: elderlyRef.value.name,
    login: elderlyRef.value.email,
    codigoAcesso: elderlyRef.value.password,
    telefone: elderlyRef.value.phoneNumber,
    firebaseUserUid: registerUserResponse.data.firebaseUserUid,
    codigoMaquina: null,
    idResp: sessionStore.user.id,
  };

  const createElderlyResponse = await createElderlyUser(elderly);

  if (!createElderlyResponse.success) {
    $q.notify({ message: createElderlyResponse.message });
    loadingRef.value = false;
    return;
  }

  elderlyRef.value.id = createElderlyResponse.data.createdUserId;
  settingsStore.elderly = elderlyRef.value;

  $q.notify({ message: createElderlyResponse.message });
  loadingRef.value = false;

  router.push({
    name: "edit-elderly",
    params: {
      id: elderlyRef.value.id,
      name: elderlyRef.value.name,
    },
  });
}

async function handleUpdateSettings() {
  loadingRef.value = true;

  const elderly = {
    id: elderlyRef.value.id,
    nome: elderlyRef.value.name,
    login: elderlyRef.value.email,
    codigoAcesso: elderlyRef.value.password,
    telefone: elderlyRef.value.phoneNumber,
  };

  const updateElderlyResponse = await updateElderly(elderly);

  if (!updateElderlyResponse.success) {
    $q.notify({ message: updateElderlyResponse.message });
    loadingRef.value = false;
    return;
  }

  settingsStore.elderly = elderlyRef.value;
    
  if (sessionStore.user.role === "responsible") {
    const updateSessionElderliesResponse = await updateSessionElderliesData();

    if (!updateSessionElderliesResponse.success) {
      $q.notify({ message: updateSessionElderliesResponse.message });
      loadingRef.value = false;
      return;
    }
  }
  
  $q.notify({ message: updateElderlyResponse.message });
  loadingRef.value = false;
}

async function updateSessionElderliesData() {
  const response = await getElderliesByResponsible();

  if (response.success && response.data?.length) {
    sessionStore.user.elderlies = response.data.filter(elderly =>
      elderly.hasDispenser);
  }

  return response;
}
</script>
