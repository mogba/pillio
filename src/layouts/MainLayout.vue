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
          Carregando...
        </template>
      </Suspense>
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref } from "vue";
import MenuLinks from "components/MenuLinks.vue";

export default {
  name: "MainLayout",
  components: {
    MenuLinks,
  },
  setup() {
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
