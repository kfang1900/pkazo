import { getDownloadURL, getStorage, ref, uploadBytes, UploadResult } from "firebase/storage";

import React, {FormEvent } from 'react';
import { Spinner } from 'react-bootstrap';

import styles from 'styles/forms/FormModal.module.scss';
import Cancel from 'assets/cancel.svg';


interface ImageUploaderProps {
    postUpload: ((url: string) => Promise<void>) | null,
    closeModal: () => void,
    uploadUrl: string
}

/**
 * A a form for uploading an image
 * 
 * Uses UploadImageForm
 * 
 * @see UploadImageForm
 * 
 * @param closeModal The parameter for closing the modal
 * @returns 
 */
const ImageUploader = (props: ImageUploaderProps) => {

    return (
        <div className={styles["modal"]}>
            <div>
                <ImageUploadForm uploadUrl={props.uploadUrl} postUpload={props.postUpload} />
            </div>
            <img 
            alt='cancel' 
            className={styles['cancelIcon']}
            onClick={props.closeModal} 
            src={Cancel}/>
        </div>
    );
}

interface ImageUploadFormProps {
    postUpload: ((url: string) => Promise<void>) | null,
    uploadUrl: string
}

/**
 * An interface for defining the variables located in the state for UploadImageForm
 * 
 * @see UploadImageForm
 */
interface ImageUploadFormState {
    submitting: boolean,
    submitted: boolean,
}

/**
 * Displayed in a modal to facilitate the user uploading an image
 * 
 * @see UploadImageModal
 * @see UploadImageFormState
 */
class ImageUploadForm extends React.Component<ImageUploadFormProps, ImageUploadFormState> {


    constructor(props: ImageUploadFormProps, state: ImageUploadFormState) {
        super(props, state);
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
        const storage = getStorage();
        //Sets up the image reference
        const imageRef = ref(storage, this.props.uploadUrl);
        //Grabs the current file
        let pic = this.fileInput.current!.files![0];
        //Uploads the image
        this.result = await uploadBytes(imageRef, pic);
        let url = await getDownloadURL(imageRef);
        debugger;
        if(this.props.postUpload != null) await this.props.postUpload(url);
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

export default ImageUploader;
