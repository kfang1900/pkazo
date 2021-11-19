import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';

import 'styles/forms/RegisterForm.scss';

interface SignInErrors {
    email?: string;
    firstName?: string;
    password?: string;
}

const SignInForm = () => {
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
        onSubmit={(values, { setSubmitting }) => {
            console.log(JSON.stringify(values));
            setSubmitting(false);
        }}
    >   
        { ({isSubmitting}) => (
            <Form>
                <label className="requiredFieldLabel">
                    Email address
                </label>
                <div>
                    <Field type="email" name="email" />
                    <div className="error">
                        <ErrorMessage name="email" />
                    </div>
                </div>
                <label className="requiredFieldLabel">
                    First name
                </label>
                <div>
                    <Field name="firstName" />
                    <div className="error">
                        <ErrorMessage name="password" />
                    </div>
                </div>
                <label className="requiredFieldLabel">
                    Password
                </label>
                <div>
                    <Field type="password" name="password" />
                    <div className="error">
                        <ErrorMessage name="password" />
                    </div>
                </div>
                <button className="submitButton" type="submit" disabled={isSubmitting}>
                    Register
                </button>
            </Form>
        )}    
    </Formik>
  );
}

export default SignInForm;
