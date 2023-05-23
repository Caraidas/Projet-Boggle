import React from 'react'
import { SalonContainer, SalonAttendeeNumber, SalonName, SalonsDesc } from './SalonElements'

const Salon = (props: {name : string, attendeeNumber: number, desc: string, onselect: (name : string) => void, bgColor: string}) => {
  return (
    <SalonContainer color={props.bgColor} onClick={props.onselect(props.name)}>
      <SalonName>{props.name}</SalonName>
      <SalonsDesc>{props.desc}</SalonsDesc>
      <SalonAttendeeNumber>{props.attendeeNumber}</SalonAttendeeNumber>
    </SalonContainer>
  )
}

export default Salon
