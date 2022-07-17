export default class OrderService {
  static baseUrl = "http://localhost:3001";
  static headers = new Headers({
    "Content-Type": "application/json",
  });

  static async createOrder(data, item) {
    const order = {
      recipient: {
        firstName: data.recipientFirstName,
        lastName: data.recipientLastName,
        street: data.recipientStreet,
        number: data.recipientNumber,
        zipcode: data.recipientZipcode,
        city: data.recipientCity,
        country: data.recipientCountry,
      },
      email: data.email,
      deliveryDate: data.deliveryDate,
      recurrentDelivery: data.recurrentDelivery,
      billingAddress: {
        firstName: data.billingFirstName,
        lastName: data.billingLastName,
        street: data.billingStreet,
        number: data.billingNumber,
        zipcode: data.billingZipcode,
        city: data.billingCity,
        country: data.billingCountry,
      },
      product: item
    };

    try {
      let response = await fetch(this.baseUrl + "/order", {
        method: "POST",
        body: JSON.stringify(order),
        headers: this.headers,
      });

      response = await response.json();

      return response;
    } catch (err) {
      console.log(err);
    }
  }
}
