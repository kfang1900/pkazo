import React, { useState } from 'react';

import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';

import styles from 'App.module.scss';

import DimmedOverlay from 'components/common/DimmedOverlay';
import SignInModal from 'components/homepage/SignInModal';


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
      <div className={styles["app"]}>
        <h1>
          pkaso
        </h1>
        {!isSignedIn && <button
          onClick={() => setShowModal(true)}
        >
          Sign In
        </button> }
        {isSignedIn && <button
          onClick={async () => await signOut(auth)}>
          Sign Out
          </button>}

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
