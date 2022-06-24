<template>
  <div>
    <q-dialog
      persistent
      v-model="showDialogComputed"
      @hide="onHideDialog"
    >
      <q-card style="min-width: 300px;" class="q-px-lg q-py-xl">
        <div
          v-if="configurationStepRef === 1"
          class="full-width q-px-md"
        >
          <div class="text-h6 text-body q-px-md">
            <p>
              Para configurar o Dispenser que armazenará os remédios,
              você deve escanear o QR Code contido na etiqueta do dispositivo
              ou digitar seu código alfanumérico correspondente no campo abaixo.
            </p>

            <p>
              Ao avançar, o Dispenser entrará em modo de configuração 
              e suas definições atuais <u>serão perdidas</u>.
            </p>
          </div>

          <div
            class="column full-width content-center q-pt-lg"
          >
            <div class="col q-gutter-md full-width">
              <div class="full-width">
                <q-input
                  class="col-xs-12 col-md-6"
                  standout="bg-primary text-white"
                  label="Código do Dispenser"
                  required
                  v-model="newDispenserRef.dispenserIdCode"
                  clearable
                  :rules="[val => !!val?.trim() || 'O código do Dispenser deve ser informado']"
                >
                  <template v-slot:prepend>
                    <q-icon
                      class="cursor-pointer"
                      size="md"
                      name="photo_camera"
                      @click="() => showQrCodeScannerDialogRef = true"
                    />
                  </template>

                  <template>
                    <div class="self-center full-width no-outline" tabindex="1"></div>
                  </template>
                </q-input>
              </div>
            </div>
          </div>

          <div class="row q-pt-xl q-col-gutter-lg content-center justify-center">
            <div class="col-xs-12 col-md-6">
              <q-btn
                no-caps
                flat
                class="full-width"
                label="Cancelar"
                color="primary"
                size="lg"
                @click="() => showDialogComputed = false"
              />
            </div>
            <div class="col-xs-12 col-md-6">
              <q-btn
                no-caps
                class="full-width"
                label="Avançar"
                color="primary"
                size="lg"
                :disable="!newDispenserRef.dispenserIdCode"
                @click="() => setConfigurationStep(2, configurationStep2Callback)"
              />
            </div>
          </div>
        </div>

        <div
          v-else-if="configurationStepRef === 2"
          class="full-width q-px-md"
        >
          <div class="text-h6 text-body q-px-md">
            <div class="text-center">
              Agora siga os passos abaixo 
              para configurar o Dispenser.
            </div>

            <div class="text-left">
              <ol>
                <li>
                  <br>
                  <div>
                    Coloque seu Dispenser em modo 
                    de configuração pressionando 
                    o botão por 10 segundos.
                  </div>
                </li>
                <li>
                  <br>
                  <div>
                    Acesse as configurações de wi-fi de 
                    seu dispositivo e conecte-o à rede 
                    do Dispenser.
                  </div>
                </li>
                <li>
                  <br>
                  <div>
                    Seu dispositivo será redirecionado 
                    à tela de configuração do Dispenser, 
                    onde você deve definir a rede wi-fi 
                    local onde ele deve ser conectado.
                  </div>
                </li>
                <li>
                  <br>
                  <div>
                    Após configurar o Dispenser, acesse 
                    as configurações de wi-fi de seu 
                    dispositivo e conecte-o novamente 
                    à internet.
                  </div>
                </li>
              </ol>
            </div>
          </div>

          <div class="row q-pt-md q-col-gutter-lg content-center justify-center">
            <div class="col-xs-12 col-md-6">
              <q-btn
                no-caps
                flat
                class="full-width"
                label="Voltar"
                color="primary"
                size="lg"
                @click="() => setConfigurationStep(1)"
              />
            </div>
            <div class="col-xs-12 col-md-6">
              <q-btn
                no-caps
                class="full-width"
                label="Avançar"
                color="primary"
                size="lg"
                @click="() => setConfigurationStep(3, configurationStep3Callback)"
              />
            </div>
          </div>
        </div>

        <div
          v-else-if="configurationStepRef === 3"
          class="full-width q-px-md"
        >
          <div class="text-h6 text-body text-center q-px-md">
            <div class="q-gutter-md">
              <div v-if="mqttDispenserConnectionStateRef === DISPENSER_CONNECTION_STATE.pending">
                Aguarde, verificando conexão com o Dispenser.
              </div>
              <q-spinner-puff
                v-if="mqttDispenserConnectionStateRef === DISPENSER_CONNECTION_STATE.pending"
                color="primary"
                size="5em"
              />

              <div v-if="mqttDispenserConnectionStateRef === DISPENSER_CONNECTION_STATE.connected">
                O Dispenser está conectado!
              </div>
              <q-icon
                v-if="mqttDispenserConnectionStateRef === DISPENSER_CONNECTION_STATE.connected"
                name="check_circle"
                size="3em"
                color="primary"
              />

              <div v-if="mqttDispenserConnectionStateRef === DISPENSER_CONNECTION_STATE.error">
                Não foi possível conectar ao Dispenser.
                <br>
                Verifique se o código foi informado corretamente 
                ou tente configurar seu dispositivo novamente.
              </div>
              <q-icon
                v-if="mqttDispenserConnectionStateRef === DISPENSER_CONNECTION_STATE.error"
                name="cancel"
                size="3em"
                color="grey"
              />
            </div>
          </div>

          <div class="row q-pt-xl q-col-gutter-lg content-center justify-center">
            <div class="col-xs-12 col-md-6">
              <q-btn
                no-caps
                flat
                class="full-width"
                label="Voltar"
                color="primary"
                size="lg"
                :disable="mqttDispenserConnectionStateRef === DISPENSER_CONNECTION_STATE.connected"
                @click="() => setConfigurationStep(2)"
              />
            </div>
            <div class="col-xs-12 col-md-6">
              <q-btn
                no-caps
                class="full-width"
                label="Avançar"
                color="primary"
                size="lg"
                :disable="mqttDispenserConnectionStateRef !== DISPENSER_CONNECTION_STATE.connected"
                @click="() => setConfigurationStep(4, configurationStep4Callback)"
              />
            </div>
          </div>
        </div>

        <div
          v-else-if="configurationStepRef === 4"
          class="full-width q-px-md"
        >
          <div class="text-h6 text-body text-center q-px-md">
            Tudo pronto!
          </div>

          <div class="row q-pt-xl q-col-gutter-lg content-center justify-center">
            <div class="col-xs-12 col-md-6">
              <q-btn
                no-caps
                class="full-width"
                label="Concluir"
                color="primary"
                size="lg"
                @click="() => showDialogComputed = false"
              />
            </div>
          </div>
        </div>
      </q-card>
    </q-dialog>

    <QrCodeScannerDialog
      v-model:showDialog="showQrCodeScannerDialogRef"
      v-model:code="newDispenserRef.dispenserIdCode"
    />
  </div>
