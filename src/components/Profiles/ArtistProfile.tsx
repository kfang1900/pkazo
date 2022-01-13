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
    
    async getUserInfo() {
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
      if(this.state.artist == null) return <Spinner animation="border"/>

      //Styling for the profile picture
      let profPicStyle = {};
      if(this.state.artist.ProfilePicture){
        profPicStyle = {
          backgroundImage: 'url(' + this.state.artist.ProfilePicture + ')',
          display: 'inline-block',
          width: '100px',
          height: '100px',
          borderRadius: '50%',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center center',
          backgroundSize: 'cover',
        };
      }

      //If allowing editing of the profile
      const allowEditing = this.state.artist.uid === getAuth().currentUser?.uid;
      let addUserInfo = undefined;
      if(allowEditing){
        addUserInfo = (value: object) => {
          return setDoc(doc(getFirestore(), 'Users/' + getAuth().currentUser!.uid), value)
        }
      }


      return (
        <>
          <div className="blog-container">
          <div className="user" style={profPicStyle} />
            <h4>{this.state.artist.DisplayName}</h4>
            <p>{this.state.artist.Bio}</p>
            <h5>{this.state.artist.DisplayName + "'s Works"}</h5>
            <WorkList artistId={this.state.artist.uid}/>
            {allowEditing && <div><Button onClick={() => this.toggleEditProfileModal()}>Edit Profile</Button>
            <Button onClick={() => this.toggleWorkCreateModal()}>Create New Work</Button></div>}
            {this.state.editProfileModal && <DimmedOverlay ><EditProfileModal closeModal={this.toggleEditProfileModal} dbUpdate={addUserInfo!}/></DimmedOverlay>}
            {this.state.workCreateModal && <DimmedOverlay><WorkCreateModal artist={this.state.artist.uid} initialWork={null} closeModal={this.toggleWorkCreateModal} /></DimmedOverlay>}
          </div>
        </>
      );
    }
  }
