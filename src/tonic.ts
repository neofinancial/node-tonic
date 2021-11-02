import globalAxios, { AxiosInstance, AxiosPromise, AxiosRequestConfig } from 'axios';

import { Configuration } from './configuration';
import { userSettingsApi } from './resources/user-settings/user-settings.api';
import { UserSettingsRequestModel, UserSettingsResponseModel } from './resources/user-settings/user-settings-api.types';
import { versionApi } from './resources/version/version.api';
import { collectionApi } from './resources/collection/collection.api';
import { Table } from './resources/collection/collection.api.types';
import { generateDataApi } from './resources/generate-data/generate-data.api';
import { IdModel, JobScanModel, StrictMode } from './resources/generate-data/generate-data.api.types';
import { privacyApi } from './resources/privacy/privacy.api';
import { IgnorePrivacyPostParams, PiiTypeForColumnsResponse, SetPrivacyPostParams } from './resources/privacy/privacy.api.types';
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
import { DataSource } from './resources/data-source/data-source.api.types';
import { dataSourceApi } from './resources/data-source/data-source.api';

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

  public async handleRequest<T>(request: (axios: AxiosInstance, basePath: string) => AxiosPromise<T>): Promise<T> {
    const result = await request(this.axios, this.basePath);

    if (result.status !== 200) {
      throw new Error(result.statusText);
    }

    return result.data;
  }

  // Collection
  public async getCollections(workspaceId?: string): Promise<Table[]> {
    const request = await collectionApi(this.configuration).getCollections({ workspaceId });

    return this.handleRequest<Table[]>(request);
  }

  public async getCollectionNames(workspaceId?: string): Promise<string[]> {
    const request = await collectionApi(this.configuration).getCollectionNames({ workspaceId });

    return this.handleRequest<string[]>(request);
  }

  // DataGeneration
  public async getDataGenerationJobs(workspaceId?: string): Promise<JobScanModel[]> {
    const request = await generateDataApi(this.configuration).getGenerateDataJobs({ workspaceId });

    return this.handleRequest<JobScanModel[]>(request);
  }

  public async getDataGenerationJob(databaseScanId: string): Promise<JobScanModel> {
    const request = await generateDataApi(this.configuration).getGenerateDataJob({ databaseScanId });

    return this.handleRequest<JobScanModel>(request);
  }

  public async startDataGenerationJob(workspaceId: string, strictMode?: StrictMode): Promise<IdModel> {
    const request = await generateDataApi(this.configuration).startDataGenerationJob({ workspaceId, strictMode });

    return this.handleRequest<IdModel>(request);
  }

  public async cancelDataGenerationJob(workspaceId: string, generateDataId: string): Promise<unknown> {
    const request = await generateDataApi(this.configuration).cancelDataGenerationJob({ workspaceId, generateDataId });

    return this.handleRequest<unknown>(request);
  }

  // DataSource
  public async getDataSource(workspaceId: string): Promise<DataSource> {
    const request = await dataSourceApi(this.configuration).getDataSource(workspaceId);

    return this.handleRequest<DataSource>(request);
  }

  public async getDataSourceMinimal(workspaceId: string): Promise<DataSource> {
    const request = await dataSourceApi(this.configuration).getDataSourceMinimal(workspaceId);

    return this.handleRequest<DataSource>(request);
  }


  //PiiReport
  public async getMostRecentActiveOrCompletedPiiReport(workspaceId: string): Promise<JobScanModel> {
    const request = await piiReportApi(this.configuration).getMostRecentActiveOrCompletedPiiReport({ workspaceId });

    return this.handleRequest<JobScanModel>(request);
  }

  public async getPiiReport(workspaceId: string): Promise<JobScanModel[]> {
    const request = await piiReportApi(this.configuration).getPiiReport({ workspaceId });

    return this.handleRequest<JobScanModel[]>(request);
  }

  public async startPiiReport(workspaceId: string): Promise<PiiReportRun> {
    const request = await piiReportApi(this.configuration).startPiiReport({ workspaceId });

    return this.handleRequest<PiiReportRun>(request);
  }

  public async cancelPiiReport(piiReportId: string): Promise<unknown> {
    const request = await piiReportApi(this.configuration).cancelPiiReport({ piiReportId });

    return this.handleRequest<unknown>(request);
  }

  //Privacy
  public async getPrivacyHistory(workspaceId: string): Promise<string> {
    const request = await privacyApi(this.configuration).getPrivacyHistory({ workspaceId });

    return this.handleRequest<string>(request);
  }

  public async getPrivacySuggestions(workspaceId: string): Promise<string> {
    const request = await privacyApi(this.configuration).getPrivacySuggestions({ workspaceId });

    return this.handleRequest<string>(request);
  }

  public async getPrivacyForColumns(workspaceId: string): Promise<string> {
    const request = await privacyApi(this.configuration).getPrivacyForColumns({ workspaceId });

    return this.handleRequest<string>(request);
  }

  public async getPiiTypeForColumns(workspaceId: string): Promise<PiiTypeForColumnsResponse[]> {
    const request = await privacyApi(this.configuration).getPiiTypeForColumns({ workspaceId });

    return this.handleRequest<PiiTypeForColumnsResponse[]>(request);
  }

  public async ignorePrivacy(params: IgnorePrivacyPostParams): Promise<string> {
    const request = await privacyApi(this.configuration).ignorePrivacy(params);

    return this.handleRequest<string>(request);
  }

  public async setPrivacy(params: SetPrivacyPostParams): Promise<string> {
    const request = await privacyApi(this.configuration).setPrivacy(params);

    return this.handleRequest<string>(request);
  }

  //SchemaDiff
  public async getSchemaDiff(workspaceId: string): Promise<SchemaDiffItem[]> {
    const request = await schemaDiffApi(this.configuration).getSchemaDiff({ workspaceId });

    return this.handleRequest<SchemaDiffItem[]>(request);
  }

  public async resolveSchemaDiff(params: ResolveSchemaDiffParams): Promise<SchemaDiffResolveRequestModel> {
    const request = await schemaDiffApi(this.configuration).resolveSchemaDiff(params);

    return this.handleRequest<SchemaDiffResolveRequestModel>(request);
  }

  public async resolveMultipleSchemaDiffs(
    params: ResolveMultipleSchemaDiffParams
  ): Promise<SchemaDiffResolveMultipleRequestModel> {
    const request = await schemaDiffApi(this.configuration).resolveMultipleSchemaDiff(params);

    return this.handleRequest<SchemaDiffResolveMultipleRequestModel>(request);
  }

  //User Settings
  public async getUserSettings(): Promise<UserSettingsResponseModel> {
    const request = await userSettingsApi(this.configuration).getUserSettings();

    return this.handleRequest<UserSettingsResponseModel>(request);
  }

  public async updateUserSettings(params: UserSettingsRequestModel): Promise<UserSettingsResponseModel> {
    const request = await userSettingsApi(this.configuration).updateUserSettings(params);

    return this.handleRequest<UserSettingsResponseModel>(request);
  }

  // Version
  public async getVersion(): Promise<number> {
    const request = await versionApi(this.configuration).getVersion();

    return this.handleRequest<number>(request);
  }
}

export default Tonic;
export { Tonic };
