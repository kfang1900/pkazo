import React, {useState} from 'react';
import styles from 'styles/common/Navigation.module.scss';

interface NavSectionProps {
    title: string;
    children: React.ReactNode,
}

const NavSection = ({title, children} : NavSectionProps) => {
    const [visible, setVisible] = useState(false);
    const [delayHandler, setDelayHandler] = useState(setTimeout(() =>{}, 500));

    const toggleOn = (event: React.MouseEvent) => {
        setVisible(true);
        console.log("Enter, ", event.target);
        clearTimeout(delayHandler);
    }

    const toggleOff = (event: React.MouseEvent) => {
        console.log("Leave, ", event.target);
        setDelayHandler(setTimeout(() => {
            setVisible(false);
        }, 200));
    }
    
        // <div onMouseLeave={toggleVisiblity} onMouseEnter={toggleVisiblity}>
    return (
        <section onMouseEnter={toggleOn} onMouseLeave={toggleOff} >
            <div className={styles["nav-section"]}>
                {title}
            </div>
            {visible &&
                <div className={styles["nav-section-menu"]}>
                    {children}
                </div>
                }
        </section>
    );
}

export default NavSection;
