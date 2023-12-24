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
    <div className={isMobile ? 'mobile-body' : 'body'}>
      <header><Header isMobile={isMobile} /></header>
      <div className='bg-centre'>
        <Schedule isMobile={isMobile} />
        <Endpage isMobile={isMobile} />
      </div>
      <footer><AudioPlayer isMobile={isMobile} /></footer>
    </div>
  );
};

export default UserAgent;
