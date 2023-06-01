import React from "react";
import Header from "../components/Header";
import ColorInput from "../components/ColorInput";
import "../css/styleProfile.css";
import pfp from "../images/pfp.jpg";

const ProfilePage = (props: { primaryColor: string, setColor: (color : string) => void }) => {

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

  return (
    <>
      <Header text="Profil" />
      <div className="profileCont" style={{ background: props.primaryColor }}>
        <img src={pfp} alt="" className="profileImg" />
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
          <div className="profileColorRow">
            {colors.map((color) => (
                <ColorInput color={color} toggled={false} key={color} onSelect={props.setColor} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
