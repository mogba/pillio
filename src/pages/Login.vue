<template>
  <div>
    <h1>Login</h1>

    <div class="q-pa-md row q-gutter-md">
      <q-card
        flat
        bordered
        class="absolute-center full-width"
        style="max-width: 1000px;"
      >
        <q-card-section horizontal class="row" style="height: 60vh;">
          <q-card-section
            class="col-0 col-md-6 flex justify-center content-center"
          >
            <img class="responsive" src="~/assets/elderly-woman.png" alt="Uma senhora de idade lendo um livro">
          </q-card-section>

          <q-card-section
            class="col-12 col-md-6"
            style="background-color: #EEEEEE; position: relative;"
          >
          <div class="column absolute-center full-width">
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
              class="full-width"
            >
              <div
                v-if="selectedTab === TABS.login"
                class="full-width q-gutter-y-sm"
              >
                <TextInput
                  label="E-mail"
                  v-model="formData.email"
                />
                <PasswordInput
                  label="Senha"
                  v-model="formData.password"
                />
              
                <div
                  class="full-width"
                  style="height: 56px;"
                >
                  <q-btn
                    no-caps
                    class="full-width q-mt-lg"
                    style="height: 100%; width: 100%"
                    label="Entrar"
                    color="primary"
                    :size="'lg'"
                    to="/"
                  />
                </div>
              </div>
              <div
                v-else
                class="full-width q-gutter-y-sm"
              >
                <TextInput
                  label="Telefone"
                  v-model="formData.phoneNumber"
                />
                <TextInput
                  label="E-mail"
                  v-model="formData.email"
                />
                <PasswordInput
                  label="Senha"
                  v-model="formData.password"
                />
              
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
                    to="/"
                  />
                </div>
              </div>
            </q-card-section>
            </div>
          </q-card-section>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script>
import { reactive, ref } from "vue";
import TextInput from "src/components/TextInput.vue";
import PasswordInput from "src/components/PasswordInput.vue";

const TABS = Object.freeze({
  register: "register",
  login: "login",
});

const tabsDefinition = [
  { name: TABS.register, label: "Crie seu cadastro" },
  { name: TABS.login, label: "Faça login" },
];

const selectedTab = ref(TABS.login);

const formData = reactive({
  email: "",
  password: "",
  phoneNumber: "",
});

function handleChangeTab(tab) {
  if (selectedTab.value !== tab.name) {
    formData.email = "";
    formData.password = "";
    formData.phoneNumber = "";
  }
}

export default {
  name: "Login",
  components: {
    TextInput,
    PasswordInput,
  },
  setup() {
    return {
      TABS,
      tabsDefinition,
      selectedTab,
      handleChangeTab,

      formData,
      lorem: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    };
  },
};
</script>
