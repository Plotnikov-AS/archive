import { debounce } from 'lodash';
import { Ref, computed, ref } from 'vue';

export const useApplicationFilters = (emits: {
    (event: 'submitFilters', filters: any): void;
    (event: 'resetFilters'): void;
  }) => {
  const currentFilters: Ref<any> = ref({
    name: undefined,
    author: undefined,
    extension: undefined,
  });

  const notEmptyFilters = computed(() => {
    const currentFiltersKeys = Object.keys(currentFilters.value);

    return currentFiltersKeys.filter((key) => currentFilters.value[key] !== null
          && currentFilters.value[key] !== undefined
          && currentFilters.value[key] !== ''
          && (currentFilters.value[key]?.length ?? 0) !== 0);
  });

  const activeFilterCount = computed(() => notEmptyFilters.value?.length ?? 0);

  const runFilterSearch = debounce(() => {
    emits('submitFilters', currentFilters.value);
  }, 500);

  const changeField = async (value: unknown, fieldName: any, validate: () => any) => {
    const validateData = await validate();

    currentFilters.value[fieldName] = value;

    if (!validateData.valid) {
      return;
    }

    runFilterSearch();
  };

  const dropCurrentFilters = () => {
    currentFilters.value = {
      addressOrNumberGaui: undefined,
      type: undefined,
      status: [],
      statusAISUID: [],
      responsible: null,
      purposeOfUse: undefined,
      square: {
        from: null,
        to: null,
      },
      purpose: [],
      building: undefined,
    };
  };

  const onReset = () => {
    emits('resetFilters');

    dropCurrentFilters();
  };

  return {
    currentFilters,
    activeFilterCount,
    changeField,
    dropCurrentFilters,
    onReset,
  };
};
