import React from 'react';
import 'styles/common/DimmedOverlay.scss';

interface DimmedOverlayProps {
    children: JSX.Element;
}

const DimmedOverlay = ({ children }: DimmedOverlayProps) => {
  return (
    <div className="overlay">
      { children }
    </div>
  );
}

export default DimmedOverlay;
