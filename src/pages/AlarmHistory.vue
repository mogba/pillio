<template>
  <q-page class="q-pa-md">
    <q-card-section>
      <div class="text-h4">
        Histórico de alarmes {{ elderlyRef && elderlyRef.name ? `de ${elderlyRef.name}` : "" }}
      </div>
    </q-card-section>

    <q-list style="margin-bottom: 70px;">
      <q-expansion-item
        class="full-width q-mb-sm"
        group="group"
        v-for="alarm in alarmsRef"
        :key="alarm.id"
      >
      <!-- @before-show="async () => await loadTriggers(alarm.id, triggersTable)"
        @after-hide="() => handleHideTriggersTable(triggersTable)" -->
        <template v-slot:header>
          <AlarmHistoryItem
            :alarm="alarm"
            :nextTrigger="alarm.triggers[0]"
          >
            <q-item-section v-if="alarm.triggers?.length" side>
              <div v-if="isMobile()">
                <q-icon
                  v-if="alarm.triggers.some(trigger =>
                    trigger.status == TRIGGER_MEDICINE_STATUS.pending
                  )"
                  :name="triggerMedicineStatusStyle.pending.icon"
                  :color="triggerMedicineStatusStyle.pending.color"
                  size="2rem"
                />
                <q-icon
                  v-else-if="alarm.triggers[0]
                    .status === TRIGGER_MEDICINE_STATUS.done"
                  :name="triggerMedicineStatusStyle.done.icon"
                  :color="triggerMedicineStatusStyle.done.color"
                  size="2rem"
                />
              </div>
              <div v-else>
                <q-chip
                  v-if="shouldShowPendingState(alarm)"
                  square
                  :icon-right="triggerMedicineStatusStyle.pending.icon"
                  :color="triggerMedicineStatusStyle.pending.color"
                  text-color="white"
                >
                  {{ triggerMedicineStatusStyle.pending.label }}
                </q-chip>
                <q-chip
                  v-else-if="alarm.triggers[0]
                    .status === TRIGGER_MEDICINE_STATUS.done"
                  square
                  :icon-right="triggerMedicineStatusStyle.done.icon"
                  :color="triggerMedicineStatusStyle.done.color"
                  text-color="white"
                >
                  {{ triggerMedicineStatusStyle.done.label }}
                </q-chip>
              </div>
            </q-item-section>
          </AlarmHistoryItem>
        </template>

          <!-- v-if="showTriggersTablesRef.includes(triggersTable)" -->
        <div
          class="q-pa-sm"
        >
          <q-table
            style="box-shadow: none;"
            bordered
            :columns="alarmTriggersGridColumns"
            :rows="mapAlarmTriggersIntoGridRows(alarm.triggers)"
            :rows-per-page-options="[isMobile() ? 5 : 10]"
            row-key="id"
          >
            <template v-slot:body-cell-status="props">
              <q-td :props="props">
                <div v-if="isMobile()">
                  <q-icon
                    :name="triggerMedicineStatusStyle[props.row.status].icon"
                    :color="triggerMedicineStatusStyle[props.row.status].color"
                    size="2rem"
                  />
                </div>
                <div v-else>
                  <q-chip
                    :ripple="false"
                    square
                    text-color="white"
                    :icon-right="triggerMedicineStatusStyle[props.row.status].icon"
                    :color="triggerMedicineStatusStyle[props.row.status].color"
                  >
                    {{ triggerMedicineStatusStyle[props.row.status].label }}
                  </q-chip>
                </div>
              </q-td>
            </template>

            <template v-slot:no-data>
              <div
                style="font-size: 18px;"
                class="full-width row flex-center q-gutter-sm"
              >
                <span>
                  Este alarme ainda não possui disparos
                </span>
              </div>
            </template>
          </q-table>
        </div>
      </q-expansion-item>
    </q-list>
  </q-page>
</template>

