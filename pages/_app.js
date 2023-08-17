import '../styles/globals.css';
import Head from 'next/head';
import 'leaflet/dist/leaflet.css';

import { Provider } from 'react-redux';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import screen from '../reducers/screen';
import organismData from '../reducers/organism';
import user from '../reducers/user';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import thunk from 'redux-thunk';
import { useRouter } from 'next/router';

import { persistStore, persistReducer } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import storage from 'redux-persist/lib/storage';

const reducers = combineReducers({ screen, organismData, user })
const persistConfig = { key: 'ZIMZOUMJS', storage };


const store = configureStore({
  reducer: persistReducer(persistConfig, reducers),
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false })
});

const persistor = persistStore(store);

// import { updateScreenHeight } from '../reducers/screen';
// import { updateScreenWidth } from '../reducers/screen';
// const store = configureStore({
//   reducer: {
//     screen,
//     organismData,
//     user
//   },
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware().concat(thunk),
// });

const theme = createTheme({
  palette: {
    secondary: {
      main: "#00ff00", // Remplacez YOUR_COLOR par votre couleur personnalisée
    },
  },
});


function App({ Component, pageProps }) {
  const router = useRouter(); // Ajoutez cette ligne
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>

        <Head>
          <title>Next.js App</title>
        </Head>
        <ThemeProvider theme={theme}>
          <Component {...pageProps} />
        </ThemeProvider>
      </PersistGate>

    </Provider>
  );
}

export default App;