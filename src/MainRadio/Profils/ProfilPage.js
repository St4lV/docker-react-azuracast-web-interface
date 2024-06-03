import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';

import TNTRQRCODE from '../TNTRQRCODE.png';

function ProfilPage({ isMobile }) {
    const { user } = useParams();
    const navigate = useNavigate();
    const [profileData, setProfileData] = useState({});
    const [selfView, setSelfView] = useState(0);
    const localUsername = localStorage.getItem('username');

    useEffect(() => {
        const fetchProfileData = async () => {

            try {
                const response = await axios.post('https://b.tirnatek.fr/get-profile-data', { username: user });

                if (response.status === 200) {
                    setProfileData(response.data);

                    if (user === localUsername) {
                        setSelfView(1);
                    } else {
                        setSelfView(0);
                    }
                } else {
                    navigate('/');
                }
            } catch (error) {
                console.error('Error fetching profile data:', error);
                if (user !== localUsername) {
                    navigate(`/profil/${localUsername}`);
                } else {
                    navigate('/');
                }
            }
        };

        fetchProfileData();
    }, [user, navigate]);

    return (
        <div className='profil-testtttt'>
            <img
                src={TNTRQRCODE}
                id={isMobile ? 'profile-cover-mobile' : 'profile-cover'}
                alt="cover"
                onError={(e) => { e.target.src = TNTRQRCODE }}
            />
            <br />
            <div className='profile-user-infos'>
                <h1>
                    {selfView === 1 && (
                        <Link to={`/profil/${localUsername}/éditer`} className='link'>
                            <FontAwesomeIcon icon={faPenToSquare} style={{ marginRight: '10px' }} />
                        </Link>
                    )}
                    <span>
                        {user}
                    </span>
                </h1>
                <br />
                {profileData.description}
            </div>
        </div>
    );
}

export default ProfilPage;
