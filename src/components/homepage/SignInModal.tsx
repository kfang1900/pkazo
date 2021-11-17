import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';

import Cancel from 'assets/cancel.svg';

import 'styles/homepage/SignInModal.scss';

interface SignInErrors {
    email?: string;
    password?: string;
}

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
                    <h2>
                        Sign in
                    </h2>
                    <Formik
                        initialValues={{ email: '', password: '' }}
                        validate={values => {
                            const errors: SignInErrors = {};
                            if (!values.email) {
                                errors.email = 'Required';
                            } else if (
                            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                            ) {
                                errors.email = 'Invalid email address';
                            }
                            if (!values.password) {
                                errors.password = 'Required';
                            }
                            return errors;
                        }}
                        onSubmit={(values, { setSubmitting }) => {
                            console.log(JSON.stringify(values));
                            setSubmitting(false);
                        }}
                    >   
                        { ({isSubmitting}) => (
                            <Form>
                                <label>
                                    Email address
                                </label>
                                <div className="formField">
                                    <Field type="email" name="email" />
                                    <div className="error">
                                        <ErrorMessage name="email" />
                                    </div>
                                </div>
                                <label>
                                    Password
                                </label>
                                <div className="formField">
                                    <Field type="password" name="password" />
                                    <div className="error">
                                        <ErrorMessage name="password" />
                                    </div>
                                </div>
                                <button id="signInButton" type="submit" disabled={isSubmitting}>
                                    Sign in
                                </button>
                            </Form>
                        )}    
                    </Formik>
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
