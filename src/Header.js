import SocialIcons from "./Header/SocialIcons";
import TimeDisplay from "./Header/TimeDisplay" ;

function Header(){
    return (
        <div>
            <SocialIcons />
            <h1>Tirnatek Radio</h1>
            <TimeDisplay />
        </div>
    )

}
export default Header