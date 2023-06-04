import React from 'react'
import { ProgressContainer, ProgressGauge } from './ProgressBarElements';

const ProgressBar = ({ width, height, total, current, color }) => {

    let ratio = (current / total) * 100;

  return (
    <ProgressContainer width={width} height={height}>
        <ProgressGauge ratio={ratio} color={color}></ProgressGauge>
    </ProgressContainer>
  )
}

export default ProgressBar
