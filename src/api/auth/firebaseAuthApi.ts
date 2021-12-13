import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithRedirect, getRedirectResult, FacebookAuthProvider, signInWithPopup, getAdditionalUserInfo } from "firebase/auth";

export const createAccount = async (email: string, password: string) => {
    const auth = getAuth();
    await createUserWithEmailAndPassword(auth, email, password);
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
    if(result){
        //Pulls information from the login result
        const additionalInfo = getAdditionalUserInfo(result);
        //Confirms additionalinfo worked
        if(additionalInfo) {
            return additionalInfo.isNewUser;
        } else{
            throw Error;
        }

        
    } else{
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

    if(result){
        //Adds result processing
    }

    //Adds scopes
}

