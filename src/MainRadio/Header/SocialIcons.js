import { useState } from 'react';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faDiscord, faGithub } from '@fortawesome/free-brands-svg-icons';
import { faBars, faGear } from '@fortawesome/free-solid-svg-icons';

import VolumeControl from './VolumeControl';
import AudioButtons from './AudioButtons';
import NextSong from './NextSong';

function SocialIcons({ isMobile }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(prevState => !prevState);
  };

  const toggleMenu = () => {
    setIsMenuOpen(prevState => !prevState);
  };

  return (
    <div>
      <div className={isMobile ? 'apb-barres-mobile' : 'apb-barres'}>
        <div onClick={toggleMenu}>
          <FontAwesomeIcon icon={faBars} />
        </div>
      </div>
      <div className={isMobile ? 'apb-gear-mobile' : 'apb-gear'}>
        <div onClick={toggleDropdown}>
          <FontAwesomeIcon icon={faGear} />
        </div>
      </div>
      <div className={`${isDropdownOpen ? (isMobile ? 'social-icons-mobile open' : 'social-icons open') : (isMobile ? 'social-icons-mobile' : 'social-icons')}`}>
        <div className="dropdown-content">
          <div className={`gear-menu ${isDropdownOpen ? 'visible' : ''}`}>
            <div className={isMobile ? 'apb-gear-menu-mobile' : 'apb-gear-menu'}>
              <div onClick={toggleDropdown}>
                <FontAwesomeIcon icon={faGear} />
              </div>
            </div>
          </div>
          <div className={`next-song-container ${isDropdownOpen ? 'visible' : ''}`}>
            <NextSong isMobile={isMobile} />
          </div>
          <div className={`volume-control-container ${isDropdownOpen ? 'visible' : ''}`}>
            <VolumeControl isMobile={isMobile} />
          </div>
          <div className={`audio-buttons-container ${isDropdownOpen ? 'visible' : ''}`}>
            <AudioButtons isMobile={isMobile} />
          </div>
          <div className="icons-container">
            <a href="https://instagram.com/tirnatek" className="lieninsta" target="_blank" rel="noreferrer">
              <div className="apb-insta">
                <FontAwesomeIcon icon={faInstagram} />
              </div>
            </a>
            <a href="https://discord.gg/mCY6mPP7Gw" className="liendiscord" target="_blank" rel="noreferrer">
              <div className="apb-discord">
                <FontAwesomeIcon icon={faDiscord} />
              </div>
            </a>
            <a href="https://github.com/St4lV/docker-react-azuracast-web-interface" className="liengithub" target="_blank" rel="noreferrer">
              <div className="apb-github">
                <FontAwesomeIcon icon={faGithub} />
              </div>
            </a>
          </div>
        </div>
      </div>
      <div className={`${isMenuOpen ? (isMobile ? 'main-menu-mobile open' : 'main-menu open') : (isMobile ? 'main-menu-mobile' : 'main-menu')}`}>
        <div className={`menu-container ${isMenuOpen ? 'visible' : ''}`}>
          <Link to={`/` }className="link"onClick={toggleMenu}>
            <h1>La Radio</h1>
          </Link>
          <Link to={`/sets` }className="link"onClick={toggleMenu}>
            <h1>DJ Sets</h1>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SocialIcons;