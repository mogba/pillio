<template>
  <q-list>
    <div
      v-for="link in linksList"
      :key="link.title"
    >
      <q-expansion-item
        v-if="link.expandable && link.items?.length > 0"
        expand-separator
        default-opened
      >
        <template v-slot:header>
          <q-item-section avatar>
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
        </template>

        <q-list
          style="max-height: 23vh"
          class="scroll"
        >
          <q-item
            :inset-level="1"
            v-for="item in link.items"
            :key="item.id"
            :to="{
              name: 'alarms',
              params: {
                ...item
              },
            }"
          >
            <q-item-section avatar>
              <q-icon name="face" size="md" color="primary" />
            </q-item-section>

            <q-item-section>
              {{ item.name }}
            </q-item-section>
          </q-item>
        </q-list>
      </q-expansion-item>

      <q-item
        v-else
        clickable
        tag="a"
        target="_self"
        :href="link.link"
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
    </div>
  </q-list>
</template>

<script>
import { SessionStorage } from "quasar";

// O usuário terá os idosos como "items" apenas se
// for um cuidador. Isso deve ser tratado depois
// para não mostrar os itens no submenu e redirecionar
// para a tela inicial "/" (lista de alarmes) logo
// ao clicar no menu "Alarmes". Os alarmes exibidos
// neste caso seriam do próprio usuário

const linksList = [
  {
    title: "Alarmes",
    caption: "Quando deve ser tomado o próximo remédio?",
    icon: "access_alarm",
    link: "#/",
    expandable: true,
    items: SessionStorage.getItem("elderlies"),
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
