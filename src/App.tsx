import React, { useState } from 'react';

import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';

import styles from 'App.module.scss';

import DimmedOverlay from 'components/common/DimmedOverlay';
import SignInModal from 'components/homepage/SignInModal';
import Navigation from 'components/common/Navigation';


const App = () => {
  
  const [isSignedIn, setIsSignedIn] = React.useState(false);
  // Should we show the sign in modal?
  const [showModal, setShowModal] = useState(false);

  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      setIsSignedIn(true);
    } else {
      setIsSignedIn(false);
    }
  });

  return (
    <div>
      <Navigation showLogin={() => setShowModal(true)} isSignedIn={isSignedIn} />
      <div className={styles["app"]}>
        <h1>
          pkaso
        </h1>
      </div>
      { showModal && 
        <DimmedOverlay>
          <SignInModal closeModal={() => setShowModal(false)}/>
        </DimmedOverlay>
      }


    </div>
  );
}

export default App;
