<template>
  <div class="row q-pa-md full-width flex-center justify-center">
    <div class="col-xs-12 col-md-8 col-lg-8">
      <q-card-section>
        <div class="text-h4">
          Primeiros passos
        </div>
      </q-card-section>
      
      <q-card-section
        class="row q-px-xs q-gutter-y-sm q-mt-lg content-center justify-center"
      >
        <div class="full-width">
          <div
            v-if="configurationStep === 1"
            class="full-width q-px-md"
          >
            <div class="text-h6 text-body text-center q-px-md">
              Olá, {{ userData.name }}!
              <br>
              <br>
              Você vai administrar seus 
              próprios remédios ou será 
              responsável pelos remédios 
              de outra pessoa?
            </div>

            <div class="row q-px-lg q-pt-lg q-pb-sm q-gutter-lg content-center justify-center" style="font-size: 19px;">
              <q-radio size="lg" v-model="selectedUserRole" :val="USER_ROLE.elderly" label="Meus remédios" />
              <q-radio size="lg" v-model="selectedUserRole" :val="USER_ROLE.responsible" label="De outra pessoa" />
            </div>

            <div class="row q-pt-lg q-col-gutter-lg content-center justify-center">
              <div
                class="col-xs-12 col-md-12 col-lg-6 col-xl-6"
                style="height: 56px;"
              >
                <q-btn
                  no-caps
                  class="full-width"
                  style="height: 100%; width: 100%"
                  label="Avançar"
                  color="primary"
                  :size="'lg'"
                  :disable="!selectedUserRole"
                  @click="() => {
                    setConfigurationStep(
                      selectedUserRole === USER_ROLE.elderly
                      ? 3
                      : 2
                    );
                  }"
                />
              </div>
            </div>
          </div>

          <div
            v-else-if="configurationStep === 2"
            class="full-width q-px-md"
          >
            <div class="text-h6 text-body text-center q-px-md">
              Precisamos cadastrar a pessoa para
              quem você administrará os remédios.
            </div>

            <div class="column q-pt-md">
              <InputText
                class="q-mt-lg"
                label="Nome da pessoa"
                v-model="newElderly.name"
                :rules="[
                  val => !!val || 'O nome deve ser informado',
                  val => (val?.trim().length || 0) >= 3 || 'O nome deve possuir mais que 3 caraceteres',
                ]"
              />
              <InputText
                class="q-mt-lg"
                label="Telefone da pessoa"
                mask="(##) #####-####"
                fill-mask
                v-model="newElderly.phoneNumber"
                :rules="[val => (val?.split(' ').join('').split('(').join('').split(')').join('').split('-').join('').split('_').join('').length || 0) >= 8 || 'O telefone deve ser informado']"
              />
            </div>

            <div class="row q-pt-xl q-col-gutter-lg content-center justify-center">
              <div class="col-xs-12 col-md-6">
                <q-btn
                  no-caps
                  class="full-width"
                  label="Avançar"
                  color="primary"
                  :size="'lg'"
                  :disable="!(
                    (newElderly.name?.trim().length || 0) >= 3 &&
                    (newElderly.phoneNumber?.split(' ').join('').split('(').join('').split(')').join('').split('-').join('').split('_').join('').length || 0) >= 8
                  )"
                  @click="() => {
                    setConfigurationStep(3);
                  }"
                />
              </div>
              <div class="col-xs-12 col-md-6">
                <q-btn
                  no-caps
                  class="full-width"
                  label="Voltar"
                  color="secondary"
                  :size="'lg'"
                  @click="() => {
                    // selectedUserRole = null;
                    setConfigurationStep(1);
                  }"
                />
              </div>
            </div>
          </div>

          <div
            v-else-if="configurationStep === 3"
            class="full-width q-px-md"
          >
            <div class="text-h6 text-body text-center q-pb-md q-px-md">
              É necessário configurar o Dispenser que armazenará os remédios.
              <br>
              Você deve escanear o QR Code contido na etiqueta do dispositivo
              ou digitar seu código alfanumérico correspondente no campo abaixo.
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
                    v-model="dispenserIdCodeRef"
                    clearable
                    :rules="[val => !!val || 'O código do Dispenser deve ser informado']"
                  >
                    <template v-slot:prepend>
                      <q-icon
                        class="cursor-pointer"
                        size="md"
                        name="photo_camera"
                        @click="() => isScanningQrCode = true"
                      />
                    </template>

                    <template>
                      <div class="self-center full-width no-outline" tabindex="1"></div>
                    </template>
                  </q-input>

                  <!-- {{ availableCamerasRef }} -->
                </div>
              </div>
            </div>
            
            <div class="row q-pt-xl q-col-gutter-lg content-center justify-center">
              <div class="col-xs-12 col-md-6">
                <q-btn
                  no-caps
                  class="full-width"
                  label="Avançar"
                  color="primary"
                  :size="'lg'"
                  :disable="!dispenserIdCodeRef"
                  @click="() => {
                    setConfigurationStep(4);
                  }"
                />
              </div>
              <div class="col-xs-12 col-md-6">
                <q-btn
                  no-caps
                  class="full-width"
                  label="Voltar"
                  color="secondary"
                  :size="'lg'"
                  @click="() => {
                    setConfigurationStep(
                      selectedUserRole === USER_ROLE.responsible
                      ? 2
                      : 1
                    );
                  }"
                />
              </div>
            </div>
          </div>

          <div
            v-else-if="configurationStep === 4"
            class="full-width q-px-md"
          >
            <div class="text-h6 text-body q-px-md">
              <div class="text-center">
                Agora siga os passos abaixo 
                para configurar o Dispenser.
              </div>

              <div class="text-left q-px-lg">
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
                      as configurações de wi-fi deu seu 
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
                  class="full-width"
                  label="Avançar"
                  color="primary"
                  :size="'lg'"
                  @click="() => {
                    setConfigurationStep(5, configurationStep5Callback);
                  }"
                />
              </div>
              <div class="col-xs-12 col-md-6">
                <q-btn
                  no-caps
                  class="full-width"
                  label="Voltar"
                  color="secondary"
                  :size="'lg'"
                  @click="() => {
                    setConfigurationStep(3);
                  }"
                />
              </div>
            </div>
          </div>
