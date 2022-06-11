export default class CardService{
    static baseUrl = "http://localhost:3001"

    static async getAllCards(){
        let response = await fetch(this.baseUrl + "/products", {
            method: "GET"
        })

        response = await response.json()

        return response
    }
}