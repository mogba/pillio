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
            v-if="configurationStepRef === 1"
            class="full-width q-px-md"
          >
            <div class="text-h6 text-body text-center q-px-md">
              Olá{{ userNameRef?.length ? `, ${userNameRef}` : ""}}!
              <br>
              <br>
              Você vai administrar seus 
              próprios remédios ou será 
              responsável pelos remédios 
              de outra pessoa?
            </div>

            <div class="row q-px-lg q-pt-lg q-pb-sm q-gutter-lg content-center justify-center" style="font-size: 19px;">
              <q-radio size="lg" v-model="selectedUserRoleRef" :val="USER_ROLE.elderly" label="Meus remédios" />
              <q-radio size="lg" v-model="selectedUserRoleRef" :val="USER_ROLE.responsible" label="De outra pessoa" />
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
                  size="lg"
                  :disable="!selectedUserRoleRef"
                  @click="() => {
                    setConfigurationStep(
                      selectedUserRoleRef === USER_ROLE.elderly
                      ? 3
                      : 2
                    );
                  }"
                />
              </div>
            </div>
          </div>

          <div
            v-else-if="configurationStepRef === 2"
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
                v-model="newElderlyRef.name"
                :rules="[
                  val => !!val?.trim() || 'O nome deve ser informado',
                  val => (val?.trim().length || 0) >= 3 || 'O nome deve possuir mais que 3 caracteres',
                ]"
              />
              <InputText
                class="q-mt-lg"
                label="E-mail"
                v-model="newElderlyRef.email"
                :rules="[
                  val => !!val?.trim() || 'O e-mail deve ser informado',
                  val => val?.length > 5 || 'O e-mail deve ser informado',
                ]"
              />
              <InputText
                style="padding-bottom: 20px;"
                class="q-mt-lg"
                label="Telefone da pessoa"
                mask="(##) #####-####"
                fill-mask
                v-model="newElderlyRef.phoneNumber"
              />
              <!-- :rules="[val => (val?.split(' ').join('').split('(').join('').split(')').join('').split('-').join('').split('_').join('').length || 0) >= 8 || 'O telefone deve ser informado']" -->
            </div>
            <!--
              :disable="!(
                (newElderlyRef.name?.trim().length || 0) >= 3 &&
                (newElderlyRef.email?.trim().length || 0) > 5 &&
                (newElderlyRef.phoneNumber?.split(' ').join('').split('(').join('').split(')').join('').split('-').join('').split('_').join('').length || 0) >= 8
              )"
            -->
            <div class="row q-pt-xl q-col-gutter-lg content-center justify-center">
              <div class="col-xs-12 col-md-6">
                <q-btn
                  no-caps
                  flat
                  class="full-width"
                  label="Voltar"
                  color="primary"
                  size="lg"
                  @click="() => {
                    setConfigurationStep(1);
                  }"
                />
              </div>
              <div class="col-xs-12 col-md-6">
                <q-btn
                  no-caps
                  class="full-width"
                  label="Avançar"
                  color="primary"
                  size="lg"
                  :disable="!(
                    (newElderlyRef.name?.trim().length || 0) >= 3 &&
                    (newElderlyRef.email?.trim().length || 0) > 5
                  )"
                  @click="() => {
                    setConfigurationStep(3);
                  }"
                />
              </div>
            </div>
          </div>

          <div
            v-else-if="configurationStepRef === 3"
            class="full-width q-px-md"
          >
            <div class="text-h6 text-body q-px-md">
              <p>
                É necessário configurar o Dispenser que armazenará os remédios.
              </p>

              <p>
                Você deve escanear o QR Code contido na etiqueta do dispositivo
                ou digitar seu código alfanumérico correspondente no campo abaixo.
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
                    v-model="dispenserIdCodeRef"
                    clearable
                    :rules="[val => !!val?.trim() || 'O código do Dispenser deve ser informado']"
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
                  flat
                  class="full-width"
                  label="Voltar"
                  color="primary"
                  size="lg"
                  @click="() => {
                    setConfigurationStep(
                      selectedUserRoleRef === USER_ROLE.responsible
                      ? 2
                      : 1
                    );
                  }"
                />
              </div>
              <div class="col-xs-12 col-md-6">
                <q-btn
                  no-caps
                  class="full-width"
                  label="Avançar"
                  color="primary"
                  size="lg"
                  :disable="!dispenserIdCodeRef"
                  @click="() => {
                    setConfigurationStep(4);
                  }"
                />
              </div>
            </div>
          </div>

          <div
            v-else-if="configurationStepRef === 4"
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
                  @click="() => {
                    setConfigurationStep(3);
                  }"
                />
              </div>
              <div class="col-xs-12 col-md-6">
                <q-btn
                  no-caps
                  class="full-width"
                  label="Avançar"
                  color="primary"
                  size="lg"
                  @click="() => {
                    setConfigurationStep(5, configurationStep5Callback);
                  }"
                />
              </div>
            </div>
          </div>
