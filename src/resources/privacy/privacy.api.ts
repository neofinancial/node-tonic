import globalAxios, { AxiosInstance, AxiosPromise, AxiosRequestConfig } from 'axios';

import { Configuration } from '../../configuration';
import { getAxiosRequestArgs } from '../../lib/get-axios-request-args';
import { RequestArgs } from '../../tonic';
import {
  PrivacyAPIRequestArgsCreator,
  PrivacyHistoryParams,
  PrivacySuggestionsParams,
  PrivacyForColumnsParams,
  PiiTypeForColumnsParams,
  IgnorePrivacyPostParams,
  SetPrivacyPostParams,
  PrivacyAPI,
} from './privacy.api.types';

const privacyApiRequestArgsCreator = (configuration: Configuration): PrivacyAPIRequestArgsCreator => {
  return {
    getGetPrivacyHistoryRequestArgs: async (
      params: PrivacyHistoryParams,
      options?: AxiosRequestConfig
    ): Promise<RequestArgs> => getAxiosRequestArgs('GET', `/api/Privacy/history`, params, configuration, options),
    getGetPrivacySuggestionsRequestArgs: async (
      params: PrivacySuggestionsParams,
      options?: AxiosRequestConfig
    ): Promise<RequestArgs> => getAxiosRequestArgs('GET', `/api/Privacy/suggestions`, params, configuration, options),
    getGetPrivacyForColumnsRequestArgs: async (
      params: PrivacyForColumnsParams,
      options?: AxiosRequestConfig
    ): Promise<RequestArgs> =>
      getAxiosRequestArgs('GET', `/api/Privacy/privacyforcolumns`, params, configuration, options),
    getGetPiiTypeForColumnsRequestArgs: async (
      params: PiiTypeForColumnsParams,
      options?: AxiosRequestConfig
    ): Promise<RequestArgs> =>
      getAxiosRequestArgs('GET', `/api/Privacy/piitypeforcolumns`, params, configuration, options),
    getIgnorePrivacyRequestArgs: async (
      postData: IgnorePrivacyPostParams,
      options?: AxiosRequestConfig
    ): Promise<RequestArgs> => getAxiosRequestArgs('POST', '/api/Privacy/ignore', {}, configuration, options, postData),
    getSetPrivacyRequestArgs: async (
      postData: SetPrivacyPostParams,
      options?: AxiosRequestConfig
    ): Promise<RequestArgs> => getAxiosRequestArgs('POST', '/api/Privacy/set', {}, configuration, options, postData),
  };
};

const privacyApi = (configuration: Configuration): PrivacyAPI => {
  return {
    async getPrivacyHistory(
      params: PrivacyHistoryParams,
      options?: AxiosRequestConfig
    ): Promise<(axios: AxiosInstance, basePath: string) => AxiosPromise<string>> {
      const requestAxiosArgs = await privacyApiRequestArgsCreator(configuration).getGetPrivacyHistoryRequestArgs(
        params,
        options
      );

      return (axios: AxiosInstance = globalAxios, basePath: string): AxiosPromise<string> => {
        const axiosRequestArgs = { ...requestAxiosArgs.options, url: basePath + requestAxiosArgs.url };

        return axios.request(axiosRequestArgs);
      };
    },
    async getPrivacySuggestions(
      params: PrivacySuggestionsParams,
      options?: AxiosRequestConfig
    ): Promise<(axios: AxiosInstance, basePath: string) => AxiosPromise<string>> {
      const requestAxiosArgs = await privacyApiRequestArgsCreator(configuration).getGetPrivacySuggestionsRequestArgs(
        params,
        options
      );

      return (axios: AxiosInstance = globalAxios, basePath: string): AxiosPromise<string> => {
        const axiosRequestArgs = { ...requestAxiosArgs.options, url: basePath + requestAxiosArgs.url };

        return axios.request(axiosRequestArgs);
      };
    },
    async getPrivacyForColumns(
      params: PrivacyForColumnsParams,
      options?: AxiosRequestConfig
    ): Promise<(axios: AxiosInstance, basePath: string) => AxiosPromise<string>> {
      const requestAxiosArgs = await privacyApiRequestArgsCreator(configuration).getGetPrivacyForColumnsRequestArgs(
        params,
        options
      );

      return (axios: AxiosInstance = globalAxios, basePath: string): AxiosPromise<string> => {
        const axiosRequestArgs = { ...requestAxiosArgs.options, url: basePath + requestAxiosArgs.url };

        return axios.request(axiosRequestArgs);
      };
    },
    async getPiiTypeForColumns(
      params: PiiTypeForColumnsParams,
      options?: AxiosRequestConfig
    ): Promise<(axios: AxiosInstance, basePath: string) => AxiosPromise<string>> {
      const requestAxiosArgs = await privacyApiRequestArgsCreator(configuration).getGetPiiTypeForColumnsRequestArgs(
        params,
        options
      );

      return (axios: AxiosInstance = globalAxios, basePath: string): AxiosPromise<string> => {
        const axiosRequestArgs = { ...requestAxiosArgs.options, url: basePath + requestAxiosArgs.url };

        return axios.request(axiosRequestArgs);
      };
    },
    async ignorePrivacy(
      params: IgnorePrivacyPostParams,
      options?: AxiosRequestConfig
    ): Promise<(axios: AxiosInstance, basePath: string) => AxiosPromise<string>> {
      const requestAxiosArgs = await privacyApiRequestArgsCreator(configuration).getIgnorePrivacyRequestArgs(
        params,
        options
      );

      return (axios: AxiosInstance = globalAxios, basePath: string): AxiosPromise<string> => {
        const axiosRequestArgs = { ...requestAxiosArgs.options, url: basePath + requestAxiosArgs.url };

        return axios.request(axiosRequestArgs);
      };
    },
    async setPrivacy(
      params: SetPrivacyPostParams,
      options?: AxiosRequestConfig
    ): Promise<(axios: AxiosInstance, basePath: string) => AxiosPromise<string>> {
      const requestAxiosArgs = await privacyApiRequestArgsCreator(configuration).getSetPrivacyRequestArgs(
        params,
        options
      );

      return (axios: AxiosInstance = globalAxios, basePath: string): AxiosPromise<string> => {
        const axiosRequestArgs = { ...requestAxiosArgs.options, url: basePath + requestAxiosArgs.url };

        return axios.request(axiosRequestArgs);
      };
    },
  };
};

export { privacyApi, privacyApiRequestArgsCreator };
