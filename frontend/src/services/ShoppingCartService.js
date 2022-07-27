import { db } from "./IndexedDBService";

export default class ShoppingCartService {
  
  static async getCart() {
    return db.cart.toArray();
  }

  static async getItem(id) {
    let key = parseInt(id);
    return db.cart.get(key);
  }

  static addItem(product, text) {
    return db.cart.add({
      cardImage: product.image,
      cardImageFilters: product.imageFilters,
      cardImageFilterValues: product.imageFilterValues,
      cardTitle: product.title,
      cardPrice: product.price,
      cardText: text,
      cardTextFilters: product.textFilters,
      cardTextFilterValues: product.textFilterValues,
      giftId: product.giftId,
      giftPrice: product.giftPrice,
      giftImage: product.giftImage
    });
  }

  static removeItem(id) {
    let key = parseInt(id)
    db.cart.delete(key);
  }

  static async updateItem(id, changedFields) {
    let key = parseInt(id);
    db.cart.update(key, changedFields);
  }
}
