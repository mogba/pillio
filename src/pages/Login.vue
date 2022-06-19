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
            alt="Uma médica e uma enfermeira em torno de um frasco com remédios"
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
                    v-model="formDataRef.email"
                    :rules="[val => val?.length > 5 || 'O e-mail deve ser informado']"
                  />
                  <InputPassword
                    label="Senha"
                    v-model="formDataRef.password"
                    :rules="[
                      val => !!val || 'A senha deve ser informada',
                      val => val.length >= 8 || 'A senha deve possuir no mínimo 8 caracteres'
                    ]"
                  />

                  <div
                    class="full-width q-mt-lg"
                    style="height: 56px;"
                  >
                    <q-btn
                      no-caps
                      class="full-width"
                      style="height: 100%; width: 100%"
                      label="Entrar"
                      color="primary"
                      :size="'lg'"
                      :loading="loadingRef"
                      :disable="!(formDataRef.email?.length > 5 && formDataRef.password?.length >= 8)"
                      @click="handleSignInUserWithEmailAndPassword"
                    >
                      <template v-slot:loading>
                        <q-spinner-puff color="white" size="1em" />
                      </template>
                    </q-btn>
                  </div>
                </div>
                <div
                  v-else
                  class="full-width q-gutter-y-sm"
                >
                  <InputText
                    label="Como você se chama?"
                    v-model="formDataRef.name"
                    :rules="[val => val?.length >= 3 || 'Informe seu nome']"
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
                      :disable="!(formDataRef.name?.length >= 3)"
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
                  Informe um e-mail e senha para cadastrar
                </div>
              
                <InputText
                  label="E-mail"
                  v-model="formDataRef.email"
                  :rules="[val => val?.length > 5 || 'O e-mail deve ser informado']"
                />
                <InputPassword
                  label="Senha"
                  v-model="formDataRef.password"
                  :rules="[
                    val => !!val || 'A senha deve ser informada',
                    val => val.length >= 8 || 'A senha deve possuir no mínimo 8 caracteres'
                  ]"
                />

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

                <div
                  class="full-width q-mt-lg"
                  style="height: 56px;"
                >
                  <q-btn
                    no-caps
                    class="full-width"
                    style="height: 100%; width: 100%"
                    label="Criar cadastro"
                    color="primary"
                    :size="'lg'"
                    :loading="loadingRef"
                    :disable="!(formDataRef.email?.length > 5 && formDataRef.password?.length >= 8)"
                    @click="handleRegisterUser"
                  >
                    <template v-slot:loading>
                      <q-spinner-puff color="white" size="1em" />
                    </template>
                  </q-btn>
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
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";
import InputText from "src/components/InputText.vue";
import InputPassword from "src/components/InputPassword.vue";
import {
  registerUser,
  signInUserWithEmailAndPassword,
  signOutUser,
} from "src/services/firebase";
import { getIsUserConfigured } from "src/services/user/user-config.service";

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
const formDataRef = ref(resetFormData());

function resetFormData() {
  return {
    name: "",
    email: "",
    password: "",
  };
}

function handleChangeTab(tab) {
  if (selectedTab.value !== tab.name) {
    Object.assign(formDataRef.value, resetFormData())
  }
}

export default {
  name: "Login",
  components: {
    InputText,
    InputPassword,
  },
  setup() {
    const router = useRouter();
    const $q = useQuasar();

    const loadingRef = ref(false);

    function handleRegisterUser() {
      loadingRef.value = true;

      registerUser(
        formDataRef.value.name,
        formDataRef.value.email,
        formDataRef.value.password,
        () => {
          loadingRef.value = false;

          $q.notify({ message: "Cadastro efetuado com sucesso." });
          router.push("/setup");
        },
        (error) => {
          $q.notify({ message: error });
        },
      );
    }

    function handleSignInUserWithEmailAndPassword() {
      loadingRef.value = true;

      signInUserWithEmailAndPassword(
        formDataRef.value.email,
        formDataRef.value.password,
        async () => {
          const response = await getIsUserConfigured();

          loadingRef.value = false;

          if (response.success) {
            const { isUserConfigured } = response.data;
            const redirectToRoute = isUserConfigured ? "/" : "/setup";
            $q.notify({ message: "Log-in efetuado com sucesso." });
            router.push(redirectToRoute);
          }
          else {
            $q.notify({ message: error });
            signOutUser();
          }
        },
        (error) => {
          $q.notify({ message: error });
        },
      );
    }

    return {
      TABS,
      tabsDefinition,
      selectedTab,
      handleChangeTab,
      registerStep,
      formDataRef,
      loadingRef,
      handleRegisterUser,
      handleSignInUserWithEmailAndPassword,
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
