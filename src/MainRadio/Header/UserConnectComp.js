import React, { useState, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
import UserCompMenu from './UserCompMenu';
import Connect from './Connect';
import TNTRQRCODE from '../TNTRQRCODE.png';
import { AuthContext } from '../Connect/AuthContext';

function UserConnectComp({ isMobile }) {
    const { isAuthenticated } = useContext(AuthContext);
    const [isUserCompOpen, setIsUserCompOpen] = useState(false);

    const toggleUserComp = () => {
        setIsUserCompOpen((prevState) => !prevState);
    };

    return (
        <>
            <div
                className={isMobile ? 'apb-user-mobile' : 'apb-user'}
                onClick={toggleUserComp}
            >
                <FontAwesomeIcon icon={faCircleUser} />
            </div>
            <div
                className={`${
                    isUserCompOpen
                        ? isMobile
                            ? 'main-user-comp-mobile open'
                            : 'main-user-comp open'
                        : isMobile
                            ? 'main-user-comp-mobile'
                            : 'main-user-comp'
                }`}
            >
                <div className={`user-comp-container ${isUserCompOpen ? 'visible' : ''}`}>
                    <img src={TNTRQRCODE} className={isMobile ? 'm-connect-img' : 'connect-img'} alt="User" />
                    {isAuthenticated ? (
                        <UserCompMenu
                            isMobile={isMobile}
                            toggleUserComp={toggleUserComp}
                        />
                    ) : (
                        <Connect
                            isMobile={isMobile}
                        />
                    )}
                </div>
            </div>
        </>
    );
}

export default UserConnectComp;
