import { signOut, getAuth } from 'firebase/auth';
import NavSection from 'components/common/NavSection';
import NavLink from 'components/common/NavLink';
import styles from 'styles/common/Navigation.module.scss';

interface Props {
    isSignedIn: boolean;
    showLogin: () => void;
}

const Navigation = ({isSignedIn, showLogin}:Props ) => {

  const getAlpha = () => {
     let result = [];
     for (let i = 65; i < 91; i ++) {
        result.push(<p>{String.fromCharCode(i)}</p>);
     }
     return result;
  }
  const alphabet = getAlpha();

  return (
    <div>
        <nav className={styles["nav-header"]}>
            <div className={styles["nav-logo"]}>
                <NavLink title="Pkazo" link="/"/>
            </div>
            <input
                className={styles["search"]}
                type="text"
                id="fname"
                value="Search By artists, style, theme, tag, location, etc.">
                </input>
            <NavLink title="Buy" link="/buy"/>
            <NavLink title="Sell" link="/sell"/>
            {!isSignedIn && 
            <p onClick={showLogin} className={styles["nav-button-white"]}>
                Log In
            </p>
            }
            {!isSignedIn && 
            <p onClick={showLogin} className={styles["nav-button-black"]}>
                Sign Up
            </p>}
            {isSignedIn && 
            <p onClick={() => signOut(getAuth())} className={styles["nav-button-white"]}>
                Log Out
            </p>}
            <NavLink title="Cart" link="/cart"/>
        </nav>
        <nav className={styles["nav-subheader"]}>
            <NavSection title="Artist">
                <div className={styles["grid"]}>
                    <div className={styles["grid-side-bar"]}>
                        <div>Trending on Pkazo</div>
                        <div className={styles["spacer"]}/>
                        <div> View All Artists </div>
                    </div>
                    <div className={styles["grid-main"]}>
                        <div style={{display: "flex"}}>
                            <div className={styles["button-col"]}>
                                <h5>New Form</h5>
                                <div className={styles["button-item"]}>Emerging Artists</div>
                                <div className={styles["button-item"]}>Student Artists</div>
                                <div className={styles["button-item"]}>Classical Artists</div>
                                <div className={styles["button-item"]}>Street Artists</div>
                            </div>

                            <div className={styles["button-col"]}>
                                <h5>Artists by City</h5>
                                <div className={styles["button-item"]}>New York City</div>
                                <div className={styles["button-item"]}>Seattle</div>
                                <div className={styles["button-item"]}>Chicago</div>
                                <div className={styles["button-item"]}>International</div>
                                <div className={styles["button-item"]}>Seattle</div>
                                <div className={styles["spacer"]}/>
                            </div>
                            <div className={styles["button-col"]}>
                                <h5>Featured Artists</h5>
                            </div>
                        </div>
                        <div className={styles["spacer"]}/>
                        <div>
                            <h5> Browse By Name </h5>
                            <div style={{display: "flex", justifyContent: "space-between", maxWidth: "50%"}}>
                                {alphabet}
                            </div>
                        </div>
                    </div>
                </div>
            </NavSection>
            <NavSection title="Artworks">
                <div className={styles["grid"]}>
                    <div className={styles["grid-side-bar"]}>
                    </div>
                    <div className={styles["grid-main"]}>
                        <div style={{display: "flex"}}>
                            <div className={styles["button-col"]}>
                                <h5>Price</h5>
                                <div className={styles["button-item"]}>$50,000 and Above</div>
                                <div className={styles["button-item"]}>$25,000 - $50,000</div>
                                <div className={styles["button-item"]}>$10,000 - $25,000</div>
                                <div className={styles["button-item"]}>$5,000  -  $10,00</div>
                            </div>
                            <div className={styles["button-col"]}>
                                <h5>Medium</h5>
                                <div className={styles["button-item"]}>Painting</div>
                                <div className={styles["button-item"]}>Prints</div>
                                <div className={styles["button-item"]}>Photography</div>
                                <div className={styles["button-item"]}>Sculpture</div>
                                <div className={styles["button-item"]}>Mixed Media</div>
                                <div className={styles["button-item"]}>Design</div>
                            </div>
                            <div className={styles["button-col"]}>
                                <h5>Style</h5>
                                <div className={styles["button-item"]}>Fine Art</div>
                                <div className={styles["button-item"]}>Abstract</div>
                                <div className={styles["button-item"]}>Modern</div>
                                <div className={styles["button-item"]}>Pop Art</div>
                            </div>
                        </div>
                    </div>
                </div>
            </NavSection>
            <NavLink title="About" link="/about"/>
            <div className={styles["spacer"]}/>
            <NavLink title="Download App" link="/app" />
        </nav>
    </div>
  );
}

export default Navigation;
