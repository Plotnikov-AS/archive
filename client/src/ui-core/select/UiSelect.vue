<template>
  <div class="ui-select">
    <span class="ui-select__label">
      {{ label }}
    </span>
    <ui-dropdown
      v-bind="dropdownAttrs"
      :selected-index-list="[selectedIndex]"
      @add-option="addOption"
      @select="onSelect">
      <template #activator="{ on, isActive }">
        <label
          class="ui-select__select"
          :class="{'ui-select__select--error': errorMessage}"
          :tabindex="!filterable ? '0' : ''"
          v-on="!isLoading ? on : {}"
          @click.stop>
          <div
            v-if="!filterable"
            class="ui-select__select__value">
            {{ model?.title || placeholder }}
          </div>
          <input
            v-if="filterable"
            :id="name + '123'"
            data-testid="uiSelectInput"
            tabindex="0"
            :value="inputValue"
            :disabled="isLoading"
            class="ui-select__select__input"
            :class="{'ui-select__select__input_disabled': isLoading}"
            autocomplete="off"
            @input="filterDropdownItems(($event.target as HTMLInputElement).value)">
          <ui-icon
            :name="isActive ? 'chevron-up' : 'chevron-down'"
            :color="'#19191D'" />
        </label>
      </template>
    </ui-dropdown>

    <span
      v-show="errorMessage"
      class="ui-select__error">
      {{ errorMessage }}
    </span>
  </div>
</template>

<script lang="ts" setup>
import { watch, ref, toRaw } from 'vue';
import { useSelect } from './useSelect';
import UiIcon from '../icon/UiIcon.vue';
import UiDropdown from '../dropdownExpandable/UiDropdownExpandable.vue';
import { IUiSelectEmits, IUiSelectProps, SelectOption } from './select.types';

const props = withDefaults(defineProps<IUiSelectProps>(), {
  model: '',
  errorMessage: '',
  label: '',
  name: '',
  placeholder: 'Выберите из списка',
  options: (): SelectOption[] => [],
  inset: false,
  disabled: false,
  filterable: false,
  expandable: false,
  selectStyles: undefined,
  tooltip: undefined,
});

// eslint-disable-next-line no-unused-vars
const emits = defineEmits<IUiSelectEmits>();

const isLoading = ref(false);

const {
  selectedIndex, inputValue, dropdownItems, filteredDropdownItems, onSelect, filterDropdownItems, addOption,
} = useSelect(props, isLoading, emits);

const dropdownAttrs = ref({
  dropdownId: props.name,
  items: props.filterable ? filteredDropdownItems : dropdownItems,
  collectionName: props.options[0]?.collectionName ?? '',
  optionsLength: props.options.length,
  disabled: props.disabled,
  inputValue,
  expandable: props.expandable,
});

watch(() => props.options, () => {
  inputValue.value = '';

  const options = toRaw(props.options);

  emits('update:model', {
    id: props.options[props.options.length - 1].id,
    collectionName: props.options[props.options.length - 1].collectionName,
    title: props.options[props.options.length - 1].title,
  });

  filteredDropdownItems.value = options.sort((a, b) => {
    if (a.title < b.title) { return -1; }
    if (a.title > b.title) { return 1; }

    return 0;
  });
}, { deep: true });

watch(() => props.model, () => {
  const inputElement = document.activeElement as HTMLInputElement;

  inputValue.value = props.model.title;
  isLoading.value = false;
  inputElement.blur();
}, { deep: true });

</script>

<style lang="scss" scoped>
.ui-select {
  position: relative;
  display: flex;
  flex-direction: column;
  width: auto;
  height: auto;
  padding-bottom: 16px;

  &__tooltip-icon{
    margin-left: 12px
  }

  &__tooltip-text{
    font-size: 14px;
    line-height: 20px;
    font-weight: 400;
    padding: 8px;
  }

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

  &__select {
    font-size: 14px;
    line-height: 20px;
    font-weight: 400;
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 20px;
    border: 1px solid #E1E1E3;
    border-radius: 6px;
    cursor: pointer;
    color: #19191D;
    background-color: white;

    &--error {
      border-color: #F6655A;
    }

    &__input {
      font-size: 14px;
      line-height: 20px;
      font-weight: 400;
      border-radius: 10px;
      outline: none;
      background-color: white;
      width: 100%;
      border: none;
      &_disabled {
        background-color: rgb(226 232 240);
        box-shadow: 0 0 0 0 rgba(0, 0, 0, 1);
        transform: scale(1);
        animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
      }
    }

    &__value {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  &__error {
    font-size: 12px;
    line-height: 16px;
    font-weight: 400;
    position: absolute;
    bottom: 0;
    left: 0;
    color: #F6655A;
    min-height: 24px;
  }
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: .5;
  }
}

</style>
