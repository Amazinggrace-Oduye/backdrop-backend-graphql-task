import { HttpService } from ".././helpers/http-service";
import { envConfig } from "../config/env";

class PaystackRemoteBase {
  private getVariables() {
    const { PAYSTACK_BASE_URL, PAYSTACK_SECRET_KEY } = envConfig;

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

  async getBanks(country: string) {
    const { base_url, paystack_secrete_key } = this.getVariables();
    return HttpService.get({
      url: `${base_url}/bank`,
      params: { country },
      headers: [["Authorization", `Bearer ${paystack_secrete_key}`]],
    });
  }

  async verifyAccountNumber({
    account_number,
    bank_code,
    bank_name,
  }: {
    account_number: string;
    bank_code: string;
    bank_name?: string;
  }) {
    const { base_url, paystack_secrete_key } = this.getVariables();
    return HttpService.get({
      url: `${base_url}/bank/resolve`,
      params: { account_number, bank_code, bank_name },
      headers: [["Authorization", `Bearer ${paystack_secrete_key}`]],
    });
  }
}
export const RemotePaystackSevice = new PaystackRemoteBase();
