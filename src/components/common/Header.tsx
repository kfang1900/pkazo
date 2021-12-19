import React from 'react';

import Cart from 'assets/cart.png';
import Logo from 'assets/logo.svg';

import DimmedOverlay from 'components/common/DimmedOverlay';
import SignInModal from 'components/homepage/SignInModal';

import { getAuth, signOut, User } from 'firebase/auth';

import styles from 'styles/common/Header.module.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavigateFunction } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';
import EditProfileModal from 'components/homepage/EditProfileModal';
import { getProfilePicture } from 'api/auth/firebaseAuthApi';

interface HeaderProps{
  navigate: NavigateFunction,
}
interface HeaderState{
  showSignInModal: boolean,
  showProfileEditModal: boolean,
  profPicUrl: String | null,
  currentUser: User | null,
}
class Header extends React.Component<HeaderProps, HeaderState> {

  constructor(props: HeaderProps, state: HeaderState) {
    super(props, state);
    this.state = {
        currentUser: getAuth().currentUser,
        showSignInModal: false,
        profPicUrl: null,
        showProfileEditModal: false,

    }
}


  componentDidMount() {
    getAuth().onAuthStateChanged((user) => this.onAuthChange(user)); 
  }

  onAuthChange = async (user: User| null) => {
    let url = null;
    if(user) url = await getProfilePicture();
    this.setUser(user, url)
  }

  navigationCategories = [
    'Explore Artists', 'Painting', 'Photography', 'Print', 'Sculpture', 'Glass', 
    'Drawing', 'Mixed', 'Fiber'
  ];

  setUser = (user: User | null, profPic: String | null) => {
    this.setState((oldState) => {
      if(typeof(profPic) == "string"){
        let newState = {...oldState, currentUser: user, profPicUrl: profPic};
        return newState;
      } else {
        let newState = {...oldState, currentUser: user};
        return newState;
      }
    });
  }

  toggleSignInModal = () => {
    this.setState((oldState) => {
      let newState = {...oldState, showSignInModal: !oldState.showSignInModal};
      return newState;
    });
  }
  toggleProfileModal = () => {
    this.setState((oldState) => {
      let newState = {...oldState, showProfileEditModal: !oldState.showProfileEditModal};
      return newState;
    });
  }

  userButton = () => {
    if(!this.state.currentUser) {
      return (
        <div className={styles['sellButton']} onClick={this.toggleSignInModal}>
          Log in
        </div>
      )
    }
    else {
      let divStyle = {};
      if(this.state.profPicUrl){
        divStyle = {
          backgroundImage: 'url(' + this.state.profPicUrl + ')',
          display: 'inline-block',
          width: '30px',
          height: '30px',
          borderRadius: '50%',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center center',
          backgroundSize: 'cover',
        };
      }
      return (
        <>
        <Dropdown>
          <Dropdown.Toggle className={styles['sellButton']}>
            <div className="user" style={divStyle}></div>
            {this.state.currentUser?.displayName ?? "User"}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => signOut(getAuth())}>Log Out</Dropdown.Item>
            <Dropdown.Item onClick={this.toggleProfileModal}>Edit Profile</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown></>
      )
    }
  };


  render() {
    return <><div className={styles['header']}>
      <div className={styles['headerTopRow']}>
        <img
          alt='logo'
          className={styles['logo']}
          src={Logo} />
        <input
          className={styles['searchBar']}
          type="text"
          placeholder="Search By artists, style, theme, tag, location, etc." />
        <div className={styles['headerTopRowRight']}>
          <button onClick={() => this.props.navigate('/setupShop')} className={styles['sellButton']}>
            Sell on Pkazo
          </button>
          {this.userButton()}
          <img
            alt='logo'
            className={styles['cart']}
            src={Cart} />
        </div>
      </div>
      <div className={styles['headerBottomRow']}>
        {this.navigationCategories.map((category) => {
          return (
            <div key={category} className={styles['category']}>
              {category}
            </div>
          );
        })}
      </div>
      {this.state.showSignInModal &&
        <DimmedOverlay>
          <SignInModal closeModal={this.toggleSignInModal} />
        </DimmedOverlay>}
      {this.state.showProfileEditModal &&
        <DimmedOverlay>
          <EditProfileModal closeModal={this.toggleProfileModal} />
        </DimmedOverlay>}
    </div></>
    }
}

export default Header;
