import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
//import PodcastEpisodeDetails from "./PodcastEpisodeDetails";
import EditProfil from './EditProfil';

function EditProfilComp({ isMobile, ResultUC }) {
    const [editTab, setEditTab] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        if (ResultUC === false) {
            navigate('/');
        }
    }, [ResultUC, navigate]);

    function hb0 () {
        setEditTab(0);
    }
    function hb1 () {
        setEditTab(1);
    }
    function hb2 () {
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
