import styles from 'styles/finishRegistration/UpperTabs.module.scss';

import { useState } from 'react';

const FinishRegistration = () => {

   interface Tab {
        status: string;
        description: string;
        active: boolean;
        store_name? : string;
        preference? : string;
        artistType? : string;
        items ? : Array<String>;
   }

   const defaultTabs : Array<Tab> = [
        {
            status: "filled",
            description: "Shop Name",
            store_name: "",
            preference: "",
            active: true,
        },
        {
            status: "filled",
            description: "Artist Type",
            artistType: "",
            active: false,
        },
        {
            status: "empty",
            description: "Add Shop Items",
            active: false,
            items: [],
        },
        {
            status: "empty",
            description: "Other",
            // store_name: "",
            // preference: "",
            active: false,
        },
        {
            status: "filled",
            description: "Another one",
            // artistType: "",
            active: false,
        },
        {
            status: "empty",
            description: "a 6th one",
            active: false,
            // items: [],
        }
   ];

   const updateTab = (tabNum:number) => {
        let newTabs = [...tabs];
        for (let i = 0; i < tabs.length; i++) {
            newTabs[i].active = false;
            if (i === tabNum) {
                newTabs[i].active = true;
            }
        }
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
                {!tab.active && <div className={styles[`circle-${tab.status}`]} onClick={()=>updateTab(i)} ></div>}
                {tab.active && <div className={styles["circle-active"]}></div>}
                <p> {tab.description}</p>
            </div>
          )}
        </div>
        <hr className={styles["line"]}/>
        <div>
            {activeTab.description}
        </div>
    </div>
  );
}

export default FinishRegistration;
