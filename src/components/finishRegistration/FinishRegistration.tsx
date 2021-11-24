import AboutYouForm from 'components/forms/AboutYouForm';

import styles from 'styles/finishRegistration/UpperTabs.module.scss';

import { useSearchParams } from 'react-router-dom';
import { useState } from 'react';


const FinishRegistration = () => {
   const defaultTabs = [
        {
            status: "filled",
            description: "Shop Name",
            store_name: "",
            preference: "",
            active: false,
        },
        {
            status: "filled",
            description: "Artist Type",
            artistType: "",
            active: true,
        },
        {
            status: "empty",
            description: "Add Shop Items",
            active: false,
            items: [],
        }
   ];

   const updateTab = (tabNum:number) => {
        let newTabs = [...tabs];
        for (let i = 0; i < tabs.length; i++) {
            let tab = tabs[i];
            newTabs[i].active = false;
            if (i == tabNum) {
                newTabs[i].active = true;
            }
        }
        setTabs(newTabs);
   }

  // const [searchParams, setSearchParams] = useSearchParams();
  // const phase = searchParams.get("phase");
  const [tabs, setTabs] = useState(defaultTabs);
  const maxTabs = defaultTabs.length;


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
    </div>
  );
}

export default FinishRegistration;
