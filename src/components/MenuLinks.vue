<template>
  <q-list>
    <div
      v-for="(link, index) in linksList"
      :key="link.title"
    >
      <q-expansion-item
        v-if="link.expandable && link.children?.data.length > 0"
        expand-separator
        :default-opened="link.defaultOpened"
        :disable="link.disable"
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
        :disable="link.disable"
        @click="link.action"
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

      <q-separator :key="'sep' + index"  v-if="link.separator" />
    </div>
  </q-list>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useQuasar, SessionStorage } from "quasar";
import { signOutUser } from "src/services/firebase";

// O usuário terá os idosos como "children" apenas se
// for um cuidador. Isso deve ser tratado depois
// para não mostrar os itens no submenu e redirecionar
// para a tela inicial "/" (lista de alarmes) logo
// ao clicar no menu "Alarmes". Os alarmes exibidos
// neste caso seriam do próprio usuário

export default {
  name: "MenuLinks",
  setup() {
    const router = useRouter();
    const $q = useQuasar();
    
    const elderliesRef = ref(SessionStorage.getItem("elderlies"));

    function handleSignOut() {
      signOutUser(() => {
        router.push('/login')
          .then(() => $q.notify({message: 'Log-out efetuado com sucesso.'}))
          .catch(error =>  console.log('error',error));
      });
    }

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
        separator: true,
      },
      {
        title: "Configurações",
        caption: "Configurar pessoas ou dispositivos Pilli-o Dispenser",
        icon: "manage_accounts",
        link: "#/settings",
        disable: true,
      },
      {
        title: "Sair",
        icon: "logout",
        action: handleSignOut
      },
    ];

    return {
      linksList,
    };
  },
};
</script>
