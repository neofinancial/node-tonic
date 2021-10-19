import { AxiosInstance } from 'axios';
import { stub } from 'jest-auto-stub';
import qs from 'qs';

import { Configuration } from '../../../src/configuration';
import { privacyApi, privacyApiRequestArgsCreator } from '../../../src/resources/privacy/privacy.api';
import { SetPrivacyPostParams } from '../../../src/resources/privacy/privacy.api.types';

describe('privacy-api', () => {
  describe('privacyApiRequestArgsCreator', () => {
    const config: Configuration = {
      apiKey: 'test-api-key',
      basePath: 'tonic-url',
    };

    describe('getGetPrivacyHistoryRequestArgs', () => {
      const defaultParams = {
        workspaceId: 'workspace-id',
      };

      it('should return /api/Privacy/history for url', async () => {
        const args = await privacyApiRequestArgsCreator(config).getGetPrivacyHistoryRequestArgs(defaultParams);

        expect(args.url).toBe(`/api/Privacy/history?${qs.stringify(defaultParams)}`);
      });

      it('should use apiKey from configuration in options', async () => {
        const args = await privacyApiRequestArgsCreator(config).getGetPrivacyHistoryRequestArgs(defaultParams);

        expect(args.options).toEqual({ headers: { Authorization: config.apiKey }, method: 'GET' });
      });
    });

    describe('getGetPrivacySuggestionsRequestArgs', () => {
      const defaultParams = {
        workspaceId: 'workspace-id',
      };

      it('should return /api/Privacy/suggestions for url', async () => {
        const args = await privacyApiRequestArgsCreator(config).getGetPrivacySuggestionsRequestArgs(defaultParams);

        expect(args.url).toBe(`/api/Privacy/suggestions?${qs.stringify(defaultParams)}`);
      });

      it('should use apiKey from configuration in options', async () => {
        const args = await privacyApiRequestArgsCreator(config).getGetPrivacySuggestionsRequestArgs(defaultParams);

        expect(args.options).toEqual({ headers: { Authorization: config.apiKey }, method: 'GET' });
      });
    });

    describe('getGetPrivacyForColumnsRequestArgs', () => {
      const defaultParams = {
        workspaceId: 'workspace-id',
      };

      it('should return /api/Privacy/privacyforcolumns for url', async () => {
        const args = await privacyApiRequestArgsCreator(config).getGetPrivacyForColumnsRequestArgs(defaultParams);

        expect(args.url).toBe(`/api/Privacy/privacyforcolumns?${qs.stringify(defaultParams)}`);
      });

      it('should use apiKey from configuration in options', async () => {
        const args = await privacyApiRequestArgsCreator(config).getGetPrivacyForColumnsRequestArgs(defaultParams);

        expect(args.options).toEqual({ headers: { Authorization: config.apiKey }, method: 'GET' });
      });
    });

    describe('getGetPiiTypeForColumnsRequestArgs', () => {
      const defaultParams = {
        workspaceId: 'workspace-id',
      };

      it('should return /api/Privacy/piitypeforcolumns for url', async () => {
        const args = await privacyApiRequestArgsCreator(config).getGetPiiTypeForColumnsRequestArgs(defaultParams);

        expect(args.url).toBe(`/api/Privacy/piitypeforcolumns?${qs.stringify(defaultParams)}`);
      });

      it('should use apiKey from configuration in options', async () => {
        const args = await privacyApiRequestArgsCreator(config).getGetPiiTypeForColumnsRequestArgs(defaultParams);

        expect(args.options).toEqual({ headers: { Authorization: config.apiKey }, method: 'GET' });
      });
    });

    describe('getIgnorePrivacyRequestArgs', () => {
      const defaultPostParams = {
        workspaceId: 'workspace-id',
      };

      it('should return /api/Privacy/ignore for url', async () => {
        const args = await privacyApiRequestArgsCreator(config).getIgnorePrivacyRequestArgs(defaultPostParams);

        expect(args.url).toBe(`/api/Privacy/ignore`);
      });

      it('should use apiKey from configuration in options', async () => {
        const args = await privacyApiRequestArgsCreator(config).getIgnorePrivacyRequestArgs(defaultPostParams);

        expect(args.options).toEqual({
          data: JSON.stringify(defaultPostParams),
          headers: { Authorization: config.apiKey, 'Content-Type': 'application/json' },
          method: 'POST',
        });
      });
    });

    describe('getSetPrivacyRequestArgs', () => {
      const defaultPostParams = {
        workspaceId: 'workspace-id',
        columnKeys: [
          {
            schema: 'schema-name',
            table: 'table-name',
            columnName: 'column-name',
          },
        ],
      };

      it('should return /api/Privacy/set for url', async () => {
        const args = await privacyApiRequestArgsCreator(config).getSetPrivacyRequestArgs(defaultPostParams);

        expect(args.url).toBe(`/api/Privacy/set`);
      });

      it('should use apiKey from configuration in options', async () => {
        const args = await privacyApiRequestArgsCreator(config).getIgnorePrivacyRequestArgs(defaultPostParams);

        expect(args.options).toEqual({
          data: JSON.stringify(defaultPostParams),
          headers: { Authorization: config.apiKey, 'Content-Type': 'application/json' },
          method: 'POST',
        });
      });
    });
  });

  describe('privacyApi', () => {
    describe('getPrivacyHistory', () => {
      const config: Configuration = {
        apiKey: 'test-api-key',
        basePath: 'tonic-url',
      };
      const defaultParams = {
        workspaceId: 'workspace-id',
      };

      const defaultRequestParameters = {
        headers: {
          Authorization: config.apiKey,
        },
        method: 'GET',
        url: `${config.basePath}/api/Privacy/history?${qs.stringify(defaultParams)}`,
      };

      it('should return a promise that calls axios with the default parameters', async () => {
        const result = privacyApi(config).getPrivacyHistory(defaultParams);
        const axiosMock = stub<AxiosInstance>();

        await result.then((result) => result(axiosMock, config.basePath));

        expect(axiosMock.request).toHaveBeenCalledWith(defaultRequestParameters);
      });
    });

    describe('getPrivacySuggestions', () => {
      const config: Configuration = {
        apiKey: 'test-api-key',
        basePath: 'tonic-url',
      };
      const defaultParams = {
        workspaceId: 'workspace-id',
      };

      const defaultRequestParameters = {
        headers: {
          Authorization: config.apiKey,
        },
        method: 'GET',
        url: `${config.basePath}/api/Privacy/suggestions?${qs.stringify(defaultParams)}`,
      };

      it('should return a promise that calls axios with the default parameters', async () => {
        const result = privacyApi(config).getPrivacySuggestions(defaultParams);
        const axiosMock = stub<AxiosInstance>();

        await result.then((result) => result(axiosMock, config.basePath));

        expect(axiosMock.request).toHaveBeenCalledWith(defaultRequestParameters);
      });
    });

    describe('getPrivacyForColumns', () => {
      const config: Configuration = {
        apiKey: 'test-api-key',
        basePath: 'tonic-url',
      };
      const defaultParams = {
        workspaceId: 'workspace-id',
      };

      const defaultRequestParameters = {
        headers: {
          Authorization: config.apiKey,
        },
        method: 'GET',
        url: `${config.basePath}/api/Privacy/privacyforcolumns?${qs.stringify(defaultParams)}`,
      };

      it('should return a promise that calls axios with the default parameters', async () => {
        const result = privacyApi(config).getPrivacyForColumns(defaultParams);
        const axiosMock = stub<AxiosInstance>();

        await result.then((result) => result(axiosMock, config.basePath));

        expect(axiosMock.request).toHaveBeenCalledWith(defaultRequestParameters);
      });
    });

    describe('getPiiTypeForColumns', () => {
      const config: Configuration = {
        apiKey: 'test-api-key',
        basePath: 'tonic-url',
      };
      const defaultParams = {
        workspaceId: 'workspace-id',
      };

      const defaultRequestParameters = {
        headers: {
          Authorization: config.apiKey,
        },
        method: 'GET',
        url: `${config.basePath}/api/Privacy/piitypeforcolumns?${qs.stringify(defaultParams)}`,
      };

      it('should return a promise that calls axios with the default parameters', async () => {
        const result = privacyApi(config).getPiiTypeForColumns(defaultParams);
        const axiosMock = stub<AxiosInstance>();

        await result.then((result) => result(axiosMock, config.basePath));

        expect(axiosMock.request).toHaveBeenCalledWith(defaultRequestParameters);
      });
    });

    describe('ignorePrivacy', () => {
      const config: Configuration = {
        apiKey: 'test-api-key',
        basePath: 'tonic-url',
      };
      const defaultPostData = {
        workspaceId: 'workspace-id',
      };

      const defaultRequestParameters = {
        data: JSON.stringify(defaultPostData),
        headers: {
          Authorization: config.apiKey,
          'Content-Type': 'application/json',
        },
        method: 'POST',
        url: `${config.basePath}/api/Privacy/ignore`,
      };

      it('should return a promise that calls axios with the default parameters', async () => {
        const result = privacyApi(config).ignorePrivacy(defaultPostData);
        const axiosMock = stub<AxiosInstance>();

        await result.then((result) => result(axiosMock, config.basePath));

        expect(axiosMock.request).toHaveBeenCalledWith(defaultRequestParameters);
      });
    });

    describe('setPrivacy', () => {
      const config: Configuration = {
        apiKey: 'test-api-key',
        basePath: 'tonic-url',
      };

      const defaultPostData: SetPrivacyPostParams = {
        workspaceId: 'workspace-id',
        columnKeys: [
          {
            schema: 'schema-name',
            table: 'table-name',
            columnName: 'column-name',
          },
        ],
      };

      const defaultRequestParameters = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: config.apiKey,
        },
        method: 'POST',
        data: JSON.stringify(defaultPostData),
        url: `${config.basePath}/api/Privacy/set`,
      };

      it('should return a promise that calls axios with the default parameters', async () => {
        const result = privacyApi(config).setPrivacy(defaultPostData);
        const axiosMock = stub<AxiosInstance>();

        await result.then((result) => result(axiosMock, config.basePath));

        expect(axiosMock.request).toHaveBeenCalledWith(defaultRequestParameters);
      });
    });
  });
});
