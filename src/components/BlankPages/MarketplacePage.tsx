import React from 'react';

import Header from 'components/common/Header';
import { useNavigate } from 'react-router-dom';

const MarketplacePage = () => {

    return (
        <div style={{boxSizing: "border-box", width: "100%"}}>
            <Header navigate={useNavigate()} />
        </div>
    );
}

export default MarketplacePage;
