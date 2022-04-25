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
      <q-list>
        <q-item-label header> Menu </q-item-label>

        <EssentialLink
          v-for="link in linksList"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container
      class="relative-position row flex-center"
      style="width: 100%"
    >
      <router-view class="col-xs-8 col-xl-8" />
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from "components/EssentialLink.vue";

const linksList = [
  {
    title: "Meus alarmes",
    caption: "Quando devo tomar meu próximo remédio?",
    icon: "access_alarm",
    link: "#/",
  },
  {
    title: "Adicionar alarme",
    caption: "Adicionar um alarme para um remédio",
    icon: "add_alarm",
    link: "#/add-alarm",
  },
  {
    title: "Histórico de alarmes",
    caption: "Visualizar histórico de alarmes",
    icon: "history",
    link: "#/alarm-history",
  },
];

import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "MainLayout",

  components: {
    EssentialLink,
  },

  setup() {
    const leftDrawerOpen = ref(false);

    return {
      linksList,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
});
</script>
