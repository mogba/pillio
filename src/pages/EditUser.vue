<template>
  <q-page class="q-pa-md">
    <q-card-section>
      <div class="text-h4">
        Configurações de usuário
      </div>
    </q-card-section>

    <q-card-section>
      <div>
        <div class="row q-col-gutter-sm q-pb-sm">
          <q-input
            class="col-xs-12 col-xl-12"
            standout="bg-primary text-white" 
            label="Nome"
            v-model="userRef.name"
            clearable
            readonly
            :rules="[
              val => !!val?.trim() || 'O nome deve ser informado',
              val => val?.trim().length >= 3 || 'O nome deve possuir mais que 3 caracteres',
            ]"
          >
            <template>
              <div class="self-center full-width no-outline" tabindex="0"></div>
            </template>
          </q-input>

          <q-input
            style="padding-bottom: 20px;"
            class="col-xs-12 col-xl-12"
            standout="bg-primary text-white" 
            label="Telefone"
            v-model="userRef.phoneNumber"
            clearable
            readonly
            mask="(##) #####-####"
            fill-mask
          >
          <!-- :rules="[val => (val?.split(' ').join('').split('(').join('').split(')').join('').split('-').join('').split('_').join('').length || 0) >= 8 || 'O telefone deve ser informado']" -->
            <template>
              <div class="self-center full-width no-outline" tabindex="0"></div>
            </template>
          </q-input>

          <q-input
            class="col-xs-12 col-xl-12"
            standout="bg-primary text-white" 
            label="E-mail"
            v-model="userRef.email"
            clearable
            readonly
            :rules="[
              val => !!val?.trim() || 'O e-mail deve ser informado',
              val => val?.trim().length > 5 || 'O e-mail deve ser informado',
            ]"
          >
            <template>
              <div class="self-center full-width no-outline" tabindex="0"></div>
            </template>
          </q-input>
<!-- 
          <InputPassword
            label="Alterar senha"
            v-model="userRef.password"
            readonly
            :rules="[
              val => !!val?.trim() || 'A senha deve ser informada',
              val => (
                (
                  (val !== undefined && val !== null) &&
                  val.trim().length > 0 &&
                  (val.charAt(0).trim().length > 0 && val.charAt(val.length - 1).trim().length > 0)
                ) ||
                'A senha não pode começar ou terminar com espaços'
              ),
              val => val?.trim().length >= 8 || 'A senha deve possuir no mínimo 8 caracteres',
            ]"
          /> -->
        </div>
      </div>
    </q-card-section>
  </q-page>
</template>

<script setup>
import { ref } from "vue";
import { useQuasar } from "quasar";
import InputPassword from "src/components/InputPassword.vue";
import { useSessionStore } from "src/stores";

const $q = useQuasar();
const sessionStore = useSessionStore();

const userRef = ref({});

await loadSettings();

async function loadSettings() {
  userRef.value = {
    name: sessionStore.user.name,
    email: sessionStore.user.email,
    phoneNumber: sessionStore.user.phoneNumber,
  };
}
</script>
