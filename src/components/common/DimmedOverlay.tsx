import React, {useEffect} from 'react';

import styles from 'styles/common/DimmedOverlay.module.scss';

interface DimmedOverlayProps {
    children: JSX.Element;
}

const DimmedOverlay = ({ children }: DimmedOverlayProps) => {
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset';
        }
    }, []);
    return (
        <div className={styles['overlay']}>
        { children }
        </div>
    );
}

export default DimmedOverlay;
