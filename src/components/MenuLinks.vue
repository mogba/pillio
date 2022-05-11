<template>
  <q-list>
    <q-item
      clickable
      tag="a"
      target="_self"
      :href="link.link"
      v-for="link in linksList"
      :key="link.title"
    >
      <q-item-section v-if="link.icon" avatar>
        <q-icon :name="link.icon" size="md" color="primary" />
      </q-item-section>

      <q-item-section>
        <q-item-label>
          {{ link.title }}
        </q-item-label>
        <q-item-label caption>
          {{ link.caption }}
        </q-item-label>
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script>
const linksList = [
  {
    title: "Alarmes",
    caption: "Quando deve ser tomado o próximo remédio?",
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

export default {
  name: "MenuLinks",
  setup() {
    return {
      linksList,
    };
  },
};
</script>
