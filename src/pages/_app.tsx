// Next Imports
import type { AppProps } from 'next/app'
import Head from "next/head";
import { SessionProvider } from "next-auth/react";
import { Provider } from 'react-redux';

// Custom app imports 
import {makeStore as store, wrapper} from '@/store/store'

// Global CSS
import '@/styles/globals.css'
import 'bootstrap/dist/css/bootstrap.css'

// Theme CSS 
import '../theme/style.css';
import '../theme/booking-engine.css';


export default function App({ 
  Component,
  pageProps: { session, ...pageProps }
}: AppProps) {
  const {store, props} = wrapper.useWrappedStore(pageProps);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <style>
        {'body { background: linear-gradient(180deg, #000 20.12%, #1a84b8 200%); color: #e5e5e5; background-attachment: fixed; }'}
      </style>
      <SessionProvider session={session}>
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </SessionProvider>
    </>
  )
}



