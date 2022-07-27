export default class AcquaintanceService {
static baseUrl = "http://localhost:3001";

static async updateAccount(data) {
   
    try {
      let account = JSON.parse(localStorage.getItem("account"));
      let header = new Headers();
      if (account && account.token) {
        header.append('Authorization', `Bearer ${account.token}`)
      }
      header.append("Content-Type", "application/json")
        let response = await fetch(this.baseUrl + "/profile/details", {
        method: "PUT",
        headers: header,
        body: JSON.stringify(data)            
        });

        const resp = await response.json();

        return resp;
    } catch (err) {
        console.log(err);
    }
}

static async changePassword(data) {
   
    try {
      let account = JSON.parse(localStorage.getItem("account"));
      let header = new Headers();
      if (account && account.token) {
        header.append('Authorization', `Bearer ${account.token}`)
      }
      header.append("Content-Type", "application/json")
        let response = await fetch(this.baseUrl + "/profile/password", {
        method: "PUT",
        headers: header,
        body: JSON.stringify(data)            
        });

        const resp = await response.json();

        return resp;
    } catch (err) {
        console.log(err);
    }
}

}