<!-- 
          <div
            v-else-if="configurationStepRef === 5"
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
                  flat
                  class="full-width"
                  label="Voltar"
                  color="primary"
                  size="lg"
                  @click="() => {
                    configurationStepRef = 4;
                  }"
                />
              </div>
              <div class="col-xs-12 col-md-6">
                <q-btn
                  no-caps
                  class="full-width"
                  label="Avançar"
                  color="primary"
                  size="lg"
                  @click="() => {
                    configurationStepRef = 6;
                  }"
                />
              </div>
            </div>
          </div> -->

          <div
            v-else-if="configurationStepRef === 5"
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
                  @click="() => {
                    setConfigurationStep(4);
                  }"
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
                  @click="() => {
                    setConfigurationStep(6, configurationStep6Callback);
                  }"
                />
              </div>
            </div>
          </div>

          <div
            v-else-if="configurationStepRef === 6"
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
                  flat
                  class="full-width"
                  label="Voltar"
                  color="primary"
                  size="lg"
                  :disable="
                    configurationStepRef === 6 &&
                    mqttDispenserConnectionStateRef === DISPENSER_CONNECTION_STATE.connected
                  "
                  @click="() => {
                    setConfigurationStep(5);
                  }"
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
                  label="Começar"
                  color="primary"
                  :size="'lg'"
                  to="/"
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
  </div>
</template>

<script>
import { ref } from "vue";
import { useRouter, onBeforeRouteLeave } from "vue-router";
import { debounce } from "lodash";
import QrScanner from "qr-scanner";
import { useQuasar } from "quasar";
import InputText from "src/components/InputText.vue";
import { generatePassword } from "src/helpers/user.helper";
import { publish, subscribe, unsubscribe } from "src/services/mqtt";
import { registerSecondaryUser, signOutUser } from "src/services/firebase";
import { createResponsibleUser } from "src/services/user/responsible.service";
import { getIsUserConfigured } from "src/services/user/user-config.service";
import { createElderlyUser } from "src/services/user/elderly.service";
import { useSessionStore } from "src/stores";

const USER_ROLE = Object.freeze({
  responsible: "responsible",
  elderly: "elderly",
});

const CAMERA_OPTIONS = Object.freeze({
  environment: "environment",
  user: "user",
});

const DISPENSER_CONNECTION_STATE = Object.freeze({
  pending: "pending",
  connected: "connected",
  error: "error",
});

function resetNewElderlyData() {
  return {
    name: "",
    email: "",
    phoneNumber: "",
  };
}

