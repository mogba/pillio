<template>
  <q-page class="q-pa-md">
    <q-card-section>
      <div class="text-h4">
        Histórico de alarmes
      </div>
    </q-card-section>

    <q-list style="max-width: 600px; margin-bottom: 70px;">
      <q-item
        class="q-mb-sm"
        clickable
        v-ripple
        v-for="alarm in alarms"
        :key="alarm.id"
      >
        <AlarmHistoryItem :alarm="alarm">
          <q-item-section side>
            <div v-if="isMobile()">
              <q-icon v-if="alarm.medicineTaken" name="check_circle" color="positive" size="2rem" />
              <q-icon v-else name="warning" color="negative" size="2rem" />
            </div>
            <div v-else>
              <q-chip v-if="alarm.medicineTaken" square color="positive" text-color="white" icon-right="check_circle">
                Tomou o remédio
              </q-chip>
              <q-chip v-else square color="negative" text-color="white" icon-right="warning">
                Não tomou o remédio
              </q-chip>
            </div>
          </q-item-section>
        </AlarmHistoryItem>
      </q-item>
    </q-list>
  </q-page>
</template>

<script>
import { reactive } from 'vue';
import { isMobile } from "../helpers/media-helper";
import AlarmHistoryItem from 'src/components/AlarmHistoryItem.vue';

const alarms = reactive([
  {
    id: 1,
    medicineName: "Roacutan",
    timesToRepeat: 10,
    repetitionIntervalInHours: 1,
    startDate: "15/03/2022",
    startTime: "07:30",
    isActive: true,
    toDelete: false,
    medicineTaken: true,
  },
  {
    id: 2,
    medicineName: "Anfetamina",
    timesToRepeat: 1,
    repetitionIntervalInHours: 8,
    startDate: "15/03/2022",
    startTime: "07:30",
    isActive: true,
    toDelete: false,
    medicineTaken: true,
  },
  {
    id: 3,
    medicineName: "Ácido",
    timesToRepeat: 10,
    repetitionIntervalInHours: 8,
    startDate: "15/03/2022",
    startTime: "07:30",
    isActive: true,
    toDelete: false,
    medicineTaken: false,
  },
  {
    id: 4,
    medicineName: "Escitalopramaaaaaaaaaaaaaaaaaaaaaaaaa",
    timesToRepeat: 10,
    repetitionIntervalInHours: 8,
    startDate: "15/03/2022",
    startTime: "07:30",
    isActive: false,
    toDelete: false,
    medicineTaken: true,
  },
  {
    id: 5,
    medicineName: "Dipirona",
    timesToRepeat: 10,
    repetitionIntervalInHours: 8,
    startDate: "15/03/2022",
    startTime: "07:30",
    isActive: false,
    toDelete: false,
    medicineTaken: false,
  },
  {
    id: 4,
    medicineName: "Escitalopram",
    timesToRepeat: 10,
    repetitionIntervalInHours: 8,
    startDate: "15/03/2022",
    startTime: "07:30",
    isActive: false,
    toDelete: false,
    medicineTaken: true,
  },
  {
    id: 5,
    medicineName: "Dipirona",
    timesToRepeat: 10,
    repetitionIntervalInHours: 8,
    startDate: "15/03/2022",
    startTime: "07:30",
    isActive: false,
    toDelete: false,
    medicineTaken: false,
  },
  {
    id: 4,
    medicineName: "Escitalopram",
    timesToRepeat: 10,
    repetitionIntervalInHours: 8,
    startDate: "15/03/2022",
    startTime: "07:30",
    isActive: false,
    toDelete: false,
    medicineTaken: false,
  },
  {
    id: 5,
    medicineName: "Dipirona",
    timesToRepeat: 10,
    repetitionIntervalInHours: 8,
    startDate: "15/03/2022",
    startTime: "07:30",
    isActive: false,
    toDelete: false,
    medicineTaken: false,
  },
  {
    id: 4,
    medicineName: "Escitalopram",
    timesToRepeat: 10,
    repetitionIntervalInHours: 8,
    startDate: "15/03/2022",
    startTime: "07:30",
    isActive: false,
    toDelete: false,
    medicineTaken: false,
  },
  {
    id: 5,
    medicineName: "Dipirona",
    timesToRepeat: 10,
    repetitionIntervalInHours: 8,
    startDate: "15/03/2022",
    startTime: "07:30",
    isActive: false,
    toDelete: false,
    medicineTaken: true,
  },
]);

export default {
  name: "AlarmHistory",
  components: {
    AlarmHistoryItem,
  },
  setup() {
    return {
      alarms,
      isMobile,
    };
  },
};
</script>
