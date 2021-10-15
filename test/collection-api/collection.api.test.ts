import { AxiosInstance } from 'axios';
import { stub } from 'jest-auto-stub';

import { collectionApi, collectionApiRequestArgsCreator } from '../../src/collection-api/collection.api';

import { Configuration } from '../../src/configuration';

describe('collectionApiRequestArgsCreator', () => {
  const config: Configuration = {
    apiKey: 'test-api-key',
    basePath: 'tonic-url',
  };

  const defaultParams = {
    workspaceId: 'workspace-id'
  }

  describe('getCollectionsRequestArgs', () => {
    it('should return /api/Collection/full for url', async () => {
      const args = await collectionApiRequestArgsCreator(config).getCollectionsRequestArgs(defaultParams);

      expect(args.url).toBe(`/api/Collection/full?workspaceId=${defaultParams.workspaceId}`);
    });

    it('should use apiKey from configuration in options', async () => {
      const args = await collectionApiRequestArgsCreator(config).getCollectionsRequestArgs(defaultParams);

      expect(args.options).toEqual({ headers: { Authorization: config.apiKey }, method: 'GET' });
    });
  });

  describe('getCollectionNamesRequestArgs', () => {
    it('should return /api/Collection for url', async () => {
      const args = await collectionApiRequestArgsCreator(config).getCollectionNamesRequestArgs(defaultParams);

      expect(args.url).toBe(`/api/Collection?workspaceId=${defaultParams.workspaceId}`);
    });

    it('should use apiKey from configuration in options', async () => {
      const args = await collectionApiRequestArgsCreator(config).getCollectionNamesRequestArgs(defaultParams);

      expect(args.options).toEqual({ headers: { Authorization: config.apiKey }, method: 'GET' });
    });
  })
});

describe('collectionApi', () => {
  const config: Configuration = {
    apiKey: 'test-api-key',
    basePath: 'tonic-url',
  };

  const defaultParams = {
    workspaceId: 'workspace-id'
  }

  describe('getCollections', () => {
    const defaultRequestParameters = {
      headers: {
        Authorization: config.apiKey,
      },
      method: 'GET',
      url: `${config.basePath}/api/Collection/full?workspaceId=${defaultParams.workspaceId}`,
    };

    it('should return a promise that calls axios with the default parameters', async () => {
      const result = collectionApi(config).getCollections(defaultParams);
      const axiosMock = stub<AxiosInstance>();

      await result.then((result) => result(axiosMock, config.basePath));

      expect(axiosMock.request).toHaveBeenCalledWith(defaultRequestParameters);
    });
  });

  describe('getCollectionNames', () => {
    const defaultRequestParameters = {
      headers: {
        Authorization: config.apiKey,
      },
      method: 'GET',
      url: `${config.basePath}/api/Collection?workspaceId=${defaultParams.workspaceId}`,
    };

    it('should return a promise that calls axios with the default parameters', async () => {
      const result = collectionApi(config).getCollectionNames(defaultParams);
      const axiosMock = stub<AxiosInstance>();

      await result.then((result) => result(axiosMock, config.basePath));

      expect(axiosMock.request).toHaveBeenCalledWith(defaultRequestParameters);
    });
  });
});
