import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import EditProfil from './EditProfil';
import { AuthContext } from '../Connect/AuthContext';

function EditProfilComp({ isMobile }) {
    const { isAuthenticated } = useContext(AuthContext);
    const [editTab, setEditTab] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/');
        }
    }, [isAuthenticated, navigate]);

    function hb0() {
        setEditTab(0);
    }
    function hb1() {
        setEditTab(1);
    }
    function hb2() {
        setEditTab(2);
    }

    return (
        <div>
            <div className='edit-choice'>
                <button onClick={hb0}>Profil</button>
                <button onClick={hb1}>Sets</button>
                <button onClick={hb2}>Test</button>
            </div>

            <h2>Editer</h2>
            {editTab === 0 ? (
                <div className='edit-profil-comp'> 
                    <EditProfil />
                </div>
            ) : editTab === 1 ? (
                <div className='edit-profil-comp'> 
                    {/*<PodcastEpisodeDetails />*/}
                </div>
            ) : (
                <div></div>
            )}
        </div>
    );
}

export default EditProfilComp;
