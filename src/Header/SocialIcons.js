import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faDiscord, faGithub } from '@fortawesome/free-brands-svg-icons';
function SocialIcons({ isMobile }) {
  const socialClasses = {
    barremobile: isMobile ? 'barres-mobile' : 'barres',
    lieninsta: isMobile ? 'apb_insta-mobile' : 'apb_insta',
    liendiscord: isMobile ? 'apb_discord-mobile' : 'apb_discord',
    liengithub: isMobile ? 'apb_github-mobile' : 'apb_github',
  };
  return (
    <div className={isMobile ? 'social-icons-mobile' : 'social-icons'}>
      <div className={socialClasses.barres}>
         <FontAwesomeIcon icon="fa-solid fa-bars" /> 
     </div>
      <a href="https://instagram.com/tirnatek" className="lieninsta" target="_blank" rel="noreferrer">
        <div className={socialClasses.apb_insta}>
          <FontAwesomeIcon icon={faInstagram} />
        </div>
      </a>
      <FontAwesomeIcon icon="fa-solid fa-bars" />
      <a href="https://discord.gg/GJgnaYJ8jQ" className="liendiscord" target="_blank" rel="noreferrer">
        <div className={socialClasses.apb_discord}>
          <FontAwesomeIcon icon={faDiscord} />
        </div>
      </a>
      
      <a href="https://github.com/St4lV/docker-react-azuracast-web-interface" className="liengithub" target="_blank" rel="noreferrer">
        <div className={socialClasses.apb_github}>
          <FontAwesomeIcon icon={faGithub} />
        </div>
      </a>
      </div>
  );
}

export default SocialIcons;
