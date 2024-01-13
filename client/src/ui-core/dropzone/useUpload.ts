import { computed } from 'vue';

// const [dragoverClass, dragleaveClass] = ['ui-dropzone_dragover', 'ui-dropzone_dragleave'];

const checkFilesByAcceptedExt = (files: any, accept: any) => {
  const errors = files.map((file: any) => {
    const extFile = file.type?.split('/')[1];

    if (!accept.some((ext: any) => ext === extFile)) {
      return {
        errorMessage: 'Расширение не разрешено!',
        fileName: file.name,
        fileExt: extFile,
        fileType: file.type,
        fileSize: file.size,
      };
    }

    return null;
  });

  return errors.filter((err: any) => err);
};

const receiveFiles = (files: any, options: any) => {
  const {
    multiple,
    limit,
    emit,
    proxyFile,
    accept,
  } = options;

  const errors = checkFilesByAcceptedExt(files, accept);

  console.log('errors', errors);

  if (errors.length > 0) {
    emit('handle-upload-files-errors', errors);
  }

  if (!multiple && files.length > 1) {
    files = [files[0]];
  }

  if (multiple && files.length > limit) {
    files.length = limit;
  }

  proxyFile.value = files;
  emit('on-upload-files', files);
};

const cleanUpClasses = (event: any, dragleaveClass: string, dragoverClass: string) => {
  event.currentTarget.classList.add(dragleaveClass);
  event.currentTarget.classList.remove(dragoverClass);
};

export const useFileInput = ({
  props, emit, input, proxyFile,
}: { props: any, emit: any, input: any, proxyFile: any }) => {
  const {
    name, accept, multiple, limit,
  } = props;

  const fileId = computed(() => `file_id_${name}`);
  const acceptedFiles = computed(() => accept.map((ext: any) => `.${ext}`).join(','));

  const onChange = (event: any) => {
    const files = event ? Array.from(event.target.files) : [];

    input.value = null;

    receiveFiles(files, {
      multiple,
      limit,
      emit,
      proxyFile,
      accept,
    });
  };

  return { fileId, acceptedFiles, onChange };
};

export const useDropzone = ({
  props,
  emit,
  input,
  proxyFile,
}: { props: any, emit: any, input: any, proxyFile: any }) => {
  const { multiple, limit, accept } = props;
  const dragoverClass = 'ui-dropzone_dragover';
  const dragleaveClass = 'ui-dropzone_dragleave';

  const dragover = (event: any) => {
    event.preventDefault();
    if (!event.currentTarget.classList.contains(dragoverClass)) {
      event.currentTarget.classList.remove(dragleaveClass);
      event.currentTarget.classList.add(dragoverClass);
    }
  };

  const dragleave = (event: any) => {
    cleanUpClasses(event, dragleaveClass, dragoverClass);
  };

  const drop = (event: any) => {
    event.preventDefault();
    const files = event ? Array.from(event.dataTransfer.files) : [];

    input.value = null;

    receiveFiles(files, {
      multiple,
      limit,
      emit,
      proxyFile,
      accept,
    });
    cleanUpClasses(event, dragleaveClass, dragoverClass);
  };

  return { dragover, dragleave, drop };
};
