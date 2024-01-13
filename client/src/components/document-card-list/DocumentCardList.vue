<template>
  <document-card
    v-for="document in documents"
    :key="document._id"
    :document="document"
    @delete-document="emits('deleteDocument', document._id)"
    @download-document="emits('downloadDocument', document._id)"
    @edit-document="emits('editDocument', document)" />
</template>

<script lang="ts" setup>
import { ArchiveDocument } from '../../types/document/document.types';
import DocumentCard from '../document-card/DocumentCard.vue';

type DocumentCardListProps = {
    documents: ArchiveDocument[]
}

type DocumentCardListEmits = {
    (event: 'deleteDocument', id: string): void;
    (event: 'downloadDocument', id: string): void;
    (event: 'editDocument', document: ArchiveDocument): void;
}

defineProps<DocumentCardListProps>();
const emits = defineEmits<DocumentCardListEmits>();
</script>

<style lang="scss" scoped>
</style>
