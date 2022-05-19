<template>
  <q-list>
    <div
      v-for="link in linksList"
      :key="link.title"
    >
      <q-expansion-item
        v-if="link.expandable && link.children?.data.length > 0"
        expand-separator
        :default-opened="link.defaultOpened"
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
            v-for="child in link.children.data"
            :key="child.id"
            :to="{
              name: link.children.routeName,
              params: {
                ...child
              },
            }"
          >
            <q-item-section avatar>
              <q-icon name="face" size="md" color="primary" />
            </q-item-section>

            <q-item-section>
              {{ child.name }}
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
import { ref } from "vue";
import { SessionStorage } from "quasar";

// O usuário terá os idosos como "children" apenas se
// for um cuidador. Isso deve ser tratado depois
// para não mostrar os itens no submenu e redirecionar
// para a tela inicial "/" (lista de alarmes) logo
// ao clicar no menu "Alarmes". Os alarmes exibidos
// neste caso seriam do próprio usuário


export default {
  name: "MenuLinks",
  setup() {
    const elderliesRef = ref(SessionStorage.getItem("elderlies"));

    const linksList = [
      {
        title: "Alarmes",
        caption: "Quando deve ser tomado o próximo remédio?",
        icon: "access_alarm",
        link: "#/",
        expandable: true,
        defaultOpened: true,
        children: {
          routeName: "alarms",
          data: elderliesRef.value,
        },
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
        expandable: true,
        defaultOpened: false,
        children: {
          routeName: "alarm-history",
          data: elderliesRef.value,
        },
      },
    ];

    return {
      linksList,
    };
  },
};
</script>
