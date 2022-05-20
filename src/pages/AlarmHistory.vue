<template>
  <q-page class="q-pa-md">
    <q-card-section>
      <div class="text-h4">
        Histórico de alarmes
      </div>
    </q-card-section>

    <q-list style="margin-bottom: 70px;">
      <q-expansion-item
        class="full-width q-mb-sm"
        group="group"
        v-for="alarm in alarmsRef"
        :key="alarm.id"
      >
        <template v-slot:header>
          <AlarmHistoryItem :alarm="alarm">
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
                  v-else
                  :name="triggerMedicineStatusStyle.done.icon"
                  :color="triggerMedicineStatusStyle.done.color"
                  size="2rem"
                />
              </div>
              <div v-else>
                <q-chip
                  v-if="alarm.triggers.some(trigger =>
                    trigger.status == TRIGGER_MEDICINE_STATUS.pending
                  )"
                  square
                  :icon-right="triggerMedicineStatusStyle.pending.icon"
                  :color="triggerMedicineStatusStyle.pending.color"
                  text-color="white"
                >
                  {{ triggerMedicineStatusStyle.pending.label }}
                </q-chip>
                <q-chip
                  v-else
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

        <div class="q-pa-sm">
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
import { ref } from "vue";
import { onBeforeRouteUpdate } from "vue-router";
import { SessionStorage } from "quasar";
import { isMobile } from "src/helpers/media.helper";
import { TRIGGER_MEDICINE_STATUS, mapAlarmsWithTriggersForElderly } from "src/helpers/alarm.helper";
import AlarmHistoryItem from "src/components/AlarmHistoryItem.vue";

const triggerMedicineStatusStyle = {
  [TRIGGER_MEDICINE_STATUS.done]: {
    icon: "check_circle",
    color: "positive",
    label: "Tomou o remédio",
  },
  [TRIGGER_MEDICINE_STATUS.ongoing]: {
    icon: "check_circle",
    color: "gray",
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
    date: trigger.dateString,
    time: trigger.timeString,
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
  setup(props) {
    const elderlyRef = ref({
      id: Number(props.elderly.id),
      name: props.elderly.name,
    });

    if (!elderlyRef.value.id) {
      elderlyRef.value = SessionStorage.getItem("elderlies")[0];
    }

    const alarmsRef = ref(SessionStorage.getItem("alarms"));
    
    mapAlarmsWithTriggersForElderly(alarmsRef, elderlyRef.value.id);

    onBeforeRouteUpdate((to, from) => {
      const newElderly = { id: Number(to.params.id), name: to.params.name };
      elderlyRef.value = newElderly;
      alarmsRef.value = SessionStorage.getItem("alarms");
      mapAlarmsWithTriggersForElderly(alarmsRef, elderlyRef.value.id);

      // Essa função é chamada ao clicar nos submenus de idosos no menu lateral,
      // mais precisamente, somente quando um idoso diferente é selecionado.
      // Atualizar aqui todos os dados da tela para condizerem com o novo idoso.
    });

    return {
      isMobile,
      triggerMedicineStatusStyle,
      TRIGGER_MEDICINE_STATUS,
      alarmTriggersGridColumns,
      mapAlarmTriggersIntoGridRows,
      alarmsRef,
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