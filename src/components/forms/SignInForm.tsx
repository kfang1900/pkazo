import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';

import { signIn } from 'api/firebaseAuthApi';

import styles from 'styles/forms/SignInForm.module.scss';

interface SignInErrors {
    email?: string;
    password?: string;
}

const SignInForm = () => {
    return (<Formik
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
        onSubmit={async (values, { setSubmitting }) => {
            console.log(JSON.stringify(values));
            await signIn(values.email, values.password);
            setSubmitting(false);
        }}
    >   
        { ({isSubmitting}) => (
            <Form>
                <label className={styles["label"]}>
                    Email address
                </label>
                <div>
                    <Field type="email" name="email" className={styles["textInput"]}/>
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
  );
}

export default SignInForm;
