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
  apiKey: "AIzaSyBun6_3MDzXklyJUogZZKiPfZZ60f-6IZo",
  authDomain: "pkazo-302be.firebaseapp.com",
  databaseURL: "https://pkazo-302be-default-rtdb.firebaseio.com",
  projectId: "pkazo-302be",
  storageBucket: "pkazo-302be.appspot.com",
  messagingSenderId: "812469203594",
  appId: "1:812469203594:web:b2027e9c9622d1f708b373",
  measurementId: "G-KPB55MEFB7"
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
