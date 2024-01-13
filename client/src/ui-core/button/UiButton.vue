<template>
  <button
    class="button button-default"
    :disabled="disabled"
    @click.capture="onClick">
    <slot :color="color">
      {{ label }}
    </slot>
  </button>
  <!-- v-bind="externalLinkAttrs" -->
</template>

<script lang="ts" setup>

type IUIButton = {
  label?: string;
  link?: string;
  disabled?: boolean;
  color?: string;
  styles?: string[];
};
const props = withDefaults(defineProps<IUIButton>(), {
  label: '',
  link: '',
  disabled: false,
});

// eslint-disable-next-line no-unused-vars, func-call-spacing
const emits = defineEmits<{(event: 'disabled-click', value: any): void; (event: 'click', value?: any): void;}>();

const onClick = ($event: Event) => {
  if (props.disabled) {
    $event.preventDefault();
    emits('disabled-click', $event);
  } else {
    emits('click', $event);
  }
};
</script>

<style lang="scss" scoped>
.button {
  font-weight: 500;
  font-style: normal;
  font-size: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  line-height: 20px;
  font-size: 14px;
  text-decoration: none;
  border: none;
  background: none;
  cursor: pointer;
  width: fit-content;
  height: fit-content;

  &.full-container {
    width: 100%;
  }

  &:disabled {
    cursor: not-allowed;
    border-color: #8A8C8D;
    background-color: white;
    color: #90909E;
    &:hover {
      border-color: #8A8C8D;
      background-color: #F5F5FB;
      color: #90909E;
    }
  }
}

.button-default {
  padding: 8px 36px;
  background-color: #9d1919;
  color: white;
  border-radius: 4px;
  border: 1px solid #9d1919;
}

.button-default:hover {
  background-color: #891515;
  border-color: #891515;
}

.button-default:focus-visible {
  outline: 1px solid #9d1919;
  border: 2px solid #9d1919;
}

.button-default:focus-visible .button-default:hover {
  background-color: none;
}
</style>
