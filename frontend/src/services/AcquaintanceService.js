import tokenHeader from "./TokenHeader";

export default class AcquaintanceService {
    static baseUrl = "http://localhost:3001";
    static headers = new Headers({
      "Content-Type": "application/json",
    });
    
  
    static async getAcquaintances() {
     /*  let account = JSON.parse(localStorage.getItem("account"));
      let headers2 = new Headers();
      if (account && account.token) {
          headers2.append("Authorization", `JWT ${account.token}`);
      } */
      try {
        let response = await fetch(this.baseUrl + "/profile/contacts", {
          method: "GET",
          headers: tokenHeader(), /* headers2  */                
        });
  
        const resp = await response.json(); 
  
        return resp;
      } catch (err) {
        console.log(err);
      }
    }

    static async setAcquaintance(data) {
        try {
            let response = await fetch(this.baseUrl + "/profile/contacts", {
            method: "POST",
            headers: this.headers,
            body: JSON.stringify(data)            
            });
    
            const resp = await response.json();    
            return resp;
        } catch (err) {
            console.log(err);
        }
    }
    static async updateAcquaintance(data) {
        try {
            let response = await fetch(this.baseUrl + "/profile/contacts", {
            method: "PUT",
            headers: this.headers,
            body: JSON.stringify(data)            
            });
    
            const resp = await response.json();

            return resp;
        } catch (err) {
            console.log(err);
        }
    }

    static async deleteAcquaintance(data) {
        try {
            let response = await fetch(this.baseUrl + "/profile/contacts", {
            method: "DELETE",
            headers: this.headers,
            body: JSON.stringify(data)            
            });
    
            const resp = await response.json();
        
            return resp;
        } catch (err) {
            console.log(err);
        }
    }

    }
  
  