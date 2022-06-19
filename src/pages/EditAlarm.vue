<template>
  <q-page class="q-pa-md">
    <q-card-section>
      <div class="text-h4">
        Editar alarme {{ alarmRef.elderlyName ? `para ${alarmRef.elderlyName}` : "" }}
      </div>
    </q-card-section>

    <q-card-section>
      <div class="row q-col-gutter-sm">
        <q-input
          class="col-xs-12 col-xl-12"
          standout="bg-primary text-white" 
          label="Qual o nome do remédio?"
          v-model="alarmRef.medicineName"
          clearable
          :rules="[
            val => !!val?.trim() || 'O nome deve ser informado',
            val => (val?.trim().length || 0) >= 3 || 'O nome deve possuir mais que 3 caracteres',
          ]"
        >
          <template>
            <div class="self-center full-width no-outline" tabindex="0"></div>
          </template>
        </q-input>
        
        <q-input
          class="col-xs-12 col-md-6"
          standout="bg-primary text-white" 
          label="Que dia começará o tratamento?"
          v-model="alarmRef.startDate"
          mask="##/##/####"
          fill-mask
          clearable
          :rules="[val => (val?.split('/').join('').split('_').join('').length || 0) === 8 || 'O dia de início deve ser informado']"
        >
          <template v-slot:prepend>
            <q-icon name="event" :size="'md'" class="cursor-pointer">
              <q-popup-proxy 
                ref="qDataProxy"
                cover
                transition-show="scale"
                transition-hide="hide"
              >
                <q-date v-model="alarmRef.startDate" mask="DD/MM/YYYY">
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Fechar" color="primary" flat />
                  </div>
                </q-date>
              </q-popup-proxy>
            </q-icon>
          </template>

          <template>
            <div class="self-center full-width no-outline" tabindex="1"></div>
          </template>
        </q-input>

        <q-input
          class="col-xs-12 col-md-6"
          standout="bg-primary text-white" 
          label="Que hora começará o tratamento?"
          v-model="alarmRef.startTime"
          mask="##:##"
          fill-mask
          clearable
          :rules="[val => (val?.split(':').join('').split('_').join('').length || 0) === 4 || 'A hora de início deve ser informada']"
        >
          <template v-slot:prepend>
            <q-icon name="access_time" :size="'md'" class="cursor-pointer">
              <q-popup-proxy 
                ref="qDataProxy"
                cover
                transition-show="scale"
                transition-hide="hide"
              >
                <q-time v-model="alarmRef.startTime">
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Fechar" color="primary" flat />
                  </div>
                </q-time>
              </q-popup-proxy>
            </q-icon>
          </template>

          <template>
            <div class="self-center full-width no-outline" tabindex="2"></div>
          </template>
        </q-input>

        <q-input
          class="col-xs-12 col-md-6"
          standout="bg-primary text-white" 
          label="Quantas doses serão tomadas?"
          v-model="alarmRef.timesToRepeat"
          mask="##"
          clearable
          :rules="[
            val => !!val || 'A quantidade de doses deve ser informada',
            val => val > 0 || 'No mínimo 1 dose deve ser cadastrada',
          ]"
        >
          <template>
            <div class="self-center full-width no-outline" tabindex="3"></div>
          </template>
        </q-input>

        <q-input
          class="col-xs-12 col-md-6"
          standout="bg-primary text-white" 
          label="Quantas horas entre cada dose?"
          v-model="alarmRef.repetitionIntervalInHours"
          mask="##"
          clearable
          :rules="[
            val => !!val || 'O intervalo de horas entre doses deve ser informado',
            val => val > 0 || 'O intervalo deve ser de no mínimo 1 hora',
          ]"
        >
          <template>
            <div class="self-center full-width no-outline" tabindex="4"></div>
          </template>
        </q-input>

        <div class="col-xs-12 col-md-12">
          <InputSelectMultiple
            :label="'Compartimentos usados no Dispenser'"
            :options="dispenserSlotSelectOptionsRef"
            v-model="usedDispenserSlotsRef"
            :rules="[val => val.length > 0 || 'No mínimo 1 compartimento deve ser selecionado']"
          />
        </div>

        <q-input
          v-if="alarmRef.timesToRepeat > 1 && usedDispenserSlotsRef.length === 1"
          class="col-xs-12 col-md-6"
          standout="bg-primary text-white" 
          label="Quantos comprimidos por dose?"
          v-model="alarmRef.pillsQuantity"
          mask="##"
          clearable
          :rules="[
            val => !!val || 'A quantidade de comprimidos por dose deve ser informada',
            val => val > 0 || 'Deve ser informado no mínimo 1 comprimido',
          ]"
        >
          <template>
            <div class="self-center full-width no-outline" tabindex="3"></div>
          </template>
        </q-input>
      </div>

      <div
        class="row full-width justify-center q-col-gutter-md q-px-lg q-mt-lg"
      >
        <div class="col-md-6">
          <p>
            <strong>Quantas doses serão tomadas?</strong>
            <br>
            Este número equivale a quantidade de 
            vezes que o alarme vai tocar, e cada dose do medicamento deve 
            ocupar um compartimento do Dispenser.
            <br>
            Por exemplo: Se o alarme vai tocar 5 vezes, então devem ser 
            preenchidos 5 compartimentos do Dispenser, cada um com uma 
            dose do medicamento.
          </p>
        </div>
        <div class="col-md-6">
          <p>
            <strong>O que é uma dose?</strong>
            <br>
            Uma dose pode conter mais de um comprimido.
            <br>Por exemplo: Se é 
            necessário tomar 2 comprimidos por vez, então cada dose terá 
            2 comprimidos, e cada compartimento do Dispenser deve ser 
            preenchido com 2 comprimidos.
          </p>
        </div>
      </div>

      <div class="row q-px-lg q-pt-lg q-col-gutter-lg">
        <div class="col-xs-12 col-md-6">
          <q-btn
            no-caps
            flat
            class="full-width"
            label="Cancelar"
            color="primary"
            :size="'lg'"
            :to="{
              name: 'alarms',
              params: {
                id: alarmRef.elderlyId,
                name: alarmRef.elderlyName,
              },
            }"
          />
        </div>
        <div class="col-xs-12 col-md-6">
          <q-btn
            no-caps
            class="full-width"
            label="Salvar"
            color="primary"
            :size="'lg'"
            :loading="loadingRef"
            :disable="!(
              alarmRef.medicineName &&
              alarmRef.timesToRepeat &&
              alarmRef.repetitionIntervalInHours &&
              alarmRef.startDate?.split('/').join('').split('_').join('').length === 8 &&
              alarmRef.startTime?.split(':').join('').split('_').join('').length === 4 &&
              usedDispenserSlotsRef.length > 0 &&
              (alarmRef.timesToRepeat > 1 && usedDispenserSlotsRef.length === 1 ? alarmRef.pillsQuantity > 0 : true)
            )"
            @click="handleSaveAlarm"
          >
            <template v-slot:loading>
              <q-spinner-puff color="white" size="1em" />
            </template>
          </q-btn>
        </div>
      </div>
    </q-card-section>
  </q-page>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";
