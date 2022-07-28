export default class FavoriteService {
    static baseUrl = "http://localhost:3001";
    static headers = new Headers({
        "Content-Type": "application/json",
    });

    //Favorite handling
    static async getFavorites() {
        try {

        //get the account from the local storage and pass the authentication via headers
        let account = JSON.parse(localStorage.getItem("account"));
        let header = new Headers();
        if (account && account.token) {
            header.append("Authorization", `Bearer ${account.token}`);
        }
        header.append("Content-Type", "application/json");

        //get all favorites from the account
        let response = await fetch(
            this.baseUrl + "/profile/favorites",
            {
            method: "GET",
            headers: header,
            }
        );

        //return the favorites
        response = await response.json();

        return response;
        } catch (err) {
        console.log(err);
        return [];
        }
    }

    static async setFavorites(data) {
        try {

        //get the account from the local storage and pass the authentication via headers
        let account = JSON.parse(localStorage.getItem("account"));
        let header = new Headers();
        if (account && account.token) {
            header.append("Authorization", `Bearer ${account.token}`);
        }
        header.append("Content-Type", "application/json");

        //add one favorite to the account's favorites
        let response = await fetch(this.baseUrl + "/profile/favorites", {
            method: "POST",
            headers: header,
            body: JSON.stringify(data),
        });

        //return the updated favorites
        response = await response.json();

        return response;
        } catch (err) {
        console.log(err);
        }
    }

    static async removeFavorite(data) {
        try {

        //get the account from the local storage and pass the authentication via headers
        let account = JSON.parse(localStorage.getItem("account"));
        let header = new Headers();
        if (account && account.token) {
            header.append("Authorization", `Bearer ${account.token}`);
        }
        header.append("Content-Type", "application/json");

        //remove the specified favorite from the account's favorites
        let response = await fetch(this.baseUrl + "/profile/favorites", {
            method: "PUT",
            headers: header,
            body: JSON.stringify(data),
        });

        //return the updated favorites
        response = await response.json();

        return response;
        } catch (err) {
        console.log(err);
        }
    }
}