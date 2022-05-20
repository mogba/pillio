<template>
  <div class="row q-pa-md full-width flex-center justify-center">
    <div class="col-xs-12 col-md-8 col-lg-6">
      <q-card-section>
        <div class="text-h4">
          Primeiros passos
        </div>
      </q-card-section>
      
      <q-card-section
        class="column q-px-xs q-gutter-y-sm q-mt-lg content-center justify-center"
      >
        <div
          v-if="configurationStep === 1"
          class="full-width"
        >
          <div class="text-h6 text-center q-pb-md">
            Olá, {{ userData.name }}!
            <br>
            <br>
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
                label="De outra pessoa"
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
                label="Os meus remédios"
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
            É hora de conectar seu Pilli-o Dispenser ao seu dispositivo.
            <br>
            <br>
            Coloque seu dispositivo Pilli-o Dispenser em modo de 
            <br>
            configuração pressionando o botão por 10 segundos.
            <br>
            <br>
            Abaixo serão exibidos os dispositivos Pilli-o Dispenser 
            <br>
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
            Agora seu Pilli-o Dispenser está conectado.
            <br>
            <br>
            Por último, precisamos configurar a rede wi-fi
            <br>
            onde seu dispositivo Pilli-o Dispenser será conectado.
            <br>
            <br>
            Toque em uma das redes wi-fi
            <br>
            exibidas abaixo para realizar a conexão.
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
                      selectedWifiNetwork = resetSelectedNetwork(wifiNetwork)
                      showWifiNetworkConnectionDialog = true;
                    }"
                  >
                    <q-item-section>
                      <q-item-label>{{ wifiNetwork.name }}</q-item-label>
                    </q-item-section>
                    <q-item-section side>
                      <div class="row items-center q-gutter-md">
                        <div
                          v-if="wifiNetwork.name === connectedWifiNetwork.name"
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
                label="Avançar"
                color="primary"
                :size="'lg'"
                @click="() => {
                  configurationStep = 5;
                }"
              />
            </div>
          </div>
        </div>

        <div
          v-else-if="configurationStep === 5"
          class="full-width"
        >
          <div class="text-h6 text-center">
            Tudo pronto!
            <br>
            <br>
            Agora você já pode começar a usar o sistema.
            <!-- <br>
            Caso precise administrar os remédios de mais de uma pessoa,
            <br>
            basta tocar no campo "Cadastrar outra pessoa". -->
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
                label="Começar"
                color="primary"
                :size="'lg'"
                to="/"
              />
            </div>

            <!-- <div
              class="col-xs-12 col-md-12 col-lg-6 col-xl-6"
              style="height: 56px;"
            >
              <q-btn
                no-caps
                class="full-width"
                style="height: 100%; width: 100%"
                label="Cadastrar outra pessoa"
                color="primary"
                :size="'lg'"
                @click="() => {
                }"
              />
            </div> -->

            <div
              class="col-xs-12 col-md-12 col-lg-6 col-xl-6"
              style="height: 56px;"
            >
              <q-btn
                no-caps
                class="full-width"
                style="height: 100%; width: 100%"
                label="Voltar"
                color="secondary"
                :size="'lg'"
                @click="() => {
                  configurationStep = 4;
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
            v-if="!showNetworkConnectionLoading && !showNetworkConnectedWarning"
          >
            <span>
              Deseja conectar-se a {{ selectedDispenserNetwork.name }}?
            </span>
          </div>

          <div
            class="row items-center q-mx-md q-mt-sm q-gutter-md"
            v-if="showNetworkConnectionLoading"
          >
            <span>
              Conectando, por favor aguarde.
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
              showNetworkConnectionLoading = false;
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
                showNetworkConnectionLoading = false;
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
          <div	
            class="q-mx-md q-mt-md"	
            v-if="!showNetworkConnectionLoading && !showNetworkConnectedWarning"	
          >	
            <span>	
              Informe a senha para conectar-se a {{ selectedWifiNetwork.name }}.
            </span>	

            <InputPassword
              class="q-mt-lg"
              label="Senha"
              v-model="selectedWifiNetwork.password"
            />
          </div>

          <div
            class="row items-center q-mx-md q-mt-sm q-gutter-md"
            v-if="showNetworkConnectionLoading"
          >
            <span>
              Conectando, por favor aguarde.
            </span>
            <q-spinner-puff color="primary" size="3em" />
          </div>

          <div
            class="row items-center q-mx-md q-mt-sm q-gutter-md"
            v-if="showNetworkConnectedWarning"
          >
            <span>
              {{ selectedWifiNetwork.name }} conectada!
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
              showNetworkConnectionLoading = false;
              showWifiNetworkConnectionDialog = false;
            }"
          />
          <q-btn
            flat
            label="OK"
            color="primary"
            @click="() => {
              if (showNetworkConnectedWarning) {
                showNetworkConnectedWarning = false;
                showNetworkConnectionLoading = false;
                showWifiNetworkConnectionDialog = false;
              }
              else {
                connectToNetwork(selectedWifiNetwork);
              }
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

