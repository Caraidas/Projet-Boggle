import React from 'react';
import "../css/styleCarriere.css";
import Header from '../components/Header';
import ProgressBar from '../components/ProgressBar';
import CarriereCard from '../components/CarriereCard';

import pic1 from '../images/pfp.jpg';

const Carriere = () => {

  let pics = [pic1, pic1, pic1];

  return (
    // <div className='carriere-cont'>
    //     <Header text="Carrière" />
    //     <ProgressBar width="500" total={4} current={1} />
    //     <CarriereCard pictures={pics}></CarriereCard>
    // </div>

    <> 
      <div className='hero'>
        <Header text="Carrière" />
        <div className='heroData'>
          <div className='heroProfile'>
            <img src={pic1} alt="photo de profil" className='heroPicture'/>
            <p className='heroName'>xX_KypoTv_Xx</p>
          </div>

          <div className='heroLevel'>
            <div className='level'>Niv : 53</div>
            <ProgressBar width="100" height="35" total={4000} current={1500} color="#f1e368" />
            <div className='exp'>1500/4000</div>
          </div>
        </div>
      </div>

      <div className='gamesBgCont'>

        <div className='gamesCont'>
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
