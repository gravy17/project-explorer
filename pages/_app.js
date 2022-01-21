import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import ThemeProvider from "../views/shared/Theme";
import Loader from '../views/shared/Loader';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleStart = (url) => {
      url !== router.pathname ? setLoading(true) : setLoading(false);
    };
    const handleComplete = (url) => setLoading(false);

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);
  }, [router]);

  return (
    <ThemeProvider>
      {loading?
        <Loader/>:
        <Component {...pageProps}/>
      }    
    </ThemeProvider>
  )
}

export default MyApp
