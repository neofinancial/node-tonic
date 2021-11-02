import { AxiosInstance } from 'axios';
import { stub } from 'jest-auto-stub';

import { Configuration } from '../../../src/configuration';
import { dataSourceApi, dataSourceApiRequestArgsCreator } from '../../../src/resources/data-source/data-source.api';

describe('dataSourceApiRequestArgsCreator', () => {
  const config: Configuration = {
    apiKey: 'test-api-key',
    basePath: 'tonic-url',
  };

  describe('getDataSourceRequestArgs', () => {
    const workspaceId = 'workspace-id';

    it('should return /api/DataSource for url', async () => {
      const args = await dataSourceApiRequestArgsCreator(config).getDataSourceRequestArgs({ workspaceId });

      expect(args.url).toBe(`/api/DataSource?workspaceId=${workspaceId}`);
    });

    it('should use apiKey from configuration in options', async () => {
      const args = await dataSourceApiRequestArgsCreator(config).getDataSourceRequestArgs({ workspaceId });

      expect(args.options).toEqual({ headers: { Authorization: config.apiKey }, method: 'GET' });
    });
  });

  describe('getDataSourceMinimalRequestArgs', () => {
    const workspaceId = 'workspace-id';

    it('should return /api/DataSource/minimal for url', async () => {
      const args = await dataSourceApiRequestArgsCreator(config).getDataSourceMinimalRequestArgs({ workspaceId });

      expect(args.url).toBe(`/api/DataSource/minimal?workspaceId=${workspaceId}`);
    });

    it('should use apiKey from configuration in options', async () => {
      const args = await dataSourceApiRequestArgsCreator(config).getDataSourceMinimalRequestArgs({ workspaceId });

      expect(args.options).toEqual({ headers: { Authorization: config.apiKey }, method: 'GET' });
    });
  });
});

describe('dataSourceApi', () => {
  describe('getDataSource', () => {
    const config: Configuration = {
      apiKey: 'test-api-key',
      basePath: 'tonic-url',
    };

    const workspaceId = 'test-workspace-id';

    const defaultRequestParameters = {
      headers: {
        Authorization: config.apiKey,
      },
      method: 'GET',
      url: `${config.basePath}/api/DataSource?workspaceId=${workspaceId}`,
    };


    it('should return a promise that calls axios with the default parameters', async () => {
      const result = dataSourceApi(config).getDataSource(workspaceId);
      const axiosMock = stub<AxiosInstance>();

      await result.then(result => result(axiosMock, config.basePath));

      expect(axiosMock.request).toHaveBeenCalledWith(defaultRequestParameters);
    });
  });

  describe('getDataSourceMinimal', () => {
    const config: Configuration = {
      apiKey: 'test-api-key',
      basePath: 'tonic-url',
    };

    const workspaceId = 'test-workspace-id';

    const defaultRequestParameters = {
      headers: {
        Authorization: config.apiKey,
      },
      method: 'GET',
      url: `${config.basePath}/api/DataSource/minimal?workspaceId=${workspaceId}`,
    };


    it('should return a promise that calls axios with the default parameters', async () => {
      const result = dataSourceApi(config).getDataSourceMinimal(workspaceId);
      const axiosMock = stub<AxiosInstance>();

      await result.then(result => result(axiosMock, config.basePath));

      expect(axiosMock.request).toHaveBeenCalledWith(defaultRequestParameters);
    });
  });
});
