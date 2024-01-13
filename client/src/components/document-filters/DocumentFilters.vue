<template>
  <ui-form
    v-slot="{ handleReset, validate }"
    class="document-filters">
    <div class="document-filters__wrapper">
      <div class="document-filters__filter">
        <ui-field
          :field="filters[0]"
          @change-field="(value: any) => changeField(value, 'name', validate)" />
      </div>
      <div class="document-filters__filter">
        <ui-field
          :field="filters[1]"
          @change-field="(value: any) => changeField(value, 'author', validate)" />
      </div>
      <div class="document-filters__filter">
        <ui-field
          :field="filters[2]"
          @change-field="(value: any) => changeField(value, 'extension', validate)" />
      </div>
    </div>
    <div class="document-filters__resultBtns">
      <ui-button
        @click.prevent="handleReset(onReset())">
        Сброс фильтров
      </ui-button>
    </div>
  </ui-form>
</template>

<script lang="ts" setup>
import UiField from '../../ui-core/field/UiField.vue';
import UiForm from '../../ui-core/UiForm.vue';
import UiButton from '../../ui-core/button/UiButton.vue';
import { useApplicationFilters } from './filter';

type DocumentFiltersProps = {
  filters: any,
}

type IBaseDocumentFiltersEmits = {
    (event: 'submitFilters', filters: any): void;
    (event: 'resetFilters'): void;
}

defineProps<DocumentFiltersProps>();
const emits = defineEmits<IBaseDocumentFiltersEmits>();

const { changeField, onReset } = useApplicationFilters(emits);

</script>

<style lang="scss" scoped>

.document-filters {
  width: 350px;
  padding: 16px;
  background-color: white;
  border: 2px solid #E5E7E8!important;
  border-radius: 8px;
  box-shadow: 0px 1px 12px 1px rgba(0, 0, 0, 0.1);
  &__section {
    &:first-of-type {
      border-bottom: 2px solid #E5E7E8;
    }
  }

  &-first-input {
    background-color: white;
    border-radius: 8px;
    position: relative;
  }

  &__section-span {
    color: #31315B;
    font-size: 16px;
    font-weight: 600;
    text-transform: uppercase;
  }

  &__block {
    display: flex;
    padding-top: 8px;
  }

  &__span {
  font-weight: 400;
    color: #90909E;
  }

  &__resultBtns {
    display: flex;
    justify-content: center;
    padding-top: 12px;
  }
}
</style>
