<template>
  <q-page class="q-pa-md">
    <q-card-section>
      <div class="text-h4">Adicionar alarme</div>
    </q-card-section>

    <q-card-section class="q-gutter-y-md" style="max-width: 600px;">
      <q-input 
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
        standout="bg-primary text-white" 
        label="Quantas vezes o remédio será tomado?"
        v-model="newAlarm.timesToRepeat"
        mask="##"
        clearable
      >
        <template>
          <div class="self-center full-width no-outline" tabindex="1"></div>
        </template>
      </q-input>

      <q-input 
        standout="bg-primary text-white" 
        label="O alarme deve repetir em quantas horas?"
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
        standout="bg-primary text-white" 
        label="Que dia o tratamento deve começar?"
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
        standout="bg-primary text-white" 
        label="Que hora deve tocar o primeiro alarme do tratamento?"
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

      <q-btn label="Salvar" no-caps color="primary" :size="'lg'"/>
    </q-card-section>
  </q-page>
</template>

<script>
import { reactive } from "vue";

export default {
  name: "AddAlarm",
  setup() {
    return {
      newAlarm: reactive({})
    }
  },
}
</script>