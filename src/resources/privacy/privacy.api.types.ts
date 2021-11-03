import { AxiosInstance, AxiosPromise, AxiosRequestConfig } from 'axios';

import { RequestArgs } from '../../tonic';
import { paths } from '../../types/tonic.types';

export type PrivacyHistoryParams = paths['/api/Privacy/history']['get']['parameters']['query'];
export type PrivacySuggestionsParams = paths['/api/Privacy/suggestions']['get']['parameters']['query'];
export type PrivacyForColumnsParams = paths['/api/Privacy/privacyforcolumns']['get']['parameters']['query'];
export type PiiTypeForColumnsParams = paths['/api/Privacy/piitypeforcolumns']['get']['parameters']['query'];
export type IgnorePrivacyPostParams =
  paths['/api/Privacy/ignore']['post']['requestBody']['content']['application/json'];
export type SetPrivacyPostParams = paths['/api/Privacy/set']['post']['requestBody']['content']['application/json'];

export type PiiTypeForColumnsResponse = { table: string; column: string; piiType: string };
export type PrivacyForColumnsResponse = { table: string; column: string; privacyType: string };

type PrivacyAPIRequestArgsCreator = {
  getGetPrivacyHistoryRequestArgs: (params: PrivacyHistoryParams, options?: AxiosRequestConfig) => Promise<RequestArgs>;
  getGetPrivacySuggestionsRequestArgs: (
    params: PrivacySuggestionsParams,
    options?: AxiosRequestConfig
  ) => Promise<RequestArgs>;
  getGetPrivacyForColumnsRequestArgs: (
    params: PrivacyForColumnsParams,
    options?: AxiosRequestConfig
  ) => Promise<RequestArgs>;
  getGetPiiTypeForColumnsRequestArgs: (
    params: PiiTypeForColumnsParams,
    options?: AxiosRequestConfig
  ) => Promise<RequestArgs>;
  getIgnorePrivacyRequestArgs: (params: IgnorePrivacyPostParams, options?: AxiosRequestConfig) => Promise<RequestArgs>;
  getSetPrivacyRequestArgs: (params: SetPrivacyPostParams, options?: AxiosRequestConfig) => Promise<RequestArgs>;
};

type PrivacyAPI = {
  getPrivacyHistory: (
    params: PrivacyHistoryParams,
    options?: AxiosRequestConfig
  ) => Promise<(axios: AxiosInstance, basePath: string) => AxiosPromise<string>>;
  getPrivacySuggestions: (
    params: PrivacySuggestionsParams,
    options?: AxiosRequestConfig
  ) => Promise<(axios: AxiosInstance, basePath: string) => AxiosPromise<string>>;
  getPrivacyForColumns: (
    params: PrivacyForColumnsParams,
    options?: AxiosRequestConfig
  ) => Promise<(axios: AxiosInstance, basePath: string) => AxiosPromise<PrivacyForColumnsResponse[]>>;
  getPiiTypeForColumns: (
    params: PiiTypeForColumnsParams,
    options?: AxiosRequestConfig
  ) => Promise<(axios: AxiosInstance, basePath: string) => AxiosPromise<PiiTypeForColumnsResponse[]>>;
  ignorePrivacy: (
    params: IgnorePrivacyPostParams,
    options?: AxiosRequestConfig
  ) => Promise<(axios: AxiosInstance, basePath: string) => AxiosPromise<string>>;
  setPrivacy: (
    params: SetPrivacyPostParams,
    options?: AxiosRequestConfig
  ) => Promise<(axios: AxiosInstance, basePath: string) => AxiosPromise<string>>;
};

export { PrivacyAPI, PrivacyAPIRequestArgsCreator };
