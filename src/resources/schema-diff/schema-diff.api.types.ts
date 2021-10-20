import { AxiosInstance, AxiosPromise, AxiosRequestConfig } from 'axios';

import { RequestArgs } from '../../tonic';
import { components, paths } from '../../types/tonic.types';

export type GetSchemaDiffParams = paths['/api/SchemaDiff']['get']['parameters']['query'];
export type ResolveSchemaDiffParams =
  paths['/api/SchemaDiff/resolve']['post']['requestBody']['content']['application/*+json'];
export type ResolveMultipleSchemaDiffParams =
  paths['/api/SchemaDiff/resolve_multiple']['post']['requestBody']['content']['application/*+json'];

export type SchemaDiffItem = components['schemas']['SchemaDiffItem'];
export type SchemaDiffResolveRequestModel = components['schemas']['SchemaDiffItemResolveRequestModel'];
export type SchemaDiffResolveMultipleRequestModel = components['schemas']['SchemaDiffMultipleItemsResolveRequestModel'];

type SchemaDiffAPI = {
  getSchemaDiff: (
    params: GetSchemaDiffParams,
    options?: AxiosRequestConfig
  ) => Promise<(axios: AxiosInstance, basePath: string) => AxiosPromise<Array<SchemaDiffItem>>>;
  resolveSchemaDiff: (
    params: ResolveSchemaDiffParams,
    options?: AxiosRequestConfig
  ) => Promise<(axios: AxiosInstance, basePath: string) => AxiosPromise<SchemaDiffResolveRequestModel>>;
  resolveMultipleSchemaDiff: (
    params: ResolveMultipleSchemaDiffParams,
    options?: AxiosRequestConfig
  ) => Promise<(axios: AxiosInstance, basePath: string) => AxiosPromise<SchemaDiffResolveMultipleRequestModel>>;
};

type SchemaDiffAPIRequestArgsCreator = {
  getGetSchemaDiffRequestArgs: (params: GetSchemaDiffParams, options?: AxiosRequestConfig) => Promise<RequestArgs>;
  getResolveSchemaDiffRequestArgs: (
    params: ResolveSchemaDiffParams,
    options?: AxiosRequestConfig
  ) => Promise<RequestArgs>;
  getResolveMultipleSchemaDiffRequestArgs: (
    params: ResolveMultipleSchemaDiffParams,
    options?: AxiosRequestConfig
  ) => Promise<RequestArgs>;
};

export { SchemaDiffAPI, SchemaDiffAPIRequestArgsCreator };
