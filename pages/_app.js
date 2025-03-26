import "../styles/globals.scss";
import "nprogress/nprogress.css";
import "react-medium-image-zoom/dist/styles.css";

import NProgress from "nprogress";
import Router from "next/router";
import config from "react-reveal/globals";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import { HotkeysProvider } from "@blueprintjs/core";
import StyledSheetManager from "components/utils/StyledSheetManager";

config({ ssrFadeout: true });

Router.onRouteChangeStart = () => NProgress.start();
Router.onRouteChangeComplete = () => NProgress.done();
Router.onRouteChangeError = () => NProgress.done();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

function MyApp({ Component, pageProps }) {
  return (
    <StyledSheetManager>
      <HotkeysProvider>
        <UserProvider>
          <QueryClientProvider client={queryClient}>
            <Component {...pageProps} />
          </QueryClientProvider>
        </UserProvider>
      </HotkeysProvider>
    </StyledSheetManager>
  );
}

export default MyApp;
