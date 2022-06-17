export default class OrderService {
  static baseUrl = "http://localhost:3001";
  static headers = new Headers({
    "Content-Type": "application/json",
  });

  static async createOrder(data) {
    try {
      let response = await fetch(this.baseUrl + "/order", {
        method: "POST",
        body: JSON.stringify(data),
        headers: this.headers,
      });

      response = await response.json();

      return response;
    } catch (err) {
      console.log(err);
    }
  }
}
