import { Route, Routes, BrowserRouter } from "react-router-dom";
import "./App.css";
import Cards from "./components/Cards";
import Create from "./components/Create";
import Header from "./components/Header";
import Home from "./components/Home";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CheckoutData from "./components/CheckoutData";
import { Box } from "@mui/system";
import CheckoutOverview from "./components/CheckoutOverview";

const theme = createTheme({
  palette: {
    primary: {
      main: "#a7cda7",
    },
    secondary: {
      main: "#0a5108",
    },
    typography: {
      fontFamily: "Annie+Use+Your+Telescope",
    },
    typography2: {
      fontFamily: "Abril+Fatface",
    },
  },
});

function App() {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Header />
          <Box sx={{ mt: 6 }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route exact path="/cards" element={<Cards />} />
              <Route exact path="/create" element={<Create />} />
              <Route exact path="/checkout-data" element={<CheckoutData />} />
              <Route exact path="/checkout-overview" element={<CheckoutOverview />} />
            </Routes>
          </Box>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;
