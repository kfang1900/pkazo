import styles from 'styles/setupShop/UpperTabs.module.scss';

import { useState } from 'react';
import { ArtistInfo } from './setupTabs/ArtistInfo';
import { getApp } from 'firebase/app';
import { getDatabase, ref, update } from "firebase/database";
import { getAuth } from 'firebase/auth';


const SetupShop = () => {

    //INITIAL USER REGISTRATION LOGIC

    //First, let's insert the user into the database:
    //Grabs the app
    let app = getApp();
    //Grab the user from the app
    let user = getAuth(app).currentUser;
    //If there isn't a user, we have issues.
    if(!user) throw Error;
    //Grab the database
    let db = getDatabase(app);
    let addUserInfo = (value: object) => {
        return update(ref(db, 'users/' + user!.uid), value);
    }
    //Creates the folder for the user with just the current created time
    addUserInfo({
        createdTime: Date.now()
    })
    

   interface Tab {
        status: string;
        description: string;
        active: boolean;
        id: string;
        //The content being displayed in the tab, passed with the update function
        content: (dbUpdate: (value: object) => Promise<void>) => JSX.Element;

   }

   //TODO: Make all of them NOT artistInfo, but i needed to start with something.
   const defaultTabs : Array<Tab> = [
        {
            status: "filled",
            id: "aInfo",
            description: "Artist Information",
            active: true,
            content: ArtistInfo,
        },
        {
            status: "filled",
            id: "cDetails",
            description: "Career Details",
            active: false,
            content: ArtistInfo
        },
        {
            status: "empty",
            description: "Upload Your Portfolio",
            id: "portfolio",
            active: false,
            content: ArtistInfo

        },
        {
            status: "empty",
            id: "shopStock",
            description: "Stock Your Shop",
            active: false,
            content: ArtistInfo

        },
        {
            status: "filled",
            id: "feedStart",
            description: "Start Your Feed",
            active: false,
            content: ArtistInfo
        },
        {
            status: "empty",
            id: "payment",
            description: "How You'll Get Paid",
            active: false,
            content: ArtistInfo

        }
   ];

/**
 * Changes the currently active tab
 * @param tabNum The tab that we're switching to
 */
   const updateTab = (tabNum: number) => {
        let newTabs = [...tabs];
        //Sets each tab as not active
        newTabs.forEach((t) => t.active = false);

        //Sets the correct tab as active
        newTabs[tabNum].active = true;

        setTabs(newTabs);
   }

   const getActive = (tabs:Array<Tab>) => {
      for (let i=0; i < tabs.length; i++) {
        if (tabs[i].active) {
            return tabs[i];
        }
      }
   }

  // const [searchParams, setSearchParams] = useSearchParams();
  // const phase = searchParams.get("phase");
  const [tabs, setTabs] = useState(defaultTabs);
  const activeTab = getActive(tabs) as Tab;


  // if(!phase) {
  //     setSearchParams({ "phase": "1;"})
  // }

  // if (!phase || parseInt(phase, 10) === 1) {
  //   return (<div>
  //       <AboutYouForm submit={() => setSearchParams({ "phase": "2" })}/>
  //   </div>)
  // }
  return (
    <div>
        <div className={styles["statusNavigation"]}>
          {tabs.map((tab, i) => 
            <div className={styles["tab-section-header"]}>
                {!tab.active && <div id={tab.id} className={styles[`circle-${tab.status}`]} onClick={()=>updateTab(i)} ></div>}
                {tab.active && <div id={tab.id} className={styles["circle-active"]}></div>}
                <p> {tab.description}</p>
            </div>
          )}
        </div>
        <hr className={styles["line"]}/>
        <div>
            {activeTab.content(addUserInfo)}
        </div>
    </div>
  );
}

export default SetupShop;
