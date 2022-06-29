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

export const theme = createTheme({
  palette: {
    primary: {
      main: "#a7cda7",
    },
    secondary: {
      main: "#0a5108"
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
  const [checkoutData, setCheckoutData] = useState({});
  const [shoppingCart, setShoppingCart] = useState([]);

  return (
    <div>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Header shoppingCart={shoppingCart} />
          <Box sx={{ mt: 6, position: "static" }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route
                exact
                path="/cards"
                element={<Cards setShoppingCart={setShoppingCart} />}
              />
              <Route exact path="/create" element={<Create />} />
              <Route
                exact
                path="/checkout-data"
                element={
                  <CheckoutData
                    checkoutData={checkoutData}
                    setCheckoutData={setCheckoutData}
                  />
                }
              />
              <Route
                exact
                path="/checkout-overview"
                element={<CheckoutOverview checkoutData={checkoutData} />}
              />
              <Route exact path="/profile" element={<ProfileOverview />} />
              <Route exact path="/register" element={<Register />} />
              <Route exact path="/login" element={<Login />} />
            </Routes>
          </Box>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;
