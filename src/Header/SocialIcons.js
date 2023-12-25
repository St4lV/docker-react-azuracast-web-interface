import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faDiscord, faGithub } from '@fortawesome/free-brands-svg-icons';
function SocialIcons({ isMobile }) {
  return (
    <div className={isMobile ? 'social-icons-mobile' : 'social-icons'}>
      <div className={isMobile ? 'apb-barres_mobile' : 'apb_barres'}>
         <FontAwesomeIcon icon="fa-solid fa-bars" /> 
     </div>
      <a href="https://instagram.com/tirnatek" className="lieninsta" target="_blank" rel="noreferrer">
        <div className={isMobile ? 'apb-insta_mobile' : 'apb_insta'}>
          <FontAwesomeIcon icon={faInstagram} />
        </div>
      </a>
      <a href="https://discord.gg/GJgnaYJ8jQ" className="liendiscord" target="_blank" rel="noreferrer">
      <div className={isMobile ? 'apb-insta_discord' : 'apb_discord'}>
          <FontAwesomeIcon icon={faDiscord} />
        </div>
      </a>
      
      <a href="https://github.com/St4lV/docker-react-azuracast-web-interface" className="liengithub" target="_blank" rel="noreferrer">
      <div className={isMobile ? 'apb-github_mobile' : 'apb_github'}>
          <FontAwesomeIcon icon={faGithub} />
        </div>
      </a>
      </div>
  );
}

export default SocialIcons;
