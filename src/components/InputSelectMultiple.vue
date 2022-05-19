<template>
  <div class="col-xs-12 col-md-12">
    <q-select
      standout="bg-primary text-white"
      popup-content-class="rounded-borders limit-visible-area scroll"
      multiple
      use-chips
      :label="label"
      :options="optionsRef"
      v-model="valuesRef"
    >
      <template v-slot:pop></template>
      <template v-slot:option="{ itemProps, opt, selected, toggleOption }">
        <q-item v-bind="itemProps">
          <q-item-section side>
            <q-checkbox v-if="opt.disable" color="grey" toggle-indeterminate :model-value="null" />
            <q-checkbox v-else :model-value="selected" @update:model-value="toggleOption(opt)" />
          </q-item-section>
          <q-item-section>
            <q-item-label v-html="opt.label" />
          </q-item-section>
        </q-item>
      </template>
    </q-select>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  name: "InputSelectMultiple",
  props: {
    label: String,
    options: Array,
    values: Array,
  },
  setup(props) {
    const optionsRef = ref(props.options);
    const valuesRef = ref(props.values);

    return {
      optionsRef,
      valuesRef,
    };
  },
}
</script>