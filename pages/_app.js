import '../styles/globals.scss'
import "nprogress/nprogress.css"
import 'react-medium-image-zoom/dist/styles.css'

import NProgress from "nprogress"
import Router from "next/router"
import config from "react-reveal/globals"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

config({ ssrFadeout: true });

Router.onRouteChangeStart = () => NProgress.start();
Router.onRouteChangeComplete = () => NProgress.done();
Router.onRouteChangeError = () => NProgress.done();

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }) {
  return <QueryClientProvider client={queryClient}>
    <Component {...pageProps} />
  </QueryClientProvider>
}

export default MyApp
