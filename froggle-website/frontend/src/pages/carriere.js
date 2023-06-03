import React, {useEffect} from 'react';
import { useNavigate} from 'react-router-dom';
import "../css/styleCarriere.css";
import Header from '../components/Header';
import ProgressBar from '../components/ProgressBar';
import CarriereCard from '../components/CarriereCard';

import pic1 from '../images/pfp.jpg';

const Carriere = ({ primaryColor, avatarIndex }) => {

  const userDataString = localStorage.getItem('userData');
  const userData = userDataString ? JSON.parse(userDataString) : null;
  const navigate = useNavigate();
  useEffect(()=>{if (userData == null){
    navigate('/login');
  }})

  let img = require("../images/avatar" + avatarIndex + ".png");

  let pics = [pic1, pic1, pic1];

  return (
    <> 
      <Header text="Carrière" />
      <div className='hero'>
        <div className='heroData'>
          <div className='heroProfile'>
            <img src={img} alt="photo de profil" className='heroPicture'/>
            <p className='heroName' title="xX_KypoTv_Xx chrjf vhefjvkfel vjchefkvlrfv ghefjdkscled">xX_KypoTv_Xx chrjf vhefjvkfel vjchefkvlrfv ghefjdkscled</p>
          </div>

          <div className='heroLevel'>
            <div className='level'>Niv : 53</div>
            <ProgressBar width="100" height="35" total={4000} current={1500} color={primaryColor} />
            <div className='exp'>1500/4000</div>
          </div>
        </div>
      </div>

      <div className='gamesBgCont'>

        <div className='gamesCont' style={{background: primaryColor}}>
          <h2 className='bigTitle'>Statistiques des parties</h2>
          
          <div className='statCont1'> 
            <div>
              <div className='statNumber'>50</div>
              <div className='statName'>parties jouées</div>
            </div>
            <div>
              <div className='statNumber'>50</div>
              <div className='statName'>parties jouées</div>
            </div>
            <div>
              <div className='statNumber'>50</div>
              <div className='statName'>parties jouées</div>
            </div>
          </div>

        <h3 className='mediumTitle'>Classements moyens</h3>
        <div className='statCont2'>
          <div className='place'>
            <div className='num'>1</div>
            <ProgressBar width="60" height="25" current={0} total={1} />
            <p>60%</p>
          </div>

          <div className='place'>
            <div className='num'>2</div>
            <ProgressBar width="20" height="25" current={0} total={1} />
            <p>20%</p>
          </div>

          <div className='place'>
            <div className='num'>3</div>
            <ProgressBar width="30" height="25" current={0} total={1} />
            <p>30%</p>
          </div>

          <div className='place'>
            <div className='num'>4</div>
            <ProgressBar width="10" height="25" current={0} total={1} />
            <p>10%</p>
          </div>
        </div>

        <h3 className='mediumTitle'>Historiques des parties</h3>
        <div className='historique'>
          <CarriereCard pictures={pics} />
          <CarriereCard pictures={pics} />
          <CarriereCard pictures={pics} />
        </div>
      
      </div>

      </div>

    </>
  )
}

export default Carriere
