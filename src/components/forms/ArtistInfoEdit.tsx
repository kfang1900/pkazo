import { DatePickerField } from 'components/common/DatePicker';
import { Field, Form, Formik } from 'formik';
import React from 'react';
import styles from 'styles/forms/AboutYouForm.module.scss';

interface ArtistInfoEditProps{
    dbUpdate: (value: object) => Promise<void>
}

interface ArtistInfoEditState {
    
}


export class ArtistInfoEdit extends React.Component<ArtistInfoEditProps, ArtistInfoEditState> {
    
    render() {
        return <Formik
        initialValues={{ artistName: '' }}
        onSubmit={async (values) => {
            this.props.dbUpdate(values)
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
                    Art Discipline
                </label>
                <Field name="artDiscipline" className={styles["textInput"]} />
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
          <div>
                <label className={styles["label"]}>
                    Website URL
                </label>
                <Field name="websiteURL" className={styles["textInput"]} />
            </div>
            <div>
                <label className={styles["label"]}>
                    Instagram Handle
                </label>
                <Field name="instaHandle" className={styles["textInput"]} />
            </div>
            <button className={styles["submitButton"]} type="submit">
                Submit
            </button>
        </Form>
    </Formik>
    }

}