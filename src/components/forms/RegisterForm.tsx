import React from 'react';

import { Formik, Form, Field, ErrorMessage } from 'formik';

import { createAccount, signIn } from 'api/auth/firebaseAuthApi';

import googleLogo from 'assets/auth/googleLoginLogo.svg'
import styles from 'styles/forms/RegisterForm.module.scss';

interface RegisterErrors {
    email?: string;
    firstName?: string;
    password?: string;
}

interface RegisterFormProps {
    onRegister: () => void;
}

const RegisterForm = ({onRegister}: RegisterFormProps) => {

    return (<><Formik
        initialValues={{ email: '', firstName: '', password: '' }}
        validateOnChange={false}
        validate={values => {
            const errors: RegisterErrors = {};
            if (!values.email) {
                errors.email = 'Required';
            } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
                errors.email = 'Invalid email address';
            }
            if(!values.firstName) {
                errors.firstName = 'Required';
            }
            if (!values.password) {
                errors.password = 'Required';
            }
            return errors;
        }}
        onSubmit={async (values, { setFieldError }) => {
            //Attemps to validate the registration and sign in
            try {
                await createAccount(values.email, values.password, values.firstName);
                await signIn(values.email, values.password);
                onRegister();
            } catch (error: any) {
                switch (error.code) {
                    case "auth/email-already-in-use": {
                        setFieldError("email", "An account with that email already exists")
                        break;
                    }
                    case "auth/invalid-email": {
                        setFieldError("email", "Invalid email address");
                        break;
                    }
                    case "auth/weak-password": {
                        setFieldError("password", "Password is not strong enough");
                        break;
                    }
                }
            }
        }}
    >
        { ({isSubmitting}) => (
            <Form>
                <label className={`${styles['label']} ${styles['requiredFieldLabel']}`}>
                    Email address
                </label>
                <div>
                    <Field type="email" name="email" className={styles["textInput"]} />
                    <div className={styles["error"]}>
                        <ErrorMessage name="email" />
                    </div>
                </div>
                <label className={`${styles['label']} ${styles['requiredFieldLabel']}`}>
                    First name
                </label>
                <div>
                    <Field name="firstName" className={styles["textInput"]}/>
                    <div className={styles["error"]}>
                        <ErrorMessage name="firstName" />
                    </div>
                </div>
                <label className={`${styles['label']} ${styles['requiredFieldLabel']}`}>
                    Password
                </label>
                <div>
                    <Field type="password" name="password" className={styles["textInput"]} />
                    <div className={styles["error"]}>
                        <ErrorMessage name="password" />
                    </div>
                </div>
                <button className={styles["loginButton"]} type="submit" disabled={isSubmitting}>
                    Create Account
                </button>
            </Form>
        )}
    </Formik>
    <div>
        <div style = {{marginTop:"12px"}}>
            <hr className={styles["lineBreak"]} style = {{float:"left"}}/>
            <hr className={styles["lineBreak"]} style = {{float:"right"}}/>
            <p className={styles["textBreak"]}>Or</p>
        </div>
        <button className={styles["continueButton"]}>
            <img alt = "Google icon" src={googleLogo}/>Register with Google
        </button>
        <button className={styles["continueButton"]}>
            Register with Facebook
        </button>
    </div>
    </>
  );
}

export default RegisterForm;
