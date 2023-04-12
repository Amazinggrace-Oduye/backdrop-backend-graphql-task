"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpService = void 0;
const axios_1 = __importDefault(require("axios"));
const header_helper_1 = require("./header-helper");
class HttpServiceBase {
    post({ url, data, params, headers, }) {
        return new Promise((resolve, reject) => {
            const _options = {};
            const appHeaders = new header_helper_1.MyHeaders();
            appHeaders.append("Content-Type", "application/json; charset=UTF-8");
            if (headers === null || headers === void 0 ? void 0 : headers.length) {
                for (const header of headers) {
                    appHeaders.append(header[0], header[1]);
                }
            }
            _options.headers = appHeaders.toJSON();
            if (params) {
                _options.params = params;
            }
            axios_1.default
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
            const appHeaders = new header_helper_1.MyHeaders();
            appHeaders.append("Content-Type", "application/json; charset=UTF-8");
            if (headers === null || headers === void 0 ? void 0 : headers.length) {
                for (const header of headers) {
                    appHeaders.append(header[0], header[1]);
                }
            }
            _options.headers = appHeaders.toJSON();
            if (params) {
                _options.params = params;
            }
            axios_1.default
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
            const appHeaders = new header_helper_1.MyHeaders();
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
            axios_1.default
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
        if (err === null || err === void 0 ? void 0 : err.response) {
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
        else if (err === null || err === void 0 ? void 0 : err.request) {
            console.log({ requestErr: err === null || err === void 0 ? void 0 : err.request });
        }
        else {
            console.log("Error", err === null || err === void 0 ? void 0 : err.message);
        }
        return null;
    }
}
exports.HttpService = new HttpServiceBase();
//# sourceMappingURL=http-service.js.map