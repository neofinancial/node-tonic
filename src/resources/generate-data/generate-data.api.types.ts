import { AxiosInstance, AxiosPromise, AxiosRequestConfig } from 'axios';

import { RequestArgs } from '../../tonic';
import { components, paths } from '../../types/tonic.types';

// query types
type GenerateDataJobsParams = paths['/api/GenerateData']['get']['parameters']['query'];
type GenerateDataJobParams = paths['/api/GenerateData/jobs/{databaseScanId}']['get']['parameters']['path'];
type GenerateDataStartParams = paths['/api/GenerateData/start']['post']['parameters']['query'];
type GenerateDataCancelParams = paths['/api/GenerateData/cancel']['post']['parameters']['query'];

type StrictMode = components['schemas']['StrictGenerationEnum'];

// schema types
type JobScanModel = components['schemas']['JobScanModel'];
type IdModel = components['schemas']['IdModel'];

type GenerateDataAPI = {
  getGenerateDataJobs: (
    params: GenerateDataJobsParams,
    options?: AxiosRequestConfig
  ) => Promise<(axios: AxiosInstance, basePath: string) => AxiosPromise<Array<JobScanModel>>>;
  getGenerateDataJob: (
    params: GenerateDataJobParams,
    options?: AxiosRequestConfig
  ) => Promise<(axios: AxiosInstance, basePath: string) => AxiosPromise<JobScanModel>>;
  startDataGenerationJob: (
    params: GenerateDataStartParams,
    options?: AxiosRequestConfig
  ) => Promise<(axios: AxiosInstance, basePath: string) => AxiosPromise<IdModel>>;
  cancelDataGenerationJob: (
    params: GenerateDataCancelParams,
    options?: AxiosRequestConfig
  ) => Promise<(axios: AxiosInstance, basePath: string) => AxiosPromise>;
};

export type GenerateDataApiRequestArgsCreator = {
  getGetGenerateDataJobsRequestArgs: (
    params: GenerateDataJobsParams,
    options?: AxiosRequestConfig
  ) => Promise<RequestArgs>;
  getGetGenerateDataJobRequestArgs: (
    params: GenerateDataJobParams,
    options?: AxiosRequestConfig
  ) => Promise<RequestArgs>;
  getStartDataGenerationJobRequestArgs: (
    params: GenerateDataStartParams,
    options?: AxiosRequestConfig
  ) => Promise<RequestArgs>;
  getCancelDataGenerationJobRequestArgs: (
    params: GenerateDataCancelParams,
    options?: AxiosRequestConfig
  ) => Promise<RequestArgs>;
};

export {
  GenerateDataAPI,
  JobScanModel,
  GenerateDataJobsParams,
  GenerateDataJobParams,
  IdModel,
  GenerateDataStartParams,
  GenerateDataCancelParams,
  StrictMode
};
