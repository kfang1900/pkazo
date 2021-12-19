import { getApp } from 'firebase/app';
import { getAuth, updateProfile } from 'firebase/auth';
import { getStorage, ref, uploadBytes, UploadResult } from "firebase/storage";

import React, {FormEvent } from 'react';
import { Spinner } from 'react-bootstrap';

import styles from 'styles/forms/FormModal.module.scss';
import Cancel from 'assets/cancel.svg';


interface EditProfileModalProps {
    closeModal: () => void;
}

/**
 * A modal for editing the user's profilem including user image, etc.
 * 
 * Uses EditProfileForm
 * 
 * @see EditProfileForm
 * 
 * @param closeModal The parameter for closing the modal
 * @returns 
 */
const EditProfileModal = ({ closeModal }: EditProfileModalProps) => {

    return (
        <div className={styles["modal"]}>
            <div>
                <EditProfileForm />
            </div>
            <img 
            alt='cancel' 
            className={styles['cancelIcon']}
            onClick={closeModal} 
            src={Cancel}/>
        </div>
    );
}

/**
 * An interface for defining the variables located in the state for EditProfileForm
 * 
 * @see EditProfileForm
 */
interface EditProfileFormState {
    submitting: boolean,
    submitted: boolean,
}

/**
 * Displayed in a modal to facilitate the user modifying properties about their profile
 * 
 * @see EditProfileModal
 * @see EditProfileFormState
 */
class EditProfileForm extends React.Component<{}, EditProfileFormState> {


    constructor(state: EditProfileFormState) {
        super(state);
        this.state = {
            submitting: false,
            submitted: false,
        }
        this.fileInput = React.createRef<HTMLInputElement>();

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    fileInput: React.RefObject<HTMLInputElement>;
    result: UploadResult | undefined;

    async handleSubmit(event: FormEvent) {
        //Marks as true
        this.setState((state) => 
        {
            return {
            submitting: true,
            submitted: false
            }
        })

        event.preventDefault();
        //Grabs the app
        let app = getApp();
        //Grab the user from the app
        let auth = getAuth(app);
        let user = auth.currentUser;
        //Grabs the storage instance
        const storage = getStorage();
        //Sets up the image reference
        const imageRef = ref(storage, user!.uid+'/profPic');
        //Grabs the current file
        let pic = this.fileInput.current!.files![0];
        //Uploads the image
        this.result = await uploadBytes(imageRef, pic);
        await updateProfile(auth.currentUser!, {
            photoURL: this.result.metadata.fullPath
        })
        this.setState((state) => {
            return {
                submitting: false,
                submitted: true
            }
        });
    }

    render() {
        if(this.result){
            return <p>Upload Success!</p>
        }
        else if(this.state.submitting){
            return <Spinner animation="border"/>
        } else {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    File Upload:
                    <input type="file" ref={this.fileInput}/>
                </label>
                <input type="submit" value="Submit" />
            </form>
        );
    }
    }

}

export default EditProfileModal;
