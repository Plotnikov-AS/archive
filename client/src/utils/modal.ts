import { ref } from 'vue';

export const useModal = () => {
  const isShown = ref(false);

  const open = () => { isShown.value = true; };
  const close = () => { isShown.value = false; };
  const toggle = () => { isShown.value = !isShown.value; };

  return {
    isShown,
    open,
    close,
    toggle,
  };
};
