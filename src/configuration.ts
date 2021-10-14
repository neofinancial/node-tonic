import { AxiosRequestConfig } from 'axios';

export interface ConfigurationParameters {
  apiKey: string | Promise<string> | ((name: string) => string) | ((name: string) => Promise<string>);
  basePath: string;
  baseOptions?: AxiosRequestConfig;
}

export class Configuration {
  /* user api key generated in tonic ui */
  apiKey: string | Promise<string> | ((name: string) => string) | ((name: string) => Promise<string>);
  /* base api path */
  basePath: string;
  /* base options for axios calls */
  baseOptions?: AxiosRequestConfig;

  constructor(param: ConfigurationParameters) {
    this.apiKey = param.apiKey;
    this.basePath = param.basePath;
    this.baseOptions = param.baseOptions;
  }
}
