import { AxiosInstance } from 'axios';
import { stub } from 'jest-auto-stub';
import qs from 'qs';

import { Configuration } from '../../../src/configuration';
import { schemaDiffApi, schemaDiffAPIRequestArgsCreator } from '../../../src/resources/schema-diff/schema-diff.api';
import {
  ResolveMultipleSchemaDiffParams,
  ResolveSchemaDiffParams,
} from '../../../src/resources/schema-diff/schema-diff.api.types';

describe('schema-diff-api', () => {
  describe('generateDataApiRequestArgsCreator', () => {
    const config: Configuration = {
      apiKey: 'test-api-key',
      basePath: 'tonic-url',
    };

    describe('getGetSchemaDiffRequestArgs', () => {
      const defaultParams = {
        workspaceId: 'workspace-id',
      };

      it('should return /api/GenerateData for url', async () => {
        const args = await schemaDiffAPIRequestArgsCreator(config).getGetSchemaDiffRequestArgs(defaultParams);

        expect(args.url).toBe(`/api/SchemaDiff?${qs.stringify(defaultParams)}`);
      });

      it('should use apiKey from configuration in options', async () => {
        const args = await schemaDiffAPIRequestArgsCreator(config).getGetSchemaDiffRequestArgs(defaultParams);

        expect(args.options).toEqual({ headers: { Authorization: config.apiKey }, method: 'GET' });
      });
    });

    describe('getResolveSchemaDiffRequestArgs', () => {
      const defaultPostParams: ResolveSchemaDiffParams = {
        workspaceId: 'workspace-id',
        issueCode: 'new_column',
      };

      it('should return /api/GenerateData for url', async () => {
        const args = await schemaDiffAPIRequestArgsCreator(config).getResolveSchemaDiffRequestArgs(defaultPostParams);

        expect(args.url).toBe(`/api/SchemaDiff/resolve`);
      });

      it('should use apiKey from configuration in options', async () => {
        const args = await schemaDiffAPIRequestArgsCreator(config).getResolveSchemaDiffRequestArgs(defaultPostParams);

        expect(args.options).toEqual({
          data: JSON.stringify(defaultPostParams),
          headers: { Authorization: config.apiKey, 'Content-Type': 'application/json' },
          method: 'POST',
        });
      });
    });

    describe('getResolveMultipleSchemaDiffRequestArgs', () => {
      const defaultPostParams: ResolveMultipleSchemaDiffParams = {
        items: [
          {
            workspaceId: 'workspace-id',
            issueCode: 'new_collection',
          },
        ],
      };

      it('should return /api/GenerateData for url', async () => {
        const args = await schemaDiffAPIRequestArgsCreator(config).getResolveMultipleSchemaDiffRequestArgs(
          defaultPostParams
        );

        expect(args.url).toBe(`/api/SchemaDiff/resolve_multiple`);
      });

      it('should use apiKey from configuration in options', async () => {
        const args = await schemaDiffAPIRequestArgsCreator(config).getResolveMultipleSchemaDiffRequestArgs(
          defaultPostParams
        );

        expect(args.options).toEqual({
          data: JSON.stringify(defaultPostParams),
          headers: { Authorization: config.apiKey, 'Content-Type': 'application/json' },
          method: 'POST',
        });
      });
    });
  });

  describe('schemaDiffApi', () => {
    const config: Configuration = {
      apiKey: 'test-api-key',
      basePath: 'tonic-url',
    };

    describe('getGenerateDataJobs', () => {
      const inputRequestParameters = {
        workspaceId: 'workspace-id',
      };

      const defaultRequestParameters = {
        headers: {
          Authorization: config.apiKey,
        },
        method: 'GET',
        url: `${config.basePath}/api/SchemaDiff?${qs.stringify(inputRequestParameters)}`,
      };

      it('should return a promise that calls axios with the default parameters', async () => {
        const result = schemaDiffApi(config).getSchemaDiff(inputRequestParameters);
        const axiosMock = stub<AxiosInstance>();

        await result.then((result) => result(axiosMock, config.basePath));

        expect(axiosMock.request).toHaveBeenCalledWith(defaultRequestParameters);
      });
    });

    describe('resolveSchemaDiff', () => {
      const defaultPostParams: ResolveSchemaDiffParams = {
        workspaceId: 'workspace-id',
        issueCode: 'new_column',
      };

      const defaultRequestParameters = {
        data: JSON.stringify(defaultPostParams),
        headers: {
          Authorization: config.apiKey,
          'Content-Type': 'application/json',
        },
        method: 'POST',
        url: `${config.basePath}/api/SchemaDiff/resolve`,
      };

      it('should return a promise that calls axios with the default parameters', async () => {
        const result = schemaDiffApi(config).resolveSchemaDiff(defaultPostParams);
        const axiosMock = stub<AxiosInstance>();

        await result.then((result) => result(axiosMock, config.basePath));

        expect(axiosMock.request).toHaveBeenCalledWith(defaultRequestParameters);
      });
    });

    describe('resolveMultipleSchemaDiff', () => {
      const defaultPostParams: ResolveMultipleSchemaDiffParams = {
        items: [
          {
            workspaceId: 'workspace-id',
            issueCode: 'new_column',
          },
        ],
      };

      const defaultRequestParameters = {
        data: JSON.stringify(defaultPostParams),
        headers: {
          'Content-Type': 'application/json',
          Authorization: config.apiKey,
        },
        method: 'POST',
        url: `${config.basePath}/api/SchemaDiff/resolve_multiple`,
      };

      it('should return a promise that calls axios with the default parameters', async () => {
        const result = schemaDiffApi(config).resolveMultipleSchemaDiff(defaultPostParams);
        const axiosMock = stub<AxiosInstance>();

        await result.then((result) => result(axiosMock, config.basePath));

        expect(axiosMock.request).toHaveBeenCalledWith(defaultRequestParameters);
      });
    });
  });
});
