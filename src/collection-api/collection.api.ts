import globalAxios, { AxiosInstance, AxiosPromise, AxiosRequestConfig } from 'axios';
import qs from 'qs';

import { Configuration } from '../configuration';
import { getRequestOptionsWithApiKey } from '../lib/get-request-options-with-api-key';
import { RequestArgs } from '../tonic';
import {
  CollectionAPI,
  CollectionAPIAxiosParamCreator,
  GetCollectionFullQueryParameters,
  GetCollectionQueryParameters,
  Table,
} from './collection.api.types';

const collectionApiRequestArgsCreator = (configuration: Configuration): CollectionAPIAxiosParamCreator => {
  return {
    getCollectionsRequestArgs: async (
      params: GetCollectionQueryParameters,
      options: AxiosRequestConfig = {}
    ): Promise<RequestArgs> => {
      const requestPath = `/api/Collection/full`;
      const requestOptionsWithHeaders = await getRequestOptionsWithApiKey('GET', configuration, options);

      const queryParams = { ...params, ...options.params };

      return {
        url: `${requestPath}?${qs.stringify(queryParams)}`,
        options: requestOptionsWithHeaders,
      };
    },
    getCollectionNamesRequestArgs: async (
      params: GetCollectionFullQueryParameters,
      options: AxiosRequestConfig = {}
    ): Promise<RequestArgs> => {
      const requestPath = `/api/Collection`;
      const requestOptionsWithHeaders = await getRequestOptionsWithApiKey('GET', configuration, options);

      const queryParams = { ...params, ...options.params };

      return {
        url: `${requestPath}?${qs.stringify(queryParams)}`,
        options: requestOptionsWithHeaders,
      };
    },
  };
};

const collectionApi = (configuration: Configuration): CollectionAPI => {
  return {
    async getCollections(
      params: GetCollectionFullQueryParameters,
      options?: AxiosRequestConfig
    ): Promise<(axios: AxiosInstance, basePath: string) => AxiosPromise<Array<Table>>> {
      const requestAxiosArgs = await collectionApiRequestArgsCreator(configuration).getCollectionsRequestArgs(
        params,
        options
      );

      return (axios: AxiosInstance = globalAxios, basePath): AxiosPromise<Array<Table>> => {
        const axiosRequestArgs = { ...requestAxiosArgs.options, url: basePath + requestAxiosArgs.url };

        return axios.request(axiosRequestArgs);
      };
    },

    async getCollectionNames(
      params: GetCollectionQueryParameters,
      options?: AxiosRequestConfig
    ): Promise<(axios: AxiosInstance, basePath: string) => AxiosPromise<Array<string>>> {
      const requestAxiosArgs = await collectionApiRequestArgsCreator(configuration).getCollectionNamesRequestArgs(
        params,
        options
      );

      return (axios: AxiosInstance = globalAxios, basePath): AxiosPromise<Array<string>> => {
        const axiosRequestArgs = { ...requestAxiosArgs.options, url: basePath + requestAxiosArgs.url };

        return axios.request(axiosRequestArgs);
      };
    },
  };
};

export { collectionApi, collectionApiRequestArgsCreator };
