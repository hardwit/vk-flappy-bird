import { createSlice } from '@reduxjs/toolkit'
import { initialGameState, GAME_STATUSES } from '../constants'
import { BIRD_STATUSES } from '../constants/statuses'

const flyUp = (state) => {
  if (state.bird.height >= state.game.range.max) {
    return state
  }

  const bird = {...state.bird }

  bird.status = BIRD_STATUSES.up
  bird.originalHeight = bird.height
  bird.targetHeight = bird.height + bird.flyHeight
  bird.timestamp = Date.now()

  const { range } = state.game

  if (bird.targetHeight > range.max) {
      bird.targetHeight = range.max
  }

  return {
      ...state,
      bird,
  }
}

const nextFrame = (state) => {
  let gameStatus = state.game.status
  
  if (gameStatus === 'over') {
    return state
  }

  let nextState = flying(state)
  nextState = sliding(nextState)
  nextState = collisitionDetection(nextState)

  return nextState
}

function dropDown(state) {
  let bird = {...state.bird }

  bird.status = 'down'
  bird.originalHeight = bird.height
  bird.targetHeight = state.game.range.min
  bird.timestamp = Date.now()

  return {
    ...state,
    bird,
  }
}

function flying(state) {
  let bird = {...state.bird }

  if (bird.height === bird.targetHeight) {
    return dropDown(state)
  }

  const { timestamp, flyTime, dropTime } = bird
  const time = Date.now() - timestamp

  if (bird.height < bird.targetHeight) {
    let ratio = time / flyTime

    if (ratio > 1) {
      ratio = 1
    }

    bird.height = bird.originalHeight + (bird.targetHeight - bird.originalHeight) * ratio
  } else {
    let shift = time * (state.game.range.max - state.game.range.min) / dropTime

    bird.height = bird.originalHeight - shift
  }

  return {
      ...state,
      bird,
  }
}

function sliding(state) {
  let pipes = {...state.pipes }
  let now = Date.now()

  if (now - pipes.timestamp >= pipes.interval) {
    let { game } = state
    let heightRange = game.range.max - game.range.min
    let shift = pipes.range.y.min + (pipes.range.y.max - pipes.range.y.min) * Math.random()

    let piping = {
      timestamp: now,
      x: pipes.range.x.min,
      upper: heightRange - shift - pipes.range.gap,
      below: shift,
      bottom: shift,
      top: shift + pipes.range.gap,
    }

    pipes.list = pipes.list.concat(piping)
    pipes.timestamp = now
  }

  let { bird, game } = state
  let collisitionRange = getCollisitionRange(bird.size.width, game.size.width, pipes.size.width)
  let player = {...state.player}

  pipes.list = pipes.list.map(piping => {
    piping = {...piping }
    if (piping.x < pipes.range.x.max) {
      let ratio = (now - piping.timestamp) / pipes.speed
      if (ratio > 1) {
          ratio = 1
      }
      piping.x = ratio * pipes.range.x.max
    } else {
      piping.x = pipes.range.x.max
    }

    if (piping.x > collisitionRange.to && !piping.isPassed) {
      piping.isPassed = true
      player.score += 1
    }

    return piping
  }).filter(piping => {
    return piping.x < pipes.range.x.max
  })

  return {
      ...state,
      pipes,
      player,
  }
}

function getCollisitionRange(birdWidth, gameWidth, pipingWidth) {
  const from = (gameWidth - birdWidth) / 2
  const to = from + birdWidth / 2 + pipingWidth

  return { from, to }
}

function collisitionDetection(state) {
  let { game, bird, pipes } = state

  let collisitionRange = getCollisitionRange(bird.size.width, game.size.width, pipes.size.width)

  let list = pipes.list.filter(piping => {
      return piping.x > collisitionRange.from && piping.x < collisitionRange.to
  })

  let birdBottom = bird.height
  let birdTop = bird.height + bird.size.height

  if (birdBottom === 0) {
    return{
      ...state,
      game: {
          ...game,
          status: 'over'
      }
    }
  }

  for (let i = 0, len = list.length; i < len; i += 1) {
    let piping = list[i]

    if (birdBottom < piping.bottom || birdTop > piping.top + 5) {
      game = {
        ...game,
        status: 'over'
      }

      return {
        ...state,
        game,
      }
    }
  }

  return state
}

const play = (state) => {
  const game = {...state.game }
  const player = { ...state.player }

  game.status = GAME_STATUSES.playing
  player.firstRun = false

  const nextState = {
      ...state,
      initialGameState,
      game,
      player
  }

  return flyUp(nextState)
}

const reset = () => {
  const newState = { ...initialGameState }

  return newState
}

const gameSlice = createSlice({
  name: 'game',
  initialState: initialGameState,
  reducers: {
    play,
    reset,
    flyUp,
    nextFrame,
  }
})

export const { actions, reducer } = gameSlice