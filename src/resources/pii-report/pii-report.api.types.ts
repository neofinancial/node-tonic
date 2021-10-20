import { AxiosInstance, AxiosPromise, AxiosRequestConfig } from 'axios';

import { RequestArgs } from '../../tonic';
import { components, paths } from '../../types/tonic.types';

// query types
export type MostRecentActiveOrCompletedParams =
  paths['/api/PiiReport/most_recent_active_or_completed_status']['get']['parameters']['query'];
export type PiiReportParams = paths['/api/PiiReport']['get']['parameters']['query'];
export type StartPiiReportParams = paths['/api/PiiReport/start']['post']['parameters']['query'];
export type CancelPiiReportParams = paths['/api/PiiReport/cancel']['post']['parameters']['query'];

export type JobScanModel = components['schemas']['JobScanModel'];
export type PiiReportRun = components['schemas']['PiiReportRun'];

type PiiReportAPI = {
  getMostRecentActiveOrCompletedPiiReport: (
    params: MostRecentActiveOrCompletedParams,
    options?: AxiosRequestConfig
  ) => Promise<(axios: AxiosInstance, basePath: string) => AxiosPromise<JobScanModel>>;
  getPiiReport: (
    params: PiiReportParams,
    options?: AxiosRequestConfig
  ) => Promise<(axios: AxiosInstance, basePath: string) => AxiosPromise<Array<JobScanModel>>>;
  startPiiReport: (
    params: StartPiiReportParams,
    options?: AxiosRequestConfig
  ) => Promise<(axios: AxiosInstance, basePath: string) => AxiosPromise<PiiReportRun>>;
  cancelPiiReport: (
    params: CancelPiiReportParams,
    options?: AxiosRequestConfig
  ) => Promise<(axios: AxiosInstance, basePath: string) => AxiosPromise>;
};

type PiiReportAPIRequestArgsCreator = {
  getGetMostRecentActiveOrCompletedStatusRequestArgs: (
    params: MostRecentActiveOrCompletedParams,
    options?: AxiosRequestConfig
  ) => Promise<RequestArgs>;
  getPiiReportRequestArgs: (params: PiiReportParams, options?: AxiosRequestConfig) => Promise<RequestArgs>;
  getStartPiiReportRequestArgs: (params: StartPiiReportParams, options?: AxiosRequestConfig) => Promise<RequestArgs>;
  getCancelPiiReportRequestArgs: (params: CancelPiiReportParams, options?: AxiosRequestConfig) => Promise<RequestArgs>;
};

export { PiiReportAPIRequestArgsCreator, PiiReportAPI };
