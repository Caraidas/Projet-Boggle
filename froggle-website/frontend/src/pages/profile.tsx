import React, {useEffect, useState} from "react";
import { useNavigate} from 'react-router-dom';
import Header from "../components/Header";
import ColorInput from "../components/ColorInput";
import "../css/styleProfile.css";
import AvatarInput from "../components/AvatarInput";
import axios from 'axios';

const ProfilePage = (props: { avatarIndex : number, primaryColor: string, setColor: (color : string) => void, setAvatar : (avatar : number) => void }) => {

  const [pseudo,setPseudo] = useState("");
  function handlePseudoChange(str:string){
    setPseudo (str);
  }
  function changePseudo(str:string){
    axios.post("http://localhost/boggle/php/updateSettings.php", {str,id_joueur})
    const test = {ID_Joueur: userData?.ID_Joueur, classementData: userData?.classementData, historique: userData?.historique, pseudo: str, XP_Actuel: userData?.XP_Actuel, Photo_De_Profile: userData?.Photo_De_Profile, Est_Prive:userData?.Est_Prive};
    localStorage.setItem('userData', JSON.stringify(test));
  }


  const userDataString = localStorage.getItem('userData');
  const userData = userDataString ? JSON.parse(userDataString) : null;
  const navigate = useNavigate();
  useEffect(()=>{if (userData == null){
    navigate('/login');
  }})

  let indexAvatar = props.avatarIndex;

  let colors = [
    "#ED3E3E",
    "#F4A459",
    "#F1E368",
    "#45BE5F",
    "#43BDA0",
    "#6B81F3",
    "#795DB2",
    "#A95D9D",
  ];

  let avatars = [0, 1, 2, 3, 4, 5, 6, 7];

  function setPrimaryColor(color : string) {
    props.setColor(color);
  }

  function selectAvatar(index : number) {
    props.setAvatar(index);
    axios.post("http://localhost/boggle/php/updatePP.php", {index,id_joueur}).then((response) => {
      console.log(response.data);
  });
  }

  let avatarProfile = require('../images/avatar' + props.avatarIndex + '.png');
  let id_joueur = userData?.ID_Joueur;
  return (
    <>
      <Header text="Profil" />
      <div className="profileCont" style={{ background: props.primaryColor }}>
        <img src={avatarProfile} alt="" className="profileImg" />
        <div className="profileSection">
          <h2>Identité</h2>
          <div className="profileFormCont">
            <div className="profileInputRow">
              <div className="profileInputCont">
                <label htmlFor="pseudo">Pseudo</label>
                <input type="text" name="pseudo" id="pseudo" onChange={(e)=>handlePseudoChange(e.target.value)}/>
              </div>
            </div>
            <button
              type="submit"
              className="profileFormButton"
              onClick={()=>changePseudo(pseudo)}
            >Confirmer</button>
          </div>
        </div>

        <div className="profileSection">
          <h2>Personnalisation</h2>
          <h3>Couleur</h3>
          <div className="profileColorRow">
            {colors.map((color) => (
                <ColorInput color={color} toggled={props.primaryColor == color} key={color} onSelect={setPrimaryColor} />
            ))}
          </div>
          <h3>Avatar</h3>
          <div className="profileColorRow">
            {avatars.map((avatar) => (
                <AvatarInput requiredLevel={avatar * 2} key={avatar} imgIndex={avatar} onSelect={selectAvatar} toggled={props.avatarIndex == avatar} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
