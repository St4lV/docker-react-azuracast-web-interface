import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Header';
import AudioPlayer from './AudioPlayer';
import Schedule from './Schedule';
import LastReleases from './LastReleases';
import LastDJadd from './LastDJadd';
import Endpage from './EndPage';
import PodcastMain from './PodcastMain';
import PodcastPage from './PodcastPage';
import { AudioPlayerProvider } from './AudioPlayerContext';
import EditProfilComp from './Uploads/EditProfilComp';
import UserConnectComp from './Header/UserConnectComp';
import ConnectAtStart from './Connect/ConnectAtStart';
import { AuthProvider } from './Connect/AuthContext';
import ProfilPage from './Profils/ProfilPage';

const UserAgent = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const userAgent = navigator.userAgent;
    setIsMobile(/Mobile/i.test(userAgent));
  }, []);

  const user = localStorage.getItem('username')
  return (
    <AudioPlayerProvider isMobile={isMobile}>
      <AuthProvider>
        <ConnectAtStart />
        <Router>
          <header>
            <Header isMobile={isMobile} />
            <UserConnectComp isMobile={isMobile} />
          </header>
          <Routes>
            <Route
              path="/"
              element={
                <div className={isMobile ? 'body-mobile' : 'body'}>
                  <div className={isMobile ? 'bg-centre-mobile' : 'bg-centre'}>
                    <Schedule isMobile={isMobile} />
                    <LastReleases isMobile={isMobile} />
                    <LastDJadd isMobile={isMobile} />
                    <Endpage isMobile={isMobile} />
                  </div>
                </div>
              }
            />
            <Route
              path="/sets"
              element={<>
                <PodcastMain isMobile={isMobile} />
                <Endpage isMobile={isMobile} />
                </>
                }
            />
            <Route
              path="/sets/:urlEncodedTitle"
              element={<>
                <PodcastPage isMobile={isMobile} />
                <Endpage isMobile={isMobile} />
                </>
                }
            />
          <Route
              path={`/profil/${user}/éditer`}
              element={<>
              <EditProfilComp isMobile={isMobile} />
              <Endpage isMobile={isMobile} />
              </>
              }
            />
          <Route
              path={`/profil/${user}`}
              element={
                <>
              <ProfilPage isMobile={isMobile} />
              <Endpage isMobile={isMobile} />
              </>
              }
            />
          </Routes>
          <div className={isMobile ? 'footer-mobile' : 'footer'}>
            <AudioPlayer isMobile={isMobile} />
          </div>
        </Router>
      </AuthProvider>
    </AudioPlayerProvider>
  );
};

export default UserAgent;
