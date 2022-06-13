<template>
  <q-item-section avatar>
      <q-icon name="medication" size="md" color="grey" />
    </q-item-section>

    <q-item-section class="q-pb-sm">
      <q-item-label
        style="overflow: hidden; text-overflow: ellipsis;"
        class="q-gutter-sm"
      >
        <div class="text-subtitle1">
          {{ alarmData.medicineName }}
        </div>
        <div v-if="alarmData.isActive && nextTriggerData.dateTime > new Date()">
          {{
            "Próximo disparo em " + nextTriggerData.triggerDate +
            " " + nextTriggerData.triggerTime
          }}
        </div>
        <div>
          {{ `Repetir ${alarmData.timesToRepeat} ${alarmData.timesToRepeat > 1 ? "vezes" : "vez"}` }}
        </div>
      </q-item-label>
      <!-- <q-item-label caption>
        {{ treatmentStartMessage(alarmData) }}
      </q-item-label>
      <q-item-label caption>
        {{ treatmentEndMessage(alarmData) }}
      </q-item-label>
      <q-item-label caption>
        {{ `Repetir ${alarmData.timesToRepeat} ${alarmData.timesToRepeat > 1 ? "vezes" : "vez"}` }}
      </q-item-label> -->
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
    nextTrigger: {
      dateTime: Date,
      triggerDate: String,
      triggerTime: String,
    },
  },
  setup(props) {
    const alarmData = ref(props.alarm || {});
    const nextTriggerData = ref(props.nextTrigger || {});

    return {
      alarmData,
      nextTriggerData,
      treatmentStartMessage,
      treatmentEndMessage,
    };
  },
};
</script>
