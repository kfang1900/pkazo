import React from 'react';

import Header from 'components/common/Header';

import styles from 'styles/homepage/HomePage.module.scss';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
    
    return (
        <div className={styles["header"]}>
            <Header navigate={useNavigate()} />
        </div>
    );
}

export default HomePage;
