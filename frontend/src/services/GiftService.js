export default class GiftService{
    static baseUrl = "http://localhost:3001";
    static headers = new Headers({
      "Content-Type": "application/json",
    });


    //Gift handling
    static async getAllGifts(){

        //get all gifts from the backend
        let response = await fetch(this.baseUrl + "/gifts", {
            method: "GET"
        })

        response = await response.json()

        //return all gifts
        return response
    }

    static async getSingleGift(id){

        //get one single gift by its id
        let response = await fetch(this.baseUrl + "/gifts/single?id=" + id, {
            method: "GET",
        })

        response = await response.json()

        //return the gift
        return response
    }
}