import axios from "axios";
import { MyHeaders } from "./header-helper";
class HttpServiceBase {
    post({ url, data, params, headers, }) {
        return new Promise((resolve, reject) => {
            const _options = {};
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
                .post(url, data, _options)
                .then((body) => {
                resolve(body.data);
            })
                .catch((err) => {
                reject(err);
            });
        });
    }
    put({ url, data, params, headers, }) {
        return new Promise((resolve, reject) => {
            const _options = {};
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
                .put(url, data, _options)
                .then((body) => {
                resolve(body.data);
            })
                .catch((err) => {
                reject(err);
            });
        });
    }
    get({ url, params, headers, }) {
        return new Promise((resolve, reject) => {
            const _options = {};
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
                .get(url, _options)
                .then((result) => {
                resolve(result.data);
            })
                .catch((err) => {
                reject(err);
            });
        });
    }
    getAxiosError(err) {
        if (err?.response) {
            const { data, status, statusText, headers } = err.response;
            if (data && status) {
                return {
                    data: data,
                    status,
                    statusText,
                    headers,
                };
            }
        }
        else if (err?.request) {
            console.log({ requestErr: err?.request });
        }
        else {
            console.log("Error", err?.message);
        }
        return null;
    }
}
export const HttpService = new HttpServiceBase();
//# sourceMappingURL=http-service.js.map