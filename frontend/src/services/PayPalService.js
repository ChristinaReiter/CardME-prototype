export default class PayPalService {
  static clientId =
        "AWhQbQw5irWMzQRjp7gn4yYP4V7qomnXWIE4krmMbZi3M5NwPz-cnAUVk9-7uvBkmOgnCPqTgEfROIDP";
  static async getToken() {
    try {
      const clientSecret =
        "EFFedPBjQuzdoDeKP0Y2ZJc0-z7-Ak1ZrCmSHWF4nF1bg2pI62_8sdQ7EBJLMoFfCLMClYF97lbFO3Kb";

      let headers = new Headers({
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: "Basic " + btoa(this.clientId + ":" + clientSecret),
      });

      let response = await fetch(
        "https://api-m.sandbox.paypal.com/v1/oauth2/token",
        {
          method: "POST",
          headers: headers,
          body: "grant_type=client_credentials",
        }
      );

      return await response.json();
    } catch (err) {
      console.log(err);
    }
  }

  static async createSubscriptionPlan(price) {
    try {
      console.log(price)
      const tokenRequest = await this.getToken();
      const date = Date.now();

      let headers = new Headers({
        Accept: "application/json",
        Authorization: "Bearer " + tokenRequest.access_token,
        "Content-Type": "application/json",
        "PayPal-Request-Id": date,
      });

      let body = {
        product_id: "PROD-1U485727FN791045P",
        name: "Card Subscription",
        billing_cycles: [
          {
            frequency: {
              interval_unit: "YEAR",
              interval_count: 1,
            },
            tenure_type: "REGULAR",
            sequence: 1,
            pricing_scheme: {
              fixed_price: {
                value: price,
                currency_code: "EUR",
              },
            },
          },
        ],
        payment_preferences: {
          auto_bill_outstanding: true,
        },
        taxes: {
          percentage: "16",
          inclusive: true,
        },
      };

      let response = await fetch(
        "https://api-m.sandbox.paypal.com/v1/billing/plans",
        {
          method: "POST",
          headers: headers,
          body: JSON.stringify(body),
        }
      );

      return await response.json();
    } catch (err) {
      console.log(err);
    }
  }
}
