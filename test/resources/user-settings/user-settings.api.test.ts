import { AxiosInstance } from 'axios';
import { stub } from 'jest-auto-stub';

import { Configuration } from '../../../src/configuration';
import {
  userSettingsApiRequestArgsCreator,
  userSettingsApi,
} from '../../../src/resources/user-settings/user-settings-api';
import { UserSettingsRequestModel } from '../../../src/resources/user-settings/user-settings-api.types';

describe('user-settings-api', () => {
  describe('userSettingsApiRequestArgsCreator', () => {
    const config: Configuration = {
      apiKey: 'test-api-key',
      basePath: 'tonic-url',
    };

    describe('getUserSettingsRequestArgs', () => {
      it('should return /api/UserSettings for url', async () => {
        const args = await userSettingsApiRequestArgsCreator(config).getUserSettingsRequestArgs();

        expect(args.url).toBe('/api/UserSettings');
      });

      it('should use apiKey from configuration in options', async () => {
        const args = await userSettingsApiRequestArgsCreator(config).getUserSettingsRequestArgs();

        expect(args.options).toEqual({ headers: { Authorization: config.apiKey }, method: 'GET' });
      });
    });

    describe('updateUserSettingsRequestArgs', () => {
      const defaultParams: UserSettingsRequestModel = {
        notificationLevelPreference: 'All',
      };

      it('should return /api/UserSettings for url', async () => {
        const args = await userSettingsApiRequestArgsCreator(config).updateUserSettingsRequestArgs(defaultParams);

        expect(args.url).toBe('/api/UserSettings');
      });

      it('should use apiKey from configuration in options and method POST', async () => {
        const args = await userSettingsApiRequestArgsCreator(config).updateUserSettingsRequestArgs(defaultParams);

        expect(args.options).toEqual({
          headers: { Authorization: config.apiKey, 'Content-Type': 'application/json' },
          method: 'POST',
          data: JSON.stringify(defaultParams),
        });
      });
    });
  });

  describe('userSettingsApi', () => {
    describe('getUserSettings', () => {
      const config: Configuration = {
        apiKey: 'test-api-key',
        basePath: 'tonic-url',
      };

      const defaultRequestParameters = {
        headers: {
          Authorization: config.apiKey,
        },
        method: 'GET',
        url: `${config.basePath}/api/UserSettings`,
      };

      it('should return a promise that calls axios with the default parameters', async () => {
        const result = userSettingsApi(config).getUserSettings();
        const axiosMock = stub<AxiosInstance>();

        await result.then((result) => result(axiosMock, config.basePath));

        expect(axiosMock.request).toHaveBeenCalledWith(defaultRequestParameters);
      });
    });

    describe('updateUserSettings', () => {
      const config: Configuration = {
        apiKey: 'test-api-key',
        basePath: 'tonic-url',
      };

      const testParams: UserSettingsRequestModel = {
        notificationLevelPreference: 'MentionsOnly',
      };

      const defaultRequestParameters = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: config.apiKey,
        },
        method: 'POST',
        data: JSON.stringify(testParams),
        url: `${config.basePath}/api/UserSettings`,
      };

      it('should return a promise that calls axios with the default parameters', async () => {
        const result = userSettingsApi(config).updateUserSettings(testParams);
        const axiosMock = stub<AxiosInstance>();

        await result.then((result) => result(axiosMock, config.basePath));

        expect(axiosMock.request).toHaveBeenCalledWith(defaultRequestParameters);
      });
    });
  });
});
