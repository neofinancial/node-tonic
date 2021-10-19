import globalAxios, { AxiosInstance, AxiosPromise, AxiosRequestConfig } from 'axios';

import { RequestArgs } from '../../tonic';
import { Configuration } from '../../configuration';
import { VersionAPIAxiosParamCreator, VersionAPI } from './version.api.types';
import { getAxiosRequestArgs } from '../../lib/get-axios-request-args';

const versionApiRequestArgsCreator = (configuration: Configuration): VersionAPIAxiosParamCreator => {
  return {
    getVersionRequestArgs: async (options: AxiosRequestConfig = {}): Promise<RequestArgs> =>
      getAxiosRequestArgs('GET', `/api/Version`, configuration, options),
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
