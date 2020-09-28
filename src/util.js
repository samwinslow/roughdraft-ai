import TurndownService from 'turndown'

const diff = (a, b) => a.split(b).join('')

const getSeed = (maxDigits = 4) => Math.floor(Math.random() * Math.pow(10, maxDigits))

const TurndownParser = new TurndownService()

export { diff, getSeed, TurndownParser }
