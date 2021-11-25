import React, {useState} from 'react';
import styles from 'styles/common/Navigation.module.scss';

interface NavSectionProps {
    title: string;
    children: React.ReactNode,
}

const NavSection = ({title, children} : NavSectionProps) => {
    let [visible, setVisible] = useState(false);

    const toggleVisiblity = () => {
        setVisible(!visible);
    }
    
    return (
        <div onMouseLeave={toggleVisiblity} onMouseEnter={toggleVisiblity}>
            <div className={styles["nav-section"]}>
                {title}
            </div>
            
            {visible &&
                <div className={styles["nav-section-menu"]}>
                    {children}
                </div>
                }
        </div>
    );
}

export default NavSection;
