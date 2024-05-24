import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Header';
import AudioPlayer from './AudioPlayer';
import LastReleases from './LastReleases';
import Schedule from './Schedule';
import Endpage from './EndPage';
import PodcastMain from './PodcastMain';
import PodcastPage from './PodcastPage';
import { AudioPlayerProvider } from './AudioPlayerContext';

const UserAgent = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const userAgent = navigator.userAgent;
    setIsMobile(/Mobile/i.test(userAgent));
  }, []);

  return (
    <AudioPlayerProvider isMobile={isMobile}>
      <Router>
        <header>
          <Header isMobile={isMobile} />
        </header>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <div className={isMobile ? 'body-mobile' : 'body'}>
                  <div className={isMobile ? 'bg-centre-mobile' : 'bg-centre'}>
                    <Schedule isMobile={isMobile} />
                    <LastReleases isMobile={isMobile} />
                    <Endpage isMobile={isMobile} />

                  </div>
                </div>
              </>
            }
          />
          <Route
            path="/sets"
            element={
              <>
                <PodcastMain isMobile={isMobile} />
                <div className={isMobile ? 'm-p-endpage-dj-set' : 'p-endpage-dj-set'}>
                  <Endpage isMobile={isMobile} />
                </div>
              </>
            }
          />
          <Route
            path="/sets/:urlEncodedTitle"
            element={
              <>
                <PodcastPage isMobile={isMobile} />
                <div className={isMobile ? 'm-p-endpage' : 'p-endpage'}>
                  <Endpage isMobile={isMobile} />
                </div>
              </>
            }
          />
        </Routes>
        <div className={isMobile ? 'footer-mobile' : 'footer'}>
          <AudioPlayer isMobile={isMobile} />
        </div>
      </Router>
    </AudioPlayerProvider>
  );
};

export default UserAgent;
