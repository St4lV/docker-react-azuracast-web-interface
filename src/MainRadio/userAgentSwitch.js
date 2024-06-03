import React, { useEffect, useState, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
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
import { AuthProvider, AuthContext } from './Connect/AuthContext';
import ProfilPage from './Profils/ProfilPage';

const UserAgent = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const userAgent = navigator.userAgent;
    setIsMobile(/Mobile/i.test(userAgent));
  }, []);

  const user = localStorage.getItem('username');

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
                  </div>
                </div>
              }
            />
            <Route
              path="/sets"
              element={
                <>
                  <PodcastMain isMobile={isMobile} />
                </>
              }
            />
            <Route
              path="/sets/:urlEncodedTitle"
              element={
                <>
                  <PodcastPage isMobile={isMobile} />
                </>
              }
            />
            <Route
              path="/profil/:user?/éditer"
              element={<ProtectedRoute isMobile={isMobile} component={EditProfilComp} />}
            />
            <Route
              path="/profil/:user?"
              element={
                <>
                  <ProfilPage isMobile={isMobile} />
                </>
              }
            />
          </Routes>
          <Endpage isMobile={isMobile} />
          <div className={isMobile ? 'footer-mobile' : 'footer'}>
            <AudioPlayer isMobile={isMobile} />
          </div>
        </Router>
      </AuthProvider>
    </AudioPlayerProvider>
  );
};

const ProtectedRoute = ({ component: Component, isMobile }) => {
  const { isAuthenticated } = useContext(AuthContext);

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <Component isMobile={isMobile} />
    </>
  );
};

export default UserAgent;
