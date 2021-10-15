import { AxiosRequestConfig, AxiosRequestHeaders } from 'axios';

import { Configuration } from '../configuration';

const getRequestOptionsWithApiKey = async (
  method: 'GET' | 'POST' | 'DELETE' | 'PUT' | 'PATCH',
  configuration: Configuration,
  options: AxiosRequestConfig = {}
): Promise<AxiosRequestConfig> => {
  const baseOptions = configuration.baseOptions;

  const requestHeaderParameter = {} as AxiosRequestHeaders;

  const requestOptions = { method, ...baseOptions, ...options };

  const requestApiKeyValue = await configuration.apiKey;

  requestHeaderParameter['Authorization'] = requestApiKeyValue;

  const headersFromBaseOptions = baseOptions?.headers ?? {};

  requestOptions.headers = { ...requestHeaderParameter, ...headersFromBaseOptions, ...options.headers };

  return requestOptions;
};

export { getRequestOptionsWithApiKey };
