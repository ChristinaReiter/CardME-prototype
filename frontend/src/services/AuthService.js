import tokenHeader from "./TokenHeader";

export default class AuthService {
  static baseUrl = "http://localhost:3001";
  static headers = new Headers({
    "Content-Type": "application/json",
  });

  //register account
  static async register(data) {
    try {
      let response = await fetch(this.baseUrl + "/register", {
        method: "POST",
        headers: this.headers,
        body: JSON.stringify(data),
      });

      response = await response.json();

      return response;
    } catch (err) {
      console.log(err);
    }
  }

  //login with account
  static async login(data) {
    try {
      let response = await fetch(this.baseUrl + "/login", {
        method: "POST",
        headers: this.headers,
        body: JSON.stringify(data),
      });

      const resp = await response.json();
      if (resp.token) {
        localStorage.setItem("account", JSON.stringify(resp));
        AuthService.getMe().then((res) => {
          return res;
        });
      }

      return resp;
    } catch (err) {
      console.log(err);
    }
  }

  //logout by removing token from localStorage
  static async logout() {
    localStorage.removeItem("account");
  }

  //get user info
  static async getMe() {
    try {
      let response = await fetch(this.baseUrl + "/me", {
        method: "GET",
        headers: tokenHeader(),
      });

      const resp = await response.json();

      return resp;
    } catch (err) {
      console.log(err);
      return undefined;
    }
  }

  // Check whether any user is logged in
  static async getLog() {
    let account = localStorage.getItem("account");
    if (account !== null) {
      return JSON.parse(account);
    }
    return null;
  }

  // Check if mail is still free
  static async checkFree(email) {
    try {
      let response = await fetch(this.baseUrl + "/account/free", {
        method: "POST",
        headers: this.headers,
        body: JSON.stringify(email),
      });

      const resp = await response.json();

      if (!resp.existing) {
        return true;
      }
      return false;
    } catch (err) {
      console.log(err);
      return false;
    }
  }
}
