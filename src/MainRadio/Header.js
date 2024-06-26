import { Link } from 'react-router-dom';

import SocialIcons from "./Header/SocialIcons";
import TimeDisplay from "./Header/TimeDisplay";

function Header({ isMobile }) {
  return (
    <div className={isMobile ? 'header-mobile' : 'header'}>
      <SocialIcons isMobile={isMobile} />
      <Link to={`/` }className="link">
      <div className={isMobile ? 'title-header-mobile' : 'title-header'}>
        <h1>Tirnatek Radio</h1>
     </div>
      <div className={isMobile ? 'time-display-mobile' : 'time-display'}>
        <TimeDisplay isMobile={isMobile} />
     </div>
     </Link>
    </div>
  );
}

export default Header;