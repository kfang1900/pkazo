import React, { useState } from 'react';

import NavSection from 'components/common/NavSection';
import styles from 'styles/common/Navigation.module.scss';

interface Props {
    isSignedIn: boolean;
    showLogin: () => void;
}

const Navigation = ({isSignedIn, showLogin}:Props ) => {
  
  return (
    <div>
        <nav className={styles["nav-header"]}>
            <div className={styles["nav-logo"]}>
                Pkazo
            </div>
            <input className={styles["search"]} type="text" id="fname" value="Search By artists, style, theme, tag, location, etc."></input>
            <div className={styles["nav-link"]}>
                Buy
            </div>
            <div className={styles["nav-link"]}>
                Sell
            </div>
            {!isSignedIn && 
            <div onClick={showLogin} className={styles["nav-button-white"]}>
                Log In
            </div>
            }
            {!isSignedIn && 
            <div onClick={showLogin} className={styles["nav-button-black"]}>
                Sign Up
            </div>}
            <div className={styles["nav-link"]}>
                Cart
            </div>
        </nav>
        <nav className={styles["nav-header"]}>
            <NavSection title="Artist">
                <div className={styles["grid"]}>
                    <div className={styles["grid-left"]}>
                        Left Column
                    </div>
                    <div className={styles["grid-center"]}>
                        Mid Column
                    </div>
                    <div className={styles["grid-right"]}>
                        Right Column
                    </div>
                </div>
            </NavSection>
            <NavSection title="Artworks">
                <div className={styles["grid"]}>
                    <div className={styles["grid-left"]}>
                        Left Column
                    </div>
                    <div className={styles["grid-center"]}>
                        Mid Column
                    </div>
                    <div className={styles["grid-right"]}>
                        Right Column
                    </div>
                </div>
            </NavSection>
            <div className={styles["nav-link"]}>
                About
            </div>
            <div className={styles["spacer"]}/>
            <div className={styles["nav-link"]}>
                Download App
            </div>
        </nav>
        <hr/>
    </div>
  );
}

export default Navigation;
