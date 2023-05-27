import React from 'react'
import { SalonContainer, SalonAttendeeNumber, SalonName, SalonsDesc } from './SalonElements'

const Salon = (props: {name : string, attendeeNumber: number, desc: string, onselection: (name : string) => void, bgColor: string, selectedRoom: any}) => {
  return (
    <>
      <input style={{ display: "none" }} type="radio" name="rooms" id={props.name} checked={props.selectedRoom === props.name} onChange={() => props.onselection(props.name)} />
      <SalonContainer htmlFor={props.name} color={props.bgColor} selected={props.selectedRoom === props.name}>
        <SalonName>{props.name}</SalonName>
        <SalonsDesc>{props.desc}</SalonsDesc>
        <SalonAttendeeNumber>{props.attendeeNumber}</SalonAttendeeNumber>
      </SalonContainer>
    </>
  )
}

export default Salon
