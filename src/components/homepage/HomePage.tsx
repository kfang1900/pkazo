import React from 'react';

import Header from 'components/common/Header';

import styles from 'styles/homepage/HomePage.module.scss';

const HomePage = () => {
    
    return (
        <div className={styles["header"]}>
            <Header />
        </div>
    );
}

export default HomePage;
