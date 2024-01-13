import { ref } from 'vue';

export const useLoading = () => {
  const isLoading = ref(false);

  const on = () => { isLoading.value = true; };
  const off = () => { isLoading.value = false; };
  const toggle = () => { isLoading.value = !isLoading.value; };

  const loading = async (callback: () => Promise<void>) => {
    on();
    await callback();
    off();
  };

  return {
    isLoading,
    on,
    off,
    toggle,
    loading,
  };
};
