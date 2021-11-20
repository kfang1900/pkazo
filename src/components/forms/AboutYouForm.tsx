import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';

import styles from 'styles/forms/AboutYouForm.module.scss';

interface AboutYouErrors {
    artistType?: string;
}

const AboutYouForm = () => {
    return (<Formik
        initialValues={{ artistType: '' }}
        validate={values => {
            const errors: AboutYouErrors = {};
            if (!values.artistType) {
                errors.artistType = 'Required';
            }
            return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
            console.log(JSON.stringify(values));
            setSubmitting(false);
        }}
    >   
        { ({ isSubmitting }) => (
            <div className={styles["questions-container"]}>
                <Form>
                    <label className={styles["requiredFieldLabel"]}>
                        Which of these best describes you?
                    </label>
                    <div>
                        <label>
                            <Field type="radio" name="artistType" value="pro" />
                            I am a professional artist
                        </label>
                        <label>
                            <Field type="radio" name="artistType" value="part-time to pro" />
                            I am a part-time artist with goals to turn professional
                        </label>
                        <label>
                            <Field type="radio" name="artistType" value="part-time" />
                            I am a part-time artist and that's how I like it
                        </label>
                        <label>
                            <Field type="radio" name="artistType" value="uni or school" />
                            I am a university or high school arts student
                        </label>
                    </div>
                    <div>
                        <div className={styles["error"]}>
                            <ErrorMessage name="artistType" />
                        </div>
                        <div className={styles["footer"]}>
                            <button className={styles["submitButton"]} type="submit" disabled={isSubmitting}>
                                Save and continue
                            </button>
                        </div>
                    </div>
                </Form>
            </div>
        )}    
    </Formik>
  );
}

export default AboutYouForm;
