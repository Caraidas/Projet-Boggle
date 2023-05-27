import React from 'react'
import Salon from '../Salon'
import { SalonsGridContainer, SalonsGridWrapper } from './SalonsGridElements'
import "../../css/styleGame.css"

const SalonsGrid = (props: {rooms: any, onChosenRoom: (username: string, waitingRoom: string) => any}) => {
    const [username, setUsername] = React.useState("Nidal") // TODO : à remplacer par le username dans la bdd
    const [selectedRoom, setSelectedRoom] = React.useState("")

    function handle(name:string) {
      setSelectedRoom(name);
      console.log(name);
    }

  return (
    <>
        <input type="text" value={username} onChange={event => setUsername(event.target.value)} />
        <SalonsGridWrapper>
            <SalonsGridContainer>
                {props.rooms.map((room) => 
                    <Salon key={room.name} name={room.name} desc={room.description} attendeeNumber={room.attendeeNumber} onselection={e => handle(e)} bgColor={"#F1E368"} selectedRoom={selectedRoom} />
                    )}
            </SalonsGridContainer>
            <button className='salonRejButton' onClick={() => props.onChosenRoom(username, selectedRoom)} disabled={username === "" || selectedRoom === "" || props.rooms.findIndex(x => x.name === selectedRoom) === -1}>Rejoindre</button>
        </SalonsGridWrapper>
    </>
  )
}

export default SalonsGrid
