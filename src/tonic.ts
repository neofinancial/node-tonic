import globalAxios, { AxiosInstance, AxiosPromise, AxiosRequestConfig } from 'axios';

import { Configuration } from './configuration';
import { versionApi } from './version-api/version.api';

export interface RequestArgs {
  url: string;
  options: AxiosRequestConfig;
}

class Tonic {
  protected configuration: Configuration;
  protected basePath: string;

  constructor(configuration: Configuration, protected axios: AxiosInstance = globalAxios) {
    this.configuration = configuration;
    this.basePath = configuration.basePath;
  }

  // Version
  public getVersion(options?: AxiosRequestConfig): AxiosPromise<number> {
    return versionApi(this.configuration)
      .getVersion(options)
      .then((request) => request(this.axios, this.basePath));
  }
}

export default Tonic;
export { Tonic };
