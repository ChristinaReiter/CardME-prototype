export default class CheckoutService {
  static accessKey = "checkout";

  static getCheckoutData() {
    let data = localStorage.getItem(this.accessKey);
    if (data) {
      return JSON.parse(data);
    }
    return null;
  }

  static setData(data) {
    localStorage.setItem(this.accessKey, JSON.stringify(data));
  }

  static removeData() {
    localStorage.removeItem(this.accessKey);
  }
}
