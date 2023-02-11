import "../styles/globals.scss";
import "react-medium-image-zoom/dist/styles.css";

import config from "react-reveal/globals";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import { MantineProvider } from "@mantine/core";
import { RouterTransition } from "components/RouterTransition";
import { NotificationsProvider } from "@mantine/notifications";

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
      <NotificationsProvider position="top-center">
        <RouterTransition />
        <UserProvider>
          <QueryClientProvider client={queryClient}>
            <ReactQueryDevtools initialIsOpen={false} />
            <Component {...pageProps} />
          </QueryClientProvider>
        </UserProvider>
      </NotificationsProvider>
    </MantineProvider>
  );
}

export default MyApp;
