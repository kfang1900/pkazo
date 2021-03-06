import { FirebaseError, getApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithRedirect, getRedirectResult, FacebookAuthProvider, signInWithPopup, getAdditionalUserInfo, updateProfile } from "firebase/auth";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { getDownloadURL, getStorage, ref } from "firebase/storage";

export const createAccount = async (email: string, password: string, displayName: string) => {
    const auth = getAuth();
    let user = await (await createUserWithEmailAndPassword(auth, email, password)).user;
    updateProfile(user, {
        'displayName': displayName
    });
    let db = getFirestore(getApp());
    setDoc(doc(db, "Users", user.uid), {
        DisplayName: user.displayName,
        uid: user.uid,
    });
};

export const signIn = async (email: string, password: string) => {
    const auth = getAuth();
    await signInWithEmailAndPassword(auth, email, password);
}
/**
 * A call to support the user signing in with google, using Firebase's GoogleAuthProvider
 */
export const signInWithGoogle = async () => {
    //Defines provider for the login
    const provider = new GoogleAuthProvider();
    const auth = getAuth();

    //Adds necessary scopes for signing in
    provider.addScope("profile");
    provider.addScope("email");

    //Starts the signin process with a redirect flow
    const result = await signInWithPopup(auth, provider)

    //Assuming login was successful 
    if (result) {
        //Pulls information from the login result
        const additionalInfo = getAdditionalUserInfo(result);
        //Confirms additionalinfo worked
        if (additionalInfo) {
            //If is new user, write a document with their profile picture and display name
            if (additionalInfo.isNewUser) {
                let db = getFirestore(getApp());
                setDoc(doc(db, "Users", result.user.uid), {
                    DisplayName: result.user.displayName,
                    ProfilePicture: result.user.photoURL,
                    uid: result.user.uid
                });
            }
        } else {
            throw Error('Additional info could not be retrieved.');
        }


    } else {
        //Login unsuccessful
        return false;
    }

}

/**
 * A call to support logging in with facebook
 */
export const signInWithFacebook = async () => {
    //Defines provider for the login
    const provider = new FacebookAuthProvider();
    const auth = getAuth();

    await signInWithRedirect(auth, provider);
    const result = await getRedirectResult(auth);

    if (result) {
        //Adds result processing
    }

    //Adds scopes
}

/**
 * Fetches the currently logged in user's profile picture
 * 
 * @returns the user's profile picture URL or null if not found
 */
export const getProfilePicture = async () => {
    const auth = getAuth();
    const app = getApp();
    const storage = getStorage(app);
    try {
        if (!auth) throw new Error("No Auth received");
        if (!auth.currentUser) throw new Error("No user logged in");
        if (!auth.currentUser.photoURL) throw new Error("No photoURL");
        //Create reference to the user's profile picture
        const reference = ref(storage, auth.currentUser.photoURL!);

        let url = String(await getDownloadURL(reference));
        return url
    } catch (error) {
        if (error instanceof FirebaseError) {
            return auth.currentUser!.photoURL!;
        } else {
            console.log("ProfPic Error: " + error);
            return "";
        }
    }
}

