import globalAxios, { AxiosInstance, AxiosPromise, AxiosRequestConfig } from 'axios';

import { Configuration } from '../../configuration';
import { getAxiosRequestArgs } from '../../lib/get-axios-request-args';
import { RequestArgs } from '../../tonic';
import {
  UserSettingsAPI,
  UserSettingsApiRequestArgsCreator,
  UserSettingsRequestModel,
  UserSettingsResponseModel,
} from './user-settings-api.types';

const userSettingsApiRequestArgsCreator = (configuration: Configuration): UserSettingsApiRequestArgsCreator => {
  return {
    getUserSettingsRequestArgs: async (options: AxiosRequestConfig = {}): Promise<RequestArgs> =>
      getAxiosRequestArgs('GET', `/api/UserSettings`, configuration, options),
    updateUserSettingsRequestArgs: async (
      postData: UserSettingsRequestModel,
      options: AxiosRequestConfig = {}
    ): Promise<RequestArgs> => getAxiosRequestArgs('POST', '/api/UserSettings', configuration, options, postData),
  };
};

const userSettingsApi = (configuration: Configuration): UserSettingsAPI => {
  return {
    // gets your User Settings
    async getUserSettings(
      options?: AxiosRequestConfig
    ): Promise<(axios: AxiosInstance, basePath: string) => AxiosPromise<UserSettingsResponseModel>> {
      const localVarAxiosArgs = await userSettingsApiRequestArgsCreator(configuration).getUserSettingsRequestArgs(
        options
      );

      return (axios: AxiosInstance = globalAxios, basePath: string): AxiosPromise<UserSettingsResponseModel> => {
        const axiosRequestArgs = { ...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url };

        return axios.request(axiosRequestArgs);
      };
    },
    // Updates your user settings
    async updateUserSettings(
      params: UserSettingsRequestModel,
      options?: AxiosRequestConfig
    ): Promise<(axios: AxiosInstance, basePath: string) => AxiosPromise<UserSettingsResponseModel>> {
      const localVarAxiosArgs = await userSettingsApiRequestArgsCreator(configuration).updateUserSettingsRequestArgs(
        params,
        options
      );

      return (axios: AxiosInstance = globalAxios, basePath): AxiosPromise<UserSettingsResponseModel> => {
        const axiosRequestArgs = { ...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url };

        return axios.request(axiosRequestArgs);
      };
    },
  };
};

export { userSettingsApiRequestArgsCreator, userSettingsApi };
