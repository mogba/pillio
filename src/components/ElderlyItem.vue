<template>
  <q-item-section avatar>
    <q-icon name="face" size="md" color="grey" />
  </q-item-section>

  <q-item-section>
    <q-item-label
      style="overflow: hidden; text-overflow: ellipsis;"
    >
      {{ elderlyRef.name }}
    </q-item-label>
  </q-item-section>
  <slot />
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  elderly: {
    default: {},
    id: Number,
    name: String,
  }
});

const elderlyRef = ref(props.elderly.id ? props.elderly : {});
</script>
