<template>
  <div>
    <component
      v-bind="{
        errorMessage,
        required,
        errors,
        ...attrs,
      }"
      :is="dict[attrs.as]"
      v-model:model="value"
      @update:model="change"
      @on-upload-files="(data: any) => $emit('on-upload-files', data)"
      @update:options="(data: any) => $emit('update-options', data)" />
  </div>
</template>

<script lang="ts" setup>
import { useField, useFormErrors } from 'vee-validate';
import type { Component } from 'vue';
import {
  defineAsyncComponent,
  onMounted,
  toRefs,
  watch,
  unref,
} from 'vue';
import { UiFieldStyles, UiField } from './field.types';

  type IUiFieldProps = {
      field: UiField,
      fieldStyles?: UiFieldStyles,
    }

  type IUiFieldEmits = {
    (e: 'update-options', value: { collectionName: string, title: string}): void;
    (e: 'change-field', value: any): void;
    (e: 'on-upload-files', value?: any): void;
  }

  type IUiFieldDictionary = {
    [name: string]: Component
  }

const props = defineProps<IUiFieldProps>();
const emit = defineEmits<IUiFieldEmits>();

const { field } = toRefs(props);

const {
  initialValue, ...attrs
} = field.value;

const { required } = attrs.rules ? attrs.rules.exclusiveTests : { required: undefined };

const dict: IUiFieldDictionary = {
  input: defineAsyncComponent(() => import('../input/UiInput.vue')),
  select: defineAsyncComponent(() => import('../select/UiSelect.vue')),
  dropzone: defineAsyncComponent(() => import('../dropzone/UiDropzone.vue')),
};

const {
  errorMessage, value, handleChange, setValue,
} = useField(attrs.name, attrs.rules, { initialValue: unref(initialValue) });

const errors = useFormErrors();

const change = (data: any) => {
  emit('change-field', data);
  handleChange(data);
};

onMounted(() => {
  setValue(unref(props.field.initialValue));
});

watch(() => props.field, () => {
  attrs.options = props.field.options;
  attrs.disabled = props.field.disabled;
  attrs.name = props.field.name;
  attrs.as = props.field.as;
  attrs.rules = props.field.rules;
  attrs.maskitoOptions = props.field.maskitoOptions;
}, { deep: true });

watch(() => props.field.initialValue, () => {
  setValue(unref(props.field.initialValue));
});

</script>

  <style scoped></style>
