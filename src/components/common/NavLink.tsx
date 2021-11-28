import { useNavigate } from 'react-router';
import styles from 'styles/common/Navigation.module.scss';

interface Props {
    title: string;
    link: string;
}

const NavLink = ({title, link}: Props) => {
    const navigate = useNavigate();
    return (
        <a onClick={() => navigate(link)} className={styles["nav-link"]}>
            {title}
        </a>
    );
}

export default NavLink;
