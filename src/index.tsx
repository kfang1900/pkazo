import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';
import 'index.css';
import HomePage from 'components/homepage/HomePage';

import { initializeApp } from 'firebase/app';
import { ProfilePage } from 'components/Profiles/ProfilePage';
import { WorkPage } from 'components/WorkPage/WorkPage';
import FeedPage from 'components/FeedPage/FeedPage'
import MarketplacePage from 'components/BlankPages/MarketplacePage'
import CreatePage from 'components/BlankPages/CreatePage'
import DiscoverPage from 'components/BlankPages/DiscoverPage'
import ChatPage from 'components/BlankPages/ChatPage'

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

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/profile/:artist_id' element={<ProfilePage  />}/>
        <Route path='/work/:work_id' element={<WorkPage  />}/>
        <Route path='/feed' element={<FeedPage/>}/>
        <Route path='/marketplace' element={<MarketplacePage />}/>
        <Route path='/create' element={<CreatePage />}/>
        <Route path='/discover' element={<DiscoverPage />}/>
        <Route path='/chat' element={<ChatPage />}/>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
