<template>
  <q-page class="q-pa-md">
    <q-card-section>
      <div class="text-h4">Adicionar alarme</div>
    </q-card-section>

    <q-card-section>
      <div class="row q-col-gutter-sm">
        <q-input
          class="col-xs-12 col-xl-12"
          standout="bg-primary text-white" 
          label="Qual o nome do remédio?"
          v-model="newAlarm.medicineName"
          clearable
        >
          <template>
            <div class="self-center full-width no-outline" tabindex="0"></div>
          </template>
        </q-input>

        <q-input
          class="col-xs-12 col-md-6"
          standout="bg-primary text-white" 
          label="Quantas doses do remédio serão tomadas?"
          v-model="newAlarm.timesToRepeat"
          mask="##"
          clearable
        >
          <template>
            <div class="self-center full-width no-outline" tabindex="1"></div>
          </template>
        </q-input>

        <q-input
          class="col-xs-12 col-md-6"
          standout="bg-primary text-white" 
          label="Quantas horas entre cada dose?"
          required
          v-model="newAlarm.repetitionIntervalInHours"
          mask="##"
          clearable
        >
          <template>
            <div class="self-center full-width no-outline" tabindex="2"></div>
          </template>
        </q-input>

        <q-input
          class="col-xs-12 col-md-6"
          standout="bg-primary text-white" 
          label="Que dia começará o tratamento?"
          required
          v-model="newAlarm.startDate"
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
                <q-date v-model="newAlarm.startDate" mask="DD/MM/YYYY">
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Fechar" color="primary" flat />
                  </div>
                </q-date>
              </q-popup-proxy>
            </q-icon>
          </template>

          <template>
            <div class="self-center full-width no-outline" tabindex="3"></div>
          </template>
        </q-input>

        <q-input
          class="col-xs-12 col-md-6"
          standout="bg-primary text-white" 
          label="Que hora começará o tratamento?"
          required
          v-model="newAlarm.startTime"
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
                <q-time v-model="newAlarm.startTime">
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Fechar" color="primary" flat />
                  </div>
                </q-time>
              </q-popup-proxy>
            </q-icon>
          </template>

          <template>
            <div class="self-center full-width no-outline" tabindex="4"></div>
          </template>
        </q-input>
      </div>
      
      <div class="row q-px-lg q-pt-xl q-col-gutter-lg">
        <div class="col-xs-12 col-md-6">
          <q-btn
            no-caps
            class="full-width"
            label="Voltar para meus alarmes"
            color="secondary"
            :size="'lg'"
            to="/"
            @click="handleGoToAlarmsScreen"
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
import { reactive } from "vue";

// medicineName
// timesToRepeat
// repetitionIntervalInHours
// startDate
// startTime

const newAlarm = reactive({});

function handleSaveAlarm(e, go) {
  e.preventDefault();
  
  // Connect to API and save data
  console.log(newAlarm);
  // alert('Alarm saved!');

  handleGoToAlarmsScreen(e, go); // Remover essa chamada
}

function handleGoToAlarmsScreen(e, go) {
  go();
}

export default {
  name: "AddAlarm",
  setup() {
    return {
      newAlarm,
      handleSaveAlarm,
      handleGoToAlarmsScreen,
    }
  },
};
</script>