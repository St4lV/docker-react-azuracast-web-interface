function Endpage({isMobile}){
    return (
        <div className={isMobile ? 'm-p-endpage' : 'p-endpage'}>
          <h3>DJs, producteurs, amateurs de lives machines,<br/>
          Contactez nous sur  <a href="https://instagram.com/tirnatek" target="_blank"className="link">Instagram</a> pour être diffusés !</h3>
          <br/><p>N'hésitez pas à faire des suggestions On prends ! :)
          <br/><br/>Projet à but éducatif svp la SACEM soyez cool
          <br/><br/>TirnatekRadio@Beta2.5.0</p>
        </div>
    )

}
export default Endpage