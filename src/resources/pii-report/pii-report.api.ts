import globalAxios, { AxiosInstance, AxiosPromise, AxiosRequestConfig } from 'axios';

import { Configuration } from '../../configuration';
import { getAxiosRequestArgs } from '../../lib/get-axios-request-args';
import { RequestArgs } from '../../tonic';
import {
  CancelPiiReportParams,
  JobScanModel,
  MostRecentActiveOrCompletedParams,
  PiiReportAPI,
  PiiReportAPIRequestArgsCreator,
  PiiReportParams,
  PiiReportRun,
  StartPiiReportParams,
} from './pii-report.api.types';

const piiReportApiRequestArgsCreator = (configuration: Configuration): PiiReportAPIRequestArgsCreator => {
  return {
    getGetMostRecentActiveOrCompletedStatusRequestArgs: async (
      params: MostRecentActiveOrCompletedParams,
      options?: AxiosRequestConfig
    ): Promise<RequestArgs> =>
      getAxiosRequestArgs(
        'GET',
        `/api/PiiReport/most_recent_active_or_completed_status`,
        params,
        configuration,
        options
      ),
    getPiiReportRequestArgs: async (params: PiiReportParams, options?: AxiosRequestConfig): Promise<RequestArgs> =>
      getAxiosRequestArgs('GET', `/api/PiiReport`, params, configuration, options),
    getStartPiiReportRequestArgs: async (
      params: StartPiiReportParams,
      options?: AxiosRequestConfig
    ): Promise<RequestArgs> => getAxiosRequestArgs('POST', `/api/PiiReport/start`, params, configuration, options),
    getCancelPiiReportRequestArgs: async (
      params: CancelPiiReportParams,
      options?: AxiosRequestConfig
    ): Promise<RequestArgs> => getAxiosRequestArgs('POST', `/api/PiiReport/cancel`, params, configuration, options),
  };
};

const piiReportApi = (configuration: Configuration): PiiReportAPI => {
  return {
    async getMostRecentActiveOrCompletedPiiReport(
      params: MostRecentActiveOrCompletedParams,
      options?: AxiosRequestConfig
    ): Promise<(axios: AxiosInstance, basePath: string) => AxiosPromise<JobScanModel>> {
      const requestAxiosArgs = await piiReportApiRequestArgsCreator(
        configuration
      ).getGetMostRecentActiveOrCompletedStatusRequestArgs(params, options);

      return (axios: AxiosInstance = globalAxios, basePath: string): AxiosPromise<JobScanModel> => {
        const axiosRequestArgs = { ...requestAxiosArgs.options, url: basePath + requestAxiosArgs.url };

        return axios.request(axiosRequestArgs);
      };
    },
    async getPiiReport(
      params: PiiReportParams,
      options?: AxiosRequestConfig
    ): Promise<(axios: AxiosInstance, basePath: string) => AxiosPromise<Array<JobScanModel>>> {
      const requestAxiosArgs = await piiReportApiRequestArgsCreator(configuration).getPiiReportRequestArgs(
        params,
        options
      );

      return (axios: AxiosInstance = globalAxios, basePath: string): AxiosPromise<Array<JobScanModel>> => {
        const axiosRequestArgs = { ...requestAxiosArgs.options, url: basePath + requestAxiosArgs.url };

        return axios.request(axiosRequestArgs);
      };
    },
    async startPiiReport(
      params: StartPiiReportParams,
      options?: AxiosRequestConfig
    ): Promise<(axios: AxiosInstance, basePath: string) => AxiosPromise<PiiReportRun>> {
      const requestAxiosArgs = await piiReportApiRequestArgsCreator(configuration).getStartPiiReportRequestArgs(
        params,
        options
      );

      return (axios: AxiosInstance = globalAxios, basePath: string): AxiosPromise<PiiReportRun> => {
        const axiosRequestArgs = { ...requestAxiosArgs.options, url: basePath + requestAxiosArgs.url };

        return axios.request(axiosRequestArgs);
      };
    },
    async cancelPiiReport(
      params: CancelPiiReportParams,
      options?: AxiosRequestConfig
    ): Promise<(axios: AxiosInstance, basePath: string) => AxiosPromise> {
      const requestAxiosArgs = await piiReportApiRequestArgsCreator(configuration).getCancelPiiReportRequestArgs(
        params,
        options
      );

      return (axios: AxiosInstance = globalAxios, basePath: string): AxiosPromise<PiiReportRun> => {
        const axiosRequestArgs = { ...requestAxiosArgs.options, url: basePath + requestAxiosArgs.url };

        return axios.request(axiosRequestArgs);
      };
    },
  };
};

export { piiReportApi, piiReportApiRequestArgsCreator };
