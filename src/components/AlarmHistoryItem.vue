<template>
  <q-item-section avatar>
      <q-icon name="medication" size="md" color="grey" />
    </q-item-section>

    <q-item-section>
      <q-item-label
        style="overflow: hidden; text-overflow: ellipsis;"
      >
        {{ alarmData.medicineName }}
      </q-item-label>
      <q-item-label caption>
        {{ treatmentStartMessage(alarmData) }}
      </q-item-label>
      <q-item-label caption>
        {{ treatmentEndMessage(alarmData) }}
      </q-item-label>
    </q-item-section>
    <slot />
</template>

<script>
import { ref } from "vue";
import { treatmentStartMessage, treatmentEndMessage } from "src/helpers/date.helper";

export default {
  name: "AlarmHistoryItem",
  props: {
    alarm: {
      id: Number,
      medicineName: String,
      timesToRepeat: Number,
      repetitionIntervalInHours: Number,
      startDate: String,
      startTime: String,
      isActive: Boolean,
      toDelete: Boolean,
    },
  },
  setup(props) {
    const alarmData = ref(props.alarm);

    return {
      alarmData,
      treatmentStartMessage,
      treatmentEndMessage,
    };
  },
};
</script>
