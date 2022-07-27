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
import ViewProduct from "./components/ViewProduct";

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

  // Used to save images (both own and chosen)
  const [image, setImage] = useState(null);
  // Individual style attributes of the own image
  const [rotation, setRotation] = useState(0);
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [saturate, setSaturate] = useState(100);
  const [grayscale, setGrayscale] = useState(0);
  const [sepia, setSepia] = useState(0);
  const [cardwidth, setCardwidth] = useState(240);
  const [cardheight, setCardheight] = useState(300);

  // Applied style of the own image
  const [imageFilters, setImageFilters] = useState(null);

  // Text state
  const [text, setText] = useState(null);

  // Individual style attributes of the text
  const [fontstyle, setfontstyle] = useState("Annie Use Your Telescope");
  const [fontcolor, setfontcolor] = useState("black");
  const [fontsize, setfontsize] = useState(20);
  const [fontalign, setfontalign] = useState("left");
  const [lineHeight, setlineHeight] = useState(1);

  // Applied style of the text
  const [textFilters, setTextFilters] = useState(null);

  // State of chosen gift
  const [chosenGift, setChosenGift] = useState(null);

  const [popoverDrafts, setPopoverDrafts] = useState("none");

  const createComponent = (<Create
        image={image}
        setImage={setImage}
        text={text}
        setText={setText}
        rotation={rotation}
        setRotation={setRotation}
        brightness={brightness}
        setBrightness={setBrightness}
        contrast={contrast}
        setContrast={setContrast}
        saturate={saturate}
        setSaturate={setSaturate}
        grayscale={grayscale}
        setGrayscale={setGrayscale}
        sepia={sepia}
        setSepia={setSepia}
        imageFilters={imageFilters}
        setImageFilters={setImageFilters}
        cardheight={cardheight}
        setCardheight={setCardheight}
        cardwidth={cardwidth}
        setCardwidth={setCardwidth}
        fontstyle={fontstyle}
        setfontstyle={setfontstyle}
        fontcolor={fontcolor}
        setfontcolor={setfontcolor}
        fontsize={fontsize}
        setfontsize={setfontsize}
        fontalign={fontalign}
        setfontalign={setfontalign}
        textFilters={textFilters}
        setTextFilters={setTextFilters}
        lineHeight={lineHeight}
        setlineHeight={setlineHeight}
        chosenGift={chosenGift}
        setChosenGift={setChosenGift}
        popoverDrafts={popoverDrafts}
        setPopoverDrafts={setPopoverDrafts}
      />
  )

  return (
    <div>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Header
            currentAccount={currentAccount}
            setCurrentAccount={setCurrentAccount}
            popoverDrafts={popoverDrafts}
            setPopoverDrafts={setPopoverDrafts}
          />
          <Box sx={{ mt: 6, position: "static" }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route exact path="/cards" element={<Cards />} />
              <Route exact path="/cards/:headerfilter" element={<Cards />} />
              <Route path="/ViewCard/:cardid" element={<ViewCard />} />
              <Route
                path="/ViewCard/:headerfilter/:cardid"
                element={<ViewCard />}
              />
              <Route path="/ViewGift/:giftid" element={<ViewGift />} />
              <Route
                path="/ViewProduct/:producttype/:productid"
                element={<ViewProduct />}
              />
              <Route
                path="/ViewProduct/:producttype/:headerfile/:productid"
                element={<ViewProduct />}
              />
              <Route
                path="/gifts/:path/:cardStyle/:id/"
              >
                <Route path="" element={<Gifts setChosenGift={setChosenGift}/>}></Route>
                <Route path=":mode" element={<Gifts setChosenGift={setChosenGift}/>}></Route>
              </Route>
              <Route path="/create/:cardStyle/:id">
                <Route path="" element={createComponent}></Route>
                <Route path=":mode" element={createComponent}></Route>
              </Route>
              <Route
                exact
                path="/checkout-data/:id"
                element={<CheckoutData />}
              />
              <Route
                exact
                path="/checkout-overview/:id"
                element={<CheckoutOverview />}
              />
              <Route
                path="profile"
                element={
                  <ProfileOverview
                    currentAccount={currentAccount}
                    setCurrentAccount={setCurrentAccount}
                  />
                }
              >
                <Route path="view" element={<View />} />
                <Route path="orders" element={<Orders />} />
                <Route path="subscriptions" element={<Subscriptions />} />
                <Route path="calendar" element={<Calendar />} />
                <Route path="favorites" element={<Favorites />} />
                <Route path="contacts" element={<Contacts />} />
                <Route path="details" element={<Details />} />
              </Route>
              <Route exact path="/register" element={<Register />} />
              <Route
                exact
                path="/login"
                element={<Login setCurrentAccount={setCurrentAccount} />}
              />
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
