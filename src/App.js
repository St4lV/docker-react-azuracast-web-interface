import React from 'react';
import './App.css';
import Header from './Header';
import AudioPlayer from './AudioPlayer';
import Schedule from './Schedule';
import Endpage from './EndPage';

function App() {
  return (
    <div>
      <header><Header /></header>
      <div className='bg-centre'>
        <Schedule />
        <Endpage  />
      </div>
      <footer><AudioPlayer /></footer>
    </div>
  );
}
export default App;


