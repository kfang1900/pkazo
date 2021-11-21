import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Formik, Form, Field, ErrorMessage } from 'formik';

import { createAccount } from 'api/firebaseAuthApi';

import styles from 'styles/forms/RegisterForm.module.scss';

interface SignInErrors {
    email?: string;
    firstName?: string;
    password?: string;
}

const SignInForm = () => {

    const navigate = useNavigate();

    return (<Formik
        initialValues={{ email: '', firstName: '', password: '' }}
        validate={values => {
            const errors: SignInErrors = {};
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
        onSubmit={async (values, { setSubmitting }) => {
            console.log(JSON.stringify(values));
            try {
                await createAccount(values.email, values.password);
            } catch (error) {
                console.log('Error...');
            }
            setSubmitting(false);
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
                        <ErrorMessage name="password" />
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
                <button className={styles["submitButton"]} type="submit" disabled={isSubmitting}>
                    Register
                </button>
            </Form>
        )}    
    </Formik>
  );
}

export default SignInForm;
