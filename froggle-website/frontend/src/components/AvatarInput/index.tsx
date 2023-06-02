import React from 'react'
import { AvatarInputCont, AvatarInputImg } from './AvatarInputElements'

const AvatarInput = (props : {imgIndex : number, onSelect : (index : number) => void, toggled : boolean}) => {
    let avatar = require('../../images/avatar' + props.imgIndex + '.png');
  return (
    <AvatarInputCont toggled={props.toggled} onClick={() => props.onSelect(props.imgIndex)}>
        <AvatarInputImg src={avatar} />
    </AvatarInputCont>
  )
}

export default AvatarInput
