import React from 'react'
import styled from 'styled-components'
import pipeBottomImg from './../../images/pipe-green-bottom.png'
import pipeTopImg from './../../images/pipe-green-top.png'

export const Pipes = ({ x, upper, below }) => {
	const pipingStyle = {
		transform: `translate(${-x}px, 0)`
	}

	const topStyle = {
		transform: `translate(0, ${upper}px)`
	}

	const bottomStyle = {
		transform: `translate(0, ${-below}px)`
	}
	
	return (
		<PipesBox style={pipingStyle}>
      <PipeTop style={topStyle} />
      <PipeBottom style={bottomStyle}/>
    </PipesBox>
	)
}

const PipesBox = styled.div`
  position: absolute;
	top: 0;
	right: -52px;
	width: 60px;
  height: 100%;
`

const PipeTop = styled.div`
  position: absolute;
	top: -700px;
	right: 0;
	width: 60px;
	height: 700px;
	background: url(${pipeTopImg}) no-repeat;
	background-size: 100% 100%;
  will-change: transform;
`

const PipeBottom = styled.div`
  position: absolute;
	bottom: -588px;
	right: 0;
	width: 60px;
	height: 700px;
	background: url(${pipeBottomImg}) no-repeat;
	background-size: 100% 100%;
  will-change: transform;
`