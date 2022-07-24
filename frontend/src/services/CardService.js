import tokenHeader from "./TokenHeader";

export default class CardService{
    static baseUrl = "http://localhost:3001";
    static headers = new Headers({
      "Content-Type": "application/json",
    });

    static async getAllCards(){
        let response = await fetch(this.baseUrl + "/products", {
            method: "GET"
        })

        response = await response.json()

        return response
    }

    static async getSingleCard(id){
        let response = await fetch(this.baseUrl + "/products/single?id=" + id, {
            method: "GET",
        })

        response = await response.json()

        return response
    }

    static async getFavorites(userID) {

        let account = JSON.parse(localStorage.getItem("account"));
        console.log(account)
          let header = new Headers();
          if (account && account.token) {
            header.append('Authorization', `Bearer ${account.token}`)
          }
          header.append("Content-Type", "application/json");

    let response = await fetch(this.baseUrl + "/profile/favorites?id=" + userID, {
            method:"GET",
            headers: header,
        })

        response = await response.json()

        return response
    }

    static async removeFavorite(data) {
        let account = JSON.parse(localStorage.getItem("account"));
          let header = new Headers();
          if (account && account.token) {
            header.append('Authorization', `Bearer ${account.token}`)
          }
          header.append("Content-Type", "application/json");

        let response = await fetch(this.baseUrl + "/profile/favorites", {
                method:"PUT",
                headers: header,
                body: JSON.stringify(data),
            })
            
    
            response = await response.json()
    
            return response
        }
}