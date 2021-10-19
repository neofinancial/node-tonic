import { AxiosRequestConfig } from 'axios';

import { RequestArgs } from '../tonic';
import { Configuration } from '../configuration';
import { getRequestOptionsWithApiKey } from './get-request-options-with-api-key';

const getAxiosRequestArgs = async (
  method: 'GET' | 'POST',
  url: string,
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

  return {
    url,
    options: requestOptionsWithHeaders,
  };
};

export { getAxiosRequestArgs };
