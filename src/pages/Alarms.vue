<template>
  <q-page class="q-pa-md">
    <q-card-section>
      <div class="text-h4">
        Meus alarmes
      </div>
    </q-card-section>
    
    <q-list style="margin-bottom: 70px;">
      <q-item
        class="q-mb-sm"
        clickable
        v-ripple
        v-for="alarm in alarms"
        :key="alarm.id"
        @click="handleAlarmSelect(alarm)"
      >
        <!-- to="edit-alarm" -->
        <Alarm :alarm="alarm">
          <q-item-section side>
            <q-checkbox v-if="isDeleteMode" v-model="alarm.toDelete" val="{{ alarm.toDelete }}" />
            <q-toggle v-else v-model="alarm.isActive" val="{{ alarm.isActive }}" />
          </q-item-section>
        </Alarm>
      </q-item>
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
            color="primary"
            @click="handleChangeDeleteMode"
          />
        </q-fab>
      </q-page-sticky>
    </div>

    <q-dialog v-model="showAlarmDeleteConfirmationDialog">
      <q-card style="width: 700px; max-width: 80vw;">
        <div v-if="alarms.filter(x => x.toDelete)?.length > 0">
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

          <q-card-actions class="q-mx-md" align="right">
            <q-btn flat label="Cancelar" v-close-popup />
            <q-btn flat negative color="negative" label="OK" v-close-popup @click="() => {}" />
          </q-card-actions>
        </div>

        <div v-else>
          <q-card-section class="q-mx-sm">
            <div class="text-h6">Nenhum alarme foi selecionado para exclusão</div>
          </q-card-section>

          <q-card-actions class="q-mx-md" align="right">
            <q-btn flat label="OK" v-close-popup />
          </q-card-actions>
        </div>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { reactive, ref } from 'vue';
import { useRoute } from 'vue-router';
// import route from 'src/router';
import Alarm from 'components/Alarm.vue';

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
  },
]);

const isDeleteMode = ref(false);
const showAlarmDeleteConfirmationDialog = ref(false);

function handleAlarmSelect(alarm) {
  if (isDeleteMode.value) {
    alarm.toDelete = !alarm.toDelete;
  }
  else {
    // go to alarm edit page
    // let Router = route();
    // console.log(Router);
    const router = useRoute();
    router.push({ name: "edit-alarm", })
  }
}

function handleChangeDeleteMode() {
  isDeleteMode.value = !isDeleteMode.value;

  if (!isDeleteMode.value) {
    alarms.forEach(x => x.toDelete = false);
  }
}

function handleDeleteAlarms() {
  // const alarmsToDelete = alarms.filter(x => x.toDelete);

  // if (alarmsToDelete?.length < 1) {
  //   $q.dialog({
  //     title: "",
  //     message: 'Nenhum alarme foi selecionado para exclusão.',
  //     persistent: true,
  //   });

  //   return;
  // }

  // const deleteMessage = `\n`

  // $q.dialog({
  //   title: "",
  //   message: "Os seguintes alarmes serão excluídos:",
  //   cancel: true,
  //   persistent: true,
  // }).onOk(() => {
  //   // delete alarms
  // });

  showAlarmDeleteConfirmationDialog.value = true;
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
      handleAlarmSelect,
      handleChangeDeleteMode,
      handleDeleteAlarms,
      teste: () => {
        console.log('valor mudou')
      }
    }
  },
}
</script>
