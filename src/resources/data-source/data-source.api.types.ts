import { AxiosRequestConfig, AxiosInstance, AxiosPromise } from 'axios';

import { RequestArgs } from '../../tonic';
import { paths, components } from '../../types/tonic.types';

export type GetDataSourceParams = paths['/api/DataSource']['get']['parameters']['query'];
export type GetDataSourceMinimalParams = paths['/api/DataSource/minimal']['get']['parameters']['query'];

export type DataSource = components['schemas']['AddDataSourceResponseModel'];

export type DataSourceAPI = {
  getDataSource: (
    workspaceId: string,
    options?: AxiosRequestConfig
  ) => Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<DataSource>>;
  getDataSourceMinimal: (
    workspaceId: string,
    options?: AxiosRequestConfig
  ) => Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<DataSource>>;
};

export type DataSourceAPIRequestArgsCreator = {
  getDataSourceRequestArgs: (params: GetDataSourceParams, options?: AxiosRequestConfig) => Promise<RequestArgs>;
  getDataSourceMinimalRequestArgs: (
    params: GetDataSourceMinimalParams,
    options?: AxiosRequestConfig
  ) => Promise<RequestArgs>;
};
