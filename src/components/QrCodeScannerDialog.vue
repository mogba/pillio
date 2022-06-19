<template>
  <div>
    <q-dialog
      v-model="showDialogComputed"
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
              <q-btn v-if="useMainCameraRef" round color="primary" icon="camera_rear" @click="toggleQrCodeCamera" />
              <q-btn v-else round color="primary" icon="camera_front" @click="toggleQrCodeCamera" />
            </div>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { computed, ref, toRefs, watch } from "vue";
import QrScanner from "qr-scanner";

const CAMERA_OPTIONS = Object.freeze({
  environment: "environment",
  user: "user",
});

const props = defineProps({
  showDialog: {
    type: Boolean,
    default: false,
  },
  code: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["update:showDialog", "update:code"]);

const showDialogComputed = computed({
  get: () => props.showDialog,
  set: value => emit("update:showDialog", value),
});
const codeComputed = computed({
  get: () => props.code,
  set: value => emit("update:code", value),
});

const succeededQrCodeScanRef = ref(false);
const useMainCameraRef = ref(true);
const availableCamerasRef = ref([]);
const qrCodeScanRegionRef = ref(null);
const qrCodeScanRegionHighlightRef = ref(null);
let scanner;

function toggleQrCodeScanning() {
  if (!qrCodeScanRegionRef.value) {
    console.log("Erro ao escanear QR code.")
    return;
  }

  succeededQrCodeScanRef.value = false;

  if (showDialogComputed.value) {
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

function createQrScanner() {
  succeededQrCodeScanRef.value = false;

  return new QrScanner(
    qrCodeScanRegionRef.value,
    (scanResult) => {
      succeededQrCodeScanRef.value = true;
      codeComputed.value = scanResult.data;
      showDialogComputed.value = false;
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

function toggleQrCodeCamera() {
  if (scanner) {
    scanner.setCamera(useMainCameraRef.value ? CAMERA_OPTIONS.environment : CAMERA_OPTIONS.user);
    useMainCameraRef.value = !useMainCameraRef.value;
  }
}
</script>

<style>
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
</style>
