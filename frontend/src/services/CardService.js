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
        let response = await fetch(this.baseUrl + "/products/single", {
            method: "POST",
            body: JSON.stringify({"id" : id}),
            header: this.headers,
        })

        response = await response.json()

        return response
    }
}