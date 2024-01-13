export type ArchiveDocument = {
    _id: string;
    documentName: string;
    documentExtension: string;
    documentDescription: string;
    documentSize: number;
    documentAuthor: string;
    number: number;
}

export type CreateDocumentDto = {
    name: string;
    extension: string;
    size: number;
    author: string;
    description: string;
    regDate: Date,
    number: number;
}

export interface DeleteDocumentDto {
    _id: string;
}

export interface DownloadDocumentDto extends DeleteDocumentDto { }