<script>
import { debounce } from "lodash";
import { ref } from "vue";
import { onBeforeRouteUpdate } from "vue-router";
import { useQuasar } from "quasar";
import AlarmHistoryItem from "src/components/AlarmHistoryItem.vue";
import { TRIGGER_MEDICINE_STATUS } from "src/helpers/alarm.helper";
import { isMobile } from "src/helpers/media.helper";
import { getAlarmTriggersByElderly } from "src/services/alarm/alarm-trigger.service";
import { useSessionStore } from "src/stores";

const triggerMedicineStatusStyle = {
  [TRIGGER_MEDICINE_STATUS.done]: {
    icon: "alarm_on",
    color: "positive",
    label: "Tomou o remédio",
  },
  [TRIGGER_MEDICINE_STATUS.ongoing]: {
    icon: "alarm",
    color: "grey",
    label: "Próximo disparo",
  },
  [TRIGGER_MEDICINE_STATUS.pending]: {
    icon: "warning",
    color: "negative",
    label: "Não tomou o remédio",
  },
};

const alarmTriggersGridColumns = [
  {
    name: "date",
    field: "date",
    label: "Data",
    align: "center",
    sortable: true,
  },
  {
    name: "time",
    field: "time",
    label: "Hora",
    align: "center",
    sortable: true,
  },
  {
    name: "status",
    field: "status",
    label: "Situação",
    align: "center",
    sortable: true,
  },
];

function mapAlarmTriggersIntoGridRows(triggers) {
  return triggers.map(trigger => ({
    date: trigger.triggerDate,
    time: trigger.triggerTime,
    status: trigger.status,
  }));
}

export default {
  name: "AlarmHistory",
  components: {
    AlarmHistoryItem,
  },
  props: {
    elderly: {
      default: {},
      id: Number,
      name: String,
    },
  },
  async setup(props) {
    const $q = useQuasar();
    const sessionStore = useSessionStore();
    
    const showTriggersTablesRef = ref([]);

    const elderlyRef = ref({
      id: Number(props.elderly.id),
      name: props.elderly.name,
    });

    const alarmsRef = ref([]);

    onBeforeRouteUpdate(async (to, from) => {
      elderlyRef.value = { id: Number(to.params.id), name: to.params.name };

      await loadTriggers();
    });

    if (!elderlyRef.value.id) {
      elderlyRef.value = sessionStore.user?.elderlies[0] || {};
    }

    await loadTriggers();

    async function loadTriggers(alarmId, triggersTableToShow) {
      const response = await getAlarmTriggersByElderly(elderlyRef.value.id);

      if (response.success) {
        alarmsRef.value = response.data;
      }
      else {
        $q.notify({ message: response.message });
      }
    }

    const handleHideTriggersTable = debounce((triggersTableToHide) => {
      const index = showTriggersTablesRef.value.indexOf(triggersTableToHide);
      showTriggersTablesRef.value = showTriggersTablesRef.value.splice(index, 1);
    }, 500, { leading: false, trailing: true });
    
    function shouldShowPendingState(alarm) {
      let lastTrigger;

      for (let index = 0; index < alarm.triggers.length; index++) {
        const trigger = alarm.triggers[index];

        if (!lastTrigger && trigger.status !== TRIGGER_MEDICINE_STATUS.ongoing) {
          lastTrigger = trigger;
        }
        if (lastTrigger) {
          return lastTrigger.status !== TRIGGER_MEDICINE_STATUS.done;
        }
      }

      return false;
    }

    return {
      isMobile,
      triggerMedicineStatusStyle,
      TRIGGER_MEDICINE_STATUS,
      shouldShowPendingState,
      showTriggersTablesRef,
      alarmTriggersGridColumns,
      mapAlarmTriggersIntoGridRows,
      handleHideTriggersTable,
      alarmsRef,
      elderlyRef,
    };
  },
};
</script>

<style scoped>
.q-expansion-item--expanded {
  box-shadow: 0 0 2px 2px rgba(0, 0, 0, 0.06);
  border-radius: 5px;
}

.q-expansion-item :hover {
  border-radius: 5px;
}

.alarm-history-item:hover {
  border-radius: 5px;
}
</style>