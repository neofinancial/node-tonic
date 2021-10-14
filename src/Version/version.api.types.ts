import { AxiosRequestConfig, AxiosInstance, AxiosPromise } from 'axios';

import { RequestArgs } from '../api';

export type VersionAPI = {
  getVersion: (
    options?: AxiosRequestConfig
  ) => Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<number>>;
};

export type VersionAPIAxiosParamCreator = {
  getVersionRequestArgs: (options?: AxiosRequestConfig) => Promise<RequestArgs>;
};
