import { reactive } from 'vue';

export const useDocumentFilterSchema = () => {
  const extensionOptions = [
    {
      collectionName: 'Расширение',
      id: '1',
      title: '.pdf',
    },
    {
      collectionName: 'Расширение',
      id: '2',
      title: '.txt',
    },
    {
      collectionName: 'Расширение',
      id: '3',
      title: '.docx',
    },
  ];

  const schema = reactive([
    {
      name: 'documentName',
      label: 'Название документа',
      as: 'input',
      initialValue: '',
    },
    {
      name: 'documentAuthor',
      label: 'Автор документа',
      as: 'input',
      initialValue: '',
    },
    {
      name: 'documentExt',
      label: 'Расширение документа',
      as: 'select',
      placeholder: 'Выберите из списка',
      options: extensionOptions,
      initialValue: '',
    },
  ]);

  return {
    schema,
  };
};
