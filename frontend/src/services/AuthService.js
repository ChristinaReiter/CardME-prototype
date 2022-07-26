import tokenHeader from "./TokenHeader";

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
  
        response = await response.json(); //dont need this -- maybe want user to also get token after register?!
  
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
            if (resp.token) {                                     //gotta check the validity!!!!!
                localStorage.setItem("account", JSON.stringify(resp));
            }
    
            return resp;
        } catch (err) {
            console.log(err);
        }
    }

    static async logout() {
      localStorage.removeItem("account");
    }

    static async getMe() {
      //return JSON.parse(localStorage.getItem("account"));
      
      try {
        
        let response = await fetch(this.baseUrl + "/me", {
          method: "GET",
          headers: tokenHeader(),               
        });
  
        const resp = await response.json(); 
  
        return resp;
      } catch (err) {
        console.log(err);
        return undefined
      }

    }

    // Check whether any user is logged in
    static async getLog() {
      let account = localStorage.getItem("account")
      if(account !== null){
        return JSON.parse(account)
      }
      return null;
    }

    // Check if mail is still free
    static async checkFree(email){
      try {
        let response = await fetch(this.baseUrl + "/account/free", {
          method: "POST",
          headers: this.headers,
          body: JSON.stringify(email)          
        });
  
        const resp = await response.json(); 
  
        if(!resp.existing){
          return true;
        }
        return false;
      } catch (err) {
        console.log(err);
        return false
      }
    }
  }
  