<!-- 
          <div
            v-else-if="configurationStep === 5"
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
                  label="Avançar"
                  color="primary"
                  :size="'lg'"
                  @click="() => {
                    configurationStep = 6;
                  }"
                />
              </div>
              <div class="col-xs-12 col-md-6">
                <q-btn
                  no-caps
                  class="full-width"
                  label="Voltar"
                  color="secondary"
                  :size="'lg'"
                  @click="() => {
                    configurationStep = 4;
                  }"
                />
              </div>
            </div>
          </div> -->

          <div
            v-else-if="configurationStep === 5"
            class="full-width q-px-md"
          >
            <div class="text-h6 text-body text-center q-px-md">
              <div class="q-gutter-md">
                <div v-if="!isDispenserConnectedRef">
                  Verificando conexão com o Dispenser
                </div>
                <q-spinner-puff v-if="!isDispenserConnectedRef" color="primary" size="3em" />

                <div v-if="isDispenserConnectedRef">
                  O Dispenser está conectado
                </div>
                <q-icon v-if="isDispenserConnectedRef" name="check_circle" size="3em" color="primary" />
              </div>

              <!-- Quando chegar nessa tela, fazer uma requisição 
                      a API para verificar se o Dispenser foi 
                            cadastrado/configurado -->
            </div>
            
            <div class="row q-pt-xl q-col-gutter-lg content-center justify-center">
              <div class="col-xs-12 col-md-6">
                <q-btn
                  no-caps
                  class="full-width"
                  label="Avançar"
                  color="primary"
                  :size="'lg'"
                  :disable="!isDispenserConnectedRef"
                  @click="() => {
                    setConfigurationStep(6);
                  }"
                />
              </div>
              <div class="col-xs-12 col-md-6">
                <q-btn
                  no-caps
                  class="full-width"
                  label="Voltar"
                  color="secondary"
                  :size="'lg'"
                  @click="() => {
                    setConfigurationStep(4);
                  }"
                />
              </div>
            </div>
          </div>

          <div
            v-else-if="configurationStep === 6"
            class="full-width q-px-md"
          >
            <div class="text-h6 text-body text-center q-px-md">
              Tudo pronto!
              <br>
              <br>
              Agora você já pode começar a usar o sistema.
              <!-- <br>
              Caso precise administrar os remédios de mais de uma pessoa,
              <br>
              basta tocar no campo "Cadastrar outra pessoa". -->
            </div>

            <div class="row q-pt-xl q-col-gutter-lg content-center justify-center">
              <div class="col-xs-12 col-md-6">
                <q-btn
                  no-caps
                  class="full-width"
                  label="Começar"
                  color="primary"
                  :size="'lg'"
                  to="/"
                />
              </div>

              <!-- <div class="col-xs-12 col-md-6">
                <q-btn
                  no-caps
                  class="full-width"
                  label="Cadastrar outra pessoa"
                  color="primary"
                  :size="'lg'"
                  @click="() => {
                  }"
                />
              </div> -->

              <div class="col-xs-12 col-md-6">
                <q-btn
                  no-caps
                  class="full-width"
                  label="Voltar"
                  color="secondary"
                  :size="'lg'"
                  @click="() => {
                    setConfigurationStep(5);
                  }"
                />
              </div>
            </div>
          </div>
        </div>
      </q-card-section>
    </div>

    <q-dialog
      v-model="isScanningQrCode"
      @show="toggleQrCodeScanning"
      @before-hide="toggleQrCodeScanning"
    >
      <q-card style="max-width: 600px;" class="row">
        <q-card-section class="col-12 q-pa-none">
          <video
            class="full-width"
            style="background-color: white;"
            ref="qrCodeScanRegionRef"
            disablepictureinpicture
            playsinline
          />

          <div
            style="position: absolute; display: none; pointer-events: none;"
            class="scan-region-highlight"
            ref="qrCodeScanRegionHighlightRef"
          >
            <svg
              class="scan-region-highlight-svg"
              viewBox="0 0 238 238"
              preserveAspectRatio="none"
            >
              <path d="M31 2H10a8 8 0 0 0-8 8v21M207 2h21a8 8 0 0 1 8 8v21m0 176v21a8 8 0 0 1-8 8h-21m-176 0H10a8 8 0 0 1-8-8v-21"></path>
            </svg>
          </div>
        </q-card-section>

        <q-card-section class="col-12 q-pt-none q-px-md q-pb-md flex justify-between">
          <div class="row items-center q-gutter-md q-pt-sm">
            <q-icon v-if="succeededQrCodeScanRef" name="check_circle" size="3em" color="primary" />
            <span v-else class="text-body" style="max-width: 110px;">
              Aponte a câmera para o QR Code</span>
          </div>

          <div
            v-if="availableCamerasRef.length >= 2"
            class="row items-center q-gutter-md q-pt-sm"
          >
            <span>Trocar câmera</span>
            <div>
              <q-btn v-if="useMainCameraRef" round color="primary" icon="camera_rear" @click="() => toggleQrCodeCamera()" />
              <q-btn v-else round color="primary" icon="camera_front" @click="() => toggleQrCodeCamera()" />
            </div>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>

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
import { debounce } from "lodash";
import QrScanner from "qr-scanner";
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

