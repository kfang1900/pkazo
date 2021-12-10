import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';

import { signIn, signInWithGoogle } from 'api/firebaseAuthApi';

import googleSignin from 'assets/auth/googleSignin.png'

import styles from 'styles/forms/SignInForm.module.scss';

interface SignInErrors {
    email?: string;
    password?: string;
}

interface SignInFormProps {
    onSignIn: () => void;
}

const SignInForm = ({ onSignIn }: SignInFormProps ) => {

    return (<><Formik
        initialValues={{ email: '', password: '' }}
        validate={(values) => {
            const errors: SignInErrors = {};
            if (!values.email) {
                errors.email = 'Required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }
            if (!values.password) {
                errors.password = 'Required';
            }
            return errors;
        } }
        onSubmit={async (values, { setFieldError }) => {
            try {
                await signIn(values.email, values.password);
                onSignIn();
            } catch (error: any) {
                switch (error.code) {
                    case "auth/invalid-email": {
                        setFieldError("email", "Invalid email address");
                        break;
                    }
                    case "auth/user-not-found": {
                        setFieldError("email", "No user with the given email was found");
                        break;
                    }
                    case "auth/wrong-password": {
                        setFieldError("password", "Invalid password");
                    }
                }
            }
        } }
    >
        {({ isSubmitting }) => (
            <Form>
                <label className={styles["label"]}>
                    Email address
                </label>
                <div>
                    <Field type="email" name="email" className={styles["textInput"]} />
                    <div className={styles["error"]}>
                        <ErrorMessage name="email" />
                    </div>
                </div>
                <label className={styles["label"]}>
                    Password
                </label>
                <div>
                    <Field type="password" name="password" className={styles["textInput"]} />
                    <div className={styles["error"]}>
                        <ErrorMessage name="password" />
                    </div>
                </div>
                <button className={styles["submitButton"]} type="submit" disabled={isSubmitting}>
                    Sign in
                </button>
            </Form>

        )}
    </Formik>
    <button onClick={signInWithGoogle}><img src={googleSignin} alt='Sign in with Google'></img></button></>

    
  );
}

export default SignInForm;
