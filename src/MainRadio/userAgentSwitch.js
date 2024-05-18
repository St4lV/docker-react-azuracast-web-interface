import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Header from './Header';
import AudioPlayer from './AudioPlayer';
import Schedule from './Schedule';
import Endpage from './EndPage';
import PodcastMain from './PodcastMain';
import PodcastPage from './Podcasts/PodcastPage';

const UserAgent = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const userAgent = navigator.userAgent;
    setIsMobile(/Mobile/i.test(userAgent));
  }, []);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <div className={isMobile ? 'body-mobile' : 'body'}>
                <header>
                  <Header isMobile={isMobile} />
                </header>
                <div className={isMobile ? 'bg-centre-mobile' : 'bg-centre'}>
                  <Schedule isMobile={isMobile} />
                  <Endpage isMobile={isMobile} />
                </div>
                <div className={isMobile ? 'footer-mobile' : 'footer'}>
                  <AudioPlayer isMobile={isMobile} />
                </div>
              </div>
            </>
          }
        />
        <Route path="/sets" element={<PodcastMain isMobile={isMobile} />} />
        <Route path="/sets/:urlEncodedTitle" element={<PodcastPage isMobile={isMobile} />} />
      </Routes>
    </Router>
  );
};

export default UserAgent;
