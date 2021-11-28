import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';
import 'index.css';
import HomePage from 'components/homepage/HomePage';
import BuyPage from 'components/pages/BuyPage';
import SellPage from 'components/pages/SellPage';
import CartPage from 'components/pages/CartPage';
import AboutPage from 'components/pages/AboutPage';
import AppDownloadPage from 'components/pages/AppDownloadPage';
import { initializeApp } from "firebase/app";
import reportWebVitals from 'reportWebVitals';

import FinishRegistration from 'components/finishRegistration/FinishRegistration';


// Import the functions you need from the SDKs you need
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID
};

// Initialize Firebase
initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/finishRegistration' element={<FinishRegistration />} />
        <Route path='/buy' element={<BuyPage />} />
        <Route path='/sell' element={<SellPage />} />
        <Route path='/cart' element={<CartPage />} />
        <Route path='/app' element={<AppDownloadPage />} />
        <Route path='/about' element={<AboutPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
