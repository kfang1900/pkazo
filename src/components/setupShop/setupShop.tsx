import { doc, getFirestore, setDoc } from "firebase/firestore"; 

import { ArtistInfo } from './setupSections/ArtistInfo';
import { getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { PortfoiloCreate } from "components/forms/PortfolioCreate";


const SetupShop = () => {

    //INITIAL USER REGISTRATION LOGIC

    //First, let's insert the user into the database:
    //Grabs the app
    let app = getApp();
    //Grab the user from the app
    let user = getAuth(app).currentUser;
    //If there isn't a user, we have issues.
    if(!user) Error('No user currently logged in.');
    //Grab the database
    let db = getFirestore(app);
    let addUserInfo = (value: object) => {
      return setDoc(doc(db, 'users/' + user!.uid), value)
    }
    //Creates the folder for the user with just the current created time
    addUserInfo({
        createdTime: Date.now()
    })
    

  return (
    <><div>
      {ArtistInfo(addUserInfo)}
    </div><hr />
    <PortfoiloCreate initialPortfolioName = {user!.displayName + "'s Portfolio"} />
    <div>
    </div></>
  );
}

export default SetupShop;
