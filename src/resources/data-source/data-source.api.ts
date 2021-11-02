import globalAxios, { AxiosInstance, AxiosPromise, AxiosRequestConfig } from 'axios';

import { RequestArgs } from '../../tonic';
import { Configuration } from '../../configuration';
import { getAxiosRequestArgs } from '../../lib/get-axios-request-args';
import {
  DataSource,
  DataSourceAPI,
  DataSourceAPIRequestArgsCreator,
  GetDataSourceMinimalParams,
  GetDataSourceParams,
} from './data-source.api.types';

const dataSourceApiRequestArgsCreator = (configuration: Configuration): DataSourceAPIRequestArgsCreator => {
  return {
    getDataSourceRequestArgs: async (
      params: GetDataSourceParams,
      options: AxiosRequestConfig = {}
    ): Promise<RequestArgs> => getAxiosRequestArgs('GET', `/api/DataSource`, params, configuration, options),
    getDataSourceMinimalRequestArgs: async (
      params: GetDataSourceMinimalParams,
      options: AxiosRequestConfig = {}
    ): Promise<RequestArgs> => getAxiosRequestArgs('GET', `/api/DataSource/minimal`, params, configuration, options),
  };
};

const dataSourceApi = (configuration: Configuration): DataSourceAPI => {
  return {
    async getDataSource(
      workspaceId: string,
      options?: AxiosRequestConfig
    ): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<DataSource>> {
      const requestArgs = await dataSourceApiRequestArgsCreator(configuration).getDataSourceRequestArgs(
        { workspaceId },
        options
      );

      return (axios: AxiosInstance = globalAxios, basePath): AxiosPromise<DataSource> => {
        const axiosRequestArgs = { ...requestArgs.options, url: basePath + requestArgs.url };

        return axios.request(axiosRequestArgs);
      };
    },
    async getDataSourceMinimal(
      workspaceId: string,
      options?: AxiosRequestConfig
    ): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<DataSource>> {
      const requestArgs = await dataSourceApiRequestArgsCreator(configuration).getDataSourceMinimalRequestArgs(
        { workspaceId },
        options
      );

      return (axios: AxiosInstance = globalAxios, basePath): AxiosPromise<DataSource> => {
        const axiosRequestArgs = { ...requestArgs.options, url: basePath + requestArgs.url };

        return axios.request(axiosRequestArgs);
      };
    },
  };
};

export { dataSourceApi, dataSourceApiRequestArgsCreator };
