import globalAxios, { AxiosInstance, AxiosPromise, AxiosRequestConfig } from 'axios';

import { Configuration } from '../../configuration';
import { getAxiosRequestArgs } from '../../lib/get-axios-request-args';
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
    ): Promise<RequestArgs> => getAxiosRequestArgs('GET', `/api/GenerateData`, params, configuration, options),
    getGetGenerateDataJobRequestArgs: async (
      inputParams: GenerateDataJobParams,
      options?: AxiosRequestConfig
    ): Promise<RequestArgs> =>
      getAxiosRequestArgs('GET', `/api/GenerateData/jobs/${inputParams.databaseScanId}`, {}, configuration, options),
    getStartDataGenerationJobRequestArgs: async (
      params: GenerateDataStartParams,
      options?: AxiosRequestConfig
    ): Promise<RequestArgs> =>
      getAxiosRequestArgs('POST', `/api/GenerateData/start`, params, configuration, options, {}),
    getCancelDataGenerationJobRequestArgs: async (
      params: GenerateDataCancelParams,
      options?: AxiosRequestConfig
    ): Promise<RequestArgs> =>
      getAxiosRequestArgs('POST', `/api/GenerateData/cancel`, params, configuration, options, {}),
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

      return (axios: AxiosInstance = globalAxios, basePath: string): AxiosPromise => {
        const axiosRequestArgs = { ...requestAxiosArgs.options, url: basePath + requestAxiosArgs.url };

        return axios.request(axiosRequestArgs);
      };
    },
  };
};

export { generateDataApi, generateDataApiRequestArgsCreator };
