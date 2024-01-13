<template>
  <div class="document-card">
    <div class="document-card__container">
      <div class="document-info">
        <div
          class="document-info__type"
          :style="{ background: type2color(document.documentExtension)}">
          {{ document.documentExtension }}
        </div>
        <div class="document-info__block">
          <div class="document-info__name">
            {{ document.documentName }}
          </div>
          <div class="attachment-info__size">
            {{ formatFileSize(document.documentSize) }}
          </div>
        </div>
      </div>
      <div class="document-card__buttons">
        <div
          class="buttons__button"
          @click.prevent="emits('editDocument')">
          <ui-icon
            name="icon_edit"
            color="#90909E"
            :width="30"
            :height="30" />
        </div>
        <div
          class="buttons__button"
          @click.prevent="emits('downloadDocument')">
          <ui-icon
            name="icon_download"
            color="#90909E"
            :width="26"
            :height="26" />
        </div>
        <div
          class="buttons__button"
          @click.prevent="emits('deleteDocument')">
          <ui-icon
            name="icon_trash"
            color="#90909E"
            :width="36"
            :height="36" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ArchiveDocument } from '../../types/document/document.types';
import UiIcon from '../../ui-core/icon/UiIcon.vue';
import { type2color, formatFileSize } from '../../utils/file';

type DocumentCardProps = {
  document: ArchiveDocument;
}

type DocumentCardEmits = {
  (event: 'editDocument'): void;
  (event: 'deleteDocument'): void;
  (event: 'downloadDocument'): void;
}

defineProps<DocumentCardProps>();
const emits = defineEmits<DocumentCardEmits>();

</script>

<style lang="scss" scoped>

.document-card {
  margin-top: 20px;
  height: 86px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  border-radius: 6px;
  box-shadow: 0px 2px 21px 1px rgba(0, 0, 0, 0.10);
  padding: 24px;
}

.document-card:first-child{
  margin-top: 0px;
}

.document-info{
  display: flex;
}

.document-info__block{
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 16px;
}

.document-info__type {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 48px;
  width: 48px;
  border-radius: 6px;
  color: white;
  overflow: hidden;
}

.document-card__container{
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.document-card__buttons{
  display: flex;
  align-items: center;
  column-gap: 16px;
}

.buttons__button{
  cursor: pointer;
}
</style>
