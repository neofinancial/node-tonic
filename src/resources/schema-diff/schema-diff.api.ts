import globalAxios, { AxiosInstance, AxiosPromise, AxiosRequestConfig } from 'axios';
import qs from 'qs';

import { RequestArgs } from '../../tonic';
import {
  GetSchemaDiffParams,
  ResolveMultipleSchemaDiffParams,
  ResolveSchemaDiffParams,
  SchemaDiffAPI,
  SchemaDiffAPIRequestArgsCreator,
  SchemaDiffItem,
  SchemaDiffResolveMultipleRequestModel,
  SchemaDiffResolveRequestModel,
} from './schema-diff.api.types';
import { Configuration } from '../../configuration';
import { getAxiosRequestArgs } from '../../lib/get-axios-request-args';

const schemaDiffAPIRequestArgsCreator = (configuration: Configuration): SchemaDiffAPIRequestArgsCreator => {
  return {
    getGetSchemaDiffRequestArgs: async (
      params: GetSchemaDiffParams,
      options?: AxiosRequestConfig
    ): Promise<RequestArgs> =>
      getAxiosRequestArgs('GET', `/api/SchemaDiff?${qs.stringify(params)}`, configuration, options),
    getResolveSchemaDiffRequestArgs: async (
      postData: ResolveSchemaDiffParams,
      options?: AxiosRequestConfig
    ): Promise<RequestArgs> => getAxiosRequestArgs('POST', `/api/SchemaDiff/resolve`, configuration, options, postData),
    getResolveMultipleSchemaDiffRequestArgs: async (
      postData: ResolveMultipleSchemaDiffParams,
      options?: AxiosRequestConfig
    ): Promise<RequestArgs> =>
      getAxiosRequestArgs('POST', `/api/SchemaDiff/resolve_multiple`, configuration, options, postData),
  };
};

const schemaDiffApi = (configuration: Configuration): SchemaDiffAPI => {
  return {
    async getSchemaDiff(
      params: GetSchemaDiffParams,
      options?: AxiosRequestConfig
    ): Promise<(axios: AxiosInstance, basePath: string) => AxiosPromise<SchemaDiffItem[]>> {
      const requestAxiosArgs = await schemaDiffAPIRequestArgsCreator(configuration).getGetSchemaDiffRequestArgs(
        params,
        options
      );

      return (axios: AxiosInstance = globalAxios, basePath: string): AxiosPromise<SchemaDiffItem[]> => {
        const axiosRequestArgs = { ...requestAxiosArgs.options, url: basePath + requestAxiosArgs.url };

        return axios.request(axiosRequestArgs);
      };
    },
    async resolveSchemaDiff(
      params: ResolveSchemaDiffParams,
      options?: AxiosRequestConfig
    ): Promise<(axios: AxiosInstance, basePath: string) => AxiosPromise<SchemaDiffResolveRequestModel>> {
      const requestAxiosArgs = await schemaDiffAPIRequestArgsCreator(configuration).getResolveSchemaDiffRequestArgs(
        params,
        options
      );

      return (axios: AxiosInstance = globalAxios, basePath: string): AxiosPromise<SchemaDiffResolveRequestModel> => {
        const axiosRequestArgs = { ...requestAxiosArgs.options, url: basePath + requestAxiosArgs.url };

        return axios.request(axiosRequestArgs);
      };
    },
    async resolveMultipleSchemaDiff(
      params: ResolveMultipleSchemaDiffParams,
      options?: AxiosRequestConfig
    ): Promise<(axios: AxiosInstance, basePath: string) => AxiosPromise<SchemaDiffResolveMultipleRequestModel>> {
      const requestAxiosArgs = await schemaDiffAPIRequestArgsCreator(
        configuration
      ).getResolveMultipleSchemaDiffRequestArgs(params, options);

      return (
        axios: AxiosInstance = globalAxios,
        basePath: string
      ): AxiosPromise<SchemaDiffResolveMultipleRequestModel> => {
        const axiosRequestArgs = { ...requestAxiosArgs.options, url: basePath + requestAxiosArgs.url };

        return axios.request(axiosRequestArgs);
      };
    },
  };
};

export { schemaDiffApi, schemaDiffAPIRequestArgsCreator };
