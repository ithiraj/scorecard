const express = require("express")
const matchRoutes = express.Router();
const pointRoutes = express.Router();
const fs = require('fs');

const { initialPointDataPath, initialMatchDataPath } = require("../config/path")
const { getMatchData, getPointData, findWonTeam, updateMatchData, pointTableCalculation, updatePointData, getInitialMatchData, getInitialPointData } = require('../utils/functions')


matchRoutes.get('/reset', (req, res) => {
    const matchData = getInitialMatchData()
    const pointData = getInitialPointData()
    console.log("pointData", pointData)
    updateMatchData(matchData)
    updatePointData(pointData)
    res.send({
        matchData: getMatchData(),
        pointData: getPointData()
    })
})

matchRoutes.put('/updateMatch/:id', (req, res) => {
    const { id } = req.params;
    const bodyData = req.body

    const matchData = getMatchData()
    const pointData = getPointData()

    const selectedMatchData = matchData[id]
    const newMatchData = {
        ...selectedMatchData,
        ...bodyData,
        matchPlayed: true,
        teamWon: findWonTeam({...selectedMatchData, ...bodyData })
    }

    matchData[id] = newMatchData

    updateMatchData(matchData)
        // point update data
    const teamOne = pointData[newMatchData.teamOneName]
    const teamTwo = pointData[newMatchData.teamTwoName]

    const {
        teamOneRunRate,
        teamTwoRunRate,
        teamOneNrr,
        teamTwoNrr,
        teamOnePoint,
        teamTwoPoint,
        teamOneWin,
        teamTwoWin,
    } = pointTableCalculation(newMatchData)

    console.log("matchPoint", {
        teamOneRunRate,
        teamTwoRunRate,
        teamOneNrr,
        teamTwoNrr,
        teamOnePoint,
        teamTwoPoint,
        teamOneWin,
        teamTwoWin,
    })

    const teamOneNewData = {
        ...teamOne,
        matchPlayed: Number(teamOne.matchPlayed) + 1,
        matchWoned: Number(teamOneWin) + Number(teamOne.matchWoned),
        NRR: Number(teamOne.NRR) + Number(teamOneNrr.toFixed(3)),
        Pts: Number(teamOne.Pts) + Number(teamOnePoint)
    }

    const teamTwoNewData = {
        ...teamTwo,
        matchPlayed: Number(teamTwo.matchPlayed) + 1,
        matchWoned: teamTwoWin + teamTwo.matchWoned,
        NRR: Number(teamTwo.NRR) + Number(teamTwoNrr.toFixed(3)),
        Pts: Number(teamTwo.Pts) + Number(teamTwoPoint)
    }

    pointData[teamOneNewData.teamName] = teamOneNewData
    pointData[teamTwoNewData.teamName] = teamTwoNewData

    updatePointData(pointData)

    res.send({
        matchData: getMatchData(),
        pointData: getPointData()
    })
})

matchRoutes.get('/getMatch', (req, res) => {
    const matchData = getMatchData()
    res.send(matchData)
})

pointRoutes.get('/getPoint', (req, res) => {
    const pointData = getPointData()
    res.send(pointData)
})

matchRoutes.get('/reset', (req, res) => {

})


module.exports = {
    matchRoutes,
    pointRoutes
}