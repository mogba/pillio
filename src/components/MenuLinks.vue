<template>
  <q-list>
    <div
      v-for="(menu, index) in menusListRef"
      :key="menu.title"
    >
      <q-expansion-item
        v-if="menu.expandable && menu.children?.data.length"
        expand-separator
        :default-opened="menu.defaultOpened"
        :disable="menu.disable"
      >
        <template v-slot:header>
          <q-item-section avatar>
            <q-icon :name="menu.icon" size="md" color="primary" />
          </q-item-section>

          <q-item-section>
            <q-item-label>
              {{ menu.title }}
            </q-item-label>

            <q-item-label caption>
              {{ menu.caption }}
            </q-item-label>
          </q-item-section>
        </template>

        <q-list
          style="max-height: 23vh"
          class="scroll"
        >
          <q-item
            :inset-level="1"
            v-for="child in menu.children.data"
            :key="child.id"
            :to="{
              name: menu.children.routeName,
              params: {
                id: child.id,
                name: child.name,
              },
            }"
          >
            <q-item-section avatar>
              <q-icon :name="menu.children.icon" size="md" color="primary" />
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
        :href="menu.link"
        :disable="menu.disable"
        @click="menu.action"
      >
        <q-item-section v-if="menu.icon" avatar>
          <q-icon :name="menu.icon" size="md" color="primary" />
        </q-item-section>

        <q-item-section>
          <q-item-label>
            {{ menu.title }}
          </q-item-label>

          <q-item-label caption>
            {{ menu.caption }}
          </q-item-label>
        </q-item-section>
      </q-item>

      <q-separator :key="'sep' + index"  v-if="menu.separator" />
    </div>
  </q-list>
</template>

<script>
import { ref, reactive, watch } from "vue";
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";
import { signOutUser } from "src/services/firebase";
import { useSessionStore } from "src/stores";

// O usuário terá os idosos como "children" apenas se
// for um cuidador. Isso deve ser tratado depois
// para não mostrar os itens no submenu e redirecionar
// para a tela inicial "/" (lista de alarmes) logo
// ao clicar no menu "Alarmes". Os alarmes exibidos
// neste caso seriam do próprio usuário

export default {
  name: "MenuLinks",
  setup() {
    const $q = useQuasar();
    const router = useRouter();
    const sessionStore = useSessionStore();

    const elderliesRef = ref(sessionStore.user?.elderlies || []);
    const menusListRef = ref(getMenuLinks());

    watch(sessionStore.user, user => {
      if (user?.elderlies?.length) {
        elderliesRef.value = user.elderlies;
        menusListRef.value = getMenuLinks();
      }
    }, { deep: true });

    function handleSignOut() {
      signOutUser(() => {
        router.push("/login")
          .then(() => $q.notify({message: "Log-out efetuado com sucesso."}))
          .catch(error =>  console.log("error",error));
      });
    }

    function getMenuLinks() {
      return [
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
            icon: "face",
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
          expandable: true,
          defaultOpened: false,
          children: {
            routeName: "alarm-history",
            data: elderliesRef.value,
            icon: "face",
          },
          separator: true,
        },
        {
          title: "Configurações",
          caption: "Configurar pessoas ou Dispensers",
          icon: "manage_accounts",
          link: "#/settings",
        },
        {
          title: "Sair",
          icon: "logout",
          action: handleSignOut
        },
      ]
    }

    return {
      menusListRef,
    };
  },
};
</script>
