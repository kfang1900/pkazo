import React, { useState } from 'react';

import { getAuth, onAuthStateChanged } from 'firebase/auth';

import Navigaition from 'components/common/Navigation';

import styles from 'App.module.scss';

import DimmedOverlay from 'components/common/DimmedOverlay';
import SignInModal from 'components/homepage/SignInModal';
import Navigation from 'components/common/Navigation';

interface AppTemplateProps {
    children: JSX.Element;
}

const AppTemplate = ({children}: AppTemplateProps) => {
  
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
        {children}
      </div>
      { showModal && 
        <DimmedOverlay>
          <SignInModal closeModal={() => setShowModal(false)}/>
        </DimmedOverlay>
      }
    </div>
  );
}

export default AppTemplate;
