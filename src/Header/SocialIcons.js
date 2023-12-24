import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faDiscord, faGithub } from '@fortawesome/free-brands-svg-icons';

function SocialIcons() {
  return (
    <div id='social-icons'>
      <a href="https://instagram.com/tirnatek" className="lieninsta" target="_blank">
        <div className="apb-insta">
          <FontAwesomeIcon icon={faInstagram} />
        </div>
      </a>
      
      <a href="https://instagram.com/tirnatek" className="liendiscord" target="_blank">
        <div className="apb-discord">
          <FontAwesomeIcon icon={faDiscord} />
        </div>
      </a>
      
      <a href="https://github.com/St4lV/St4lV.github.io" className="liengithub" target="_blank">
        <div className="apb-github">
          <FontAwesomeIcon icon={faGithub} />
        </div>
      </a>
    </div>
  );
}

export default SocialIcons;
