import React from 'react'
import styled, { css } from 'styled-components'
import { BIRD_STATUSES } from '../../constants/statuses'
import birdImageNormal from './../../images/bluebird-midflap.png'
import birdImageUp from './../../images/bluebird-upflap.png'
import birdImageDown from './../../images/bluebird-downflap.png'

const getRotation = (status) => status === BIRD_STATUSES.up ? -40 : status === BIRD_STATUSES.down ? 40 : 0
const getBirdImage = (status) => status === BIRD_STATUSES.up ? birdImageUp : status === BIRD_STATUSES.down ? birdImageDown : birdImageNormal

export const Bird = (props) => {
  let { status, height = 0, isFlying } = props
  
  let style = {
    transform: `translate(0, ${-height}px) rotate(${getRotation(status)}deg)`
  }

	return (
		<BirdIcon status={status} isFlying={isFlying} transformHeight={height} style={style}/>
	)
}

const BirdIcon = styled.div`
  position: absolute;
	bottom: 112px;
	left: 50%;
	width: 34px;
	height: 24px;
	margin-left:  -12px;
	background: url(${(props) => getBirdImage(props.status)});
	transition: transform 0.1s ease;
  will-change:  transform;
  
  @keyframes fly {
    0% {
      background: url(${birdImageNormal});
    }
    33% {
      background: url(${birdImageUp});
    }
    66% {
      background: url(${birdImageDown});
    }
  }

  ${(props) => props.isFlying ? css`
    animation: fly .4s steps(1) reverse infinite;
  ` : ''}
`