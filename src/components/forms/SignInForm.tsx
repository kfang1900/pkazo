import { Formik, Form, Field, ErrorMessage } from 'formik';

import { signIn, signInWithGoogle, signInWithFacebook } from 'api/auth/firebaseAuthApi';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import googleLogo from 'assets/auth/googleLoginLogo.svg'
import styles from 'styles/forms/SignInForm.module.scss';

interface SignInErrors {
    email?: string;
    password?: string;
}

interface SignInFormProps {
    onSignIn: () => void;
}

const SignInForm = ({ onSignIn }: SignInFormProps ) => {

    const googleSignIn = () => {
        signInWithGoogle().then((isNewUser) => {
            onSignIn();
        }
        );
    }

    return (<><Formik
            initialValues={{ email: '', password: '' }}
            validateOnChange={false}
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
                    <button className={styles["loginButton"]} type="submit" disabled={isSubmitting}>
                        Sign in
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
            <button onClick={googleSignIn} className={styles["continueButton"]}>
                <img alt = "Google icon" src={googleLogo} width={50} height={50}/>Continue with Google
            </button>
            <button onClick={signInWithFacebook} className={styles["continueButton"]}>
                Continue with Facebook
            </button>
        </div>
      </>



  );
}

export default SignInForm;
