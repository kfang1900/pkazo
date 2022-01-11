import React, { useState } from 'react';

import { Formik, Form, Field, ErrorMessage } from 'formik';

import { createAccount, signIn } from 'api/auth/firebaseAuthApi';

import googleLogo from 'assets/auth/googleLoginLogo.svg'
import styles from 'styles/forms/RegisterForm.module.scss';

interface RegisterErrors {
    email?: string;
    displayName?: string;
    password?: string;
}

interface RegisterFormProps {
    onRegister: () => void;
}

const RegisterForm = ({onRegister}: RegisterFormProps) => {

    const [showPassword, setShowPassword] = useState(false);

    return (<><Formik
        initialValues={{ email: '', displayName: '', password: '' }}
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
            if(!values.displayName) {
                errors.displayName = 'Required';
            }
            if (!values.password) {
                errors.password = 'Required';
            }
            return errors;
        }}
        onSubmit={async (values, { setFieldError }) => {
            //Attemps to validate the registration and sign in
            try {
                await createAccount(values.email, values.password, values.displayName);
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
                    <Field name="displayName" className={styles["textInput"]}/>
                    <div className={styles["error"]}>
                        <ErrorMessage name="displayName" />
                    </div>
                </div>
                <label className={`${styles['label']} ${styles['requiredFieldLabel']}`}>
                    Password
                </label>
                <div style={{position:"relative"}}>
                    <Field type={showPassword ? "text" : "password"} name="password" className={styles["textInput"]} style={{paddingRight:"55px"}}/>
                    <button className={styles["showButton"]} onClick = {() => setShowPassword(prev => !prev)} style={{position:"absolute",top:"17px",right:"10px"}}>
                        Show
                    </button>
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
            <img alt = "Google icon" src={googleLogo}/>Continue with Google
        </button>
        <button className={styles["continueButton"]}>
            Continue with Facebook
        </button>
    </div>
    </>
  );
}

export default RegisterForm;
