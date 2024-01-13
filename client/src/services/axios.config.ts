import axios, {
  AxiosError, AxiosInstance, isAxiosError,
} from 'axios';

const axiosInstance: AxiosInstance = axios.create();

export default axiosInstance;

export {
  isAxiosError,
};
