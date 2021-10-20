import { AxiosInstance } from 'axios';
import { stub } from 'jest-auto-stub';

import { Configuration } from '../../../src/configuration';

import { piiReportApi, piiReportApiRequestArgsCreator } from '../../../src/resources/pii-report/pii-report.api';
import { CancelPiiReportParams } from '../../../src/resources/pii-report/pii-report.api.types';

describe('pii-report-api', () => {
  describe('piiReportRequestArgsCreator', () => {
    const config: Configuration = {
      apiKey: 'test-api-key',
      basePath: 'tonic-url',
    };

    const defaultParams = {
      workspaceId: 'workspace-id',
    };

    describe('getGetMostRecentActiveOrCompletedStatusRequestArgs', () => {
      it('should return /api/PiiReport/most_recent_active_or_completed_status for url', async () => {
        const args = await piiReportApiRequestArgsCreator(config).getGetMostRecentActiveOrCompletedStatusRequestArgs(
          defaultParams
        );

        expect(args.url).toBe(
          `/api/PiiReport/most_recent_active_or_completed_status?workspaceId=${defaultParams.workspaceId}`
        );
      });

      it('should use apiKey from configuration in options', async () => {
        const args = await piiReportApiRequestArgsCreator(config).getGetMostRecentActiveOrCompletedStatusRequestArgs(
          defaultParams
        );

        expect(args.options).toEqual({ headers: { Authorization: config.apiKey }, method: 'GET' });
      });
    });

    describe('getPiiReportRequestArgs', () => {
      it('should return /api/PiiReport for url', async () => {
        const args = await piiReportApiRequestArgsCreator(config).getPiiReportRequestArgs(defaultParams);

        expect(args.url).toBe(`/api/PiiReport?workspaceId=${defaultParams.workspaceId}`);
      });

      it('should use apiKey from configuration in options', async () => {
        const args = await piiReportApiRequestArgsCreator(config).getPiiReportRequestArgs(defaultParams);

        expect(args.options).toEqual({ headers: { Authorization: config.apiKey }, method: 'GET' });
      });
    });

    describe('getCancelPiiReportRequestArgs', () => {
      const defaultCancelPiiReportParams: CancelPiiReportParams = {
        piiReportId: 'pii-report-id',
      };

      it('should return /api/PiiReport/cancel for url', async () => {
        const args = await piiReportApiRequestArgsCreator(config).getCancelPiiReportRequestArgs(
          defaultCancelPiiReportParams
        );

        expect(args.url).toBe(`/api/PiiReport/cancel?piiReportId=${defaultCancelPiiReportParams.piiReportId}`);
      });

      it('should use apiKey from configuration in options', async () => {
        const args = await piiReportApiRequestArgsCreator(config).getCancelPiiReportRequestArgs(
          defaultCancelPiiReportParams
        );

        expect(args.options).toEqual({ headers: { Authorization: config.apiKey }, method: 'POST' });
      });
    });

    describe('getStartPiiReportRequestArgs', () => {
      it('should return /api/PiiReport/start for url', async () => {
        const args = await piiReportApiRequestArgsCreator(config).getStartPiiReportRequestArgs(defaultParams);

        expect(args.url).toBe(`/api/PiiReport/start?workspaceId=${defaultParams.workspaceId}`);
      });

      it('should use apiKey from configuration in options', async () => {
        const args = await piiReportApiRequestArgsCreator(config).getStartPiiReportRequestArgs(defaultParams);

        expect(args.options).toEqual({ headers: { Authorization: config.apiKey }, method: 'POST' });
      });
    });
  });

  describe('piiReportApi', () => {
    const config: Configuration = {
      apiKey: 'test-api-key',
      basePath: 'tonic-url',
    };

    const defaultParams = {
      workspaceId: 'workspace-id',
    };

    describe('getMostRecentActiveOrCompletedPiiReport', () => {
      const defaultRequestParameters = {
        headers: {
          Authorization: config.apiKey,
        },
        method: 'GET',
        url: `${config.basePath}/api/PiiReport/most_recent_active_or_completed_status?workspaceId=${defaultParams.workspaceId}`,
      };

      it('should return a promise that calls axios with the default parameters', async () => {
        const result = piiReportApi(config).getMostRecentActiveOrCompletedPiiReport(defaultParams);
        const axiosMock = stub<AxiosInstance>();

        await result.then((result) => result(axiosMock, config.basePath));

        expect(axiosMock.request).toHaveBeenCalledWith(defaultRequestParameters);
      });
    });

    describe('getPiiReport', () => {
      const defaultRequestParameters = {
        headers: {
          Authorization: config.apiKey,
        },
        method: 'GET',
        url: `${config.basePath}/api/PiiReport?workspaceId=${defaultParams.workspaceId}`,
      };

      it('should return a promise that calls axios with the default parameters', async () => {
        const result = piiReportApi(config).getPiiReport(defaultParams);
        const axiosMock = stub<AxiosInstance>();

        await result.then((result) => result(axiosMock, config.basePath));

        expect(axiosMock.request).toHaveBeenCalledWith(defaultRequestParameters);
      });
    });

    describe('startPiiReport', () => {
      const defaultRequestParameters = {
        headers: {
          Authorization: config.apiKey,
        },
        method: 'POST',
        url: `${config.basePath}/api/PiiReport/start?workspaceId=${defaultParams.workspaceId}`,
      };

      it('should return a promise that calls axios with the default parameters', async () => {
        const result = piiReportApi(config).startPiiReport(defaultParams);
        const axiosMock = stub<AxiosInstance>();

        await result.then((result) => result(axiosMock, config.basePath));

        expect(axiosMock.request).toHaveBeenCalledWith(defaultRequestParameters);
      });
    });

    describe('cancelPiiReport', () => {
      const testCancelParams: CancelPiiReportParams = {
        piiReportId: 'pii-report-id',
      };

      const defaultRequestParameters = {
        headers: {
          Authorization: config.apiKey,
        },
        method: 'POST',
        url: `${config.basePath}/api/PiiReport/cancel?piiReportId=${testCancelParams.piiReportId}`,
      };

      it('should return a promise that calls axios with the default parameters', async () => {
        const result = piiReportApi(config).cancelPiiReport(testCancelParams);
        const axiosMock = stub<AxiosInstance>();

        await result.then((result) => result(axiosMock, config.basePath));

        expect(axiosMock.request).toHaveBeenCalledWith(defaultRequestParameters);
      });
    });
  });
});
