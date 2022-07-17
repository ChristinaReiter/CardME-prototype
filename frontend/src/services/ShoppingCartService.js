export default class ShoppingCartService {
  static accessKey = "cart";

  static getCart() {
    let cart = localStorage.getItem(this.accessKey);
    if (cart) {
      return JSON.parse(cart);
    }
    return [];
  }

  static getItem(itemIndex) {
    let cart = this.getCart();
    if (cart) {
      return cart[itemIndex];
    }
    return null;
  }

  static addItem(product) {
    let cart = this.getCart();

    let cartItem = {
      cardId: product._id,
      cardImg: product.url,
      cardTitle: product.title,
      cardPrice: product.price,
      text: null,
      giftId: null,
      giftPrice: 0
    };

    cart.push(cartItem);
    localStorage.setItem(this.accessKey, JSON.stringify(cart));
  }

  static removeItem(itemIndex) {
    let cart = this.getCart();

    // If string provided
    itemIndex = parseInt(itemIndex)

    let remainingItems = cart.find((element, index) => {
      return index !== itemIndex;
    });

    console.log(remainingItems)

    if (remainingItems !== undefined) {
      localStorage.setItem(this.accessKey, JSON.stringify([remainingItems]));
    } else {
      localStorage.removeItem(this.accessKey);
    }
  }

  static updateText(itemIndex, text) {
    let cart = this.getCart();

    cart[itemIndex].text = text;

    localStorage.setItem(this.accessKey, JSON.stringify(cart));
  }

  static updateGift(itemIndex, giftId = null) {
    let cart = this.getCart();

    cart[itemIndex].giftId = giftId;

    localStorage.setItem(this.accessKey, JSON.stringify(cart));
  }
}
