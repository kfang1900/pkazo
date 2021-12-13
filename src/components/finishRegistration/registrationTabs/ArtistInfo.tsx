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
            <div role="group" aria-labelledby="my-radio-group">
                <label>
                <Field type="radio" name="type" value="profArtist" />
                I am a professional artist. 
                </label>
                <label>
                <Field type="radio" name="type" value="hobbyToProf" />
                I create art as a hobby but would like to turn professional someday. 
                </label>
                <label>
                <Field type="radio" name="type" value="hobby" />
                I create art as a hobby and that's how I like it.
                </label>
                <label>
                <Field type="radio" name="type" value="other" />
                Other
                </label>
          </div>
            <button className={styles["submitButton"]} type="submit">
                Submit
            </button>
        </Form>
    </Formik>

}