import '../styles/globals.scss'
import "nprogress/nprogress.css"
import 'react-medium-image-zoom/dist/styles.css'
import NProgress from "nprogress"
import Router from "next/router"
import config from "react-reveal/globals"

config({ ssrFadeout: true });

Router.onRouteChangeStart = () => NProgress.start();
Router.onRouteChangeComplete = () => NProgress.done();
Router.onRouteChangeError = () => NProgress.done();

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp
