import React from 'react'
import { ColorInputButton, ColorInputCont } from './ColorInputElements'

const ColorInput = (props : {color : string, toggled : boolean, onSelect: any}) => {
    const [hovered, setHovered] = React.useState(false);

    function handleHover() {
        setHovered(true);
    }

    function handleLeave() {
        setHovered(false);
    }

  return (
    <ColorInputCont onMouseLeave={() => handleLeave()} onMouseEnter={() => handleHover()} onClick={() => props.onSelect(props.color)}>
        <ColorInputButton color={props.color} toggled={props.toggled} hovered={hovered} />
    </ColorInputCont>
  )
}

export default ColorInput
