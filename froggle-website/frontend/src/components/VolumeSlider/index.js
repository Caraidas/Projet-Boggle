import React from 'react'
import { SliderContainer, SliderToggle, Slider, SoundIcon, SliderSection } from './VolumeSliderElements';

const soundIcon = require("../../images/soundIcon.png");
const musicIcon = require("../../images/musicIcon.png");

const VolumeSlider = ({ isSoundOpen, toggleSound, changeSoundVolume, changeMusicVolume }) => {

  return (
    <SliderContainer>
      <SliderToggle src={soundIcon} isSoundOpen={isSoundOpen} onClick={toggleSound}/>

      <SliderSection isSoundOpen={isSoundOpen} animDelay={0}>
        <SoundIcon src={musicIcon}/>
        <Slider type="range" min="0" max="100" defaultValue={100} onChange={e => changeMusicVolume(e.target.value) } />
      </SliderSection>

      <SliderSection isSoundOpen={isSoundOpen} animDelay={0.1}>
        <SoundIcon src={soundIcon}/>
        <Slider type="range" min="0" max="100" defaultValue={100} onChange={e => changeSoundVolume(e.target.value)} />
      </SliderSection>

    </SliderContainer>
  )
}

export default VolumeSlider
