<template>
  <q-page class="q-pa-md">
    <!-- <q-card> -->
      <q-card-section>
        <div class="text-h6">Formulário de Cadastro</div>
      </q-card-section>
      <q-card-section>
        <q-form>
          <div class="row q-col-gutter-md">
            <div class="col-12 col-md-6 col-sm-12">
              <q-input outlined stack-label label="Nome Completo *" v-model="dados.nomeCompleto" />
            </div>
            <div class="col-12 col-md-6 col-sm-12">
              <q-input outlined stack-label label="E-mail *" v-model="dados.email" />
            </div>
            <div class="col-12 col-md-6 col-sm-12">
              <q-input outlined stack-label label="Telefone *" v-model="dados.telefone" />
            </div>
            <div class="col-12 col-md-6 col-sm-12">
              <q-select 
                outlined 
                stack-label 
                label="Sexo *" 
                :options="opcoesEnum" 
                v-model="dados.sexo" 
              />
            </div>
          </div>
        </q-form>
        <div class="q-mt-md">
          <q-btn
            label="Enviar"
            type="submit"
            color="primary"
            @click="enviar(dados)"
          />
          <q-btn
            label="Cancelar"
            type="reset"
            color="primary"
            flat
            class="q-ml-sm"
            @click="enviar(dados)"
          />
        </div>
      </q-card-section>
    <!-- </q-card> -->
  </q-page>
</template>

<script setup>
import { reactive } from "@vue/reactivity";

const dados = reactive({});
const opcoesEnum = Object.freeze(["Masculino", "Feminino", "Outro"]);

function enviar(dados) {
  console.log(dados);
}
</script>
