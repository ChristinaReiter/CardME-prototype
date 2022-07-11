export default class AuthService {
    static baseUrl = "http://localhost:3001";
    static headers = new Headers({
      "Content-Type": "application/json",
    });
  
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

    static async login(data) {
        try {
            let response = await fetch(this.baseUrl + "/login", {
            method: "POST",
            headers: this.headers,
            body: JSON.stringify(data)            
            });
    
            const resp = await response.json();
            if (resp) {
                localStorage.setItem("account", JSON.stringify(resp));
            }
    
            return response;
        } catch (err) {
            console.log(err);
        }
    }

    static async logout() {
      localStorage.removeItem("account");
    }

    static async getMe() {
      return JSON.parse(localStorage.getItem("account"));
    }
  }
  