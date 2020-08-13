import React from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'

export const Menu = ({ firstRun, score, onPlay, onRestart, onOpenRating }) => {
  const handleClick = firstRun ? onPlay : onRestart
  const topScore = useSelector(state => state.user.score)

	return (
		<MenuBox>
      {!firstRun && 
      <Score>
        Очков: {score}
      </Score>}

      {
        topScore > 0 && 
        <Record>
          Мой рекорд: {topScore}
        </Record>
      }

      <Button onClick={handleClick}>
        { firstRun ? 'Играть' : 'Начать заново'}
      </Button>

      <Button onClick={onOpenRating}>
        Топ-100
      </Button>
    </MenuBox>
	)
}

const MenuBox = styled.div`
  position: absolute;
	top: 0;
	left: 0;
	width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const Score = styled.span`
  margin-bottom: 30px;
  font-size: 35px;
`

const Record = styled.span`
  color: #ffffff;
  position: absolute;
  top: 100px;
  font-weight: 900;
  font-size: 30px;
`

const Button = styled.div`
  margin-bottom: 20px;
  width: 120px;
	height: 40px;
	line-height: 24px;
	background: #7d3274;
  color: white;
  border: 2px solid #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
`