export default {
  name: "InitialSetup",
  components: {
    InputText,
  },
  props: {
    user: {
      default: {},
      name: String,
    },
  },
  async setup(props) {
    const $q = useQuasar();
    const router = useRouter();
    const sessionStore = useSessionStore();

    onBeforeRouteLeave(() => {
      sessionStore.initialSetup = {};
    });

    // const elderlies = ref([]);
    const newElderlyRef = ref(resetNewElderlyData());

    const userNameRef = ref(
      sessionStore.firebaseUser?.displayName || props.user.name
    );

    const selectedUserRoleRef = ref(null);
    const configurationStepRef = ref(1);
    
    const dispenserIdCodeRef = ref("");

    const mqttDispenserConnectionStateRef = ref(DISPENSER_CONNECTION_STATE.pending);
    const mqttDispenserTopicRef = ref("");

    if (sessionStore.initialSetup
      ?.dispenserConnectionState === DISPENSER_CONNECTION_STATE.connected) {
      const initialSetup = sessionStore.initialSetup;

      selectedUserRoleRef.value = initialSetup.userRole;
      newElderlyRef.value = {
        name: initialSetup.elderlies[0].name,
        email: initialSetup.elderlies[0].email,
        phoneNumber: initialSetup.elderlies[0].phoneNumber,
      };
      dispenserIdCodeRef.value = initialSetup.elderlies[0].dispenserIdCode;
      mqttDispenserConnectionStateRef.value = initialSetup.dispenserConnectionState;

      const isUserConfigured = await getIsUserConfigured();
      configurationStepRef.value = isUserConfigured ? 6 : 5;
    }

    function handleDispenserConnectionCheck() {
      const dispenserIdCode = (dispenserIdCodeRef.value || "").trim();
      const changedDispenserCode = dispenserIdCode.length &&
        !mqttDispenserTopicRef.value.includes(dispenserIdCode);

      if (changedDispenserCode) {
        if (mqttDispenserTopicRef.value) {
          unsubscribe(mqttDispenserTopicRef.value);
        }

        mqttDispenserConnectionStateRef.value = DISPENSER_CONNECTION_STATE.pending;
        mqttDispenserTopicRef.value = `dispenser/${dispenserIdCode}`;

        subscribe(
          mqttDispenserTopicRef.value,
          message => {
            const {
              redeConectada: isNetworkConnected,
              nomeRedeConectada: networkName,
            } = message;

            mqttDispenserConnectionStateRef.value = isNetworkConnected
              ? DISPENSER_CONNECTION_STATE.connected
              : DISPENSER_CONNECTION_STATE.error;

            sessionStore.initialSetup = {
              userRole: selectedUserRoleRef.value,
              elderlies: [{
                name: newElderlyRef.value.name,
                email: newElderlyRef.value.email,
                phoneNumber: newElderlyRef.value.phoneNumber,
                dispenserIdCode: dispenserIdCodeRef.value,
              }],
              dispenserConnectionState: mqttDispenserConnectionStateRef.value,
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

    const configurationStep5Callback = debounce(() => {
      handleDispenserConnectionCheck();
    }, 5000, { leading: true, trailing: false });

    async function configurationStep6Callback() {
      let response;

      if (selectedUserRoleRef.value === USER_ROLE.responsible) {
        // Quando responsável é usuário principal
        const password = generatePassword();

        const newElderlyData = await registerSecondaryUser(
          newElderlyRef.value.name,
          newElderlyRef.value.email,
          password,
        );

        const elderlies = [{
          nome: newElderlyRef.value.name,
          login: newElderlyRef.value.email,
          telefone: newElderlyRef.value.phoneNumber,
          codigoMaquina: dispenserIdCodeRef.value,
          firebaseUserUid: newElderlyData.firebaseUserUid,
          codigoAcesso: newElderlyData.password,
        }];

        response = await createResponsibleUser(elderlies);
      }
      else {
        // Quando idoso é usuário principal
        const elderly = {
          nome: sessionStore.firebaseUser.displayName,
          login: sessionStore.firebaseUser.email,
          codigoAcesso: null,
          telefone: null,
          firebaseUserUid: sessionStore.firebaseUser.uid,
          codigoMaquina: dispenserIdCodeRef.value,
          idResp: null,
        };

        response = await createElderlyUser(elderly);
      }

      if (response.success) {
        const { error, message } = await getIsUserConfigured();

        if (error) {
          $q.notify({ message });
          signOutUser(() => {
            router.push("/login");
          });

          return;
        }
      }

      $q.notify({ message: response.message });
    }

    function setConfigurationStep(newStep, callback = null) {
      configurationStepRef.value = newStep;

      if (typeof callback === "function") {
        callback();
      }
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
      selectedUserRoleRef,
      configurationStepRef,
      setConfigurationStep,
      configurationStep5Callback,
      configurationStep6Callback,
      newElderlyRef,
      userNameRef,
      dispenserIdCodeRef,
      useMainCameraRef,
      isScanningQrCode,
      succeededQrCodeScanRef,
      toggleQrCodeScanning,
      qrCodeScanRegionRef,
      qrCodeScanRegionHighlightRef,
      availableCamerasRef,
      toggleQrCodeCamera,
      CAMERA_OPTIONS,
      mqttDispenserConnectionStateRef,
      DISPENSER_CONNECTION_STATE,
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
