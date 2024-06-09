import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../Connect/AuthContext';

function UserCompMenu({ isMobile, toggleUserComp }) {
    const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
    const [user, setUser] = useState(localStorage.getItem('username'));

    useEffect(() => {
        const handleStorageUpdate = () => {
            setUser(localStorage.getItem('username'));
        };

        window.addEventListener('localStorageUpdated', handleStorageUpdate);

        return () => {
            window.removeEventListener('localStorageUpdated', handleStorageUpdate);
        };
    }, []);

    const handleDisconnect = () => {
        setIsAuthenticated(false);
        toggleUserComp();
        localStorage.removeItem('email');
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        localStorage.removeItem('description');
    };

    const handleCloseComp = () => {
        toggleUserComp();
    };

    if (!isAuthenticated) {
        return null;
    }

    return (
        <div>
            <h3>Bonjour<br/><span className='user-menu-username'>{user}</span></h3>
            <Link to={`/profil/${user}`} className={'link'} onClick={handleCloseComp}>
                <h3>Profil</h3>
            </Link>
            <div onClick={handleDisconnect}>
                <h3>Se déconnecter</h3>
            </div>
        </div>
    );
}

export default UserCompMenu;
