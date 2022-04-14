<template>
  <q-page class="q-pa-md">
    <q-card-section>
      <div class="text-h4">Meus alarmes</div>
    </q-card-section>
    <q-list style="max-width: 600px; margin-bottom: 70px;">
      <!-- <q-item v-for="contact in offline" :key="contact.id" class="q-mb-sm" clickable v-ripple>
        <q-item-section avatar>
          <q-avatar>
            <img :src="`https://cdn.quasar.dev/img/${contact.avatar}`">
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label>{{ contact.name }}</q-item-label>
          <q-item-label caption lines="1">{{ contact.email }}</q-item-label>
        </q-item-section>

        <q-item-section side>
          <q-icon name="chat_bubble" color="grey" />
        </q-item-section>
      </q-item> -->
      <q-item v-for="alarm in alarms" :key="alarm.id" class="q-mb-sm" clickable v-ripple>
        <Alarm :alarm="alarm" :isDeleteMode="isDeleteMode" />
      </q-item>
    </q-list>

    <div>
      <q-page-sticky
        v-if="isDeleteMode"
        position="bottom"
        :offset="[18, 18]"
      >
      <div class="row q-col-gutter-md" style="width: 430px;">
        <div class="col-xs-12 col-sm-6">
          <q-btn
            no-caps
            class="full-width"
            label="Cancelar exclusão"
            color="secondary"
            :size="'lg'"
            @click="handleChangeDeleteMode"
          />
        </div>
        <div class="col-xs-12 col-sm-6">
          <q-btn
            no-caps
            class="full-width"
            label="Excluir"
            color="negative"
            :size="'lg'"
            @click="handleDeleteAlarms"
          />
        </div>
        </div>
      </q-page-sticky>
      
      <q-page-sticky
        v-else
        position="bottom-right"
        :offset="[18, 18]"
      >
        <q-fab 
            label="Opções" 
            label-position="left" 
            icon="keyboard_arrow_up" 
            direction="up" 
            vertical-actions-align="right" 
            color="purple"
          >
          <router-link 
            style="text-decoration: none;"
            to="add-alarm"
          >
            <q-fab-action 
              label="Adicionar alarme" 
              label-position="left" 
              icon="add_alarm" 
              color="primary"
            />
          </router-link>
          <q-fab-action 
            label="Excluir alarmes" 
            label-position="left" 
            icon="delete_forever" 
            color="secondary"
            @click="handleChangeDeleteMode"
          />
        </q-fab>
      </q-page-sticky>
    </div>
  </q-page>
</template>

<script>
import Alarm from "components/Alarm.vue";
import { ref } from "vue";

const alarms = ref([
  {
    id: 1,
    medicineName: "Roacutan",
    timesToRepeat: 10,
    repetitionIntervalInHours: 1,
    startDate: "15/03/2022",
    startTime: "07:30",
    isActive: true
  },
  {
    id: 2,
    medicineName: "Anfetamina",
    timesToRepeat: 1,
    repetitionIntervalInHours: 8,
    startDate: "15/03/2022",
    startTime: "07:30",
    isActive: true
  },
  {
    id: 3,
    medicineName: "Ácido",
    timesToRepeat: 10,
    repetitionIntervalInHours: 8,
    startDate: "15/03/2022",
    startTime: "07:30",
    isActive: true
  },
  {
    id: 4,
    medicineName: "Escitalopram",
    timesToRepeat: 10,
    repetitionIntervalInHours: 8,
    startDate: "15/03/2022",
    startTime: "07:30",
    isActive: false
  },
  {
    id: 5,
    medicineName: "Dipirona",
    timesToRepeat: 10,
    repetitionIntervalInHours: 8,
    startDate: "15/03/2022",
    startTime: "07:30",
    isActive: false
  },
  {
    id: 4,
    medicineName: "Escitalopram",
    timesToRepeat: 10,
    repetitionIntervalInHours: 8,
    startDate: "15/03/2022",
    startTime: "07:30",
    isActive: false
  },
  {
    id: 5,
    medicineName: "Dipirona",
    timesToRepeat: 10,
    repetitionIntervalInHours: 8,
    startDate: "15/03/2022",
    startTime: "07:30",
    isActive: false
  },
  {
    id: 4,
    medicineName: "Escitalopram",
    timesToRepeat: 10,
    repetitionIntervalInHours: 8,
    startDate: "15/03/2022",
    startTime: "07:30",
    isActive: false
  },
  {
    id: 5,
    medicineName: "Dipirona",
    timesToRepeat: 10,
    repetitionIntervalInHours: 8,
    startDate: "15/03/2022",
    startTime: "07:30",
    isActive: false
  },
  {
    id: 4,
    medicineName: "Escitalopram",
    timesToRepeat: 10,
    repetitionIntervalInHours: 8,
    startDate: "15/03/2022",
    startTime: "07:30",
    isActive: false
  },
  {
    id: 5,
    medicineName: "Dipirona",
    timesToRepeat: 10,
    repetitionIntervalInHours: 8,
    startDate: "15/03/2022",
    startTime: "07:30",
    isActive: false
  },
]);

const isDeleteMode = ref(false);

function handleChangeDeleteMode() {
  isDeleteMode.value = !isDeleteMode.value;

  console.log(isDeleteMode.value);
  // if (isDeleteMode.value) {

  // }
}

function handleDeleteAlarms() {
  alert('Alarmes excluídos!');
}

export default {
  name: "Alarms",
  components: {
    Alarm
  },
  setup() {
    return {
      alarms,
      isDeleteMode,
      handleChangeDeleteMode,
      handleDeleteAlarms,
    }
  },
}
</script>
