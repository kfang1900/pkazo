import React from 'react';

import Cart from 'assets/cart.svg';
import Logo from 'assets/logo.svg';

import SelectedHome from 'assets/selectedicons/icon0.svg';
import SelectedMarketplace from 'assets/selectedicons/icon1.svg';
import SelectedCreate from 'assets/selectedicons/icon2.svg';
import SelectedDiscover from 'assets/selectedicons/icon3.svg';
import SelectedChat from 'assets/selectedicons/icon4.svg';

import DeselectedHome from 'assets/deselectedicons/icon0.svg';
import DeselectedMarketplace from 'assets/deselectedicons/icon1.svg';
import DeselectedCreate from 'assets/deselectedicons/icon2.svg';
import DeselectedDiscover from 'assets/deselectedicons/icon3.svg';
import DeselectedChat from 'assets/deselectedicons/icon4.svg';

import DimmedOverlay from 'components/common/DimmedOverlay';
import SignInModal from 'components/homepage/SignInModal';

import { getAuth, signOut, User } from 'firebase/auth';

import styles from 'styles/common/Header.module.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavigateFunction } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';
import { getProfilePicture } from 'api/auth/firebaseAuthApi';

interface HeaderProps{
    navigate: NavigateFunction,
}
interface HeaderState{
    showSignInModal: boolean,
    profPicUrl: String | null,
    currentUser: User | null,
    width: Number,
    height: Number
}
class Header extends React.Component<HeaderProps, HeaderState> {

    constructor(props: HeaderProps, state: HeaderState) {
        super(props, state);
        this.state = {
            currentUser: getAuth().currentUser,
            showSignInModal: false,
            profPicUrl: null,
            width: window.innerWidth,
            height: window.innerHeight
        }
    }

    updateDimensions = () => {
        this.setState({width: window.innerWidth, height: window.innerHeight});
    }

    componentDidMount() {
        getAuth().onAuthStateChanged((user) => this.onAuthChange(user));
        window.addEventListener('resize', this.updateDimensions);
    }
    componentWillUnmount() {
        window.removeEventListener('resize', this.updateDimensions);
    }

    onAuthChange = async (user: User| null) => {
        let url = null;
        if(user) {
            url = await getProfilePicture();
        }
        this.setUser(user, url)
    }

    iconUrl = ['feed', 'marketplace', 'create', 'discover', 'chat'];
    selectedIcon = [SelectedHome, SelectedMarketplace, SelectedCreate, SelectedDiscover, SelectedChat];
    deselectedIcon = [DeselectedHome, DeselectedMarketplace, DeselectedCreate, DeselectedDiscover, DeselectedChat];

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

    userButton = () => {
        if(!this.state.currentUser) {
            return (
                <button className={styles['login-button']}
                onClick={this.toggleSignInModal}>Sign in</button>
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
                <Dropdown.Toggle className={styles['sell-button']}>
                <div className="user" style={divStyle} />
                {this.state.currentUser?.displayName ?? "User"}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                <Dropdown.Item onClick={() => signOut(getAuth())}>Log Out</Dropdown.Item>
                <Dropdown.Item onClick={() => this.props.navigate('/profile/' + this.state.currentUser!.uid)}>Profile</Dropdown.Item>
                </Dropdown.Menu>
                </Dropdown></>
            )
        }
    };

    navBar = () => {
        let directory = window.location.pathname.split('/')[1];
        if(this.state.width > 900){
            return <div className = {styles['header-center']}>
                {this.iconUrl.map((iconUrl, i) => {
                    return (<img
                        key = {iconUrl}
                        alt = {iconUrl}
                        className = {styles['icon']}
                        src = {(directory === iconUrl ? this.selectedIcon : this.deselectedIcon)[i]}
                        onClick = {() => this.props.navigate('/' + iconUrl)} />);
                })}
            </div>
        }else{
            return <>
                <div style = {{order: 1, width: "100%", height: 0, margin: 0}}/>
                <div style = {{order: 1}}> menu icon here </div>
            </>
        }
    };

    render() {
        return <><div className = {styles['header']}>
            <img
                alt = 'logo'
                className = {styles['logo']}
                src = {Logo}
                onClick = {() => this.props.navigate('/')}/>
            <input
                className={styles['search-bar']}
                type="text"
                placeholder="Search" />
            {this.navBar()}
            <div className = {styles['header-right']}>
                {this.userButton()}
                <button onClick = {() => this.props.navigate('/setupShop')} className = {styles['sell-button']}>
                    Create on Pkazo
                </button>
                <img
                    alt = 'cart'
                    className = {styles['cart']}
                    src = {Cart}
                    onClick = {() => this.props.navigate('/cart')} />
            </div>
            </div>
            {this.state.showSignInModal &&
              <DimmedOverlay>
                <SignInModal closeModal={this.toggleSignInModal} />
              </DimmedOverlay>}
        </>
    }
}

export default Header;
