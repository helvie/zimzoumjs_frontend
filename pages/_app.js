import '../styles/globals.css';
import Head from 'next/head';
import 'leaflet/dist/leaflet.css';

import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import screen from '../reducers/screen';
import organismData from '../reducers/organism';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import thunk from 'redux-thunk';

const store = configureStore({
  reducer: {
    screen,
    organismData,
    // Ajoutez d'autres reducers ici si nécessaire
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(thunk),
});

const theme = createTheme({
  palette: {
    secondary: {
      main: "#00ff00", // Remplacez YOUR_COLOR par votre couleur personnalisée
    },
  },
});

function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Head>
        <title>Next.js App</title>
      </Head>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </Provider>
  );
}

export default App;