import '../styles/globals.scss'
import "nprogress/nprogress.css"
import NProgress from "nprogress"
import Router from "next/router"

Router.onRouteChangeStart = () => NProgress.start();
Router.onRouteChangeComplete = () => NProgress.done();
Router.onRouteChangeError = () => NProgress.done();

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp
