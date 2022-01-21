import { getApp } from 'firebase/app';
import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore";
import { getAuth } from 'firebase/auth';
import { Button, Spinner } from 'react-bootstrap';
import { Artist, artistConverter } from 'obj/Artist';
import React from 'react';
import EditProfileModal from './EditProfileModal';
import DimmedOverlay from 'components/common/DimmedOverlay';
import { WorkCreateModal } from 'works/WorkCreator';
import { WorkList } from 'works/WorkList';
import { formatCount } from 'components/common/NumberFormat';

import styles from 'styles/Profiles/ArtistProfile.module.scss';

interface ArtistProfileProps{
    artistId: string,
}

interface ArtistProfileState{
    artist: Artist | undefined,
    editProfileModal: boolean,
    workCreateModal: boolean,
}

export class ArtistProfile extends React.Component<ArtistProfileProps, ArtistProfileState> {

    constructor(props: ArtistProfileProps, state: ArtistProfileState){
        super(props, state);
        this.state = {
            artist: undefined,
            editProfileModal: false,
            workCreateModal: false
        }
    }

    componentDidMount() {
        this.getUserInfo();
    }

    componentDidUpdate() {
        this.getUserInfo();
    }

    async getUserInfo() {

        if(this.props.artistId === this.state.artist?.uid){
            return;
        }
        if(this.props.artistId === 'testuser'){
            this.setState((oldState) => {
                let newArtist = new Artist('Artist Name', 'https://steamuserimages-a.akamaihd.net/ugc/932679231733604877/6360D4B42E9CA8A62CCDDBB0AEEAD44BB62A1FAC/?imw=512&&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false', '', 'testuser');
                let newState = {...oldState, artist: newArtist};
                return newState;
            });
        }
        if(this.props.artistId == null) throw Error('No user specified.');
        let app = getApp();
        let db = getFirestore(app);
        const docRef = doc(db, "Users", this.props.artistId).withConverter(artistConverter);
        let a = await (await getDoc(docRef)).data();
        this.setState((oldState) => {
            let newState = {...oldState, artist: a};
            return newState;
        });
    }

    toggleEditProfileModal = () => {
        this.setState((oldState) => {
            let newState = {...oldState, editProfileModal: !oldState.editProfileModal};
            return newState;
        });
    }

    toggleWorkCreateModal = () => {
        this.setState((oldState) => {
            let newState = {...oldState, workCreateModal: !oldState.workCreateModal};
            return newState;
        });
    }

    render() {

        //If loading artist still
        if(this.state.artist == null) return <div style={{width:'100%',height:'200px',display:'flex',justifyContent:'center',alignItems:'center'}}>
            <Spinner animation="border" style={{margin:"auto"}}/>
        </div>

        let coverPhoto = "http://hotel.kasaulicastle.com/wp-content/uploads/2013/05/bg-3-1500x300.jpg";

        const isSelf = this.state.artist.uid === getAuth().currentUser?.uid;

        //If allowing editing of the profile
        const allowEditing = true;//this.state.artist.uid === getAuth().currentUser?.uid;
        let addUserInfo = undefined;
        if(allowEditing){
            addUserInfo = (value: object) => {
                return setDoc(doc(getFirestore(), 'Users/' + getAuth().currentUser!.uid), value)
            }
        }

        return (
            <div className = {styles['profile-container']}>
                <img
                    alt = 'cover'
                    src = {coverPhoto}
                    className = {styles['cover-photo']} />
                <div className = {styles['profile-banner']}>
                    <img
                        alt = 'profile'
                        src = {this.state.artist.ProfilePicture}
                        className = {styles['profile-picture']} />
                    <div className = {styles['info-banner']}>
                        <div className = {styles['name-banner']}>
                            <div className = {styles['name']}>{this.state.artist.DisplayName}</div>
                            <button className = {styles['profile-button']}>Follow</button>
                        </div>
                        <div className = {styles['location']}>artist location</div>
                        <div className = {styles['bio']}>{this.state.artist.Bio || 'artist bio '.repeat(10)}</div>
                        <div className = {styles['profile-counts']}>
                            <div className = {styles['count-container']}>
                                <div className = {styles['count-number']}>{formatCount(1234)}</div>
                                <div className = {styles['count-caption']}>Posts</div>
                            </div>
                            <div className = {styles['count-container']}>
                                <div className = {styles['count-number']}>{formatCount(644)}</div>
                                <div className = {styles['count-caption']}>Works</div>
                            </div>
                            <div className = {styles['count-container']}>
                                <div className = {styles['count-number']}>{formatCount(23981739)}</div>
                                <div className = {styles['count-caption']}>Followers</div>
                            </div>
                            <div className = {styles['count-container']}>
                                <div className = {styles['count-number']}>{formatCount(22)}</div>
                                <div className = {styles['count-caption']}>Following</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
            // <>
            // <div className="blog-container">
            // <div className="user" style={profPicStyle} />
            // <h4>{this.state.artist.DisplayName}</h4>
            // <p>{this.state.artist.Bio}</p>
            // <h5>{this.state.artist.DisplayName + "'s Works"}</h5>
            // <WorkList artistId={this.state.artist.uid}/>
            // {allowEditing && <div><Button onClick={() => this.toggleEditProfileModal()}>Edit Profile</Button>
            // <Button onClick={() => this.toggleWorkCreateModal()}>Create New Work</Button></div>}
            // {this.state.editProfileModal && <DimmedOverlay ><EditProfileModal closeModal={this.toggleEditProfileModal} dbUpdate={addUserInfo!}/></DimmedOverlay>}
            // {this.state.workCreateModal && <DimmedOverlay><WorkCreateModal artist={this.state.artist.uid} initialWork={null} closeModal={this.toggleWorkCreateModal} /></DimmedOverlay>}
            // </div>
            // </>
    }
}
