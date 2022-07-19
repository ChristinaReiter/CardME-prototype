export default function tokenHeader() {
    const account = JSON.parse(localStorage.getItem("account"));
    if (account && account.token) {
        //return { 'x-access-token': account.token };
        //return { 'Bearer': account.token };
        return { 'Authorization': `Bearer ${account.token}` };
    } else {
      return {};
    }
  }