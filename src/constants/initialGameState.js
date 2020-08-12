import { BIRD_STATUSES, GAME_STATUSES } from "./statuses";

const deviceWidth = window.innerWidth
const deviceHeight = window.innerHeight
const bottomHeight = 120

export const initialGameState = {
  game: {
    status: GAME_STATUSES.over,
    range: {
      min: 0,
      max: deviceHeight - bottomHeight,
    },
    size: {
      width: window.innerWidth,
      height: window.innerHeight,
    },
  },
  player: {
    score: 0,
    firstRun: true
  },
  bird: {
    size: {
      width: 34,
      height: 24,
    },
    status: BIRD_STATUSES.normal,
    height: (deviceHeight - bottomHeight) / 2,
    targetHeight: (deviceHeight - bottomHeight) / 2,
    originalHeight: (deviceHeight - bottomHeight) / 2,
    flyHeight: deviceHeight / 8.5,
    // flyTime: deviceHeight / 3.65,
    flyTime: 150,
    dropTime: 1400,
    timestamp: 0,
  },
  pipes: {
    timestamp: 0,
    interval: 1600,
    speed: 2800,
    size: {
      width: 60,
    },
    range: {
      x: {
        min: 0,
        max: deviceWidth + 100,
      },
      y: {
        min: 40,
        max: deviceHeight / 2,
      },
      gap: deviceHeight < 550 ? 130 : deviceHeight < 670 ? 145 : 165,
    },
    list: [],
  },
}
