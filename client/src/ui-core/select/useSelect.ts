import { Ref, computed, ref } from 'vue';
import { IUiSelectEmits, SelectOption } from './select.types';

const useSelect = (props: any, isLoading: Ref<boolean>, emits: IUiSelectEmits) => {
  const selectedIndex = computed(() => {
    if (props.model === null) {
      return props.options
        .findIndex((item: any) => (item.title ? item.title === props.defaultValue : item === props.defaultValue));
    }

    const selected = props.options
      .findIndex((item: any) => (item.title ? item.title === props.model?.title : item === props.model));

    return props.options[selected]?.id;
  });

  const inputValue = ref(props.model?.title);

  const filteredDropdownItems = ref(props.options);

  const dropdownItems = computed(() => props.options.map((option: any) => option));

  const filterDropdownItems = (value: string) => {
    inputValue.value = value;

    filteredDropdownItems.value = props.options.filter(
      (dropdownItem: any) => dropdownItem.title.toLocaleLowerCase().includes(value.toLowerCase().trim()),
    );

    // if (!filteredDropdownItems.value.map((item: SelectOption) => item.title).includes(inputValue.value)) {
    //   filteredDropdownItems.value.push({ id: props.options.length, title: inputValue });
    // }
  };

  const addOption = (item: string) => {
    if (!props.options.map((collectionItem: SelectOption) => collectionItem.title).includes(item)) {
      isLoading.value = true;
      emits('update:options', { collectionName: props.options[0].collectionName, title: item });
    }
    inputValue.value = '';
  };

  const onSelect = (item: SelectOption) => {
    emits('update:model', { id: item.id, title: item.title, collectionName: item.collectionName });
    inputValue.value = item.title;
    filteredDropdownItems.value = props.options;
  };

  return {
    selectedIndex,
    inputValue,
    dropdownItems,
    filteredDropdownItems,
    filterDropdownItems,
    onSelect,
    addOption,
  };
};

export {
  useSelect,
};
