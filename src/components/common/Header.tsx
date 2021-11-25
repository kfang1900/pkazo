import React from 'react';

import styles from 'styles/common/DimmedOverlay.module.scss';

interface DimmedOverlayProps {
    children: JSX.Element;
}

const DimmedOverlay = ({ children }: DimmedOverlayProps) => {
  return (
    <div className={styles["overlay"]}>
      { children }
    </div>
  );
}

export default DimmedOverlay;
