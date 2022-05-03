<template>
  <q-input
    class="full-width"
    standout="bg-primary text-white"
    :type="isPassword ? 'password' : 'text'"
    clearable
  >
    <template style="height: 100%;" v-slot:append>
      <div class="self-center no-outline" tabindex="1"></div>
      <q-icon
        :name="isPassword ? 'visibility_off' : 'visibility'"
        class="cursor-pointer q-pr-sm"
        @click="isPassword = !isPassword"
      />
    </template>
  </q-input>
</template>

<script>
import { ref } from 'vue';

export default {
  name: "InputPassword",
  setup() {
    return {
      isPassword: ref(true),
    };
  },
};
</script>
