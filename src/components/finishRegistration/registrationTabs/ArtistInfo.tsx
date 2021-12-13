import { DatePickerField } from 'components/common/DatePicker';
import { Field, Form, Formik } from 'formik';
import styles from 'styles/forms/AboutYouForm.module.scss';


export const ArtistInfo = (dbUpdate: (value: object) => Promise<void>) => {

    return <Formik
        initialValues={{ artistName: '' }}
        onSubmit={async (values) => {
            dbUpdate(values)
        }}>

        <Form>
            <div>
                <label className={styles["label"]}>
                    Artist Name
                </label>
                <Field name="artistName" className={styles["textInput"]} />
            </div>
            <div>
                <label className={styles["label"]}>
                    Date of Birth
                </label>
                <DatePickerField name="dob"></DatePickerField>
            </div>
            <div>
                <label className={styles["label"]}>
                        Location
                </label>
                <Field name="locationName" className={styles["textInput"]} />


            </div>
            <button className={styles["submitButton"]} type="submit">
                Submit
            </button>
        </Form>
    </Formik>

}