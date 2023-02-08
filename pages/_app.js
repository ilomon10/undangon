import "../styles/globals.scss";
import "react-medium-image-zoom/dist/styles.css";

import config from "react-reveal/globals";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import { HotkeysProvider } from "@blueprintjs/core";
import { NavigationProgress } from "@mantine/nprogress";
import { MantineProvider } from "@mantine/core";
import { RouterTransition } from "components/RouterTransition";

config({ ssrFadeout: true });

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

function MyApp({ Component, pageProps }) {
  return (
    <MantineProvider withNormalizeCSS>
      <RouterTransition />
      <HotkeysProvider>
        <UserProvider>
          <QueryClientProvider client={queryClient}>
            <Component {...pageProps} />
          </QueryClientProvider>
        </UserProvider>
      </HotkeysProvider>
    </MantineProvider>
  );
}

export default MyApp;
