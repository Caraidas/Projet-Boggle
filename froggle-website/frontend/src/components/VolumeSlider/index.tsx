import React from 'react'
import { SliderContainer, SliderToggle, Slider, SoundIcon, SliderSection } from './VolumeSliderElements';

const soundIcon = require("../../images/soundIcon.png");
const soundIcon2 = require("../../images/soundIcon2.png");
const musicIcon = require("../../images/musicIcon.png");

const VolumeSlider = ({ isSoundOpen, toggleSound, changeSoundVolume, changeMusicVolume }) => { 

  function changeSoundVolumeHandle(e) {
    changeSoundVolume(e.target.value)
    localStorage.setItem('soundVolume', e.target.value);
  }

  function changeMusicVolumeHandle(e) {
    changeMusicVolume(e.target.value)
    localStorage.setItem('musicVolume', e.target.value);
  }

  return (
    <SliderContainer isSoundOpen={isSoundOpen}>
      <SliderToggle src={soundIcon} isSoundOpen={isSoundOpen} onClick={toggleSound}/>

      <SliderSection isSoundOpen={isSoundOpen} animDelay={0}>
        <SoundIcon src={musicIcon}/>
        <Slider type="range" min="0" max="100" defaultValue={localStorage.getItem('musicVolume') ? localStorage.getItem('musicVolume') : 100} onChange={e => changeMusicVolumeHandle(e)} />
      </SliderSection>

      <SliderSection isSoundOpen={isSoundOpen} animDelay={0.1}>
        <SoundIcon src={soundIcon2}/>
        <Slider type="range" min="0" max="100" defaultValue={localStorage.getItem('soundVolume') ? localStorage.getItem('soundVolume') : 100} onChange={e => changeSoundVolumeHandle(e)} />
      </SliderSection>
    </SliderContainer>
  );
}

export default VolumeSlider
