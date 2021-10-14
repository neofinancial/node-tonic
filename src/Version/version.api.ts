import globalAxios, { AxiosInstance, AxiosPromise, AxiosRequestConfig } from 'axios';

import { RequestArgs } from '../api';
import { Configuration } from '../configuration';
import { getRequestOptionsWithApiKey } from '../lib/get-request-options-with-api-key';
import { VersionAPIAxiosParamCreator, VersionAPI } from './version.api.types';

const versionApiAxiosParamCreator = (configuration: Configuration): VersionAPIAxiosParamCreator => {
  return {
    getVersionRequestArgs: async (options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
      const requestPath = `/api/Version`;
      const requestOptionsWithHeaders = await getRequestOptionsWithApiKey('GET', configuration, options);

      return {
        url: requestPath,
        options: requestOptionsWithHeaders,
      };
    },
  };
};

export const VersionApi = (configuration: Configuration): VersionAPI => {
  return {
    async getVersion(
      options?: AxiosRequestConfig
    ): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<number>> {
      const requestArgs = await versionApiAxiosParamCreator(configuration).getVersionRequestArgs(options);

      return (axios: AxiosInstance = globalAxios, basePath): AxiosPromise<number> => {
        const axiosRequestArgs = { ...requestArgs.options, url: basePath + requestArgs.url };

        return axios.request(axiosRequestArgs);
      };
    },
  };
};
