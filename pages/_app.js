import "@/styles/globals.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '../components/Navbar'
import Footer from "@/components/Footer";
import 'aos/dist/aos.css';
import { ContextProvider } from "@/context/backend";
import Head from 'next/head';
export default function App({ Component, pageProps }) {
  return (
    <>
      <ContextProvider>
        <Head>
          <title>ProHire</title>
        </Head>
        <Navbar />
        <Component {...pageProps} />
        <Footer />
      </ContextProvider>
    </>
  )
}
