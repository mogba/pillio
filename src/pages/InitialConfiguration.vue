<template>
  <div class="row q-pa-md full-width flex-center justify-center">
    <div class="col-xs-12 col-md-8 col-lg-8">
      <q-card-section>
        <div class="text-h4">
          Primeiros passos
        </div>
      </q-card-section>
      
      <q-card-section
        class="column q-px-xl q-gutter-y-sm q-mt-lg content-center justify-center"
      >
        <div
          v-if="configurationStep === 1"
          class="full-width"
        >
          <div class="text-h6 text-center q-pb-md">
            Olá, {{ userData.name }}!
            <br>
            <!-- Clique abaixo no botão que corresponde com seu perfil -->
            Você vai usar este sistema para administrar 
            <br>
            seus próprios remédios ou será responsável
            <br>
            pelos remédios de outra pessoa?
          </div>

          <div class="row q-px-lg q-pt-lg q-gutter-lg content-center justify-center">
            <div
              class="col-xs-12 col-md-12 col-lg-6 col-xl-6"
              style="height: 56px;"
            >
              <q-btn
                no-caps
                class="full-width"
                style="height: 100%; width: 100%"
                label="Administrarei os remédios de outra pessoa"
                color="primary"
                :size="'lg'"
                @click="() => {
                  selectedUserRole = USER_ROLE.responsible;
                  configurationStep = 2;
                }"
              />
            </div>

            <div
              class="col-xs-12 col-md-12 col-lg-6 col-xl-6"
              style="height: 56px;"
            >
              <q-btn
                no-caps
                class="full-width"
                style="height: 100%; width: 100%"
                label="Administrarei meus próprios remédios"
                color="primary"
                :size="'lg'"
                @click="() => {
                  selectedUserRole = USER_ROLE.elderly;
                  configurationStep = 3;
                }"
              />
            </div>
          </div>
        </div>

        <div
          v-else-if="configurationStep === 2"
          class="full-width"
        >
          <div class="text-h6 text-center">
            Precisamos cadastrar a pessoa para
            <br>
            quem você administrará os remédios
          </div>

          <div class="column">
            <InputText
              class="q-mt-lg"
              label="Nome da pessoa"
              v-model="newElderly.name"
            />
            <InputText
              class="q-mt-lg"
              label="Telefone da pessoa"
              v-model="newElderly.phoneNumber"
            />
          </div>

          <div class="row q-px-lg q-pt-xl q-col-gutter-lg content-center justify-center">
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

        <div
          v-else-if="configurationStep === 3"
          class="full-width"
        >
          <div class="text-h6 text-center">
            Agora é hora de conectar seu Pilli-o Dispenser.
            <br>
            Coloque seu dispositivo Pilli-o Dispenser em modo de 
            configuração pressionando o botão por 10 segundos.
            <br>
            Abaixo serão exibidos os dispositivos Pilli-o Dispenser 
            que estão em modo de configuração.
            <br>
            Toque em um deles para realizar a conexão.
          </div>

          <div
            class="column full-width content-center q-mt-md"
          >
            <div class="col q-gutter-md full-width">
              <div class="q-mx-lg">
                <q-list
                  separator
                  bordered
                  style="max-height: 30vh"
                  class="scroll rounded-borders"
                >
                  <q-item
                    class="full-width"
                    clickable v-ripple
                    v-for="dispenserNetwork in dispenserConfigurationModeNetworks"
                    :key="dispenserNetwork.name"
                    @click="() => {
                      selectedDispenserNetwork = resetSelectedNetwork(dispenserNetwork)
                      showDispenserConnectionDialog = true;
                    }"
                  >
                    <q-item-section>
                      <q-item-label>{{ dispenserNetwork.name }}</q-item-label>
                    </q-item-section>
                    <q-item-section side>
                      <div class="row items-center q-gutter-md">
                        <div
                          v-if="dispenserNetwork.name === connectedDispenserNetwork.name"
                        >
                          Conectado
                        </div>
                        <div>
                          <q-icon
                            :name="dispenserNetwork.signalQuality"
                            size="md"
                            color="grey"
                          />
                        </div>
                      </div>
                    </q-item-section>
                  </q-item>
                </q-list>
              </div>
            </div>
          </div>
          
          <div class="row q-px-lg q-pt-xl q-col-gutter-lg content-center justify-center">
            <div class="col-xs-12 col-md-6">
              <q-btn
                no-caps
                class="full-width"
                label="Voltar"
                color="secondary"
                :size="'lg'"
                @click="() => {
                  configurationStep =
                    selectedUserRole === USER_ROLE.responsible
                      ? 2
                      : 1;
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
                  configurationStep = 4;
                }"
              />
            </div>
          </div>
        </div>

        <div
          v-else-if="configurationStep === 4"
          class="full-width"
        >
          <div class="text-h6 text-center">
            Agora é hora de conectar seu Pilli-o Dispenser.
            <br>
          </div>

          <div
            class="column full-width content-center q-mt-md"
          >
            <div class="col q-gutter-md full-width">
              <div class="q-mx-lg">
                <q-list
                  separator
                  bordered
                  style="max-height: 30vh"
                  class="scroll rounded-borders"
                >
                  <q-item
                    class="full-width"
                    clickable v-ripple
                    v-for="wifiNetwork in availableWifiNetworks"
                    :key="wifiNetwork.name"
                    @click="() => {
                      selectedDispenserNetwork = resetSelectedNetwork(wifiNetwork)
                      showDispenserConnectionDialog = true;
                    }"
                  >
                    <q-item-section>
                      <q-item-label>{{ wifiNetwork.name }}</q-item-label>
                    </q-item-section>
                    <q-item-section side>
                      <div class="row items-center q-gutter-md">
                        <div
                          v-if="wifiNetwork.name === connectedDispenserNetwork.name"
                        >
                          Conectado
                        </div>
                        <div>
                          <q-icon
                            :name="wifiNetwork.signalQuality"
                            size="md"
                            color="grey"
                          />
                        </div>
                      </div>
                    </q-item-section>
                  </q-item>
                </q-list>
              </div>
            </div>
          </div>
          
          <div class="row q-px-lg q-pt-xl q-col-gutter-lg content-center justify-center">
            <div class="col-xs-12 col-md-6">
              <q-btn
                no-caps
                class="full-width"
                label="Voltar"
                color="secondary"
                :size="'lg'"
                @click="() => {
                  configurationStep = 3;
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
    </div>

    <q-dialog
      persistent
      v-model="showDispenserConnectionDialog"
    >
      <q-card>
        <q-card-section class="column items-center" style="min-width: 30vw;">
          <div
            class="q-mx-md q-mt-md"
            v-if="!showLoadingNetworkConnection && !showNetworkConnectedWarning"
          >
            <span>
              Deseja conectar-se a {{ selectedDispenserNetwork.name }}?
            </span>
          </div>

          <div
            class="row items-center q-mx-md q-mt-sm q-gutter-md"
            v-if="showLoadingNetworkConnection"
          >
            <span>
              Conectando, por favor aguarde
            </span>
            <q-spinner-puff color="primary" size="3em" />
          </div>

          <div
            class="row items-center q-mx-md q-mt-sm q-gutter-md"
            v-if="showNetworkConnectedWarning"
          >
            <span>
              {{ selectedDispenserNetwork.name }} conectado!
            </span>
            <q-icon name="check_circle" size="3em" color="primary" />
          </div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn
            v-if="!showNetworkConnectedWarning"
            flat
            label="Cancelar"
            color="primary"
            @click="() => {
              showNetworkConnectedWarning = false;
              showLoadingNetworkConnection = false;
              showDispenserConnectionDialog = false;
            }"
          />
          <q-btn
            flat
            label="OK"
            color="primary"
            @click="() => {
              if (showNetworkConnectedWarning) {
                showNetworkConnectedWarning = false;
                showLoadingNetworkConnection = false;
                showDispenserConnectionDialog = false;
              }
              else {
                connectToNetwork(selectedDispenserNetwork);
              }
            }"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog
      persistent
      v-model="showWifiNetworkConnectionDialog"
    >
      <q-card>
        <q-card-section class="column items-center" style="min-width: 30vw;">
          <span class="q-mx-md q-mt-md">
            Informe a senha para conectar-se a {{ selectedDispenserNetwork.name }}.
          </span>

          <InputPassword
            class="q-mt-lg"
            label="Senha"
            v-model="selectedDispenserNetwork.password"
          />

          <div class="row q-mt-lg q-gutter-md items-center">
            <span class="text-center">
              Conectando, por favor aguarde
            </span>

            <q-spinner-puff color="primary" size="3em" />
          </div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancelar" color="primary" v-close-popup />
          <q-btn flat label="OK" color="primary" @click="() => {

            }"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { ref } from "vue";
import InputText from "src/components/InputText.vue";
import InputPassword from "src/components/InputPassword.vue";

const USER_ROLE = Object.freeze({
  responsible: "responsible",
  elderly: "elderly",
});
const NETWORK_SIGNAL_QUALITY_ICONS = Object.freeze({
  good: "network_wifi",
  avarage: "network_wifi_3_bar",
  bad: "network_wifi_1_bar",
});

const selectedUserRole = ref(null);
const configurationStep = ref(4);

const elderlies = ref([]);
const newElderly = ref(resetNewElderlyData());

const userData = ref({
  name: "Usuário fictício",
});

const dispenserConfigurationModeNetworks = ref([
  {
    name: "Pilli-o Dispenser AAA001",
    signalQuality: NETWORK_SIGNAL_QUALITY_ICONS.good,
  },
  {
    name: "Pilli-o Dispenser AAA002",
    signalQuality: NETWORK_SIGNAL_QUALITY_ICONS.avarage,
  },
]);
const availableWifiNetworks = ref([
  {
    name: "Rede de casa",
    openNetwork: true,
    signalQuality: NETWORK_SIGNAL_QUALITY_ICONS.good,
  },
  {
    name: "Wi-fi 2.4GHz",
    openNetwork: true,
    signalQuality: NETWORK_SIGNAL_QUALITY_ICONS.good,
  },
  {
    name: "Vizinho",
    openNetwork: true,
    signalQuality: NETWORK_SIGNAL_QUALITY_ICONS.avarage,
  },
  {
    name: "#NET-CLARO-WIFI",
    openNetwork: true,
    signalQuality: NETWORK_SIGNAL_QUALITY_ICONS.bad,
  },
]);

const selectedDispenserNetwork = ref(resetSelectedNetwork());
const connectedDispenserNetwork = ref(resetSelectedNetwork());
const showDispenserConnectionDialog = ref(false);
const showWifiNetworkConnectionDialog = ref(false);
const showLoadingNetworkConnection = ref(false);
const showNetworkConnectedWarning = ref(false);

function resetNewElderlyData() {
  return {
    name: "",
    phoneNumber: "",
  };
}

function resetSelectedNetwork(network) {
  return {
    name: network ? network.name : "",
    password: network ? network.password : "",
  };
}

function connectToNetwork(network) {
  // CÓDIGO PROVISÓRIO
  const alternateLoadingNetworkConnection = () => {
    showLoadingNetworkConnection.value = !showLoadingNetworkConnection.value;
    showNetworkConnectedWarning.value = !showLoadingNetworkConnection.value;
    if (showNetworkConnectedWarning.value) {
      connectedDispenserNetwork.value = selectedDispenserNetwork.value;
    }
  };
  alternateLoadingNetworkConnection();
  setTimeout(alternateLoadingNetworkConnection, 5000);

  // Tentar conectar o celular ao dispenser
  // Tirar o loading no callback. Funcionará como o setTimeout.
  // Quando o sistema verificar que está conectado, removerá o loading
}

export default {
  name: "InitialConfiguration",
  components: {
    InputText,
    InputPassword,
  },
  setup() {
    return {
      USER_ROLE,
      selectedUserRole,
      configurationStep,
      newElderly,
      userData,
      dispenserConfigurationModeNetworks,
      availableWifiNetworks,
      resetSelectedNetwork,
      showDispenserConnectionDialog,
      selectedDispenserNetwork,
      connectedDispenserNetwork,
      showWifiNetworkConnectionDialog,
      showLoadingNetworkConnection,
      showNetworkConnectedWarning,
      connectToNetwork,
    };
  },
}
</script>