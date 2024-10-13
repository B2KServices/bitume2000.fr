import { boot } from 'quasar/wrappers';
import axios, { type AxiosInstance, type AxiosRequestConfig } from 'axios';
import { App, inject, type InjectionKey } from 'vue';

const methods = [
  'request',
  'delete',
  'get',
  'head',
  'options',
  'post',
  'put',
  'patch',
] as const;

interface $AxiosInstance extends AxiosInstance {
  $request<T = unknown>(config: AxiosRequestConfig): Promise<T>;

  $get<T = unknown>(url: string, config?: AxiosRequestConfig): Promise<T>;

  $delete<T = unknown>(url: string, config?: AxiosRequestConfig): Promise<T>;

  $head<T = unknown>(url: string, config?: AxiosRequestConfig): Promise<T>;

  $options<T = unknown>(url: string, config?: AxiosRequestConfig): Promise<T>;

  $post<T = unknown>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig,
  ): Promise<T>;

  $put<T = unknown>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig,
  ): Promise<T>;

  $patch<T = unknown>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig,
  ): Promise<T>;
}

const extendAxiosInstance = (axios: AxiosInstance) => {
  for (const method of methods) {
    (axios as $AxiosInstance)[`$${method}` as const] = async function (
      ...args: [never, ...never[]]
    ) {
      return this[method](...args).then((res) => res && res.data);
    };
  }

  axios.interceptors.response.use(
    (response) => response, // Return response if successful
    (error) => {
      return Promise.reject(error.response?.data || error.response.status); // Reject promise with response data
    },
  );

  return axios as $AxiosInstance;
};

const axiosInjectionKey: InjectionKey<$AxiosInstance> = Symbol();

export function useAxios(): $AxiosInstance {
  const axiosInstance = inject(axiosInjectionKey);

  if (!axiosInstance)
    return extendAxiosInstance(
      axios.create({
        baseURL: `${process.env.VITE_API_URL}/api`,
        withCredentials: true,
      }),
    );

  return axiosInstance;
}

export function axiosPlugin(app: App) {
  const instance = axios.create({
    baseURL: `${process.env.VITE_API_URL}/api`,
    withCredentials: true,
  });

  const extendedInstance = extendAxiosInstance(instance);

  app.provide(axiosInjectionKey, extendedInstance);
}

export default boot(({ app }) => axiosPlugin(app));