</template>

<script setup>
import { debounce } from "lodash";
import { computed, ref, watch } from "vue";
import { useQuasar } from "quasar";
import QrCodeScannerDialog from "src/components/QrCodeScannerDialog.vue";
import { createDispenser, updateDispenser } from "src/services/dispenser/dispenser.service";
import { publish, subscribe, unsubscribe } from "src/services/mqtt";
import { useSettingsStore } from "src/stores";

const DISPENSER_CONNECTION_STATE = Object.freeze({
  pending: "pending",
  connected: "connected",
  error: "error",
});

const props = defineProps({
  showDialog: {
    type: Boolean,
    default: false,
  },
  dispenser: {
    default: {},
    elderlyId: Number,
    id: Number,
    dispenserIdCode: String,
    dispenserSlotsQuantity: Number,
    connectedWifiNetworkName: String,
  },
});

const emit = defineEmits([
  "update:showDialog",
  "update:dispenser",
  "finish",
]);

const $q = useQuasar();
const settingsStore = useSettingsStore();

const configurationStepRef = ref(1);
const showQrCodeScannerDialogRef = ref(false);

const showDialogComputed = computed({
  get: () => props.showDialog,
  set: value => emit("update:showDialog", value),
});
const dispenserComputed = computed({
  get: () => props.dispenser,
  set: value => emit("update:dispenser", value),
})

const newDispenserRef = ref({
  elderlyId: props.dispenser.elderlyId,
  id: props.dispenser.id,
  dispenserIdCode: props.dispenser.dispenserIdCode,
  connectedWifiNetworkName: props.dispenser.connectedWifiNetworkName,
});

const mqttDispenserConnectionStateRef = ref(DISPENSER_CONNECTION_STATE.pending);
const mqttDispenserReconfigTopicRef = ref("");
const mqttDispenserConnTopicRef = ref("");

function onHideDialog() {
  settingsStore.dispenserSetup = {};
  newDispenserRef.value = {
    elderlyId: props.dispenser.elderlyId,
    id: props.dispenser.id,
    dispenserIdCode: props.dispenser.dispenserIdCode,
  };

  configurationStepRef.value = 1;
  mqttDispenserConnectionStateRef.value = DISPENSER_CONNECTION_STATE.pending;
  mqttDispenserReconfigTopicRef.value = "";
  mqttDispenserConnTopicRef.value = "";

  emit("finish");
}

watch(configurationStepRef, configStep => {
  if (configStep > 1) {
    settingsStore.dispenserSetup.elderlyId = newDispenserRef.value.elderlyId;
    settingsStore.dispenserSetup.id = newDispenserRef.value.id;
    settingsStore.dispenserSetup.dispenserIdCode = newDispenserRef.value.dispenserIdCode;
    settingsStore.dispenserSetup.configurationStep = configurationStepRef.value;
  }
});

