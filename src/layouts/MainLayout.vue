<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title> Pilli-o </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-item-label header> Menu </q-item-label>

      <MenuLinks />
    </q-drawer>

    <q-page-container
      class="relative-position row flex-center"
      style="width: 100%"
    >
      <Suspense>
        <router-view class="col-xs-12 col-md-12 col-lg-8" />

        <template #fallback>
          <div class="q-pt-xl">
            <q-spinner-puff color="primary" size="5em" />
          </div>
        </template>
      </Suspense>
    </q-page-container>
  </q-layout>
</template>

<script>
import { clone } from "lodash";
import { ref, watch } from "vue";
import MenuLinks from "components/MenuLinks.vue";
import { useSessionStore } from "src/stores";
import { mqttClient } from "src/boot/mqtt.boot";

export default {
  name: "MainLayout",
  components: {
    MenuLinks,
  },
  setup() {
    const sessionStore = useSessionStore();
    let oldUser;

    watch(sessionStore.user, user => {
      updateNotificationTopics(user);
    }, { deep: true });

    function updateNotificationTopics(newUser) {
      const isUserResponsible = newUser.role === "responsible";

      const oldElderlies = isUserResponsible ? (oldUser?.elderlies || []).map(o => o.id) : oldUser?.id ? [oldUser.id] : [];
      const newElderlies = isUserResponsible ? (newUser?.elderlies || []).map(n => n.id) : newUser?.id ? [newUser.id] : [];

      const removedElderlies = oldElderlies.filter(o => !newElderlies.includes(o));
      const addedElderlies = newElderlies.filter(n => !oldElderlies.includes(n));

      const topics = ids => ids.map(id => `api/elderly/${id}/alarm/notification/notake`);

      if (removedElderlies.length) {
        mqttClient.unsubscribe(topics(removedElderlies));
        console.log("Tópicos MQTT para notificações desconectados", removedElderlies);
      }

      if (addedElderlies.length) {
        mqttClient.subscribe(topics(addedElderlies));
        console.log("Tópicos MQTT para notificações conectados", newElderlies);
      }

      if (removedElderlies.length || addedElderlies.length) {
        sessionStore.notificationTopics = topics(newElderlies);
        oldUser = clone(newUser);
      }
    }

    Notification.requestPermission();

    updateNotificationTopics(sessionStore.user);

    const leftDrawerOpen = ref(false);

    function toggleLeftDrawer() {
      leftDrawerOpen.value = !leftDrawerOpen.value;
    }

    return {
      leftDrawerOpen,
      toggleLeftDrawer,
    };
  },
};
</script>
