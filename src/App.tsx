import React, { useState } from 'react';

import 'App.scss';

import DimmedOverlay from 'components/common/DimmedOverlay';
import SignInModal from 'components/homepage/SignInModal';

const App = () => {
  // Should we show the modal to sign up / register?
  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      <div className="app">
        <h1>
          pkaso
        </h1>
        <button
          onClick={() => setShowModal(!showModal)}
        >
          Sign In
        </button>
      </div>
      { showModal && 
        <DimmedOverlay>
          <SignInModal closeModal={() => setShowModal(false)}/>
        </DimmedOverlay>
      }
    </div>
  );
}

export default App;
