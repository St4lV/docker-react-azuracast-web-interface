import SocialIcons from "./Header/SocialIcons";
import TimeDisplay from "./Header/TimeDisplay";

function Header({ isMobile }) {
  return (
    <div className={isMobile ? 'header-mobile' : 'header'}>
      <SocialIcons isMobile={isMobile} />
      <h1>Tirnatek Radio</h1>
      <TimeDisplay isMobile={isMobile} />
    </div>
  );
}

export default Header;