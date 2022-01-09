import React, { useState } from 'react';

import Cancel from 'assets/cancel.svg';

import RegisterForm from 'components/forms/RegisterForm';
import SignInForm from 'components/forms/SignInForm';

import styles from 'styles/homepage/SignInModal.module.scss';

interface SignInModalProps {
  closeModal: () => void;
}

const SignInModal = ({ closeModal } : SignInModalProps) => {
  // Should we ask the user to sign in or register? (default is sign in)
  const [signIn, setSignIn] = useState(true);

  return (
    <div className={styles["modal"]}>
    <div>
    {signIn &&
      <div>
      <div className = {styles["subheading"]}>Welcome back!</div>
      <div className = {styles["headerPrimary"]}>Sign in</div>
      <div style = {{marginTop: "28px"}}><SignInForm onSignIn={closeModal} /></div>
      <div className = {styles["subText"]} style={{fontWeight:"normal",color:"#595959"}}>
      { /* eslint-disable-next-line jsx-a11y/anchor-is-valid, no-script-url */ }
      By clicking Create Account or Continue with Google or Facebook, you agree to Pkazo's <a href="javascript:void(0)" style={{color:"inherit"}}>
      Terms of Use
      { /* eslint-disable-next-line jsx-a11y/anchor-is-valid, no-script-url */ }
      </a> and <a href="javascript:void(0)" style={{color:"inherit"}}>
      Privacy Policy
      </a>. Pkazo may send you communications; you may change your preferences in your account settings.
      </div>
      <div className = {styles["subText"]} style={{fontWeight:"600",textAlign:"center"}}>
      New to Pkazo?
      <button onClick={() => setSignIn(false)} className={styles["registerButton"]}>Register here</button>
      </div>
      </div>
    }
    {!signIn &&
      <div>
      <div className = {styles["subheading"]}>Welcome!</div>
      <div className = {styles["headerPrimary"]}>Join the community</div>
      <RegisterForm onRegister={closeModal}/>
      <div className = {styles["subText"]} style={{fontWeight:"normal",color:"#595959"}}>
      { /* eslint-disable-next-line jsx-a11y/anchor-is-valid, no-script-url */ }
      By clicking Create Account or Continue with Google or Facebook, you agree to Pkazo's <a href="javascript:void(0)" style={{color:"inherit"}}>
      Terms of Use
      { /* eslint-disable-next-line jsx-a11y/anchor-is-valid, no-script-url */ }
      </a> and <a href="javascript:void(0)" style={{color:"inherit"}}>
      Privacy Policy
      </a>. Pkazo may send you communications; you may change your preferences in your account settings.
      </div>
      </div>
    }
    </div>
    <img
    alt='cancel'
    className={styles['cancelIcon']}
    onClick={closeModal}
    src={Cancel}
    />
    </div>
  );
}

export default SignInModal;
