<template>
  <div>
    <div class="q-pa-md row q-gutter-md" style="min-height: 500px;">
      <div
        class="row absolute-center full-width"
        style="max-width: 1000px;"
      >
        <q-card-section
          class="col-0 col-md-6 flex justify-center content-center"
        >
          <img
            class="responsive"
            src="~/assets/undraw_medical_care_movn.svg"
            alt="Duas mulheres profissionais de saúde em torno de um frasco de remédios"
          >
        </q-card-section>

        <q-card-section
          class="col-12 col-md-6 right-side-card-form"
        >
          <div class="app-name text-h4 q-mt-md">
            Pilli-o
          </div>

          <div class="column absolute-center full-width">
            <div v-if="registerStep === 1">
              <q-card-section
                class="column content-center justify-center full-width"
              >
                <q-tabs
                  class="text-primary"
                  inline-label
                  shrink
                  stretch
                  narrow-indicator
                  v-model="selectedTab"
                >
                  <q-tab
                    :ripple="false"
                    v-for="tab in tabsDefinition"
                    :key="tab.name"
                    v-bind="tab"
                    @click="handleChangeTab(tab)"
                  />
                </q-tabs>
              </q-card-section>

              <q-card-section
                class="full-width q-px-xl"
              >
                <div
                  v-if="selectedTab === TABS.login"
                  class="full-width q-gutter-y-sm"
                >
                  <InputText
                    label="E-mail"
                    v-model="formData.email"
                  />
                  <InputPassword
                    label="Senha"
                    v-model="formData.password"
                  />
                
                  <div
                    class="full-width q-mt-lg"
                    style="height: 56px;"
                  >
                    <router-link 
                      style="text-decoration: none;"
                      :to="redirectToAfterAuthentication"
                    >
                      <q-btn
                        no-caps
                        class="full-width"
                        style="height: 100%; width: 100%"
                        label="Entrar"
                        color="primary"
                        :size="'lg'"
                        @click="handleAuthenticate"
                      />
                    </router-link>
                  </div>
                </div>
                <div
                  v-else
                  class="full-width q-gutter-y-sm"
                >
                  <InputText
                    label="Como você se chama?"
                    v-model="formData.name"
                  />
                
                  <div
                    class="full-width q-mt-lg"
                    style="height: 56px;"
                  >
                    <q-btn
                      no-caps
                      class="full-width"
                      style="height: 100%; width: 100%"
                      label="Iniciar cadastro"
                      color="primary"
                      :size="'lg'"
                      @click="registerStep += 1"
                    />
                  </div>
                </div>
              </q-card-section>
            </div>

            <div v-else>
              <q-card-section
                class="full-width q-px-xl q-gutter-y-sm q-mt-lg"
              >
                <div class="text-h6 text-center q-mb-md">
                  Olá, {{formData.name}}!
                  <br>
                  Agora você só precisa informar seu
                  <br>
                  e-mail e uma senha para sua conta
                </div>
              
                <InputText
                  label="E-mail"
                  v-model="formData.email"
                />
                <InputPassword
                  label="Senha"
                  v-model="formData.password"
                />

                <div
                  class="full-width q-mt-lg"
                  style="height: 56px;"
                >
                  <router-link 
                    style="text-decoration: none;"
                    :to="redirectToAfterAuthentication"
                  >
                    <q-btn
                      no-caps
                      class="full-width"
                      style="height: 100%; width: 100%"
                      label="Criar cadastro"
                      color="primary"
                      :size="'lg'"
                      @click="handleAuthenticate"
                    />
                  </router-link>
                </div>

                <div
                  class="full-width"
                  style="height: 56px;"
                >
                  <q-btn
                    no-caps
                    class="full-width"
                    style="height: 100%; width: 100%"
                    label="Voltar à tela de login"
                    color="secondary"
                    :size="'lg'"
                    @click="() => {
                      registerStep = 1;
                      selectedTab = TABS.login;
                    }"
                  />
                </div>
              </q-card-section>
            </div>
          </div>
        </q-card-section>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, ref } from "vue";
import InputText from "src/components/InputText.vue";
import InputPassword from "src/components/InputPassword.vue";
import { SessionStorage } from 'quasar';

const TABS = Object.freeze({
  register: "register",
  login: "login",
});

const tabsDefinition = [
  { name: TABS.register, label: "Crie seu cadastro" },
  { name: TABS.login, label: "Faça login" },
];

const registerStep = ref(1);
const selectedTab = ref(TABS.login);
const redirectToAfterAuthentication = ref("/");
const formData = reactive(resetFormData());

function resetFormData() {
  return {
    name: "",
    email: "",
    password: "",
  };
}

function handleChangeTab(tab) {
  if (selectedTab.value !== tab.name) {
    Object.assign(formData, resetFormData())
  }
}

function handleAuthenticate() {
  // SessionStorage.set("user", { id: -1, isLoggedIn: true, isNotConfiguredYet: false });
  // Comando acima movido para o arquivo de boot "initialize-data-temp-file.boot.js"

  if (SessionStorage.getItem("user").isNotConfiguredYet) {
    // Verificar se o usuário já configurou algum idoso ou dispenser.
    // Caso ainda não tenha configurado, deve ser redirecionado para
    // a tela de configurações iniciais.
    redirectToAfterAuthentication.value = "/ic";
  }
}

export default {
  name: "Login",
  components: {
    InputText,
    InputPassword,
  },
  setup() {
    return {
      TABS,
      tabsDefinition,
      selectedTab,
      handleChangeTab,

      registerStep,
      formData,

      redirectToAfterAuthentication,
      handleAuthenticate,
    };
  },
};
</script>

<style>
.right-side-card-form {
  background-color: #EEEEEE;
  position: relative;
  border-radius: 5px;
  min-height: 500px;
}

.app-name {
  text-align: center;
  color: #1976d2;
  font-weight: 500;
}

@media screen and (max-width: 1024px) {
  .right-side-card-form {
    height: 100%;
    background-color: white;
  }

  .app-name {
    transform: translateY(-50%);
  }
}
</style>
