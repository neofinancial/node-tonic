import globalAxios, { AxiosInstance, AxiosPromise, AxiosRequestConfig } from 'axios';
import qs from 'qs';

import { Configuration } from '../../configuration';
import { getRequestOptionsWithApiKey } from '../../lib/get-request-options-with-api-key';
import { RequestArgs } from '../../tonic';
import {
  GenerateDataAPI,
  GenerateDataApiRequestArgsCreator,
  GenerateDataCancelParams,
  GenerateDataJobParams,
  GenerateDataJobsParams,
  GenerateDataStartParams,
  IdModel,
  JobScanModel,
} from './generate-data.api.types';

const generateDataApiRequestArgsCreator = (configuration: Configuration): GenerateDataApiRequestArgsCreator => {
  return {
    getGetGenerateDataJobsRequestArgs: async (
      params: GenerateDataJobsParams,
      options?: AxiosRequestConfig
    ): Promise<RequestArgs> => {
      const requestPath = `/api/GenerateData`;
      const requestOptionsWithHeaders = await getRequestOptionsWithApiKey('GET', configuration, options);

      const queryParams = { ...params, ...options?.params };

      return {
        url: `${requestPath}?${qs.stringify(queryParams)}`,
        options: requestOptionsWithHeaders,
      };
    },
    getGetGenerateDataJobRequestArgs: async (
      params: GenerateDataJobParams,
      options?: AxiosRequestConfig
    ): Promise<RequestArgs> => {
      const requestPath = `/api/GenerateData`;
      const requestOptionsWithHeaders = await getRequestOptionsWithApiKey('GET', configuration, options);

      return {
        url: `${requestPath}/jobs/${params.databaseScanId}${options?.params ? qs.stringify(options.params) : ''}`,
        options: requestOptionsWithHeaders,
      };
    },
    getStartDataGenerationJobRequestArgs: async (
      params: GenerateDataStartParams,
      options?: AxiosRequestConfig
    ): Promise<RequestArgs> => {

      const requestPath = `/api/GenerateData/start`;
      const requestOptionsWithHeaders = await getRequestOptionsWithApiKey('POST', configuration, {
        ...options,
        headers: { 'Content-Type': 'application/json' },
        data: {},
      });

      const queryParams = { ...params, ...options?.params };

      return {
        url: `${requestPath}?${qs.stringify(queryParams)}`,
        options: requestOptionsWithHeaders,
      };
    },
    getCancelDataGenerationJobRequestArgs: async (
      params: GenerateDataCancelParams,
      options?: AxiosRequestConfig
    ): Promise<RequestArgs> => {
      const requestPath = `/api/GenerateData/cancel`;
      const requestOptionsWithHeaders = await getRequestOptionsWithApiKey('POST', configuration, {
        ...options,
        headers: { 'Content-Type': 'application/json' },
        data: {},
      });

      const queryParams = { ...params, ...options?.params };

      return {
        url: `${requestPath}?${qs.stringify(queryParams)}`,
        options: requestOptionsWithHeaders,
      };
    },
  };
};

const generateDataApi = (configuration: Configuration): GenerateDataAPI => {
  return {
    // gets your User Settings
    async getGenerateDataJobs(
      params: GenerateDataJobsParams,
      options?: AxiosRequestConfig
    ): Promise<(axios: AxiosInstance, basePath: string) => AxiosPromise<Array<JobScanModel>>> {
      const requestAxiosArgs = await generateDataApiRequestArgsCreator(configuration).getGetGenerateDataJobsRequestArgs(
        params,
        options
      );

      return (axios: AxiosInstance = globalAxios, basePath: string): AxiosPromise<Array<JobScanModel>> => {
        const axiosRequestArgs = { ...requestAxiosArgs.options, url: basePath + requestAxiosArgs.url };

        return axios.request(axiosRequestArgs);
      };
    },

    async getGenerateDataJob(
      params: GenerateDataJobParams,
      options?: AxiosRequestConfig
    ): Promise<(axios: AxiosInstance, basePath: string) => AxiosPromise<JobScanModel>> {
      const requestAxiosArgs = await generateDataApiRequestArgsCreator(configuration).getGetGenerateDataJobRequestArgs(
        params,
        options
      );

      return (axios: AxiosInstance = globalAxios, basePath: string): AxiosPromise<JobScanModel> => {
        const axiosRequestArgs = { ...requestAxiosArgs.options, url: basePath + requestAxiosArgs.url };

        return axios.request(axiosRequestArgs);
      };
    },

    async startDataGenerationJob(
      params: GenerateDataStartParams,
      options?: AxiosRequestConfig
    ): Promise<(axios: AxiosInstance, basePath: string) => AxiosPromise<IdModel>> {
      const requestAxiosArgs = await generateDataApiRequestArgsCreator(
        configuration
      ).getStartDataGenerationJobRequestArgs(params, options);

      return (axios: AxiosInstance = globalAxios, basePath: string): AxiosPromise<IdModel> => {
        const axiosRequestArgs = { ...requestAxiosArgs.options, url: basePath + requestAxiosArgs.url };

        return axios.request(axiosRequestArgs);
      };
    },

    async cancelDataGenerationJob(
      params: GenerateDataCancelParams,
      options?: AxiosRequestConfig
    ): Promise<(axios: AxiosInstance, basePath: string) => AxiosPromise> {
      const requestAxiosArgs = await generateDataApiRequestArgsCreator(
        configuration
      ).getCancelDataGenerationJobRequestArgs(params, options);

      return (axios: AxiosInstance = globalAxios, basePath: string): AxiosPromise<IdModel> => {
        const axiosRequestArgs = { ...requestAxiosArgs.options, url: basePath + requestAxiosArgs.url };

        return axios.request(axiosRequestArgs);
      };
    },
  };
};

export { generateDataApi, generateDataApiRequestArgsCreator };
