<template>
  <vee-form
    ref="form"
    v-slot="{ handleSubmit, handleReset, resetForm, errors, validate }"
    :validation-schema="schema"
    :initial-values="initialValues">
    <slot
      :reset-form="resetForm"
      :handle-submit="handleSubmit"
      :handle-reset="handleReset"
      :validate="validate"
      :errors="errors" />
  </vee-form>
</template>

<script lang="ts">
import { Form as VeeForm } from 'vee-validate';
import { defineComponent, ref } from 'vue';

export default defineComponent({
  components: {
    VeeForm,
  },
  props: {
    schema: {
      type: Object,
      default: () => null,
    },
    initialValues: {
      type: Object,
      default: () => null,
    },
  },
  setup() {
    const form = ref(null);

    // ...
    return {
      form,
    };
  },
});

</script>

  <style scoped></style>
