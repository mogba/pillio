<template>
  <q-page class="q-pa-md">
    <q-card-section>
      <div class="text-h4">
        Alarmes
      </div>
    </q-card-section>
    
    <q-list style="margin-bottom: 70px;">
      
      <div v-if="isDeleteMode">
        <q-item
          class="q-mb-sm"
          clickable
          v-ripple
          v-for="alarm in alarms"
          :key="alarm.id"
          @click="() => alarm.toDelete = !alarm.toDelete"
        >
          <Alarm :alarm="alarm">
            <q-item-section side>
              <q-checkbox v-model="alarm.toDelete" val="{{ alarm.toDelete }}" />
            </q-item-section>
          </Alarm>
        </q-item>
      </div>
      <div v-else>
        <q-item
          class="q-mb-sm"
          clickable
          v-ripple
          v-for="alarm in alarms"
          :key="alarm.id"
          :to="{
            name: 'edit-alarm',
            params: {
              ...alarm,
            },
          }"
        >
          <Alarm :alarm="alarm">
            <q-item-section side>
              <q-toggle v-model="alarm.isActive" val="{{ alarm.isActive }}" />
            </q-item-section>
          </Alarm>
        </q-item>
      </div>
    </q-list>

    <div style="position: fixed;">
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
            color="primary"
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
            @click="() => showAlarmDeleteConfirmationDialog = true"
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
            color="primary"
            @click="handleChangeDeleteMode"
          />
        </q-fab>
      </q-page-sticky>
    </div>

    <q-dialog v-model="showAlarmDeleteConfirmationDialog">
      <q-card
        style="width: 700px; max-width: 80vw;"
        v-if="alarms.filter(x => x.toDelete)?.length > 0"
      >
        <q-card-section class="q-mx-sm">
          <div class="text-h6">Os seguintes alarmes serão excluídos</div>
        </q-card-section>

        <q-card-section>
          <q-list>
            <q-item
              v-for="alarm in alarms.filter(x => x.toDelete)"
              :key="alarm.id"
            >
              <Alarm :alarm="alarm" />
            </q-item>
          </q-list>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat color="primary" label="Cancelar" v-close-popup />
          <q-btn flat color="negative" label="OK" v-close-popup @click="() => {}" />
        </q-card-actions>
      </q-card>

      <q-card
        style="width: 700px; max-width: 80vw;"
        v-else
      >
        <q-card-section class="q-mx-sm">
          <div class="text-h6">Nenhum alarme foi selecionado para exclusão</div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="OK" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { reactive, ref } from "vue";
import { SessionStorage } from "quasar";
import Alarm from "src/components/AlarmItem.vue";

const alarms = reactive([
  {
    id: 1,
    medicineName: "Hidroclorotiazida",
    timesToRepeat: 10,
    repetitionIntervalInHours: 1,
    startDate: "15/03/2022",
    startTime: "07:30",
    isActive: true,
    toDelete: false,
    usedDispenserSlots: [
      1, 2, 3, 4, 5,
    ],
  },
  
  {
    id: 2,
    medicineName: "Metformina",
    timesToRepeat: 1,
    repetitionIntervalInHours: 8,
    startDate: "15/03/2022",
    startTime: "07:30",
    isActive: true,
    toDelete: false,
    usedDispenserSlots: [
      6, 7, 8, 9, 10, 11, 12,
    ],
  },
  {
    id: 3,
    medicineName: "Escitalopram",
    timesToRepeat: 10,
    repetitionIntervalInHours: 8,
    startDate: "15/03/2022",
    startTime: "07:30",
    isActive: false,
    toDelete: false,
    usedDispenserSlots: [],
  },
  {
    id: 4,
    medicineName: "Dipirona",
    timesToRepeat: 3,
    repetitionIntervalInHours: 8,
    startDate: "15/03/2022",
    startTime: "07:30",
    isActive: false,
    toDelete: false,
    usedDispenserSlots: [],
  },
]);

// Os espaços do dispenser que estão disponíveis e ocupados devem 
// ser definidos de acordo com o que os alarmes de uma pessoa estão
// usando, ou seja, deve ser definido por pessoa/dispenser
SessionStorage.set(
  "dispenserSlots",
  [
    { label: "1", value: 1 },
    { label: "2", value: 2 },
    { label: "3", value: 3 },
    { label: "4", value: 4 },
    { label: "5", value: 5 },
    { label: "6", value: 6 },
    { label: "7", value: 7 },
    { label: "8", value: 8 },
    { label: "9", value: 9 },
    { label: "10", value: 10 },
    { label: "11", value: 11 },
    { label: "12", value: 12 },
    { label: "13", value: 13 },
    { label: "14", value: 14 },
    { label: "15", value: 15 },
    { label: "16", value: 16 },
  ],
);

// O "new Set" é para criar array com itens únicos,
// porém no cenário real, os itens devem ser únicos
// por padrão quando os espaços ocupados forem pegos
// dos alarmes que estão ativos, ou seja, um alarme
// ativo não pode estar usando os mesmos espaços 
// que outro alarme
SessionStorage.set(
  "filledDispenserSlots",
  [
    ...(new Set(
      alarms.filter(x => x.isActive).map(x => x.usedDispenserSlots).flat()
    ))
  ],
);

const isDeleteMode = ref(false);
const showAlarmDeleteConfirmationDialog = ref(false);

function handleChangeDeleteMode() {
  isDeleteMode.value = !isDeleteMode.value;

  if (!isDeleteMode.value) {
    alarms.forEach(x => x.toDelete = false);
  }
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
      showAlarmDeleteConfirmationDialog,
      handleChangeDeleteMode,
      teste: () => {
        console.log('valor mudou')
      }
    }
  },
}
</script>
