<template>
  <archive-modal
    v-model="isShown"
    :close="closeModalEvent">
    <ui-form
      v-slot="{ handleSubmit }"
      :schema="validationSchema"
      class="document-create-modal">
      <ui-field
        v-for="field in createDocumentSchema"
        :key="field.name"
        class="modal__field"
        :field="field" />
      <div class="modal__buttons">
        <ui-button @click.prevent="handleSubmit(createNewDocument)">
          Подтвердить
        </ui-button>
      </div>
    </ui-form>
  </archive-modal>
</template>

<script lang="ts" setup>
import { computed, reactive } from 'vue';
import * as yup from 'yup';
import UiForm from '../../ui-core/UiForm.vue';
import UiField from '../../ui-core/field/UiField.vue';
import UiButton from '../../ui-core/button/UiButton.vue';

type DocumentCreateModalProps = {
    modelValue: boolean;
}

type DocumentCreateModalEmits = {
  (event: 'closeModal'): void;
  (event: 'createDocument', document: File[]): void;
  (event: 'update:modelValue', value: boolean): void;
}

const props = defineProps<DocumentCreateModalProps>();
const emits = defineEmits<DocumentCreateModalEmits>();

const createDocumentSchema = reactive([
  {
    label: 'Название документа',
    name: 'documentName',
    placeholder: 'Введите значение',
    as: 'input',
    initialValue: '',
  },
  {
    label: 'Автор',
    name: 'documentAuthor',
    placeholder: 'Укажите автора',
    as: 'input',
    initialValue: '',
  },
  {
    label: 'Описание документа',
    name: 'documentDescription',
    placeholder: 'Краткая информация',
    as: 'input',
    initialValue: '',
  },
  {
    label: 'Номер документа',
    name: 'documentNumber',
    placeholder: 'Укажите номер',
    as: 'input',
    initialValue: '',
  },
  {
    label: '',
    name: 'attachments',
    placeholder: 'Прикрепить документы',
    accept: ['png', 'jpeg', 'pdf', 'xlsx', 'csv', 'doc', 'docx'],
    as: 'dropzone',
    multiple: false,
    initialValue: [],
  },
]);

const validationSchema = yup.object({
  documentName: yup.string(),
  documentAuthor: yup.string(),
  attachments: yup.array(),
});

const isShown = computed({
  get() {
    return props.modelValue;
  },
  set(value: boolean) {
    emits('update:modelValue', value);
  },
});

const closeModalEvent = () => {
  emits('closeModal');
};

const createNewDocument = (uploadFiles: any) => {
  emits('createDocument', uploadFiles);
  closeModalEvent();
};

</script>

<style lang="scss" scoped>
.document-create-modal {
  min-width: 600px;
  min-height: 500px;
    padding: 32px;
    box-sizing: border-box;
    background-color: #fff;
    border-radius: 8px;
    border: 2px solid #E5E7E8;
    &__title {
      font-size: 24px;
      padding-bottom: 16px;
      border-bottom: 2px solid #E5E7E8;
    }
}

.modal__field{
  padding-top: 24px;
}

.modal__buttons{
  display: flex;
  justify-content: flex-end;
}
</style>
