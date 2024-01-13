import axiosInstance, { isAxiosError } from './axios.config';
import { ArchiveDocument, CreateDocumentDto } from '@/types/document/document.types';

const prefix = 'api/v1/docs';

export default {
  async getDocument(payload: string): Promise<any> {
    try {
      const data = await axiosInstance.get<any>(`${prefix}/${payload}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      return data.data;
    } catch (error: any) {
      console.error(error);
    }
  },

  async saveDocument(payload: CreateDocumentDto): Promise<any> {
    try {
      const data = await axiosInstance.post<any>('http://localhost:8080/api/v1/docs', payload, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      return data.data;
    } catch (error: any) {
      console.error(error);
    }
  },

  async deleteDocument(payload: string): Promise<any> {
    try {
      const data = await axiosInstance.delete<any>(`${prefix}/login/${payload}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      return data.data;
    } catch (error: any) {
      console.error(error);
    }
  },

  async downloadFile(payload: string): Promise<any> {
    try {
      const data = await axiosInstance.get<any>(`${prefix}/login/${payload}/file`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      return data.data;
    } catch (error: any) {
      console.error(error);
    }
  },

  async saveFile(payload: string): Promise<any> {
    try {
      const data = await axiosInstance.put<any>(`${prefix}/login/${payload}/file`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      return data.data;
    } catch (error: any) {
      console.error(error);
    }
  },
};
