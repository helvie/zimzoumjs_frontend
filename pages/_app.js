import '../styles/globals.css';
import Head from 'next/head';
import 'leaflet/dist/leaflet.css';

import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import screen from '../reducers/screen';

const store = configureStore({
  reducer: { screen },
})


function App({ Component, pageProps }) {

  
  return (
    <Provider store={store}>
      <Head>
        <title>Next.js App</title>
      </Head>
      <Component {...pageProps} />
    </Provider>
  );
}

export default App;
