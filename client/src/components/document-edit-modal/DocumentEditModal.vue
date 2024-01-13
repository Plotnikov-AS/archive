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
        :key="field.initialValue "
        class="modal__field"
        :field="field" />
      <div class="modal__buttons">
        <ui-button @click.prevent="handleSubmit(editDocument)">
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
import { ArchiveDocument } from '../../types/document/document.types';

  type DocumentCreateModalProps = {
      modelValue: boolean;
      document: ArchiveDocument
  }

  type DocumentCreateModalEmits = {
    (event: 'closeModal'): void;
    (event: 'editDocument', document: ArchiveDocument): void;
    (event: 'update:modelValue', value: boolean): void;
  }

const props = defineProps<DocumentCreateModalProps>();
const emits = defineEmits<DocumentCreateModalEmits>();

const createDocumentSchema = reactive([
{
    label: 'Номер документа',
    name: 'documentNumber',
    placeholder: 'Введите значение',
    as: 'input',
    disabled: true,
    initialValue: props.document.number,
  },
  {
    label: 'Название документа',
    name: 'documentName',
    placeholder: 'Введите значение',
    as: 'input',
    initialValue: props.document.documentName,
  },
  {
    label: 'Автор',
    name: 'documentAuthor',
    placeholder: 'Укажите автора',
    as: 'input',
    initialValue: props.document.documentAuthor,
  },
  {
    label: 'Описание',
    name: 'documentDescription',
    placeholder: 'Описание документа',
    as: 'input',
    initialValue: props.document.documentDescription,
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

const editDocument = (uploadFiles: any) => {
  const updatedDocument: ArchiveDocument = {
    _id: props.document._id,
    documentExtension: props.document.documentExtension,
    documentAuthor: uploadFiles.documentAuthor,
    documentSize: props.document.documentSize,
    documentName: uploadFiles.documentName,
    documentDescription: uploadFiles.documentDescription,
    number: props.document.number,
  };

  emits('editDocument', updatedDocument);
};

</script>

  <style lang="scss" scoped>
  .document-create-modal {
    min-width: 400px;
    min-height: 400px;
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
    padding-top: 24px;
    display: flex;
    justify-content: flex-end;
  }
  </style>
