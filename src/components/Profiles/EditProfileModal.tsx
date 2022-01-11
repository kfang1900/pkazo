import { getApp } from 'firebase/app';
import { getAuth, updateProfile } from 'firebase/auth';

import styles from 'styles/forms/FormModal.module.scss';
import Cancel from 'assets/cancel.svg';
import ImageUploader from 'components/common/ImageUploader';
import { doc, getFirestore, updateDoc } from 'firebase/firestore';
import { ArtistInfoEdit } from './ArtistInfoEdit';


interface EditProfileModalProps {
    closeModal: () => void,
    dbUpdate: (values: object) => Promise<void>
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
const EditProfileModal = ({ closeModal, dbUpdate }: EditProfileModalProps) => {

    //Grabs the app
    let app = getApp();
    //Grab the user from the app
    let auth = getAuth(app);
    let user = auth.currentUser!;
    //Sets up the image reference
    let url = "Users/" + user.uid+'/profPic';

    //Establishes the post-upload sequence
    let postUpload = async (url: string) => {
        const db = getFirestore(getApp());
        //Reference to the user's page
        const docRef = doc(db, "Users", user.uid);
        //Adds the user's profile picture to the document
        await updateDoc(docRef, {
            ProfilePicture: url
        })
        //Sets the user's profile to contain the photoURL
        await updateProfile(user, {
            photoURL: url
        })
    };

    return (
        <div className={styles["modal"]}>
            <div>
                <h2>Profile Picture</h2>
                <ImageUploader closeModal={closeModal} uploadUrl={url} postUpload={postUpload} />
                <h2>Artist Information</h2>
                <ArtistInfoEdit dbUpdate={dbUpdate} />
            </div>
            <img 
            alt='cancel' 
            className={styles['cancelIcon']}
            onClick={closeModal} 
            src={Cancel}/>
        </div>
    );
}

export default EditProfileModal;
