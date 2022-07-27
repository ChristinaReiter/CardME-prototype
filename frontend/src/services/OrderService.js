import tokenHeader from "./TokenHeader";

export default class OrderService {
  static baseUrl = "http://localhost:3001";
  static headers = new Headers({
    "Content-Type": "application/json",
  });

  static async createOrder(data, item) {
    let formData = new FormData();

    const recipient = {
      firstName: data.recipientFirstName,
      lastName: data.recipientLastName,
      street: data.recipientStreet,
      number: data.recipientNumber,
      zipcode: data.recipientZipcode,
      city: data.recipientCity,
      country: data.recipientCountry,
    };
    const billingAddress = {
      firstName: data.billingFirstName,
      lastName: data.billingLastName,
      street: data.billingStreet,
      number: data.billingNumber,
      zipcode: data.billingZipcode,
      city: data.billingCity,
      country: data.billingCountry,
    };

    // Text fields
    formData.append("recipient", JSON.stringify(recipient));
    formData.append("billingAddress", JSON.stringify(billingAddress));
    formData.append("email", data.email);
    formData.append("deliveryDate", data.deliveryDate);
    formData.append("recurrentDelivery", data.recurrentDelivery);
    formData.append("product", JSON.stringify(item));

    // Image file
    formData.append("image", item.cardImage);

    try {
      let response = await fetch(this.baseUrl + "/order", {
        method: "POST",
        body: formData,
      });

      response = await response.json();

      return response;
    } catch (err) {
      console.log(err);
      return { response: "Frontend error" };
    }
  }

  static async getOrders() {
    try {
      let response = await fetch(this.baseUrl + "/profile/orders", {
        method: "GET",
        headers: tokenHeader(),
      });

      const resp = await response.json();

      return resp;
    } catch (err) {
      console.log(err);
      return [];
    }
  }
}
