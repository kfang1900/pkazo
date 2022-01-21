import React, { useState } from 'react';
import Header from "components/common/Header";
import { useNavigate, useParams } from "react-router-dom";
import { ArtistProfile } from "./ArtistProfile";

import styles from 'styles/Profiles/ProfilePage.module.scss';

export const ProfilePage = () => {

    const { artist_id } = useParams();
    if(!artist_id) throw Error("Artist ID Not specified");

    const [menuIndex, setMenuIndex] = useState(0);
    const menuButtons = ['Posts', 'Portfolio', 'Store'];

    return (
        <div>
            <Header navigate={useNavigate()} />
            <ArtistProfile artistId = {artist_id} />
            <div className = {styles['menu-bar']}>
                {menuButtons.map((str, i) => {
                    return <div key = {str} className = {styles['menu-button']} onClick = {() => setMenuIndex(i)}>
                        {str}
                        <div className = {styles['menu-highlight']} style={{borderWidth:(i===menuIndex?'2px':'0'),marginTop:(i===menuIndex?'0px':'2px')}}/>
                    </div>
                })}
            </div>
            <div style = {{borderTop: '2px solid #D8D8D8'}}/>
        </div>
    );
}
