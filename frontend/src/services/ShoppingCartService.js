import { db } from "./IndexedDBService";

export default class ShoppingCartService {
  static accessKey = "cart";

  static async getCart() {
    return db.cart.toArray();
  }

  static async getItem(id) {
    let key = parseInt(id);
    return db.cart.get(key);
  }

  static addItem(product, text) {
    db.cart.add({
      cardImage: product.image,
      cardTitle: product.title,
      cardPrice: product.price,
      cardText: text,
      giftId: null,
      giftPrice: 0,
      giftImage: "",
    });
  }

  static async addOwnCard(product, text) {
    let cart = this.getCart();

    // Find item with same id
    let cardIndex = await cart.findIndex((element) => {
      return element.cardId === product._id;
    });

    // Only create new product if not found
    if (cardIndex !== -1) {
      cart[cardIndex].cardImg = product.url;
      localStorage.setItem(this.accessKey, JSON.stringify(cart));
    } else {
      this.addItem(product, text);
    }
  }

  static removeItem(id) {
    db.cart.delete(id);
  }

  static async updateItem(id, changedFields) {
    console.log(changedFields);
    let key = parseInt(id);
    db.cart.update(key, changedFields);
  }

  static async findItemById(id) {
    let cart = this.getCart();

    let item = cart.find((element) => {
      return element.cardId === id;
    });

    return item;
  }
}
