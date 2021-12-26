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
                    <div className={styles["header"]}>
                        <h2 className={styles["headerPrimary"]}>
                            Sign in
                        </h2>
                        <button 
                            onClick={() => setSignIn(false)}
                            className={styles["registerButton"]}
                        >
                            Register
                        </button>
                    </div>
                    <SignInForm onSignIn={closeModal} />
                </div>
            }
            {!signIn &&
                <div>
                    <h2>
                        Create your account
                    </h2>
                    Registration is easy.
                <RegisterForm onRegister={closeModal}/>
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
