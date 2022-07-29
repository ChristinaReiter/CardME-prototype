export default class CheckoutService {
  static accessKey = "checkout";

  /**
   * Get persisted checkout data
   * @returns object | null
   */
  static getCheckoutData() {
    let data = localStorage.getItem(this.accessKey);
    if (data) {
      return JSON.parse(data);
    }
    return null;
  }

  /**
   * Persist checkout data in local storage
   */
  static setData(data) {
    localStorage.setItem(this.accessKey, JSON.stringify(data));
  }

  /**
   * Removes all checkout data
   */
  static removeData() {
    localStorage.removeItem(this.accessKey);
  }
}
