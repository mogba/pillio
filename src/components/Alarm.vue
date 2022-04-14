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
      <q-item-label caption>{{ messages.treatmentStart(alarmData) }}</q-item-label>
      <q-item-label caption>{{ messages.repetition(alarmData) }}</q-item-label>
    </q-item-section>

    <q-item-section side>
      <span v-if="isDeleteMode">Is delete mode</span>
      <q-toggle v-else v-model="alarmData.isActive" val="{{ alarmData.isActive }}" />
    </q-item-section>
</template>

<script>
import { ref } from '@vue/reactivity'
import { defineComponent } from '@vue/runtime-core';

const messages = {
  treatmentStart: (alarm) => 
    `Início em ${alarm.startDate} ${alarm.startTime}`,
  repetition: (alarm) => {
    const appendInterval = alarm.repetitionIntervalInHours < 2
      ? '1 hora' 
      : `${alarm.repetitionIntervalInHours} horas`;

    return `Repetir a cada ${appendInterval}`;
  }
}

export default defineComponent({
  name: "Alarm",
  props: {
    alarm: {
      id: Number,
      medicineName: String,
      timesToRepeat: Number,
      repetitionIntervalInHours: Number,
      startDate: String,
      startTime: String,
      isActive: Boolean,
    },
    isDeleteMode: Boolean,
  },
  setup(props) {
    const alarmData = ref(props.alarm);

    return {
      messages,
      alarmData,
    }
  },
})
</script>
