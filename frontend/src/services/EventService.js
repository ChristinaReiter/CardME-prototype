import tokenHeader from "./TokenHeader";

export default class EventService {
  static baseUrl = "http://localhost:3001";
  static headers = new Headers({
    "Content-Type": "application/json",
  });

  //get all events of account
  static async getEvents() {
    try {
      let response = await fetch(this.baseUrl + "/profile/calendar", {
        method: "GET",
        headers: tokenHeader(),
      });

      const resp = await response.json();

      return resp;
    } catch (err) {
      console.log(err);
    }
  }

  //create new event for account
  static async setEvent(data) {
    try {
      let account = JSON.parse(localStorage.getItem("account"));
      let header = new Headers();
      if (account && account.token) {
        header.append("Authorization", `Bearer ${account.token}`);
      }
      header.append("Content-Type", "application/json");

      let response = await fetch(this.baseUrl + "/profile/calendar", {
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

  //update event by id
  static async updateEvent({ data, id }) {
    try {
      let account = JSON.parse(localStorage.getItem("account"));
      let header = new Headers();
      if (account && account.token) {
        header.append("Authorization", `Bearer ${account.token}`);
      }
      header.append("Content-Type", "application/json");
      let response = await fetch(this.baseUrl + `/profile/calendar/${id}`, {
        method: "PUT",
        headers: header,
        body: JSON.stringify(data),
      });

      const resp = await response.json();

      return resp;
    } catch (err) {
      console.log(err);
    }
  }

  // delete event by id
  static async deleteEvent({ id }) {
    try {
      let response = await fetch(this.baseUrl + `/profile/calendar/${id}`, {
        method: "DELETE",
        headers: tokenHeader(),
      });

      const resp = await response.json();

      return resp;
    } catch (err) {
      console.log(err);
    }
  }
}
