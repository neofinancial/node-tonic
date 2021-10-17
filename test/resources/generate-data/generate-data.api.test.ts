import { AxiosInstance } from 'axios';
import { stub } from 'jest-auto-stub';
import qs from 'qs';

import { Configuration } from '../../../src/configuration';
import {
  generateDataApi,
  generateDataApiRequestArgsCreator,
} from '../../../src/resources/generate-data/generate-data.api';
import {
  GenerateDataCancelParams,
  GenerateDataJobParams,
  GenerateDataJobsParams,
  GenerateDataStartParams,
} from '../../../src/resources/generate-data/generate-data.api.types';

describe('generate-data-api', () => {
  describe('generateDataApiRequestArgsCreator', () => {
    const config: Configuration = {
      apiKey: 'test-api-key',
      basePath: 'tonic-url',
    };

    describe('getGetGenerateDataJobsRequestArgs', () => {
      const defaultParams: GenerateDataJobsParams = {
        workspaceId: 'workspace-id',
      };

      it('should return /api/GenerateData for url', async () => {
        const args = await generateDataApiRequestArgsCreator(config).getGetGenerateDataJobsRequestArgs(defaultParams);

        expect(args.url).toBe(`/api/GenerateData?${qs.stringify(defaultParams)}`);
      });

      it('should use apiKey from configuration in options', async () => {
        const args = await generateDataApiRequestArgsCreator(config).getGetGenerateDataJobsRequestArgs(defaultParams);

        expect(args.options).toEqual({ headers: { Authorization: config.apiKey }, method: 'GET' });
      });
    });

    describe('getGetGenerateDataJobRequestArgs', () => {
      const defaultParams: GenerateDataJobParams = {
        databaseScanId: 'database-scan-id',
      };

      it('should return /api/GenerateData for url', async () => {
        const args = await generateDataApiRequestArgsCreator(config).getGetGenerateDataJobRequestArgs(defaultParams);

        expect(args.url).toBe(`/api/GenerateData/jobs/${defaultParams.databaseScanId}`);
      });

      it('should use apiKey from configuration in options', async () => {
        const args = await generateDataApiRequestArgsCreator(config).getGetGenerateDataJobRequestArgs(defaultParams);

        expect(args.options).toEqual({
          headers: { Authorization: config.apiKey },
          method: 'GET',
        });
      });
    });

    describe('getStartDataGenerationJobRequestArgs', () => {
      const defaultParams: GenerateDataStartParams = {
        workspaceId: 'workspace-id',
        strictMode: 'NotStrict',
      };

      it('should return /api/GenerateData/start for url', async () => {
        const args = await generateDataApiRequestArgsCreator(config).getStartDataGenerationJobRequestArgs(
          defaultParams
        );

        expect(args.url).toBe(`/api/GenerateData/start?${qs.stringify(defaultParams)}`);
      });

      it('should use apiKey from configuration in options and method POST', async () => {
        const args = await generateDataApiRequestArgsCreator(config).getStartDataGenerationJobRequestArgs(
          defaultParams
        );

        expect(args.options).toEqual({
          headers: { Authorization: config.apiKey, 'Content-Type': 'application/json' },
          method: 'POST',
          data: {},
        });
      });
    });

    describe('getCancelDataGenerationJobRequestArgs', () => {
      const defaultParams: GenerateDataCancelParams = {
        workspaceId: 'workspace-id',
        generateDataId: 'generate-data-id',
      };

      it('should return /api/GenerateData/cancel for url', async () => {
        const args = await generateDataApiRequestArgsCreator(config).getCancelDataGenerationJobRequestArgs(
          defaultParams
        );

        expect(args.url).toBe(`/api/GenerateData/cancel?${qs.stringify(defaultParams)}`);
      });

      it('should use apiKey from configuration in options and method POST', async () => {
        const args = await generateDataApiRequestArgsCreator(config).getCancelDataGenerationJobRequestArgs(
          defaultParams
        );

        expect(args.options).toEqual({
          headers: { Authorization: config.apiKey, 'Content-Type': 'application/json' },
          method: 'POST',
          data: {},
        });
      });
    });
  });

  describe('generateDataApi', () => {
    const config: Configuration = {
      apiKey: 'test-api-key',
      basePath: 'tonic-url',
    };
    // startDataGenerationJob
    // cancelDataGenerationJob

    describe('getGenerateDataJobs', () => {
      const inputRequestParameters: GenerateDataJobsParams = {
        workspaceId: 'workspace-id',
      };

      const defaultRequestParameters = {
        headers: {
          Authorization: config.apiKey,
        },
        method: 'GET',
        url: `${config.basePath}/api/GenerateData?${qs.stringify(inputRequestParameters)}`,
      };

      it('should return a promise that calls axios with the default parameters', async () => {
        const result = generateDataApi(config).getGenerateDataJobs(inputRequestParameters);
        const axiosMock = stub<AxiosInstance>();

        await result.then((result) => result(axiosMock, config.basePath));

        expect(axiosMock.request).toHaveBeenCalledWith(defaultRequestParameters);
      });
    });

    describe('getGenerateDataJob', () => {
      const inputRequestParameters: GenerateDataJobParams = {
        databaseScanId: 'database-scan-id',
      };

      const defaultRequestParameters = {
        headers: {
          Authorization: config.apiKey,
        },
        method: 'GET',
        url: `${config.basePath}/api/GenerateData/jobs/${inputRequestParameters.databaseScanId}`,
      };

      it('should return a promise that calls axios with the default parameters', async () => {
        const result = generateDataApi(config).getGenerateDataJob(inputRequestParameters);
        const axiosMock = stub<AxiosInstance>();

        await result.then((result) => result(axiosMock, config.basePath));

        expect(axiosMock.request).toHaveBeenCalledWith(defaultRequestParameters);
      });
    });

    describe('startDataGenerationJob', () => {
      const testParams: GenerateDataStartParams = {
        workspaceId: 'workspace-id',
        strictMode: 'NotStrict',
      };

      const defaultRequestParameters = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: config.apiKey,
        },
        method: 'POST',
        data: {},
        url: `${config.basePath}/api/GenerateData/start?${qs.stringify(testParams)}`,
      };

      it('should return a promise that calls axios with the default parameters', async () => {
        const result = generateDataApi(config).startDataGenerationJob(testParams);
        const axiosMock = stub<AxiosInstance>();

        await result.then((result) => result(axiosMock, config.basePath));

        expect(axiosMock.request).toHaveBeenCalledWith(defaultRequestParameters);
      });
    });

    describe('cancelDataGenerationJob', () => {
      const testParams: GenerateDataStartParams = {
        workspaceId: 'workspace-id',
        strictMode: 'NotStrict',
      };

      const defaultRequestParameters = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: config.apiKey,
        },
        method: 'POST',
        data: {},
        url: `${config.basePath}/api/GenerateData/cancel?${qs.stringify(testParams)}`,
      };

      it('should return a promise that calls axios with the default parameters', async () => {
        const result = generateDataApi(config).cancelDataGenerationJob(testParams);
        const axiosMock = stub<AxiosInstance>();

        await result.then((result) => result(axiosMock, config.basePath));

        expect(axiosMock.request).toHaveBeenCalledWith(defaultRequestParameters);
      });
    });
  });
});