export default {
  name: "Settings",
  components: {
    InputText,
    InputPassword,
  },
  setup() {
    const selectedUserRole = ref(null);
    const configurationStep = ref(1);

    const elderlies = ref([]);
    const newElderly = ref(resetNewElderlyData());

    const userData = ref({
      name: "Caroline",
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

    const selectedWifiNetwork = ref(resetSelectedNetwork());
    const connectedWifiNetwork = ref(resetSelectedNetwork());
    const showWifiNetworkConnectionDialog = ref(false);

    const showNetworkConnectionLoading = ref(false);
    const showNetworkConnectedWarning = ref(false);

    function connectToNetwork(network) {
      // CÓDIGO PROVISÓRIO
      const alternateLoadingNetworkConnection = (callbackSetConnectedNetwork) => {
        showNetworkConnectionLoading.value = !showNetworkConnectionLoading.value;
        showNetworkConnectedWarning.value = !showNetworkConnectionLoading.value;
        callbackSetConnectedNetwork();
      };

      if (showDispenserConnectionDialog.value) {
        const callback = () => {
          if (showNetworkConnectedWarning.value) {
            connectedDispenserNetwork.value = selectedDispenserNetwork.value;
          }
        }
        alternateLoadingNetworkConnection(callback);
        setTimeout(() => alternateLoadingNetworkConnection(callback), 5000);
      }
      if (showWifiNetworkConnectionDialog.value) {
        const callback = () => {
          if (showNetworkConnectedWarning.value) {
            connectedWifiNetwork.value = selectedWifiNetwork.value;
          }

          // Aqui, depois que o dispenser for conectado a rede wi-fi,
          // o celular do usuário deve ser conectado à rede wi-fi
          // a qual estava conectado inicialmente, ou seja, antes de
          // ser conectado à rede do dispenser.
        }

        alternateLoadingNetworkConnection(callback);
        setTimeout(() => alternateLoadingNetworkConnection(callback), 5000);
      }

      // Tentar conectar o celular ao dispenser
      // Tirar o loading no callback. Funcionará como o setTimeout.
      // Quando o sistema verificar que está conectado, removerá o loading
    }

    return {
      USER_ROLE,
      selectedUserRole,
      configurationStep,
      newElderly,
      userData,
      dispenserConfigurationModeNetworks,
      availableWifiNetworks,
      resetSelectedNetwork,
      selectedDispenserNetwork,
      connectedDispenserNetwork,
      showDispenserConnectionDialog,
      selectedWifiNetwork,
      connectedWifiNetwork,
      showWifiNetworkConnectionDialog,
      showNetworkConnectionLoading,
      showNetworkConnectedWarning,
      connectToNetwork,
    };
  },
}
</script>