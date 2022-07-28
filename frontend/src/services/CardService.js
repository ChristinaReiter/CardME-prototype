export default class CardService {
  static baseUrl = "http://localhost:3001";
  static headers = new Headers({
    "Content-Type": "application/json",
  });



  //Card handling
  static async getAllCards() {
    try {

      //get all cards from the backend
      let response = await fetch(this.baseUrl + "/products", {
        method: "GET",
      });

      //return the response
      response = await response.json();
      return response;

    } catch (err) {
      console.log(err);
      return [];
    }
  }

  static async getSingleCard(id) {
    try {

      //get one single card with a get request to the backend, id provided in the url
      let response = await fetch(this.baseUrl + "/products/single?id=" + id, {
        method: "GET",
      });

      //return the response
      response = await response.json();
  	  return response;

    } catch (err) {
      console.log(err);
      return null;
    }
  }


  static async getImages(foldername) {
    try {

      //get all image filenames in a specified folder with a get request to the backend
      let response = await fetch(this.baseUrl + "/products/imagedir?dir=" + foldername, {
        method: "GET",
      });

      //return the response
      response = await response.json();
      return response;

    } catch (err) {
      console.log(err);
      return null;
    }
  }



  
}
