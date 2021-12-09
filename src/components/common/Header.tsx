import React, { useState } from 'react';

import Cart from 'assets/cart.png';
import Logo from 'assets/logo.svg';

import DimmedOverlay from 'components/common/DimmedOverlay';
import SignInModal from 'components/homepage/SignInModal';

import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';

import styles from 'styles/common/Header.module.scss';

const Header = () => {

  const [isSignedIn, setIsSignedIn] = React.useState(false);
  // Should we show the sign in modal?
  const [showSignInModal, setShowSignInModal] = useState(false);

  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      setIsSignedIn(true);
    } else {
      setIsSignedIn(false);
    }
  });

  const navigationCategories = [
    'Explore Artists', 'Painting', 'Photography', 'Print', 'Sculpture', 'Glass', 
    'Drawing', 'Mixed', 'Fiber'
  ];

  const signInButton = () => {
    if(!isSignedIn) {
      return (
        <div className={styles['signIn']} onClick={() => setShowSignInModal(true)}>
          Log in
        </div>
      )
    }
    else {
      return (
        <div className={styles['signIn']} onClick={() => signOut(getAuth())}>
          Log out
        </div>
      )
    }
  };

  return (
    <div className={styles['header']}>
      <div className={styles['headerTopRow']}>
        <img
            alt='logo' 
            className={styles['logo']}
            src={Logo}
        />
        <input
          className={styles['searchBar']}
          type="text"
          placeholder="Search By artists, style, theme, tag, location, etc."
        />
        <div className={styles['headerTopRowRight']}>
          <button className={styles['sellButton']}>
            Sell on Pkazo
          </button>
          {signInButton()}
          <img
              alt='logo' 
              className={styles['cart']}
              src={Cart}
          />
        </div>
      </div>
      <div className={styles['headerBottomRow']}>
        {
          navigationCategories.map((category) => {
            return (
              <div className={styles['category']}>
                {category}
              </div>
            );
          })
        }
      </div>
      {
        showSignInModal && 
        <DimmedOverlay>
          <SignInModal closeModal={() => setShowSignInModal(false)}/>
          </DimmedOverlay>
      }
    </div>
  );
}

export default Header;
