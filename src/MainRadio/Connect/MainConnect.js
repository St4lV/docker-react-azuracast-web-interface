import React, { useContext } from 'react';
import { AuthContext } from './AuthContext';

function MainConnect({ isMobile }) {
    const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);

    return (
        <div className='connectbackwhenloading'>
            {!isAuthenticated && <div>Please login to continue</div>}
            {isAuthenticated && <div>Welcome back!</div>}
        </div>
    );
}

export default MainConnect;