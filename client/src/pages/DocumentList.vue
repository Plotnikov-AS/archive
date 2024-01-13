<template>
  <div class="document-list-container">
    <div classs="document-list__sidebar">
      <document-filters
        :filters="filterSchema"
        @submit-filters="submitFilters" />
      <ui-button
        class="create-document-button"
        @click.prevent="openModal">
        Добавить новый документ
      </ui-button>
    </div>
    <div class="card-list">
      <document-card-list
        :documents="[mockDocument, mockDocument2, mockDocument3, mockDocument, mockDocument2, mockDocument3]"
        @edit-document="editDocument"
        @delete-document="deleteDocument"
        @download-document="downloadDocument" />
    </div>
  </div>
  <document-edit-modal
    v-if="document"
    :document="document"
    :model-value="isShownEdit"
    @edit-document="updateDocument"
    @close-modal="closeModalEdit" />
  <document-create-modal
    :model-value="isShown"
    @create-document="createNewDocument"
    @close-modal="closeModal" />
</template>

<script lang="ts" setup>
import { Ref, onMounted, ref } from 'vue';
import * as yup from 'yup';
import UiButton from '../ui-core/button/UiButton.vue';
import { ArchiveDocument } from '../types/document/document.types';
import DocumentFilters from '../components/document-filters/DocumentFilters.vue';
import DocumentCreateModal from '../components/document-create-modal/DocumentCreateModal.vue';
import DocumentEditModal from '../components/document-edit-modal/DocumentEditModal.vue';
import DocumentCardList from '../components/document-card-list/DocumentCardList.vue';
import { useDocumentFilterSchema } from '../components/document-filters/useDocumentFilters';
import archiveService from '../services/archive-service';
import { useModal } from '../utils/modal';

const loading: Ref<boolean> = ref(false);
const pagination: Ref<any> = ref({ limit: 10, skip: 0, total: 0 });
const currentPage = ref(1);

const mockDocument: ArchiveDocument = {
  _id: '1123',
  number: 1123,
  documentName: 'Test Document name',
  documentAuthor: 'Test Author3',
  documentExtension: 'pdf',
  documentSize: 123453,
  documentDescription: 'desc',
};

const mockDocument2: ArchiveDocument = {
  _id: '11234',
  number: 11234,
  documentName: 'Test Document Name',
  documentAuthor: 'Test Author2',
  documentExtension: 'docx',
  documentSize: 1234534,
  documentDescription: 'desc',
};

const mockDocument3: ArchiveDocument = {
  _id: '112345',
  number: 112345,
  documentName: 'Test Document Name TXT',
  documentAuthor: 'Test Author1',
  documentExtension: 'txt',
  documentSize: 12345,
  documentDescription: 'desc',
};

const document = ref();

const activeFilters: Ref<any> = ref({
  name: null,
  author: null,
  extension: null,
});

const paginationParams: Ref<any> = ref({
  limit: 10,
  skip: 0,
});

const { schema: filterSchema } = useDocumentFilterSchema();
const { isShown, open: openModal, close: closeModal } = useModal();
const { isShown: isShownEdit, open: openEditModal, close: closeEditModal } = useModal();
const validationSchema = yup.object({});

const getList = async () => {
};

const submitFilters = (payload: any) => {
  console.log(payload);
};

const createNewDocument = async (payload: any) => {
  console.log(payload);
  const newDocument = await archiveService.saveDocument({
    name: payload.documentName,
    author: payload.documentAuthor,
    extension: payload.documentExtension,
    size: payload.attachments[0].size,
    description: payload.documentDescription,
    regDate: new Date(),
    number: payload.number,
  });

  console.log(newDocument);
};

const closeModalEdit = () => {
  document.value = null;
  closeEditModal();
};

const editDocument = (payload: ArchiveDocument) => {
  document.value = null;
  document.value = payload;
  openEditModal();
};

const updateDocument = (payload: ArchiveDocument) => {
  console.log(payload);
  closeEditModal();
};

const deleteDocument = (id: string) => {
  console.log(id);
};

const downloadDocument = (id: string) => {
  console.log(id);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const refetch = async (payload: any) => {
  loading.value = true;
  paginationParams.value.skip = payload.offset;
  paginationParams.value.limit = payload.limit;
  currentPage.value = payload.page;
  await getList();
  loading.value = false;
};

const resetFilter = async () => {
  loading.value = true;
  paginationParams.value.skip = 0;
  activeFilters.value = null;
  await getList();
  loading.value = false;
};

onMounted(async () => {
  loading.value = true;
  await getList();
  loading.value = false;
});

</script>

<style lang="scss" scoped>
.document-list-container{
  display: flex;
  padding-top: 48px;
}

.card-list {
  padding-left: 32px;
  width: 100%;
}

.create-document-button{
  margin-top: 32px;
  width: 100%;
}
</style>