import { onBeforeRouteLeave } from "vue-router";
import InputSelectMultiple from "src/components/InputSelectMultiple.vue";
import { useAlarmStore } from "src/stores";
import { updateAlarm } from "src/services/alarm/alarm.service";
import { getDispenserSlotOptions } from "src/services/dispenser/dispenser.service";
import { mapDispenserSlotOptions } from "src/helpers/dispenser.helper";

const props = defineProps({
  alarm: {
    default: {},
    elderlyId: Number,
    elderlyName: String,
    id: Number,
    medicineName: String,
    timesToRepeat: Number,
    repetitionIntervalInHours: Number,
    usedDispenserSlots: Array,
    pillsQuantity: Number,
    startDate: String,
    startTime: String,
    isActive: Boolean,
  },
});

const $q = useQuasar();
const router = useRouter();
const alarmStore = useAlarmStore();

onBeforeRouteLeave(() => {
  alarmStore.alarm = null;
});

const loadingRef = ref(false);
const alarmRef = ref(props.alarm.id ? props.alarm : alarmStore.alarm);

if (alarmRef.value.id) {
  alarmStore.alarm = alarmRef.value;
}

const usedDispenserSlotsValue = (alarmRef.value.usedDispenserSlots || [])
  .map(slot => Number(slot));
const usedDispenserSlotsRef = ref(usedDispenserSlotsValue.map(slot =>
  ({ label: slot.toString(), value: Number(slot) })
));
const dispenserSlotSelectOptionsRef = ref([]);

const response = await getDispenserSlotOptions(alarmRef.value.elderlyId);

if (response.success) {
  const {
    unavailableDispenserSlots,
    dispenserSlots,
  } = response.data;

  dispenserSlotSelectOptionsRef.value = mapDispenserSlotOptions(
    dispenserSlots,
    unavailableDispenserSlots,
    usedDispenserSlotsValue,
  );
}
else {
  $q.notify({ message: response.message });
}

async function handleSaveAlarm() {
  loadingRef.value = true;

  alarmRef.value.usedDispenserSlots = (
    usedDispenserSlotsRef.value || []
  ).map(slot => slot.value);

  const response = await updateAlarm(alarmRef.value);

  if (response.success) {
    router.push({
      name: "alarms",
      params: {
        id: alarmRef.value.elderlyId,
        name: alarmRef.value.elderlyName,
      },
    });
  }

  loadingRef.value = false;
  $q.notify({ message: response.message });
}
</script>

<style>
.limit-visible-area {
  max-height: 33vh;
}
</style>