const CAMERA_OPTIONS = Object.freeze({
  environment: "environment",
  user: "user",
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
    const isDispenserConnectedRef = ref(false);

    const configurationStep5Callback = debounce(
      () => {
        // Request for API to check if the dispenser
        // was registered for the current user
        isDispenserConnectedRef.value = true;
      },
      5000,
      {
        leading: true,
        trailing: false,
      },
    );

    function setConfigurationStep(newStep, callback = null) {
      configurationStep.value = newStep;

      if (callback && typeof callback === "function") {
        callback();
      }
    }

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

    const dispenserIdCodeRef = ref("");

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

    const succeededQrCodeScanRef = ref(false);
    const useMainCameraRef = ref(true);
    const availableCamerasRef = ref([]);
    const qrCodeScanRegionRef = ref(null);
    const qrCodeScanRegionHighlightRef = ref(null);
    const isScanningQrCode = ref(false);
    let scanner;

    function createQrScanner() {
      succeededQrCodeScanRef.value = false;

      return new QrScanner(
        qrCodeScanRegionRef.value,
        (scanResult) => {
          succeededQrCodeScanRef.value = true;
          dispenserIdCodeRef.value = scanResult.data;
          isScanningQrCode.value = false;
        },
        {
          preferredCamera: CAMERA_OPTIONS.environment,
          maxScansPerSecond: 10,
          highlightScanRegion: true,
          highlightCodeOutline: true,
          overlay: qrCodeScanRegionHighlightRef.value,
        },
      );
    }
    
    function toggleQrCodeScanning() {
      if (!qrCodeScanRegionRef.value) {
        console.log("Erro ao escanear QR code.")
        return;
      }

      succeededQrCodeScanRef.value = false;

      if (isScanningQrCode.value) {
        scanner = createQrScanner();
        QrScanner.listCameras().then(cameras => {
          availableCamerasRef.value = cameras;
          scanner.start();
        });
      }
      else {
        scanner.stop();
        scanner.destroy();
        scanner = null;
      }
    }

    function toggleQrCodeCamera() {
      if (scanner) {
        scanner.setCamera(useMainCameraRef.value ? CAMERA_OPTIONS.environment : CAMERA_OPTIONS.user);
        useMainCameraRef.value = !useMainCameraRef.value;
      }
    }

    return {
      USER_ROLE,
      selectedUserRole,
      configurationStep,
      setConfigurationStep,
      configurationStep5Callback,
      newElderly,
      userData,
      dispenserConfigurationModeNetworks,
      availableWifiNetworks,
      resetSelectedNetwork,
      dispenserIdCodeRef,
      selectedDispenserNetwork,
      connectedDispenserNetwork,
      showDispenserConnectionDialog,
      selectedWifiNetwork,
      connectedWifiNetwork,
      showWifiNetworkConnectionDialog,
      showNetworkConnectionLoading,
      showNetworkConnectedWarning,
      connectToNetwork,
      useMainCameraRef,
      isScanningQrCode,
      succeededQrCodeScanRef,
      toggleQrCodeScanning,
      qrCodeScanRegionRef,
      qrCodeScanRegionHighlightRef,
      availableCamerasRef,
      toggleQrCodeCamera,
      CAMERA_OPTIONS,
      isDispenserConnectedRef,
    };
  },
}
</script>

<style>
/* QR Code */

.scan-region-highlight-svg {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0px;
  top: 0px;
  fill: none;
  stroke: #1976d2;
  stroke-width: 4;
  stroke-linecap: round;
  stroke-linejoin: round;
}

/* Dispenser Configuration Steps */

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