<template>
  <q-page class="q-pa-md">
    <q-card-section>
      <div class="text-h4">
        Primeiros passos
      </div>
    </q-card-section>
    
    <q-card-section
      class="full-width q-px-xl q-gutter-y-sm q-mt-lg column content-center justify-center"
    >
      <div v-if="configurationStep === 1">
        <div class="text-h6 text-center q-mb-md">
          <!-- Olá, {{name}}! -->
          Olá, Usuário!
          <br>
          Clique no botão abaixo que corresponde com seu perfil
          <!-- Você vai usar este sistema para administrar 
          <br>
          seus próprios remédios ou será responsável
          <br>
          pelos remédios de outra pessoa? -->
        </div>

        <div
          class="full-width q-mt-lg"
          style="height: 56px;"
        >
          <q-btn
            no-caps
            class="full-width"
            style="height: 100%; width: 100%"
            label="Sou responsável por pessoas idosas"
            color="primary"
            :size="'lg'"
            @click="() => {
              selectedUserRole = USER_ROLE.responsible;
              configurationStep = 2;
            }"
          />
        </div>

        <div
          class="full-width q-mt-lg"
          style="height: 56px;"
        >
          <q-btn
            no-caps
            class="full-width"
            style="height: 100%; width: 100%"
            label="Sou pessoa idosa"
            color="primary"
            :size="'lg'"
            @click="() => {
              selectedUserRole = USER_ROLE.elderly;
              configurationStep = 3;
            }"
          />
        </div>
      </div>

      <div v-else-if="configurationStep === 2">
        <div class="text-h6 text-center">
          Precisamos cadastrar a pessoa idosa para
          <br>
          quem você administrará os remédios
        </div>

        <div clas="full-width q-gutter-y-sm">
          <InputText
            label="Nome da pessoa idosa"
            v-model="newElderly.name"
          />
          <InputText
            label="Telefone da pessoa idosa"
            v-model="newElderly.phoneNumber"
          />
        </div>

        <div class="row q-px-lg q-pt-xl q-col-gutter-lg">
          <div class="col-xs-12 col-md-6">
            <q-btn
              no-caps
              class="full-width"
              label="Voltar"
              color="secondary"
              :size="'lg'"
              @click="() => {
                selectedUserRole = null;
                configurationStep = 1;
              }"
            />
          </div>
          <div class="col-xs-12 col-md-6">
            <q-btn
              no-caps
              class="full-width"
              label="Avançar"
              color="primary"
              :size="'lg'"
              @click="() => {
                configurationStep = 3;
              }"
            />
          </div>
        </div>
      </div>

      <div v-else-if="configurationStep === 3">
        <div class="text-h6 text-center">
          Aqui que o bicho pega
          <br>
          Fazer aqui a configuração do dispenser com WiFiManager
        </div>

        <div clas="full-width q-gutter-y-sm">
          <InputText
            label="ID do dispenser"
          />
        </div>
        <div class="row q-px-lg q-pt-xl q-col-gutter-lg">
          <div class="col-xs-12 col-md-6">
            <q-btn
              no-caps
              class="full-width"
              label="Voltar"
              color="secondary"
              :size="'lg'"
              @click="() => {
                configurationStep = 2;
              }"
            />
          </div>
          <div class="col-xs-12 col-md-6">
            <q-btn
              no-caps
              class="full-width"
              label="Concluir configuração"
              color="primary"
              :size="'lg'"
              @click="() => {
                //alert('NOT IMPLEMENTED EXCEPTION!!!');
              }"
            />
          </div>
        </div>
      </div>
    </q-card-section>
  </q-page>
</template>

<script>
import { ref } from "vue";
import InputText from "src/components/InputText.vue";

const USER_ROLE = Object.freeze({
  responsible: "responsible",
  elderly: "elderly",
});

const selectedUserRole = ref(null);
const configurationStep = ref(2);
const elderlies = ref([]);
const newElderly = ref(resetNewElderlyData());

function resetNewElderlyData() {
  return {
    name: "",
    phoneNumber: "",
  };
}

export default {
  name: "InitialConfiguration",
  components: {
    InputText,
  },
  setup() {
    return {
      USER_ROLE,
      selectedUserRole,
      configurationStep,

      newElderly,
    };
  },
}
</script>