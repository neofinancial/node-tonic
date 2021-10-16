import { AxiosRequestConfig, AxiosInstance, AxiosPromise } from 'axios';

import { RequestArgs } from '../../tonic';
import { components, paths } from '../../types/tonic.types';

// return types
export type UserSettingsResponseModel = components['schemas']['UserSettingsResponseModel'];

//query types
type UserSettings = paths['/api/UserSettings'];

export type UserSettingsRequestModel = UserSettings['post']['requestBody']['content']['application/json'];

export type UserSettingsApiRequestArgsCreator = {
  getUserSettingsRequestArgs: (options?: AxiosRequestConfig) => Promise<RequestArgs>;
  updateUserSettingsRequestArgs: (
    params: UserSettingsRequestModel,
    options?: AxiosRequestConfig
  ) => Promise<RequestArgs>;
};

export type UserSettingsAPI = {
  getUserSettings: (
    options?: AxiosRequestConfig
  ) => Promise<(axios: AxiosInstance, basePath: string) => AxiosPromise<UserSettingsResponseModel>>;
  updateUserSettings: (
    params: UserSettingsRequestModel,
    options?: AxiosRequestConfig
  ) => Promise<(axios: AxiosInstance, basePath: string) => AxiosPromise<UserSettingsResponseModel>>;
};
