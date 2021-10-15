import { AxiosInstance } from 'axios';
import { stub } from 'jest-auto-stub';

import { Configuration } from '../../src/configuration';
import { versionApi, versionApiRequestArgsCreator } from '../../src/version-api/version.api';


describe('versionApiRequestArgsCreator', () => {
  const config: Configuration = {
    apiKey: 'test-api-key',
    basePath: 'tonic-url'
  }

  describe('getVersionRequestArgs', () => {
    it('should return /api/Version for url', async () => {
      const args = await versionApiRequestArgsCreator(config).getVersionRequestArgs();

      expect(args.url).toBe('/api/Version')
    })

    it('should use apiKey from configuration in options', async () => {
      const args = await versionApiRequestArgsCreator(config).getVersionRequestArgs();

      expect(args.options).toBe({"headers": {"Authorization": config.apiKey}, "method": "GET"})
    })
  })
});

describe('versionApi', () => {
  describe('getVersion', () => {

    const config: Configuration = {
      apiKey: 'test-api-key',
      basePath: 'tonic-url'
    }

    const defaultRequestParameters = {
      headers: {
        Authorization: config.apiKey,
      },
      method: 'GET',
      url: `${config.basePath}/api/Version`,
    };

    it('should return a promise that calls axios with the default parameters', async () => {
      const result = versionApi(config).getVersion();
      const axiosMock = stub<AxiosInstance>();

      await result.then(result => result(axiosMock, config.basePath));

      expect(axiosMock.request).toHaveBeenCalledWith(defaultRequestParameters);
    })
  })
})
