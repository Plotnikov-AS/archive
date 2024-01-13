<template>
  <div
    :id="dropdownId"
    class="dropdown"
    tabindex="-1"
    @blur="isActive = false">
    <div
      v-if="disabled"
      class="dropdown_disabled" />
    <slot
      name="activator"
      :on="activatorHandlers"
      :is-active="isActive" />
    <ul
      v-show="isActive"
      class="dropdown__list"
      :class=" `dropdown__list_${dropdownId?.replace('.', '')}`">
      <li
        v-for="(item, index) in items"
        :id="item.id"
        :key="item.id"
        class="dropdown__item"
        :class="index"
        @click="onSelect(item)">
        <span class="dropdown__text">{{ item.title }}</span>
        <ui-icon
          v-show="selectedIndexList.find(selectedIndex => selectedIndex === item.id) !== undefined"
          name="icon_check"
          :color="'#19191D'" />
      </li>
      <li
        v-if="canAddNewOption"
        class="dropdown__item"
        @click="emits('addOption', inputValue.trim())">
        <span class="dropdown__text">{{ inputValue + ` ${'(Добавить новый)'}` }}</span>
        <ui-icon
          v-show="false"
          name="icon_check"
          :color="'#19191D'" />
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import {
  ref, computed, watch, Ref, onMounted,
} from 'vue';
import UiIcon from '../icon/UiIcon.vue';
import { IUiDropdownEmits, IUiDropdownProps } from './dropdown.types';
import { SelectOption } from '../select/select.types';

const props = withDefaults(defineProps<IUiDropdownProps>(), {
  selectedIndexList: () => [-1],
  items: (): SelectOption[] => [],
  collectionName: '',
  inputValue: '',
  disabled: false,
  isSelectMultiple: false,
  expandable: false,
});

// eslint-disable-next-line no-unused-vars

const emits = defineEmits<IUiDropdownEmits>();

const isActive = ref(false);

const activeDropdownItem = ref(-1);

const dropdownItems: Ref<HTMLCollection | undefined> = ref();

const canAddNewOption = computed(() => props.inputValue.trim().length > 0
  && !props.items.map((item: SelectOption) => item.title.toLowerCase())
    .includes(props.inputValue.toLowerCase().trim()) && props.expandable);

const onSelect = (item: SelectOption) => {
  if (!props.disabled) {
    emits('select', item);
    if (!props.isSelectMultiple) {
      isActive.value = false;
    }
  }
  if (dropdownItems.value) { (dropdownItems.value[0] as HTMLElement).scrollIntoView({ behavior: 'auto', block: 'nearest', inline: 'start' }); }
};

const getCurrentActiveOption = () => {
  if (dropdownItems.value) {
    Array.from(dropdownItems.value).forEach((dropdownItem) => {
      dropdownItem.classList.remove('dropdown__item_focused' ?? '');
    });

    (dropdownItems.value[activeDropdownItem.value] as HTMLElement).classList.add('dropdown__item_focused' ?? '');
    (dropdownItems.value[activeDropdownItem.value] as HTMLElement).scrollIntoView({ behavior: 'auto', block: 'nearest', inline: 'start' });
  }
};

