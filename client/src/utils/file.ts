export const mime2type = (mime: string) => {
  const mimeDict = {
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': 'xlsx',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'docx',
    'application/msword': 'doc',
    'application/pdf': 'pdf',
    'text/plain': 'txt',
  };

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const type = mimeDict[mime];

  if (!type) {
    console.error(`Неизвестный mime "${mime}"`);

    return '-';
  }

  return type;
};

export const type2color = (type: string) => {
  const colorDict = {
    xlsx: '#87C289',
    docx: '#5F8BFF',
    doc: '#5F8BFF',
    pdf: '#891515',
    webp: '#D2D2D6',
    png: '#D2D2D6',
    jpg: '#D2D2D6',
    jpeg: '#D2D2D6',
    txt: '#90909e',
  };
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
  const color = colorDict[type];

  if (!color) {
    console.error(`Неизвестный тип "${type}"`);

    return '#000';
  }

  return color;
};

export const formatFileSize = (bytes = 0, decimals = 0) => {
  if (bytes === 0) return '0 B';

  const k = 1024;
  const dm = decimals || 2;
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / k ** i).toFixed(dm))} ${sizes[i]}`;
};

export const downloadFile = async (uri: string, filename: string) => {
  const urlObj = new URL(uri);

  urlObj.protocol = import.meta.env.VITE_MODE === 'test' ? 'http:' : 'https:';
  const res = await fetch(urlObj.href);
  const blob = await res.blob();

  // saveAs(blob, filename);
  const fileURL = window.URL.createObjectURL(blob);
  const link = document.createElement('a');

  link.href = fileURL;
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const dataURLtoFile = (dataUrl: any, fileName: any) => {
  const arr = dataUrl.split(','); const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new File([u8arr], fileName, { type: mime });
};
