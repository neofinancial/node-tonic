import { AxiosRequestConfig, AxiosInstance, AxiosPromise } from 'axios';

import { RequestArgs } from '../../tonic';
import { components, paths } from '../../types/tonic.types';

export type CollectionAPI = {
  getCollectionNames: (
    params: GetCollectionQueryParameters,
    options?: AxiosRequestConfig
  ) => Promise<(axios: AxiosInstance, basePath: string) => AxiosPromise<Array<string>>>;
  getCollections: (
    params: GetCollectionFullQueryParameters,
    options?: AxiosRequestConfig
  ) => Promise<(axios: AxiosInstance, basePath: string) => AxiosPromise<Array<Table>>>;
};

export type CollectionAPIAxiosParamCreator = {
  getCollectionsRequestArgs: (
    params: GetCollectionFullQueryParameters,
    options?: AxiosRequestConfig
  ) => Promise<RequestArgs>;
  getCollectionNamesRequestArgs: (
    params: GetCollectionQueryParameters,
    options?: AxiosRequestConfig
  ) => Promise<RequestArgs>;
};

// return types
export type Table = components['schemas']['Table'];

//query types
type GetCollectionFull = paths['/api/Collection/full'];
type GetCollection = paths['/api/Collection'];

export type GetCollectionFullQueryParameters = GetCollectionFull['get']['parameters']['query'];
export type GetCollectionQueryParameters = GetCollection['get']['parameters']['query'];
