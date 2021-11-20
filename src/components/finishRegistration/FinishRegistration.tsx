import AboutYouForm from 'components/forms/AboutYouForm';
import React from 'react';

import { useSearchParams } from 'react-router-dom';


const FinishRegistration = () => {

  const [searchParams, setSearchParams] = useSearchParams();

  const phase = searchParams.get("phase");

  if (!phase || parseInt(phase, 10) === 1) {
    return (<div>
        <AboutYouForm />
    </div>)
  }
  
  return (
    <div>
        Finishing Registration...
    </div>
  );
}

export default FinishRegistration;