const activatorHandlers = {
  click: (event: Event) => {
    if (!props.disabled && (event.target as HTMLInputElement).classList.value === 'input') {
      isActive.value = true;
    } else {
      activeDropdownItem.value = -1;
      isActive.value = !isActive.value;
    }
    if (isActive.value) {
      document.getElementById(`${props.dropdownId}123`)?.focus();
    }
  },
  focusout: (event: FocusEvent) => {
    if (!(event.relatedTarget as HTMLInputElement) || (event.relatedTarget as HTMLInputElement)?.id !== props.dropdownId) {
      isActive.value = false;
      activeDropdownItem.value = -1;
    } else {
      isActive.value = true;
    }
  },
  keydown: (event: KeyboardEvent) => {
    dropdownItems.value = document.querySelector(`.dropdown__list_${props.dropdownId?.replace('.', '')}` ?? '')?.children;

    if (dropdownItems.value) {
      if (event.key === 'ArrowDown') {
        activeDropdownItem.value = activeDropdownItem.value === dropdownItems.value.length - 1 ? 0 : activeDropdownItem.value += 1;

        getCurrentActiveOption();
      } else if (event.key === 'ArrowUp') {
        activeDropdownItem.value = activeDropdownItem.value <= 0 ? dropdownItems.value.length - 1 : activeDropdownItem.value -= 1;

        getCurrentActiveOption();
      } else {
        activeDropdownItem.value = -1;
      }
    }
  },
  keyup: (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      const activeItem = Array.from(dropdownItems.value ?? [])
        .filter((dropdownItem) => dropdownItem.classList.contains('dropdown__item_focused' ?? ''))[0] as HTMLElement;

      if (activeItem && dropdownItems.value && isActive.value) {
        if (activeItem.innerText.includes('(Добавить новый)') && props.inputValue.trim().length > 0 && props.expandable) {
          emits('addOption', activeItem.innerText.replace('(Добавить новый)', '').trim());
          (dropdownItems.value[0] as HTMLElement).scrollIntoView({ behavior: 'auto', block: 'nearest', inline: 'start' });
        } else {
          onSelect({
            id: props.items.filter((option) => option.title === activeItem.innerText.trim())[0]?.id ?? props.optionsLength,
            collectionName: props.collectionName,
            title: activeItem.innerText.trim(),
          });
        }
        Array.from(dropdownItems.value ?? []).forEach((dropdownItem) => {
          dropdownItem.classList.remove('dropdown__item_focused' ?? '');
        });
        isActive.value = false;
      } else if (props.inputValue.trim().length > 0 && props.expandable && dropdownItems.value && isActive.value) {
        if (!props.items.map((item: SelectOption) => item.title.toLowerCase()).includes(props.inputValue.toLowerCase().trim())) {
          emits('addOption', props.inputValue.trim());
          (dropdownItems.value[0] as HTMLElement).scrollIntoView({ behavior: 'auto', block: 'nearest', inline: 'start' });
        } else {
          onSelect({
            id: props.items.filter((option) => option.title === props.inputValue.trim())[0]?.id ?? props.optionsLength,
            collectionName: props.collectionName,
            title: props.inputValue.trim(),
          });
        }
      } else {
        isActive.value = !isActive.value;
      }
    }

    if (event.key === 'Escape') {
      isActive.value = false;
    }
  },
};

watch(() => props.items, () => {
  dropdownItems.value = document.querySelector(`.dropdown__list_${props.dropdownId?.replace('.', '')}` ?? '')?.children;
});

onMounted(() => {
  dropdownItems.value = document.querySelector(`.dropdown__list_${props.dropdownId?.replace('.', '')}` ?? '')?.children;
});

</script>

<style lang="scss" scoped>
.dropdown {
  position: relative;
  flex-shrink: 0;

  &__list {
    position: absolute;
    z-index: 10;
    top: calc(100% + 8px);
    left: 0;
    width: 100%;
    max-height: 300px;
    overflow: auto;
    padding: 8px;
    border: 1px solid #D2D2D6;
    border-radius: 10px;
    background-color: white;
    outline: none;
  }

  &__item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px 24px;
    border-radius: 8px;
    background-color: white;
    cursor: pointer;

    &:hover, &:focus, &:focus-within {
      background-color: #F7F7FA;
    }
    &_focused{
      background-color: #F7F7FA;
    }
  }

  &__item_focused{
    background-color: #F7F7FA;
  }

  &__text {
    font-size: 14px;
    line-height: 20px;
    font-weight: 400;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &_disabled {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #EDEDF0;
    z-index: 2;
    opacity: 0.5;
  }
}

</style>
