import globalAxios, { AxiosInstance, AxiosPromise, AxiosRequestConfig } from 'axios';

import { Configuration } from './configuration';
import { VersionApi } from './Version/version.api';

export interface RequestArgs {
  url: string;
  options: AxiosRequestConfig;
}

export class TonicAPI {
  protected configuration: Configuration;
  protected basePath: string;

  constructor(configuration: Configuration, protected axios: AxiosInstance = globalAxios) {
    this.configuration = configuration;
    this.basePath = configuration.basePath;
  }

  // Version
  public getVersion(options?: AxiosRequestConfig): AxiosPromise<number> {
    return VersionApi(this.configuration)
      .getVersion(options)
      .then((request) => request(this.axios, this.basePath));
  }
}
