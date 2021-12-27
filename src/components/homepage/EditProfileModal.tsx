import { getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

import styles from 'styles/forms/FormModal.module.scss';
import Cancel from 'assets/cancel.svg';
import ImageUploader from 'components/common/ImageUploader';


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

    //Grabs the app
    let app = getApp();
    //Grab the user from the app
    let auth = getAuth(app);
    let user = auth.currentUser;
    //Sets up the image reference
    let url = "users/" + user!.uid+'/profPic';

    return (
        <div className={styles["modal"]}>
            <div>
                <ImageUploader closeModal={closeModal} uploadUrl={url} postUpload={null} />
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
