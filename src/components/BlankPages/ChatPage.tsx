import React from 'react';

import Header from 'components/common/Header';
import { useNavigate } from 'react-router-dom';

const ChatPage = () => {

    return (
        <div>
            <Header navigate={useNavigate()} />
        </div>
    );
}

export default ChatPage;
