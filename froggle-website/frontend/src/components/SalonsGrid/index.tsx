import React from 'react'
import Salon from '../Salon'
import { SalonsGridContainer, SalonsGridWrapper } from './SalonsGridElements'
import "../../css/styleGame.css"
import ribbit from "../../sound/ribbit.mp3";

const SalonsGrid = (props: { soundVolume : number, primaryColor : string, rooms: any, onChosenRoom: (username: string, waitingRoom: string) => any}) => {
    const userDataString = localStorage.getItem('userData');
    const userData = userDataString ? JSON.parse(userDataString) : null;
    const [username, setUsername] = React.useState(userData?.pseudo) // TODO : à remplacer par le username dans la bdd
    const [selectedRoom, setSelectedRoom] = React.useState("")

    function handle(name:string) {
      setSelectedRoom(name);
      console.log(name);
    }

    function playSound() {
      let audio = new Audio(ribbit);
      audio.volume = props.soundVolume / 100;
      audio.play();
    }

    function clickHandle() {
      playSound();
      props.onChosenRoom(username, selectedRoom);
    }

  return (
    <>
        <SalonsGridWrapper>
            <SalonsGridContainer>
                {props.rooms.map((room) => 
                    <Salon key={room.name} name={room.name} desc={room.description} attendeeNumber={room.attendeeNumber} onselection={e => handle(e)} bgColor={props.primaryColor} selectedRoom={selectedRoom} />
                    )}
            </SalonsGridContainer>
            <button style={{background : props.primaryColor}} className='salonRejButton' onClick={() => clickHandle()} disabled={username === "" || selectedRoom === "" || props.rooms.findIndex(x => x.name === selectedRoom) === -1}>Rejoindre</button>
        </SalonsGridWrapper>
    </>
  )
}

export default SalonsGrid
