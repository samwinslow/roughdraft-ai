const diff = (a, b) => a.split(b).join('')

const getSeed = (maxDigits = 4) => Math.floor(Math.random() * Math.pow(10, maxDigits))

export { diff, getSeed }
