import React, { useState } from 'react';

import Cancel from 'assets/cancel.svg';

import RegisterForm from 'components/forms/RegisterForm';
import SignInForm from 'components/forms/SignInForm';

import 'styles/homepage/SignInModal.scss';

interface SignInModalProps {
    closeModal: () => void;
}

const SignInModal = ({ closeModal } : SignInModalProps) => {
  // Should we ask the user to sign in or register (default sign in)
  const [signIn, setSignIn] = useState(true);

  return (
    <div className="modal">
        <div>
            {signIn &&
                <div>
                    <div className="header">
                        <h2 className="headerPrimary">
                            Sign in
                        </h2>
                        <button 
                            onClick={() => setSignIn(false)}
                            id="registerButton"
                        >
                            Register
                        </button>
                    </div>
                    <SignInForm />
                </div>
            }
            {!signIn &&
                <div>
                    <h2>
                        Create your account
                    </h2>
                    Registration is easy.
                <RegisterForm />
                </div>
            }
        </div>
        <img 
            alt='cancel' 
            id='cancelIcon' 
            onClick={closeModal} 
            src={Cancel}
        >
        </img>
    </div>
  );
}

export default SignInModal;
