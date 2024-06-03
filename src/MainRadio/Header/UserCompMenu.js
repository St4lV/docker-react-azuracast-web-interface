import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../Connect/AuthContext';

function UserCompMenu({ isMobile, toggleUserComp }) {
    const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);

    const handleDisconnect = () => {
        setIsAuthenticated(false);
        toggleUserComp();
        localStorage.removeItem('email');
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        localStorage.removeItem('description')
    };
    const user = localStorage.getItem('username')
    const handleCloseComp = () => {
        toggleUserComp();
    };

    if (!isAuthenticated) {
        return null;
    }

    return (
        <div>
            <span>Bonjour<br/>{user}</span>
            <Link to={`/profil/${user}`} className={'link'} onClick={handleCloseComp}>
                <h3>Profil</h3>
            </Link>
            <Link to={`/profil/${user}/éditer`} className={'link'} onClick={handleCloseComp}>
                <h3>Éditer</h3>
            </Link>
            <div onClick={handleDisconnect}>
                <h3>Se déconnecter</h3>
            </div>
        </div>
    );
}

export default UserCompMenu;