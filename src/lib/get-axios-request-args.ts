import { AxiosRequestConfig } from 'axios';
import qs from 'qs';

import { RequestArgs } from '../tonic';
import { Configuration } from '../configuration';
import { getRequestOptionsWithApiKey } from './get-request-options-with-api-key';

const getAxiosRequestArgs = async (
  method: 'GET' | 'POST',
  url: string,
  queryParams: Record<string, unknown>,
  configuration: Configuration,
  options?: AxiosRequestConfig,
  postData?: Record<string, unknown>
): Promise<RequestArgs> => {
  const requestOptionsWithHeaders = await getRequestOptionsWithApiKey(method, configuration, {
    ...options,
    ...(method === 'POST' && postData !== undefined
      ? {
          headers: { 'Content-Type': 'application/json' },
          data: JSON.stringify(postData),
        }
      : undefined),
  });

  const params = { ...queryParams, ...options?.params };

  return {
    url: `${url}${Object.keys(params).length > 0 ? `?${qs.stringify(params)}` : ''}`,
    options: requestOptionsWithHeaders,
  };
};

export { getAxiosRequestArgs };
