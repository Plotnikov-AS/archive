import { computed, ref } from 'vue';

export const useInput = (props: any, emit?: any) => {
  const inputValue = computed({
    get() {
      return props.model;
    },
    set(value) {
      emit('update:model', value);
    },
  });

  const isFocused = ref(false);

  const isActive = computed(() => !!props.model || props.model === 0 || !!isFocused.value);

  const onFocus = () => {
    isFocused.value = !isFocused.value;
  };

  return {
    inputValue,
    isActive,
    onFocus,
  };
};
