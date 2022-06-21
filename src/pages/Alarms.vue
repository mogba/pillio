<template>
  <q-page class="q-pa-md">
    <q-card-section>
      <div class="text-h4">
        {{
          isUserResponsible && elderlyRef?.name
            ? `Alarmes de ${elderlyRef.name}`
            : "Alarmes"
        }}
      </div>
    </q-card-section>
    
    <q-list style="margin-bottom: 70px;">
      <div v-if="isDeleteMode">
        <q-item
          class="q-mb-sm"
          clickable
          v-ripple
          v-for="alarm in alarmsRef"
          :key="alarm.id"
          @click="() => alarm.toDelete = !alarm.toDelete"
        >
          <AlarmItem :alarm="alarm">
            <q-item-section side>
              <q-checkbox
                v-model="alarm.toDelete"
                val="{{ alarm.toDelete }}"
              />
            </q-item-section>
          </AlarmItem>
        </q-item>
      </div>
      <div v-else>
        <q-item
          class="q-mb-sm"
          clickable
          v-ripple
          v-for="alarm in alarmsRef"
          :key="alarm.id"
          :to="{
            name: 'edit-alarm',
            params: {
              elderlyId: elderlyRef.id,
              elderlyName: elderlyRef.name,
              ...alarm,
            },
          }"
        >
          <AlarmItem :alarm="alarm">
            <q-item-section side>
              <q-toggle
                v-model="alarm.isActive"
                val="{{ alarm.isActive }}"
                @click="() => handleEnableDisableAlarm(alarm)"
              />
            </q-item-section>
          </AlarmItem>
        </q-item>
      </div>
    </q-list>

    <div style="position: fixed;">
      <q-page-sticky
        v-if="isDeleteMode"
        position="bottom"
        :offset="[18, 18]"
      >
      <div class="row q-col-gutter-md justify-center" style="width: 430px;">
        <div class="col-xs-8 col-md-10">
          <q-btn
            no-caps
            class="full-width"
            label="Cancelar exclusão"
            color="primary"
            :size="'lg'"
            @click="handleChangeDeleteMode"
          />
        </div>
        <div class="col-xs-8 col-md-10">
          <q-btn
            no-caps
            class="full-width"
            label="Excluir"
            color="negative"
            :size="'lg'"
            @click="() => showDeleteConfirmationDialog = true"
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
          label-position="left" 
          icon="more_vert" 
          direction="up" 
          vertical-actions-align="right" 
          color="purple"
        >
          <router-link 
            style="text-decoration: none;"
            :to="{
              name: 'add-alarm',
              params: {
                ...elderlyRef,
              },
            }"
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

    <q-dialog v-model="showDeleteConfirmationDialog">
      <q-card
        style="width: 700px; max-width: 80vw;"
        v-if="alarmsRef.filter(x => x.toDelete)?.length > 0"
      >
        <q-card-section class="q-mx-sm">
          <div class="text-h6 text-body">
            Os seguintes alarmes serão excluídos. 
            Lembre-se de remover os remédios do Dispenser.
          </div>
        </q-card-section>

        <q-card-section>
          <q-list>
            <q-item
              v-for="alarm in alarmsRef.filter(x => x.toDelete)"
              :key="alarm.id"
            >
              <AlarmItem :alarm="alarm" />
            </q-item>
          </q-list>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat color="primary" label="Cancelar" v-close-popup />
          <q-btn flat color="negative" label="OK" v-close-popup @click="handleDeleteAlarms" />
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
import { ref } from "vue";
import { onBeforeRouteUpdate } from "vue-router";
import { useQuasar } from "quasar";
import AlarmItem from "src/components/AlarmItem.vue";
import { getAlarmsByElderly } from "src/services/user/elderly.service";
import { updateAlarm, deleteAlarms } from "src/services/alarm/alarm.service";
import { useSessionStore } from "src/stores";

export default {
  name: "Alarms",
  components: {
    AlarmItem,
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
    const isUserResponsible = sessionStore.user.role === "responsible";

    const elderlyRef = ref({});

    if (!isUserResponsible)
      elderlyRef.value = sessionStore.user;
    else
      elderlyRef.value = {
        id: Number(props.elderly.id),
        name: props.elderly.name,
      };

    const alarmsRef = ref([]);

    onBeforeRouteUpdate(async (to, from) => {
      if (!isUserResponsible)
        elderlyRef.value = sessionStore.user;
      else
        elderlyRef.value = {
          id: Number(to.params.id),
          name: to.params.name,
        };

      await loadAlarms();
    });

    if (!elderlyRef.value.id) {
      elderlyRef.value = sessionStore.user?.elderlies[0] || {};
    }

    await loadAlarms();

    async function loadAlarms() {
      const response = await getAlarmsByElderly(elderlyRef.value.id);

      if (response.success) {
        alarmsRef.value = response.data;
      }
      else {
        $q.notify({ message: response.message });
      }
    }

    const isDeleteMode = ref(false);
    const showDeleteConfirmationDialog = ref(false);

    function handleChangeDeleteMode() {
      isDeleteMode.value = !isDeleteMode.value;

      if (!isDeleteMode.value) {
        alarmsRef.value.forEach(x => x.toDelete = false);
      }
    }

    async function handleEnableDisableAlarm(alarm) {
      const response = await updateAlarm(alarm);
      $q.notify({ message: response.message });
    }

    async function handleDeleteAlarms() {
      const idAlarmsToDelete = alarmsRef.value
        .filter(x =>x.toDelete)
        .map(x => x.id);

      if (idAlarmsToDelete?.length) {
        const response = await deleteAlarms(idAlarmsToDelete);
        $q.notify({ message: response.message });

        await loadAlarms();
      }

      handleChangeDeleteMode();
    }

    return {
      isUserResponsible,
      elderlyRef,
      alarmsRef,
      isDeleteMode,
      showDeleteConfirmationDialog,
      handleEnableDisableAlarm,
      handleChangeDeleteMode,
      handleDeleteAlarms,
    }
  },
}
</script>
