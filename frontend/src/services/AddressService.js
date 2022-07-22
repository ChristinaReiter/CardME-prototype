 export default class AcquaintanceService {
    static baseUrl = "http://localhost:3001";
    static headers = new Headers({
      "Content-Type": "application/json",
    });
    
    
  
    static async getAddress(id) {
     
      try {
              
        let response = await fetch(this.baseUrl + `/profile/address/${id}`, {
          method: "GET",
          headers: this.headers,               
        });
  
        const resp = await response.json(); 
  
        return resp;
      } catch (err) {
        console.log(err);
      }
    }
} 