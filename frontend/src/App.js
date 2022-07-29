import { Route, Routes, BrowserRouter } from "react-router-dom";
import "./App.css";
import Cards from "./components/Cards";
import Create from "./components/Create";
import Header from "./components/Header";
import Home from "./components/Home";
import About from "./components/About";
import Login from "./components/Login";
import ProfileOverview from "./components/ProfileOverview";
import Register from "./components/Register";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CheckoutData from "./components/CheckoutData";
import { Box } from "@mui/system";
import CheckoutOverview from "./components/CheckoutOverview";
import { useEffect, useState } from "react";
import Orders from "./components/Orders";
import Subscriptions from "./components/Subscriptions";
import View from "./components/View";
import Calendar from "./components/Calendar";
import Favorites from "./components/Favorites";
import Contacts from "./components/Contacts";
import Details from "./components/Details";
import SuccessfulOrder from "./components/SuccessfulOrder";
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
  },
});

function App() {

  //offer different views in header based on being logged in
  const [currentAccount, setCurrentAccount] = useState(undefined);

  const [selectedTab, setSelectedTab] = useState(0);

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

  //filter and seacrh component for cards
  const [searchTerm, setSearchTerm] = useState([]);
  const [colorFilter, setColorFilter] = useState({});
  const [vibeFilter, setVibeFilter] = useState({});
  const [styleFilter, setStyleFilter] = useState({});
  const [recipientsFilter, setRecipientsFilter] = useState({});
  const [occasionFilter, setOccasionFilter] = useState({});
  const [seasonFilter, setSeasonFilter] = useState({});
  const [sortFilter, setSortFilter] = useState("mostpopular");

  //filter and search component for gifts
  const [giftSearchTerm, setGiftSearchTerm] = useState([]);
  const [giftSizeFilter, setGiftSizeFilter] = useState({});
  const [giftPriceFilter, setGiftPriceFilter] = useState({});
  const [giftSortFilter, setGiftSortFilter] = useState("mostpopular");
  const [giftOccasionFilter, setGiftOccasionFilter] = useState({});

  // Applied style of the text
  const [textFilters, setTextFilters] = useState(null);

  // State of chosen gift
  const [chosenGift, setChosenGift] = useState(null);

  //Popover "Here you can find your drafts"
  const [popoverDrafts, setPopoverDrafts] = useState("none");
  useEffect(() => {
    const timer = setTimeout(() => {
      setPopoverDrafts("none");
    }, 2000);
    return () => clearTimeout(timer);
  }, [popoverDrafts]);

  const createComponent = (
    <Create
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
  );

  const navigateToCards = (
    <Cards
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
      colorFilter={colorFilter}
      setColorFilter={setColorFilter}
      vibeFilter={vibeFilter}
      setVibeFilter={setVibeFilter}
      styleFilter={styleFilter}
      setStyleFilter={setStyleFilter}
      recipientsFilter={recipientsFilter}
      setRecipientsFilter={setRecipientsFilter}
      occasionFilter={occasionFilter}
      setOccasionFilter={setOccasionFilter}
      seasonFilter={seasonFilter}
      setSeasonFilter={setSeasonFilter}
      sortFilter={sortFilter}
      setSortFilter={setSortFilter}
      setImage={setImage}
    />
  );

  const navigateToGifts = (
    <Gifts
      setChosenGift={setChosenGift}
      giftSearchTerm={giftSearchTerm}
      setGiftSearchTerm={setGiftSearchTerm}
      giftSizeFilter={giftSizeFilter}
      setGiftSizeFilter={setGiftSizeFilter}
      giftPriceFilter={giftPriceFilter}
      setGiftPriceFilter={setGiftPriceFilter}
      giftSortFilter={giftSortFilter}
      setGiftSortFilter={setGiftSortFilter}
      giftOccasionFilter={giftOccasionFilter}
      setGiftOccasionFilter={setGiftOccasionFilter}
      setImage={setImage}
    />
  );

  return (
    <div>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Header
            currentAccount={currentAccount}
            setCurrentAccount={setCurrentAccount}
            popoverDrafts={popoverDrafts}
            setPopoverDrafts={setPopoverDrafts}
            chosenGift={chosenGift}
          />
          <Box sx={{ mt: 6, position: "static" }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route exact path="/cards" element={navigateToCards} />
              <Route
                exact
                path="/cards/:headerfilter"
                element={navigateToCards}
              />

              {/*only when clicking on gifts in favorites */}
              <Route
                path="/ViewProduct/:producttype/:infavorites/:productid"
                element={<ViewProduct setImage={setImage} />}
              />

              <Route path="/ViewProduct/:producttype/:productid">
                <Route
                  path=""
                  element={
                    <ViewProduct
                      setImage={setImage}
                      setChosenGift={setChosenGift}
                    />
                  }
                ></Route>
                {/* Used when chosen gifts */}
                <Route path=":path/:cardStyle/:id">
                  <Route
                    path=""
                    element={
                      <ViewProduct
                        setImage={setImage}
                        setChosenGift={setChosenGift}
                      />
                    }
                  ></Route>
                  <Route
                    path=":mode"
                    element={
                      <ViewProduct
                        setImage={setImage}
                        setChosenGift={setChosenGift}
                      />
                    }
                  ></Route>
                </Route>
              </Route>
              {/* Only for cards */}
              <Route
                path="/ViewProduct/:producttype/:headerfile/:productid"
                element={<ViewProduct setImage={setImage} />}
              />
              <Route path="/gifts/:path/:cardStyle/:id/">
                <Route path="" element={navigateToGifts}></Route>
                <Route path=":mode" element={navigateToGifts}></Route>
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
                    selectedTab={selectedTab}
                    setSelectedTab={setSelectedTab}
                  />
                }
              >
                <Route path="view" element={<View setSelectedTab={setSelectedTab}/>} />
                <Route path="orders" element={<Orders setSelectedTab={setSelectedTab} />} />
                <Route path="subscriptions" element={<Subscriptions setSelectedTab={setSelectedTab} />} />
                <Route path="calendar" element={<Calendar setSelectedTab={setSelectedTab} />} />
                <Route path="favorites" element={<Favorites setSelectedTab={setSelectedTab} />} />
                <Route path="contacts" element={<Contacts setSelectedTab={setSelectedTab} />} />
                <Route path="details" element={<Details setSelectedTab={setSelectedTab} />} />
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
