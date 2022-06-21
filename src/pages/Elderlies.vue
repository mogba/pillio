<template>
  <q-page class="q-pa-md">
    <q-card-section>
      <div class="text-h4">
        Configurações de pessoas
      </div>
    </q-card-section>

    <q-list style="margin-bottom: 70px;">
      <div v-if="isDeleteMode">
        <q-item
          class="q-mb-sm"
          clickable
          v-for="elderly in elderliesRef"
          :key="elderly.id"
          @click="() => elderly.toDelete = !elderly.toDelete"
        >
          <ElderlyItem :elderly="elderly">
            <q-item-section side>
              <q-checkbox
                v-model="elderly.toDelete"
                val="{{ elderly.toDelete }}"
              />
            </q-item-section>
          </ElderlyItem>
        </q-item>
      </div>
      <div v-else>
        <q-item
          class="q-mb-sm"
          clickable
          v-for="elderly in elderliesRef"
          :key="elderly.id"
          :to="{
            name: 'edit-elderly',
            params: {
              id: elderly.id,
              name: elderly.name,
            },
          }"
        >
          <ElderlyItem :elderly="elderly">
            <div v-if="!elderly.hasDispenser">
              <q-item-section side>
                <div v-if="isMobile()">
                  <q-icon
                    name="warning"
                    color="negative"
                    size="2rem"
                  />
                </div>
                <div v-else>
                  <q-chip
                    square
                    icon-right="warning"
                    color="negative"
                    text-color="white"
                  >
                    Dispenser não configurado
                  </q-chip>
                </div>
              </q-item-section>
            </div>
          </ElderlyItem>
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
              name: 'add-elderly',
              params: {
                id: null,
                name: null,
              },
            }"
          >
            <q-fab-action 
              label="Adicionar pessoa"
              label-position="left"
              icon="person_add"
              color="primary"
            />
          </router-link>
          <q-fab-action 
            label="Excluir pessoas"
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
        v-if="elderliesRef.filter(x => x.toDelete)?.length > 0"
      >
        <q-card-section class="q-mx-sm">
          <div class="text-h6 text-body">
            As seguintes pessoas e todas as suas configurações serão excluídas. 
            Lembre-se de remover os remédios do Dispenser.
          </div>
        </q-card-section>

        <q-card-section>
          <q-list>
            <q-item
              v-for="elderly in elderliesRef.filter(x => x.toDelete)"
              :key="elderly.id"
            >
              <ElderlyItem :elderly="elderly" />
            </q-item>
          </q-list>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat color="primary" label="Cancelar" v-close-popup />
          <q-btn flat color="negative" label="OK" v-close-popup @click="handleDeleteElderly" />
        </q-card-actions>
      </q-card>

      <q-card
        style="width: 700px; max-width: 80vw;"
        v-else
      >
        <q-card-section class="q-mx-sm">
          <div class="text-h6">Nenhuma pessoa foi selecionada para exclusão</div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="OK" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup>
import { ref } from "vue";
import { useQuasar } from "quasar";
import ElderlyItem from "src/components/ElderlyItem.vue";
import { isMobile } from "src/helpers/media.helper";
import { getElderliesByResponsible } from "src/services/user/responsible.service";
import { deleteElderlies } from "src/services/user/elderly.service";
import { useSessionStore } from "src/stores";

const $q = useQuasar();
const sessionStore = useSessionStore();

const isDeleteMode = ref(false);
const showDeleteConfirmationDialog = ref(false);

const elderliesRef = ref([]);

await loadElderlies();

async function loadElderlies() {
  const response = await getElderliesByResponsible();
  let elderlies;

  if (response.data?.length) {
    elderlies = response.data;

    if (sessionStore.user.role === "responsible") {
      updateSessionElderliesData(response.data);
    }
  }
  else {
    elderlies = sessionStore.user?.elderlies || [];
  }

  elderliesRef.value = elderlies.map(elderly => ({
    ...elderly,
    toDelete: false,
  }));
}

function updateSessionElderliesData(elderlies) {
  sessionStore.user.elderlies = elderlies.filter(elderly =>
    elderly.hasDispenser);
}

function handleChangeDeleteMode() {
  isDeleteMode.value = !isDeleteMode.value;

  if (!isDeleteMode.value) {
    elderliesRef.value.forEach(x => x.toDelete = false);
  }
}

async function handleDeleteElderly() {
  const idElderliesToDelete = elderliesRef.value
    .filter(x =>x.toDelete)
    .map(x => x.id);

  if (idElderliesToDelete?.length) {
    const response = await deleteElderlies(idElderliesToDelete);
    $q.notify({ message: response.message });

    await loadElderlies();
  }

  handleChangeDeleteMode();
}
</script>
