import React from 'react'
import Salon from '../Salon'
import { SalonsGridContainer, SalonsGridWrapper } from './SalonsGridElements'
import "../../css/styleGame.css"

const SalonsGrid = (props: {rooms: any, onChosenRoom: (username: string, waitingRoom: string) => any}) => {
    const [username, setUsername] = React.useState("Nidal") // TODO : à remplacer par le username dans la bdd
    const [selectedRoom, setSelectedRoom] = React.useState("")

    props.rooms.map((room) => console.log(room));

  return (
    <>
        <p>Nom d'utilisateur:</p>
        <input type="text" value={username} onChange={event => setUsername(event.target.value)} />
        
        <SalonsGridWrapper>
            <SalonsGridContainer>
                {props.rooms.map((room) => 
                    <Salon key={room.name} name={room.name} desc={room.description} attendeeNumber={room.attendeeNumber} onselect={setSelectedRoom} bgColor={room.color} />
                    )}
            </SalonsGridContainer>
            <button className='salonRejButton' onClick={() => props.onChosenRoom(username, selectedRoom)} disabled={username === "" || selectedRoom === "" || props.rooms.findIndex(x => x.name === selectedRoom) === -1}>Rejoindre</button>
        </SalonsGridWrapper>
    </>
  )
}

export default SalonsGrid
