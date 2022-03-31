const path = require('path')

const matchDataPath = path.join(process.cwd(), './json/match.json')
const pointDataPath = path.join(process.cwd(), './json/point.json')
const initialPointDataPath = path.join(process.cwd(), './data/point.json')
const initialMatchDataPath = path.join(process.cwd(), './data/match.json')

module.exports = {
    matchDataPath,
    pointDataPath,
    initialPointDataPath,
    initialMatchDataPath
}