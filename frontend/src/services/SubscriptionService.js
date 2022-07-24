import tokenHeader from "./TokenHeader";

export default class SubscriptionService {
  static baseUrl = "http://localhost:3001";
  static headers = new Headers({
    "Content-Type": "application/json",
  });


  static async getSubscriptions() {
     
    try {
      
      let response = await fetch(this.baseUrl + "/profile/subscriptions", {
        method: "GET",
        headers: tokenHeader(),               
      });

      const resp = await response.json(); 

      return resp;
    } catch (err) {
      console.log(err);
    }
  }

  

  static async setSubscription(data) {
    
    try {
      let account = JSON.parse(localStorage.getItem("account"));
      let header = new Headers();
      if (account && account.token) {
        header.append('Authorization', `Bearer ${account.token}`)
      }
      header.append("Content-Type", "application/json")
    


        let response = await fetch(this.baseUrl + "/profile/subscriptions", {
        method: "POST",
        headers: header,
        body: JSON.stringify(data),            
        });

        const resp = await response.json();    
        return resp;
    } catch (err) {
        console.log(err);
    }
}
}
