import globalAxios, { AxiosInstance, AxiosPromise, AxiosRequestConfig } from 'axios';
import qs from 'qs';

import { Configuration } from '../../configuration';
import { getAxiosRequestArgs } from '../../lib/get-axios-request-args';
import { RequestArgs } from '../../tonic';
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
    ): Promise<RequestArgs> => getAxiosRequestArgs('GET', `/api/Collection/full?${qs.stringify(params)}`, configuration, options),
    getCollectionNamesRequestArgs: async (
      params: GetCollectionFullQueryParameters,
      options: AxiosRequestConfig = {}
    ): Promise<RequestArgs> => getAxiosRequestArgs('GET', `/api/Collection?${qs.stringify(params)}`, configuration, options),
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
