import tokenHeader from "./TokenHeader";

export default class SubscriptionService {
  static baseUrl = "http://localhost:3001";
  static headers = new Headers({
    "Content-Type": "application/json",
  });

  static async getSubscriptions() {
    try {
      let response = await fetch(this.baseUrl + "/profile/subscriptions", {
        method: "GET",
        headers: tokenHeader(),
      });

      const resp = await response.json();

      return resp;
    } catch (err) {
      console.log(err);
    }
  }

  static async setSubscription(data) {
    try {
      let response = await fetch(this.baseUrl + "/profile/subscriptions", {
        method: "POST",
        headers: this.headers,
        body: JSON.stringify(data),
      });

      const resp = await response.json();
      return resp;
    } catch (err) {
      console.log(err);
      return null
    }
  }

  static async deleteSubscription({ id }) {
    try {
      let response = await fetch(
        this.baseUrl + `/profile/subscriptions/${id}`,
        {
          method: "DELETE",
          headers: tokenHeader(),
        }
      );

      const resp = await response.json();

      return resp;
    } catch (err) {
      console.log(err);
    }
  }
}
