<template>
  <label class="ui-input-big">
    <span
      v-if="label"
      class="ui-input-big__label">
      {{ label }}
      <span
        v-if="$attrs.required"
        class="ui-input-big__required">*</span>
    </span>

    <div class="ui-input-big__wrapper">
      <input
        v-bind="inputAttrs"
        class="ui-input-big__input"
        :class="{'ui-input-big__input--error' : errorMessage}"
        :placeholder="placeholder"
        :value="props.model"
        :type="inputType"
        :disabled="disabled"
        @input="$emit('update:model', ($event.target as HTMLInputElement).value !== '' ? ($event.target as HTMLInputElement).value : null)"
        @focus="onFocus"
        @blur="onFocus">
    </div>

    <span
      v-show="errorMessage"
      class="ui-input-big__error">
      {{ errorMessage }}
    </span>
  </label>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useInput } from './useInput';

type IInputBigProps = {
  model?: string | number,
  label?: string,
  type?: string,
  placeholder?: string,
  errorMessage?: string,
  disabled?: boolean,
}

const props = withDefaults(defineProps<IInputBigProps>(), {
  model: '',
  type: 'text',
  label: '',
  placeholder: '',
  errorMessage: '',
  inputBigStyles: undefined,
  tooltip: undefined,
});

// eslint-disable-next-line no-unused-vars
const emits = defineEmits<{(event: 'update:model', value: any): void; (event: 'copy', value: any): void;}>();

const { onFocus } = useInput(props, emits);

const inputType = ref(props.type);

const inputAttrs = ref({
  type: inputType,
  modelValue: props.model,
  disabled: props.disabled,
});

</script>

  <style lang="scss" scoped>
.ui-input-big {
  position: relative;
  display: flex;
  flex-direction: column;
  width: auto;
  height: auto;
  padding-bottom: 16px;

  &__label {
    font-size: 14px;
    line-height: 20px;
    font-weight: 700;
    margin-bottom: 8px;
    color: #90909e;
  }

  &__required {
    color: #B9181D;
  }

  &__tooltip-icon{
    margin-left: 12px
  }

  &__tooltip-text{
    font-size: 14px;
    line-height: 20px;
    font-weight: 400;
    padding: 8px;
  }

  &__wrapper {
    position: relative;
    display: flex;
    align-items: center;
  }

  &__icon {
    position: absolute;
    right: 24px;
    cursor: pointer;
  }

  &__input {
    font-size: 14px;
    line-height: 20px;
    font-weight: 400;
    width: 100%;
    padding: 14px 20px;
    border: 1px solid #E1E1E3;
    border-radius: 6px;
    outline: none;
    background-color: white;
    color: #19191D;

    &:disabled {
      color: #787885;
      background: #F6F6F7;
    }

    &:hover,
    &:focus-within {
      border-color: #B4B4BB;
    }

    &--error {
      border-color: #F6655A;
    }

    &::placeholder {
      color: #B4B4BB;
    }

    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }

    &[type='number'] {
      -moz-appearance: textfield;
    }
  }

  &__error {
    font-size: 12px;
    line-height: 16px;
    font-weight: 400;
    position: absolute;
    bottom: -10px;
    left: 0;
    color: #F6655A;
    min-height: 24px;
  }
}

  </style>
