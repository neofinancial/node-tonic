import globalAxios, { AxiosInstance, AxiosPromise, AxiosRequestConfig } from 'axios';

import { Configuration } from './configuration';
import { versionApi } from './version-api/version.api';
import { collectionApi } from './collection-api/collection.api';
import { Table } from './collection-api/collection.api.types';

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

  // Collection
  public getCollections(workspaceId?: string, options?: AxiosRequestConfig): AxiosPromise<Array<Table>> {
    return collectionApi(this.configuration)
      .getCollections({ workspaceId }, options)
      .then((request) => request(this.axios, this.basePath));
  }

  public getCollectionNames(workspaceId?: string, options?: AxiosRequestConfig): AxiosPromise<Array<string>> {
    return collectionApi(this.configuration)
      .getCollectionNames({ workspaceId }, options)
      .then((request) => request(this.axios, this.basePath));
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