if ([2, 3].includes(settingsStore.dispenserSetup?.configurationStep || 1)) {
  const connState = settingsStore.dispenserSetup.dispenserConnectionState;

  newDispenserRef.value = settingsStore.dispenserSetup;
  mqttDispenserConnectionStateRef.value = connState;
  configurationStepRef.value =
    connState === DISPENSER_CONNECTION_STATE.connected ? 3 : 2;
}

function configurationStep2Callback() {
  const dispenserIdCode = (newDispenserRef.value.dispenserIdCode || "").trim();
  const changedDispenserCode = dispenserIdCode.length &&
    !mqttDispenserReconfigTopicRef.value.includes(dispenserIdCode);

  if (changedDispenserCode) {
    mqttDispenserReconfigTopicRef.value = `reconfig/${dispenserIdCode}`;
    publish(mqttDispenserReconfigTopicRef.value, { reconfigurar: true });
  }
}

function handleDispenserConnectionCheck() {
  const dispenserIdCode = (newDispenserRef.value.dispenserIdCode || "").trim();
  const changedDispenserCode = dispenserIdCode.length &&
    !mqttDispenserConnTopicRef.value.includes(dispenserIdCode);

  if (changedDispenserCode) {
    if (mqttDispenserConnTopicRef.value) {
      unsubscribe(mqttDispenserConnTopicRef.value);
    }

    mqttDispenserConnectionStateRef.value = DISPENSER_CONNECTION_STATE.pending;
    mqttDispenserConnTopicRef.value = `dispenser/${dispenserIdCode}`;

    subscribe(
      mqttDispenserConnTopicRef.value,
      message => {
        const {
          redeConectada: isNetworkConnected,
          nomeRedeConectada: networkName,
        } = message;

        mqttDispenserConnectionStateRef.value = isNetworkConnected
          ? DISPENSER_CONNECTION_STATE.connected
          : DISPENSER_CONNECTION_STATE.error;

        settingsStore.dispenserSetup = {
          elderlyId: newDispenserRef.value.elderlyId,
          id: newDispenserRef.value.id,
          dispenserIdCode: newDispenserRef.value.dispenserIdCode,
          connectedWifiNetworkName: networkName,
          dispenserSlotsQuantity: 15,
          dispenserConnectionState: mqttDispenserConnectionStateRef.value,
          configurationStep: configurationStepRef.value,
        };
      },
      err => {
        mqttDispenserConnectionStateRef.value = DISPENSER_CONNECTION_STATE.error;
      }
    );

    publish(`dispenser/verificacao/${dispenserIdCode}`, JSON.stringify({ podeMandarMensagem: true }));

    const setDispenserConnectionErrorAfter1Min = debounce(() => {
      if (mqttDispenserConnectionStateRef.value === DISPENSER_CONNECTION_STATE.pending) {
        mqttDispenserConnectionStateRef.value = DISPENSER_CONNECTION_STATE.error;
      }
    },
    60000, { leading: false, trailing: true });

    setDispenserConnectionErrorAfter1Min();
  }
}

const configurationStep3Callback = debounce(() => {
  handleDispenserConnectionCheck();
}, 5000, { leading: true, trailing: false });

async function configurationStep4Callback() {
  const successData = {
    elderlyId: settingsStore.dispenserSetup.elderlyId,
    id: settingsStore.dispenserSetup.id,
    dispenserIdCode: settingsStore.dispenserSetup.dispenserIdCode,
    dispenserSlotsQuantity: settingsStore.dispenserSetup.dispenserSlotsQuantity,
    connectedWifiNetworkName: settingsStore.dispenserSetup.connectedWifiNetworkName,
  };
  const dispenser = {
    id: newDispenserRef.value.id,    
    codigoMaquina: newDispenserRef.value.dispenserIdCode,
    qtdeCompartimentos: settingsStore.dispenserSetup.dispenserSlotsQuantity,
    nomeRedeWifiConectada: settingsStore.dispenserSetup.connectedWifiNetworkName,
  };

  let response;
  
  if (!settingsStore.dispenserSetup.id) {
    response = await createDispenser(
      newDispenserRef.value.elderlyId,
      dispenser,
    );
  }
  else {
    response = await updateDispenser(dispenser);
  }

  $q.notify({ message: response.message });

  if (response.success) {
    successData.id = response.data?.createdDispenserId || newDispenserRef.value.id;
    dispenserComputed.value = successData;
    settingsStore.dispenser = successData;
  }
}

function setConfigurationStep(newStep, callback = null) {
  configurationStepRef.value = newStep;

  if (typeof callback === "function") {
    callback();
  }
}
</script>

<style>
ol {
  padding: 0;
  list-style: none;
  counter-reset: steps;
}

ol li {
  counter-increment: steps;
}

ol li::before {
  content: "Passo " counter(steps);
  margin-right: 0.5rem;
  color: #1976d2;
}

ol li div {
  margin-left: 1.5rem;
}
</style>
