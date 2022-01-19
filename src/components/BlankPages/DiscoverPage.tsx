import React from 'react';

import Header from 'components/common/Header';
import { useNavigate } from 'react-router-dom';

const DiscoverPage = () => {

    return (
        <div>
            <Header navigate={useNavigate()} />
        </div>
    );
}

export default DiscoverPage;
