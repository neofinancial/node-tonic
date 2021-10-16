import globalAxios, { AxiosInstance, AxiosPromise, AxiosRequestConfig } from 'axios';

import { RequestArgs } from '../../tonic';
import { Configuration } from '../../configuration';
import { getRequestOptionsWithApiKey } from '../../lib/get-request-options-with-api-key';
import { VersionAPIAxiosParamCreator, VersionAPI } from './version.api.types';

const versionApiRequestArgsCreator = (configuration: Configuration): VersionAPIAxiosParamCreator => {
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

const versionApi = (configuration: Configuration): VersionAPI => {
  return {
    async getVersion(
      options?: AxiosRequestConfig
    ): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<number>> {
      const requestArgs = await versionApiRequestArgsCreator(configuration).getVersionRequestArgs(options);

      return (axios: AxiosInstance = globalAxios, basePath): AxiosPromise<number> => {
        const axiosRequestArgs = { ...requestArgs.options, url: basePath + requestArgs.url };

        return axios.request(axiosRequestArgs);
      };
    },
  };
};

export { versionApi, versionApiRequestArgsCreator };
