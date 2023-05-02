import PropTypes from "prop-types";
import Head from "next/head";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider } from "@emotion/react";

import { Provider } from "react-redux";
import createEmotionCache from "@/utils/createEmotionCache";
import theme from "@/theme";
import wrapper from "@/store/store";
import "@/styles/globals.css";
import { SnackbarProvider } from "notistack";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export default function MyApp({ Component, emotionCache = clientSideEmotionCache, ...rest } ) {
  const { store, props } = wrapper.useWrappedStore(rest);

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>Ultimate Garments</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <SnackbarProvider autoHideDuration={2000} transitionDuration={150} anchorOrigin={{horizontal:"center",vertical:"bottom"}}>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <Component {...props.pageProps} />
        </ThemeProvider>
      </Provider>
      </SnackbarProvider>
    </CacheProvider>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
};