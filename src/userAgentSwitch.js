import React, { useEffect, useState } from 'react';
import './App.css';
import Header from './Header';
import AudioPlayer from './AudioPlayer';
import Schedule from './Schedule';
import Endpage from './EndPage';

const UserAgent = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const userAgent = navigator.userAgent;
    setIsMobile(userAgent.match(/Mobile/i));
  }, []);

  return (
    <div className={isMobile ? 'body-mobile' : 'body'}>
      <header><Header isMobile={isMobile} /></header>
      <div className={isMobile ? 'bg-centre-mobile' : 'bg-centre'}>
        <Schedule isMobile={isMobile} />
        <Endpage isMobile={isMobile} />
      </div>
      <div className={isMobile ? 'footer-mobile' : 'footer'}><AudioPlayer isMobile={isMobile} /></div>
    </div>
  );
};

export default UserAgent;
