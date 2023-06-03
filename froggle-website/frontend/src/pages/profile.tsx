import React, {useEffect} from "react";
import { useNavigate} from 'react-router-dom';
import Header from "../components/Header";
import ColorInput from "../components/ColorInput";
import "../css/styleProfile.css";
import pfp from "../images/pfp.jpg";
import AvatarInput from "../components/AvatarInput";
import avatar0 from "../images/avatar0.png";

const ProfilePage = (props: { avatarIndex : number, primaryColor: string, setColor: (color : string) => void, setAvatar : (avatar : number) => void }) => {

  const userDataString = localStorage.getItem('userData');
  const userData = userDataString ? JSON.parse(userDataString) : null;
  const navigate = useNavigate();
  useEffect(()=>{if (userData == null){
    navigate('/login');
  }})

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

  let avatars = [
    0, 1, 2, 3, 4, 5
  ];

  function setPrimaryColor(color : string) {
    props.setColor(color);
  }

  function setAvatar(index : number) {
    props.setAvatar(index);
  }

  let avatarProfile = require('../images/avatar' + props.avatarIndex + '.png');

  return (
    <>
      <Header text="Profil" />
      <div className="profileCont" style={{ background: props.primaryColor }}>
        <img src={avatarProfile} alt="" className="profileImg" />
        <div className="profileSection">
          <h2>Identité</h2>
          <form className="profileFormCont">
            <div className="profileInputRow">
              <div className="profileInputCont">
                <label htmlFor="pseudo">Pseudo</label>
                <input type="text" name="pseudo" id="pseudo" />
              </div>

              <div className="profileInputCont">
                <label htmlFor="email">Email</label>
                <input type="email" name="email" id="email" />
              </div>
            </div>
            <input
              type="submit"
              className="profileFormButton"
              value="Confirmer"
            />
          </form>
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
                <AvatarInput key={avatar} imgIndex={avatar} onSelect={setAvatar} toggled={props.avatarIndex == avatar} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
