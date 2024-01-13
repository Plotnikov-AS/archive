<template>
  <div
    v-if="label"
    class="ui-dropzone__label">
    {{ label }}
  </div>
  <div
    class="ui-dropzone"
    v-bind="$attrs"
    @dragover="dragover"
    @dragleave="dragleave"
    @drop="drop">
    <input
      :id="fileId"
      ref="input"
      type="file"
      :name="name"
      :multiple="multiple"
      :disabled="disabled"
      class="ui-dropzone__file-input"
      :accept="acceptedFiles"
      @change="onChange">

    <label
      :for="fileId"
      class="ui-dropzone__label">
      {{ placeholder }}
    </label>
    <ui-preloader v-if="loading" />
    <span
      v-show="errorMessage"
      class="ui-dropzone__error">
      {{ errorMessage }}
    </span>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useDropzone, useFileInput } from './useUpload';
import UiPreloader from '../preloader/UiPreloader.vue';

const props = withDefaults(defineProps<{
  model?: any,
  label?: string,
  name?: string,
  placeholder?: string,
  multiple?: boolean,
  disabled?: boolean,
  loading?: boolean,
  accept?: string[],
  limit?: number,
  errorMessage?: string,
}>(), {
  model: () => [],
  label: '',
  name: 'default-dropzone',
  placeholder: 'Прикрепить документы',
  disabled: false,
  loading: false,
  accept: () => ['png', 'jpg'],
  limit: 4,
  errorMessage: '',
});

// eslint-disable-next-line vue/define-emits-declaration
const emit = defineEmits(['update:model', 'on-upload-files']);
const input = ref(null);
const proxyFile = computed({
  get: () => props.model,
  set: (value) => emit('update:model', value),
});
const data = {
  props, emit, input, proxyFile, 
};

const { fileId, acceptedFiles, onChange } = useFileInput(data);
const { dragover, dragleave, drop } = useDropzone(data);

</script>

<style lang="scss" scoped>
.ui-dropzone {
  position: relative;
  margin-bottom: 32px;
  background: #FEF2F1;
  border: 1.5px dashed #FEE8E7;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.3s ease all;
  &:hover {
    border-color: #F44336;
  }
}

.ui-dropzone_dragover {
  border-color: #F44336;
}

.ui-dropzone_dragleave {
  border-color: #FCCBC8;
}

.ui-dropzone__file-input {
  display: none;
}

.ui-dropzone__label {
  cursor: pointer;
  display: block;
  width: 100%;
  text-align: center;
  font-size: 14px;
  line-height: 20px;
  color: #B9181D;
  padding: 38px;
}

.ui-dropzone__error {
  position: absolute;
  bottom: -32px;
  left: 0;
  color: #F6655A;
  min-height: 24px;
}

</style>
