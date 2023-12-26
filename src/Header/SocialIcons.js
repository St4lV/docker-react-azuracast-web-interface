import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faDiscord, faGithub } from '@fortawesome/free-brands-svg-icons';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import VolumeControl from "./VolumeControl";
import AudioButtons from './AudioButtons';

function SocialIcons({ isMobile }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(prevState => !prevState);
  };

  return (
    <div>
      <div className={isMobile ? 'apb-barres-mobile' : 'apb-barres'}>
        <div onClick={toggleDropdown}>
          <FontAwesomeIcon icon={faBars} />
        </div>
      </div>
      {isDropdownOpen && (
        <div className={isMobile ? 'social-icons-mobile' : 'social-icons'}>
          <div className="dropdown-content">
            <div className="icons-container">
              <a href="https://instagram.com/tirnatek" className="lieninsta" target="_blank" rel="noreferrer">
                <div className="apb-insta">
                  <FontAwesomeIcon icon={faInstagram} />
                </div>
              </a>
              <a href="https://discord.gg/GJgnaYJ8jQ" className="liendiscord" target="_blank" rel="noreferrer">
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
         <div className={isMobile ? 'volume-control-mobile' : 'bresil'}>
         <VolumeControl isMobile={isMobile}/>
        </div>
          <AudioButtons isMobile={isMobile}/>
        </div>
      )}
    </div>
  );
}

export default SocialIcons;
