import TNTRQRCODE from '../TNTRQRCODE.png'

function ProfilPage ({isMobile}) {
    const username = localStorage.getItem('username');
    const description = localStorage.getItem('description');
    return (
        <div className='profil-testtttt'>
        <img
          src={TNTRQRCODE}
          id={isMobile ? 'profile-cover-mobile' : 'profile-cover'}
          alt="cover"
          onError={(e) => { e.target.src = TNTRQRCODE }}
        />
        <br/>
            <div className='profile-user-infos'>
            <h1>{username}</h1><br/>
            {description}
            </div>
        </div>
    )
}
export default ProfilPage;