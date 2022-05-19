<template>
  <q-page class="q-pa-md">
    <q-card-section>
      <div class="text-h4">
        Editar alarme {{ alarmRef.elderlyName ? `para ${alarmRef.elderlyName}` : "" }}
      </div>
    </q-card-section>

    <q-card-section>
      <div class="row q-col-gutter-sm">
        <!-- <q-input
          class="col-xs-12 col-xl-12"
          standout="bg-primary text-white" 
          label="Para quem o alarme será adicionado?"
          v-model="alarmRef.elderlyName"
          clearable
          readonly
        >
          <template>
            <div class="self-center full-width no-outline" tabindex="0"></div>
          </template>
        </q-input> -->

        <q-input
          class="col-xs-12 col-xl-12"
          standout="bg-primary text-white" 
          label="Qual o nome do remédio?"
          v-model="alarmRef.medicineName"
          clearable
        >
          <template>
            <div class="self-center full-width no-outline" tabindex="0"></div>
          </template>
        </q-input>
        
        <q-input
          class="col-xs-12 col-md-6"
          standout="bg-primary text-white" 
          label="Que dia começará o tratamento?"
          required
          v-model="alarmRef.startDate"
          mask="##/##/####"
          clearable
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
          required
          v-model="alarmRef.startTime"
          mask="##:##"
          clearable
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
          label="Quantas doses do remédio serão tomadas?"
          v-model="alarmRef.timesToRepeat"
          mask="##"
          clearable
        >
          <template>
            <div class="self-center full-width no-outline" tabindex="3"></div>
          </template>
        </q-input>

        <q-input
          class="col-xs-12 col-md-6"
          standout="bg-primary text-white" 
          label="Quantas horas entre cada dose?"
          required
          v-model="alarmRef.repetitionIntervalInHours"
          mask="##"
          clearable
        >
          <template>
            <div class="self-center full-width no-outline" tabindex="4"></div>
          </template>
        </q-input>

        <InputSelectMultiple
          :label="'Compartimentos usados no Dispenser'"
          :options="dispenserSlotSelectOptions"
          :values="usedDispenserSlotsRef"
        />
      </div>

      <div
        class="row full-width justify-center q-col-gutter-md q-px-lg q-mt-lg"
      >
        <div class="col-md-6">
          <p>
            <strong>Quantas doses do remédio serão tomadas?</strong>
            <br>
            Este número equivale a quantidade de 
            vezes que o alarme vai tocar, e cada dose do medicamento deve 
            ocupar um compartimento do Pilli-o Dispenser.
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
            class="full-width"
            label="Voltar para os alarmes"
            color="secondary"
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
            to="/"
            @click="handleSaveAlarm"
          />
        </div>
      </div>
    </q-card-section>
  </q-page>
</template>

<script>
import { ref } from "vue";
import { getDispenserSlotOptions } from "src/helpers/dispenser.helper";
import InputSelectMultiple from "src/components/InputSelectMultiple.vue";

export default {
  name: "EditAlarm",
  components: {
    InputSelectMultiple,
  },
  props: {
    alarm: {
      default: {},
      elderlyId: Number,
      elderlyName: String,
      id: Number,
      medicineName: String,
      timesToRepeat: Number,
      repetitionIntervalInHours: Number,
      startDate: String,
      startTime: String,
      isActive: Boolean,
      toDelete: Boolean,
      usedDispenserSlots: Array,
    },
  },
  setup(props) {
    const alarmRef = ref(props.alarm);

    const usedDispenserSlotsValue = (props.alarm.usedDispenserSlots || [])
      .map(slot => Number(slot));
    const usedDispenserSlotsRef = ref(usedDispenserSlotsValue.map(slot =>
      ({ label: slot.toString(), value: Number(slot) })
    ))

    const dispenserSlotSelectOptions = getDispenserSlotOptions(usedDispenserSlotsValue);

    function handleSaveAlarm(e, go) {
      e.preventDefault();
      
      // Connect to API and save data
      console.log(alarmRef);
      // alert('Alarm saved!');
    }

    return {
      alarmRef,
      usedDispenserSlotsRef,
      dispenserSlotSelectOptions,
      handleSaveAlarm,
    }
  },
};
</script>

<style>
.limit-visible-area {
  max-height: 33vh;
}
</style>
