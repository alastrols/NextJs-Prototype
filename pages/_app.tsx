import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { store } from "@/store/store";
import { getSession } from "@/store/slices/userSlice";
import React from "react";
import { blue } from "@mui/material/colors";
import { createTheme, ThemeProvider } from "@mui/material";

import "../styles/stylesheet.css";

function MyApp({ Component, pageProps }: AppProps) {
  const theme = createTheme({
    components: {
      MuiDrawer: {
        styleOverrides: {
          paper: {
            backgroundImage: 'url("/static/img/background_menu.jpg")',
            backgroundRepeat: "no-repeat",
            backgroundPosition: "bottom",
            width: 240,
          },
        },
      },
    },
    typography: {
      fontFamily: "Roboto",
      fontWeightLight: 300,
      fontWeightRegular: 400,
      fontWeightMedium: 500,
      fontWeightBold: 700,
    },
    spacing: 8,
    palette: {
      primary: process.env.NEXT_PUBLIC_IS_PRODUCTION == "0" ? blue : blue,
      background: {
        default: "#FFF",
      },
    },
  });

  React.useEffect(() => {
    store.dispatch(getSession());
  }, []);

  return (
    // All components can access to store
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </Provider>
  );
}

export default MyApp;
