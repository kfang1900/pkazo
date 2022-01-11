import Header from "components/common/Header"
import { useNavigate, useParams } from "react-router-dom"
import contentStyle from 'styles/common/Content.module.scss';
import { ArtistProfile } from "./ArtistProfile";


export const ProfilePage = () => {

    const { artist_id } = useParams();

    if(!artist_id) throw Error("Artist ID Not specified");

    return <>
        <div className={contentStyle["content"]}>
            <Header navigate={useNavigate()} />
            <ArtistProfile artistId={artist_id} />
        </div>

    </>
}