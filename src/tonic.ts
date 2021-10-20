import globalAxios, { AxiosInstance, AxiosRequestConfig } from 'axios';

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
  public async getCollections(workspaceId?: string): Promise<Table[]> {
    const result = await collectionApi(this.configuration)
      .getCollections({ workspaceId })
      .then((request) => request(this.axios, this.basePath));

    if (result.status !== 200) {
      throw new Error(result.statusText);
    }

    return result.data;
  }

  public async getCollectionNames(workspaceId?: string): Promise<string[]> {
    const result = await collectionApi(this.configuration)
      .getCollectionNames({ workspaceId })
      .then((request) => request(this.axios, this.basePath));

    if (result.status !== 200) {
      throw new Error(result.statusText);
    }

    return result.data;
  }

  // DataGeneration
  public async getDataGenerationJobs(workspaceId?: string): Promise<JobScanModel[]> {
    const result = await generateDataApi(this.configuration)
      .getGenerateDataJobs({ workspaceId })
      .then((request) => request(this.axios, this.basePath));

    if (result.status !== 200) {
      throw new Error(result.statusText);
    }

    return result.data;
  }

  public async getDataGenerationJob(databaseScanId: string): Promise<JobScanModel> {
    const result = await generateDataApi(this.configuration)
      .getGenerateDataJob({ databaseScanId })
      .then((request) => request(this.axios, this.basePath));

    if (result.status !== 200) {
      throw new Error(result.statusText);
    }

    return result.data;
  }

  public async startDataGenerationJob(workspaceId: string, strictMode?: StrictMode): Promise<JobScanModel> {
    const result = await generateDataApi(this.configuration)
      .startDataGenerationJob({ workspaceId, strictMode })
      .then((request) => request(this.axios, this.basePath));

    if (result.status !== 200) {
      throw new Error(result.statusText);
    }

    return result.data;
  }

  public async cancelDataGenerationJob(workspaceId: string, generateDataId: string): Promise<boolean> {
    const result = await generateDataApi(this.configuration)
      .cancelDataGenerationJob({ workspaceId, generateDataId })
      .then((request) => request(this.axios, this.basePath));

    if (result.status !== 200) {
      throw new Error(result.statusText);
    }

    return true;
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
  public async getPrivacyHistory(workspaceId: string): Promise<string> {
    const result = await privacyApi(this.configuration)
      .getPrivacyHistory({ workspaceId })
      .then((request) => request(this.axios, this.basePath));

    if (result.status !== 200) {
      throw new Error(result.statusText);
    }

    return result.data;
  }

  public async getPrivacySuggestions(workspaceId: string): Promise<string> {
    const result = await privacyApi(this.configuration)
      .getPrivacySuggestions({ workspaceId })
      .then((request) => request(this.axios, this.basePath));

    if (result.status !== 200) {
      throw new Error(result.statusText);
    }

    return result.data;
  }

  public async getPrivacyForColumns(workspaceId: string): Promise<string> {
    const result = await privacyApi(this.configuration)
      .getPrivacyForColumns({ workspaceId })
      .then((request) => request(this.axios, this.basePath));

    if (result.status !== 200) {
      throw new Error(result.statusText);
    }

    return result.data;
  }

  public async getPiiTypeForColumns(workspaceId: string): Promise<string> {
    const result = await privacyApi(this.configuration)
      .getPiiTypeForColumns({ workspaceId })
      .then((request) => request(this.axios, this.basePath));

    if (result.status !== 200) {
      throw new Error(result.statusText);
    }

    return result.data;
  }

  public async ignorePrivacy(params: IgnorePrivacyPostParams): Promise<string> {
    const result = await privacyApi(this.configuration)
      .ignorePrivacy(params)
      .then((request) => request(this.axios, this.basePath));

    if (result.status !== 200) {
      throw new Error(result.statusText);
    }

    return result.data;
  }

  public async setPrivacy(params: SetPrivacyPostParams): Promise<string> {
    const result = await privacyApi(this.configuration)
      .setPrivacy(params)
      .then((request) => request(this.axios, this.basePath));

    if (result.status !== 200) {
      throw new Error(result.statusText);
    }

    return result.data;
  }

  //SchemaDiff
  public async getSchemaDiff(workspaceId: string): Promise<SchemaDiffItem[]> {
    const result = await schemaDiffApi(this.configuration)
      .getSchemaDiff({ workspaceId })
      .then((request) => request(this.axios, this.basePath));

    if (result.status !== 200) {
      throw new Error(result.statusText);
    }

    return result.data;
  }

  public async resolveSchemaDiff(params: ResolveSchemaDiffParams): Promise<SchemaDiffResolveRequestModel> {
    const result = await schemaDiffApi(this.configuration)
      .resolveSchemaDiff(params)
      .then((request) => request(this.axios, this.basePath));

    if (result.status !== 200) {
      throw new Error(result.statusText);
    }

    return result.data;
  }

  public async resolveMultipleSchemaDiffs(
    params: ResolveMultipleSchemaDiffParams
  ): Promise<SchemaDiffResolveMultipleRequestModel> {
    const result = await schemaDiffApi(this.configuration)
      .resolveMultipleSchemaDiff(params)
      .then((request) => request(this.axios, this.basePath));

    if (result.status !== 200) {
      throw new Error(result.statusText);
    }

    return result.data;
  }

  //User Settings
  public async getUserSettings(): Promise<UserSettingsResponseModel> {
    const result = await userSettingsApi(this.configuration)
      .getUserSettings()
      .then((request) => request(this.axios, this.basePath));

    if (result.status !== 200) {
      throw new Error(result.statusText);
    }

    return result.data;
  }

  public async updateUserSettings(params: UserSettingsRequestModel): Promise<UserSettingsResponseModel> {
    const result = await userSettingsApi(this.configuration)
      .updateUserSettings(params)
      .then((request) => request(this.axios, this.basePath));

    if (result.status !== 200) {
      throw new Error(result.statusText);
    }

    return result.data;
  }

  // Version
  public async getVersion(): Promise<number> {
    const result = await versionApi(this.configuration)
      .getVersion()
      .then((request) => request(this.axios, this.basePath));

    if (result.status !== 200) {
      throw new Error(result.statusText);
    }

    return result.data;
  }
}

export default Tonic;
export { Tonic };
