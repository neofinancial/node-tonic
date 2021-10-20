import globalAxios, { AxiosInstance, AxiosPromise, AxiosRequestConfig } from 'axios';

import { Configuration } from './configuration';
import { userSettingsApi } from './resources/user-settings/user-settings.api';
import { UserSettingsRequestModel, UserSettingsResponseModel } from './resources/user-settings/user-settings-api.types';
import { versionApi } from './resources/version/version.api';
import { collectionApi } from './resources/collection/collection.api';
import { Table } from './resources/collection/collection.api.types';
import { generateDataApi } from './resources/generate-data/generate-data.api';
import { JobScanModel, StrictMode } from './resources/generate-data/generate-data.api.types';
import { privacyApi } from './resources/privacy/privacy.api';
import { IgnorePrivacyPostParams, SetPrivacyPostParams } from './resources/privacy/privacy.api.types';
import {
  ResolveMultipleSchemaDiffParams,
  ResolveSchemaDiffParams,
  SchemaDiffItem,
  SchemaDiffResolveMultipleRequestModel,
  SchemaDiffResolveRequestModel,
} from './resources/schema-diff/schema-diff.api.types';
import { schemaDiffApi } from './resources/schema-diff/schema-diff.api';
import { piiReportApi } from './resources/pii-report/pii-report.api';
import { PiiReportRun } from './resources/pii-report/pii-report.api.types';

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

  // DataGeneration
  public getDataGenerationJobs(workspaceId?: string, options?: AxiosRequestConfig): AxiosPromise<Array<JobScanModel>> {
    return generateDataApi(this.configuration)
      .getGenerateDataJobs({ workspaceId }, options)
      .then((request) => request(this.axios, this.basePath));
  }

  public getDataGenerationJob(databaseScanId: string, options?: AxiosRequestConfig): AxiosPromise<JobScanModel> {
    return generateDataApi(this.configuration)
      .getGenerateDataJob({ databaseScanId }, options)
      .then((request) => request(this.axios, this.basePath));
  }

  public startDataGenerationJob(
    workspaceId: string,
    strictMode?: StrictMode,
    options?: AxiosRequestConfig
  ): AxiosPromise<JobScanModel> {
    return generateDataApi(this.configuration)
      .startDataGenerationJob({ workspaceId, strictMode }, options)
      .then((request) => request(this.axios, this.basePath));
  }

  public cancelDataGenerationJob(
    workspaceId: string,
    generateDataId: string,
    options?: AxiosRequestConfig
  ): AxiosPromise {
    return generateDataApi(this.configuration)
      .cancelDataGenerationJob({ workspaceId, generateDataId }, options)
      .then((request) => request(this.axios, this.basePath));
  }

  //PiiReport
  public async getMostRecentActiveOrCompletedPiiReport(workspaceId: string): Promise<JobScanModel> {
    const piiReport = await piiReportApi(this.configuration)
      .getMostRecentActiveOrCompletedPiiReport({ workspaceId })
      .then((request) => request(this.axios, this.basePath));

    if (piiReport.status === 200) {
      return piiReport.data;
    }

    throw new Error(piiReport.statusText);
  }

  public async getPiiReport(workspaceId: string): Promise<JobScanModel[]> {
    const piiReport = await piiReportApi(this.configuration)
      .getPiiReport({ workspaceId })
      .then((request) => request(this.axios, this.basePath));

    if (piiReport.status === 200) {
      return piiReport.data;
    }

    throw new Error(piiReport.statusText);
  }

  public async startPiiReport(workspaceId: string): Promise<PiiReportRun> {
    const piiReport = await piiReportApi(this.configuration)
      .startPiiReport({ workspaceId })
      .then((request) => request(this.axios, this.basePath));

    if (piiReport.status === 200) {
      return piiReport.data;
    }

    throw new Error(piiReport.statusText);
  }

  public async cancelPiiReport(piiReportId: string): Promise<boolean> {
    const piiReport = await piiReportApi(this.configuration)
      .cancelPiiReport({ piiReportId })
      .then((request) => request(this.axios, this.basePath));

    if (piiReport.status === 200) {
      return true;
    }

    throw new Error(piiReport.statusText);
  }

  // public startPiiReport()
  // public cancelPiiReport()

  //Privacy
  public getPrivacyHistory(workspaceId: string, options?: AxiosRequestConfig): AxiosPromise<string> {
    return privacyApi(this.configuration)
      .getPrivacyHistory({ workspaceId }, options)
      .then((request) => request(this.axios, this.basePath));
  }

  public getPrivacySuggestions(workspaceId: string, options?: AxiosRequestConfig): AxiosPromise<string> {
    return privacyApi(this.configuration)
      .getPrivacySuggestions({ workspaceId }, options)
      .then((request) => request(this.axios, this.basePath));
  }

  public getPrivacyForColumns(workspaceId: string, options?: AxiosRequestConfig): AxiosPromise<string> {
    return privacyApi(this.configuration)
      .getPrivacyForColumns({ workspaceId }, options)
      .then((request) => request(this.axios, this.basePath));
  }

  public getPiiTypeForColumns(workspaceId: string, options?: AxiosRequestConfig): AxiosPromise<string> {
    return privacyApi(this.configuration)
      .getPiiTypeForColumns({ workspaceId }, options)
      .then((request) => request(this.axios, this.basePath));
  }

  public ignorePrivacy(params: IgnorePrivacyPostParams, options?: AxiosRequestConfig): AxiosPromise<string> {
    return privacyApi(this.configuration)
      .ignorePrivacy(params, options)
      .then((request) => request(this.axios, this.basePath));
  }

  public setPrivacy(params: SetPrivacyPostParams, options?: AxiosRequestConfig): AxiosPromise<string> {
    return privacyApi(this.configuration)
      .setPrivacy(params, options)
      .then((request) => request(this.axios, this.basePath));
  }

  //SchemaDiff
  public getSchemaDiff(workspaceId: string, options?: AxiosRequestConfig): AxiosPromise<SchemaDiffItem[]> {
    return schemaDiffApi(this.configuration)
      .getSchemaDiff({ workspaceId }, options)
      .then((request) => request(this.axios, this.basePath));
  }

  public resolveSchemaDiff(
    params: ResolveSchemaDiffParams,
    options?: AxiosRequestConfig
  ): AxiosPromise<SchemaDiffResolveRequestModel> {
    return schemaDiffApi(this.configuration)
      .resolveSchemaDiff(params, options)
      .then((request) => request(this.axios, this.basePath));
  }

  public resolveMultipleSchemaDiffs(
    params: ResolveMultipleSchemaDiffParams,
    options?: AxiosRequestConfig
  ): AxiosPromise<SchemaDiffResolveMultipleRequestModel> {
    return schemaDiffApi(this.configuration)
      .resolveMultipleSchemaDiff(params, options)
      .then((request) => request(this.axios, this.basePath));
  }

  //User Settings
  public getUserSettings(options?: AxiosRequestConfig): AxiosPromise<UserSettingsResponseModel> {
    return userSettingsApi(this.configuration)
      .getUserSettings(options)
      .then((request) => request(this.axios, this.basePath));
  }

  public updateUserSettings(
    params: UserSettingsRequestModel,
    options?: AxiosRequestConfig
  ): AxiosPromise<UserSettingsResponseModel> {
    return userSettingsApi(this.configuration)
      .updateUserSettings(params, options)
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
