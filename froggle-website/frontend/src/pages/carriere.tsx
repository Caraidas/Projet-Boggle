import React, {useEffect} from 'react';
import { useNavigate} from 'react-router-dom';
import "../css/styleCarriere.css";
import Header from '../components/Header';
import ProgressBar from '../components/ProgressBar';
import CarriereCard from '../components/CarriereCard';

import pic1 from '../images/pfp.jpg';

const Carriere = (props : { primaryColor : string, avatarIndex :any }) => {

  const userDataString = localStorage.getItem('userData');
  const userData = userDataString ? JSON.parse(userDataString) : null;
  const navigate = useNavigate();
  console.log(userData?.classementData);
  useEffect(()=>{if (userData == null){
    navigate('/login');
  }})

  let niveau = 1;
  let pointsXPNiveau = 100;
  let xp_joueur = userData?.XP_Actuel;
  while (xp_joueur >= pointsXPNiveau) {
      xp_joueur -= pointsXPNiveau;
      pointsXPNiveau += pointsXPNiveau * 0.2;
      niveau++;
  }
  let xpRestant = pointsXPNiveau - xp_joueur;

  
  let img = require("../images/avatar" + props.avatarIndex + ".png");

  let nbgames = 0;
  let nblose = 0;
  let gamesCount = [0,0,0,0];
  userData?.classementData.forEach(element => {
    nbgames += parseInt(element['nbClassement']);
    if (element['Podium'] == 1){
      gamesCount[0] += parseInt(element['nbClassement']);
    }else{
      nblose += parseInt(element['nbClassement']);
      if (element['Podium'] == 2)
        gamesCount[1] += parseInt(element['nbClassement']);
      else if (element['Podium'] == 3)
        gamesCount[2] += parseInt(element['nbClassement']);
      else
        gamesCount[3] += parseInt(element['nbClassement']);
    }
  });
  

  return (
    <> 
      <Header text="Carrière" />
      <div className='hero'>
        <div className='heroData'>
          <div className='heroProfile'>
            <img src={img} alt="photo de profil" className='heroPicture'/>
            <p className='heroName' title={userData?.pseudo}>{userData?.pseudo}</p>
          </div>

          <div className='heroLevel'>
            <div className='level'>Niv : {niveau}</div>
            <ProgressBar width="100" height="35" total={Math.round(pointsXPNiveau)} current={Math.round(pointsXPNiveau - xpRestant)} color={props.primaryColor} />
            <div className='exp'>{Math.round(pointsXPNiveau - xpRestant)}/{Math.round(pointsXPNiveau)}</div>
          </div>
        </div>
      </div>

      <div className='gamesBgCont'>

        <div className='gamesCont' style={{background: props.primaryColor}}>
          <h2 className='bigTitle'>Statistiques des parties</h2>
          
          <div className='statCont1'> 
            <div>
              <div className='statNumber'>{nbgames}</div>
              <div className='statName'>parties jouées</div>
            </div>
            <div>
              <div className='statNumber'>{gamesCount[0]}</div>
              <div className='statName'>parties Gagné</div>
            </div>
            <div>
              <div className='statNumber'>{nblose}</div>
              <div className='statName'>parties Perdu</div>
            </div>
          </div>

        <h3 className='mediumTitle'>Classements moyens</h3>
        <div className='statCont2'>
          {userData?.classementData.map((element, index) => (
            <div className='place'>
            <div className='num'>{element['Podium']}</div>
            <ProgressBar key={index} color="#fff" width={gamesCount[element['Podium']-1]*100/nbgames} height="25" current={0} total={1} />
            <p>{gamesCount[element['Podium']-1]*100/nbgames}%</p>
          </div>
          ))}
        </div>

        <h3 className='mediumTitle'>Historiques des parties</h3>
        <div className='historique'>
          {userData?.historique.map((histoData : any, index : number)=>(
              <CarriereCard key={index} pictures={userData?.historique[index][0]} number={index}/>
            ))
          }
        </div>
      
      </div>

      </div>

    </>
  )
}

export default Carriere
