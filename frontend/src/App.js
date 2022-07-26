import { Route, Routes, BrowserRouter } from "react-router-dom";
import "./App.css";
import Cards from "./components/Cards";
import Create from "./components/Create";
import Header from "./components/Header";
import Home from "./components/Home";
import Login from "./components/Login";
import ProfileOverview from "./components/ProfileOverview";
import Register from "./components/Register";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CheckoutData from "./components/CheckoutData";
import { Box } from "@mui/system";
import CheckoutOverview from "./components/CheckoutOverview";
import { useState } from "react";
import Orders from "./components/Orders";
import Subscriptions from "./components/Subscriptions";
import View from "./components/View";
import Calendar from "./components/Calendar";
import Favorites from "./components/Favorites";
import Contacts from "./components/Contacts";
import Details from "./components/Details";
import ShoppingCartService from "./services/ShoppingCartService";
import SuccessfulOrder from "./components/SuccessfulOrder";
import ViewCard from "./components/ViewCard";
import ViewGift from "./components/ViewGift";
import Gifts from "./components/Gifts";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#a7cda7",
    },
    secondary: {
      main: "#0a5108",
    },
    tertiary: {
      main: "#F3F3F3",
    },
  },
  typography: {
    fontFamily: ['"Annie Use Your Telescope"', '"Abril Fatface"', "Antic"].join(
      ","
    ),
    //button: {
    //fontFamily: '"Annie Use Your Telescope"',
    //}
  },
});

function App() {

  const [currentAccount, setCurrentAccount] = useState(undefined);

  return (
    <div>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Header currentAccount={currentAccount} setCurrentAccount={setCurrentAccount}/>
          <Box sx={{ mt: 6, position: "static" }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route exact path="/cards" element={<Cards />} />
              <Route exact path="/cards/:headerfilter" element={<Cards />} />
              <Route path="/ViewCard/:cardid" element={<ViewCard />} />
              <Route path="/ViewCard/:headerfilter/:cardid" element={<ViewCard />} />
              <Route path="/ViewGift/:giftid" element={<ViewGift />} />
              <Route exact path ="/gifts" element={<Gifts />} />
              <Route
                path="/create/:cardStyle/:id"
              >
                <Route path="" element={<Create />}></Route>
                <Route path=":mode" element={<Create />}></Route>
              </Route>
              <Route
                exact
                path="/checkout-data/:id"
                element={<CheckoutData />}
              />
              <Route
                exact
                path="/checkout-overview/:id"
                element={<CheckoutOverview/>}
              />
              <Route path="profile" element={<ProfileOverview currentAccount={currentAccount} setCurrentAccount={setCurrentAccount}/>}>
                <Route path="view" element={<View />} />
                <Route path="orders" element={<Orders />} />
                <Route path="subscriptions" element={<Subscriptions />} />
                <Route path="calendar" element={<Calendar />} />
                <Route path="favorites" element={<Favorites />} />
                <Route path="contacts" element={<Contacts />} />
                <Route path="details" element={<Details />} />
              </Route>
              <Route exact path="/register" element={<Register />} />
              <Route exact path="/login" element={<Login />} />
              <Route
                exact
                path="/successful-order/:id"
                element={<SuccessfulOrder />}
              />
              <Route path="*" element={<Home />} />
            </Routes>
          </Box>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;
