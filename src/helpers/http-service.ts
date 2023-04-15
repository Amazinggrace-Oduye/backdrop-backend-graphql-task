00import axios, { AxiosRequestConfig } from "axios";
import { MyHeaders } from "./header-helper";

class HttpServiceBase {
  post<T>({
    url,
    data,
    params,
    headers,
  }: {
    url: string;
    data: any;
    params?: { [name: string]: any };
    headers?: string[][];
  }) {
    return new Promise<T>((resolve, reject) => {
      const _options: AxiosRequestConfig = {};

      const appHeaders = new MyHeaders();
      appHeaders.append("Content-Type", "application/json; charset=UTF-8");

      if (headers?.length) {
        for (const header of headers) {
          appHeaders.append(header[0], header[1]);
        }
      }
      _options.headers = appHeaders.toJSON();

      if (params) {
        _options.params = params;
      }

      axios
        .post<any>(url, data, _options)
        .then((body) => {
          resolve(body.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  put<T>({
    url,
    data,
    params,
    headers,
  }: {
    url: string;
    data: any;
    params?: { [name: string]: any };
    headers?: string[][];
  }) {
    return new Promise<T>((resolve, reject) => {
      const _options: AxiosRequestConfig = {};

      const appHeaders = new MyHeaders();
      appHeaders.append("Content-Type", "application/json; charset=UTF-8");

      if (headers?.length) {
        for (const header of headers) {
          appHeaders.append(header[0], header[1]);
        }
      }
      _options.headers = appHeaders.toJSON();

      if (params) {
        _options.params = params;
      }

      axios
        .put<any>(url, data, _options)
        .then((body) => {
          resolve(body.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  get<T>({
    url,
    params,
    headers,
  }: {
    url: string;
    params?: { [name: string]: any };
    headers?: string[][];
  }) {
    return new Promise<T>((resolve, reject) => {
      const _options: AxiosRequestConfig = {};

      const appHeaders = new MyHeaders();
      appHeaders.append("Content-Type", "application/json; charset=UTF-8");
      appHeaders.append("Accept", "application/json");

      if (headers && headers.length) {
        for (const header of headers) {
          appHeaders.append(header[0], header[1]);
        }
      }
      _options.headers = appHeaders.toJSON();

      if (params) {
        _options.params = params;
      }

      axios
        .get<any>(url, _options)
        .then((result) => {
          resolve(result.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
}

export const HttpService = new HttpServiceBase();
