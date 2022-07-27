import AuthService from "./AuthService";

export default class CardService {
  static baseUrl = "http://localhost:3001";
  static headers = new Headers({
    "Content-Type": "application/json",
  });

  static async getAllCards() {
    try {
      let response = await fetch(this.baseUrl + "/products", {
        method: "GET",
      });

      response = await response.json();

      return response;
    } catch (err) {
      console.log(err);
      return [];
    }
  }

  static async getSingleCard(id) {
    try {
      let response = await fetch(this.baseUrl + "/products/single?id=" + id, {
        method: "GET",
      });

      response = await response.json();

      return response;
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  static async getFavorites(/* userID */) {
    try {
      let account = JSON.parse(localStorage.getItem("account"));
      let header = new Headers();
      if (account && account.token) {
        header.append("Authorization", `Bearer ${account.token}`);
      }
      header.append("Content-Type", "application/json");

      let response = await fetch(
        this.baseUrl + "/profile/favorites"/* ?id=" + userID */,
        {
          method: "GET",
          headers: header,
        }
      );

      response = await response.json();

      return response;
    } catch (err) {
      console.log(err);
      return [];
    }
  }

  static async setFavorites(data) {
    try {
      let account = JSON.parse(localStorage.getItem("account"));
      let header = new Headers();
      if (account && account.token) {
        header.append("Authorization", `Bearer ${account.token}`);
      }
      header.append("Content-Type", "application/json");

      let response = await fetch(this.baseUrl + "/profile/favorites", {
        method: "POST",
        headers: header,
        body: JSON.stringify(data),
      });

      response = await response.json();

      return response;
    } catch (err) {
      console.log(err);
    }
  }

  static async removeFavorite(data) {
    try {
      let account = JSON.parse(localStorage.getItem("account"));
      let header = new Headers();
      if (account && account.token) {
        header.append("Authorization", `Bearer ${account.token}`);
      }
      header.append("Content-Type", "application/json");

      let response = await fetch(this.baseUrl + "/profile/favorites", {
        method: "PUT",
        headers: header,
        body: JSON.stringify(data),
      });

      response = await response.json();

      return response;
    } catch (err) {
      console.log(err);
    }
  }
}
