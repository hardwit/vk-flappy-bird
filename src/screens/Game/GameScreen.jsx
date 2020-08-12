import React from 'react'
import styled, { css } from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import { Bird } from './Bird'
import { Pipes } from './Pipes'
import { actions as gameActions } from '../../store/gameSlice'
import { actions as userActions } from '../../store/userSlice'
import { GAME_STATUSES } from '../../constants'
import sceneBgImg from '../../images/background-night.png'
import landImg from '../../images/base-night.png'
import { Menu } from './Menu'
import { useRef } from 'react'
import { useEffect } from 'react'
import { userApi } from '../../api/user'

export const GamesScreen = ({ onOpenRating }) => {
  const dispatch = useDispatch()
  const { bird, pipes, game, player } = useSelector(state => state.game)
  const topScore = useSelector(state => state.user.score)
  const frameIdRef = useRef(null)

  const isPlaying = game.status === GAME_STATUSES.playing

  useEffect(() => {
    if (game.status === GAME_STATUSES.over) {
      cancelAnimationFrame(frameIdRef.current)

      return
    }

    function nextFrame() {
      frameIdRef.current = requestAnimationFrame(nextFrame)
      dispatch(gameActions.nextFrame())
    }

    nextFrame()
    //eslint-disable-next-line
  }, [game.status])

  useEffect(() => {
    function setScore() {
      userApi.setScore({ score: player.score })
      dispatch(userActions.setScore(player.score))
    }

    if (game.status === GAME_STATUSES.over && player.score > topScore) {
      setScore()
    }
  }, [dispatch, game.status, player.score, topScore])

  const handleFlyUp = () => {
    if (!isPlaying) {
      return
    }

    dispatch(gameActions.flyUp())
  }

  const handleStartPlaying = () => {
    dispatch(gameActions.play())
  }

  const handleRestart = () => {
    dispatch(gameActions.reset())
    dispatch(gameActions.play())
  }

  return (
    <GameScreenBox>
      <Scene className="scene" onMouseDown={handleFlyUp} onTouchStart={handleFlyUp}>
        { isPlaying &&
          <Score>{player.score}</Score>
        }

        <Bird {...bird} isFlying={isPlaying}  />

        {
          pipes.list.map(piping => <Pipes key={piping.timestamp} {...piping} />)
        }

        <Land isSliding={isPlaying} />

        { game.status === GAME_STATUSES.over &&
          <Menu score={player.score} firstRun={player.firstRun} onPlay={handleStartPlaying} onRestart={handleRestart} onOpenRating={onOpenRating} />
        }
      </Scene>
    </GameScreenBox>
  )
}

const GameScreenBox = styled.div`
  position: relative;
	width: 100%;
	height: 100%;
	margin: 0 auto;
`

const Scene = styled.div`
  position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100vh;
	color: #fff;
	overflow: hidden;
  background: url(${sceneBgImg}) repeat-x;
  background-size: 100% 100%;
`

const Land = styled.div`
  position: absolute;
	bottom: 0;
	left: 0;
	width: 100%;
	height: 112px;
  background: url(${landImg}) repeat;
  
  @keyframes sliding {
    from {
      background-position: -292px 0;
    }
    to {
      background-position: -308px 0;
    }
  }

  ${(props) => props.isSliding ? css`
    animation: sliding 0.2s linear infinite;
  ` : ''}
`

const Score = styled.div`
  position: absolute;
  top: 60px;
  left: 50%;
  transform: translateX(-50%);
  color: white;
  font-size: 45px;
  font-weight: 900;
  z-index: 10;
`