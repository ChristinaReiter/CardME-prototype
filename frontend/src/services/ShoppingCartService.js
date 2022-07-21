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
      text: product.text,
      giftId: null,
      giftPrice: 0
    };

    cart.push(cartItem);
    localStorage.setItem(this.accessKey, JSON.stringify(cart));
  }

  static async addOwnCard(product){
    let cart = this.getCart()

    // Find item with same id
    let cardIndex = await cart.findIndex((element) => {
      return element.cardId === product._id
    })

    // Only create new product if not found
    if (cardIndex !== -1){
      cart[cardIndex].cardImg = product.url
      localStorage.setItem(this.accessKey, JSON.stringify(cart));
    }else{
      this.addItem(product)
    }
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

  static async updateText(id, text) {
    let cart = this.getCart();

    let itemIndex = await cart.findIndex((element) => {
      return element.cardId === id
    })

    cart[itemIndex].text = text;

    localStorage.setItem(this.accessKey, JSON.stringify(cart));
  }

  static updateGift(itemIndex, giftId = null) {
    let cart = this.getCart();

    cart[itemIndex].giftId = giftId;

    localStorage.setItem(this.accessKey, JSON.stringify(cart));
  }

  static async findItemById(id){
    let cart = this.getCart()

    let item =  cart.find((element) => {
      return element.cardId === id
    })

    return item
  }
}
