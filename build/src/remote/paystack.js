"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RemotePaystackSevice = void 0;
const http_service_1 = require(".././helpers/http-service");
const env_1 = require("../config/env");
class PaystackRemoteBase {
    getVariables() {
        const { PAYSTACK_BASE_URL, PAYSTACK_SECRET_KEY } = env_1.envConfig;
        if (!PAYSTACK_BASE_URL) {
            throw new Error("PAYSTACK_BASE_URL env not defind");
        }
        if (!PAYSTACK_SECRET_KEY) {
            throw new Error("PAYSTACK_SECRET_KEY env not defind");
        }
        return {
            base_url: PAYSTACK_BASE_URL,
            paystack_secrete_key: PAYSTACK_SECRET_KEY,
        };
    }
    async getBanks(country) {
        const { base_url, paystack_secrete_key } = this.getVariables();
        return http_service_1.HttpService.get({
            url: `${base_url}/bank`,
            params: { country },
            headers: [["Authorization", `Bearer ${paystack_secrete_key}`]],
        });
    }
    async verifyAccountNumber({ account_number, bank_code, bank_name, }) {
        const { base_url, paystack_secrete_key } = this.getVariables();
        return http_service_1.HttpService.get({
            url: `${base_url}/bank/resolve`,
            params: { account_number, bank_code, bank_name },
            headers: [["Authorization", `Bearer ${paystack_secrete_key}`]],
        });
    }
}
exports.RemotePaystackSevice = new PaystackRemoteBase();
//# sourceMappingURL=paystack.js.map