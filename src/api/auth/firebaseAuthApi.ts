import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithRedirect, getRedirectResult, FacebookAuthProvider } from "firebase/auth";

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
    await signInWithRedirect(auth, provider)
    const result = await getRedirectResult(auth);

    //Assuming login was successful 
    if(result){
        //Pulls information from the login result
        //TODO: Temporarily disabling unused vars, fix this later!
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const user = result.user;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const token = GoogleAuthProvider.credentialFromResult(result)?.accessToken;
    }

}

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

