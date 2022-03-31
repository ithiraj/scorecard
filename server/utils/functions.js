const fs = require("fs");
const { pointDataPath, matchDataPath, initialMatchDataPath, initialPointDataPath } = require("../config/path");


const getInitialMatchData = () => {
    const data = fs.readFileSync(initialMatchDataPath)
    return JSON.parse(data)
}

const getInitialPointData = () => {
    const data = fs.readFileSync(initialPointDataPath)
    return JSON.parse(data)
}

const getMatchData = () => {
    const data = fs.readFileSync(matchDataPath);
    return JSON.parse(data);
};

const getPointData = () => {
    const data = fs.readFileSync(pointDataPath);
    return JSON.parse(data);
};

const updateMatchData = (data) => {
    const stringifyData = JSON.stringify(data);
    console.log("stringifyData", stringifyData);
    fs.writeFileSync(matchDataPath, stringifyData);
};

const updatePointData = (data) => {
    const stringifyData = JSON.stringify(data);
    fs.writeFileSync(pointDataPath, stringifyData);
};
const findWonTeam = (data) => {
    console.log(data);
    if (data.teamOneRuns > data.teamTwoRuns) {
        return `${data.teamOneName} Won`;
    } else if (data.teamOneRuns < data.teamTwoRuns) {
        return `${data.teamTwoName} Won`;
    } else if (data.teamOneRuns == data.teamTwoRuns) {
        return `Match Tied`;
    }
};

const pointTableCalculation = (data) => {
    const teamOneRunRate = Number(data.teamOneRuns) / Number(data.teamOneOver);
    const teamTwoRunRate = Number(data.teamTwoRuns) / Number(data.teamTwoOver);
    const teamOneNrr = Number(teamOneRunRate) - Number(teamTwoRunRate)
    const teamTwoNrr = Number(teamTwoRunRate) - Number(teamOneRunRate)
        // const teamOneNrr =
        //     (Number(teamOneRunRate) - Number(data.teamTwoRuns)) /
        //     Number(data.teamTwoOver);
        // const teamTwoNrr =
        //     (Number(teamTwoRunRate) - Number(data.teamOneRuns)) /
        //     Number(data.teamOneOver);
    const teamOnePoint =
        Number(data.teamOneRuns) > Number(data.teamTwoRuns) ?
        2 :
        Number(data.teamOneRuns) == Number(data.teamTwoRuns) ?
        1 :
        0;
    const teamTwoPoint =
        Number(data.teamTwoRuns) > Number(data.teamOneRuns) ?
        2 :
        Number(data.teamTwoRuns) == Number(data.teamOneRuns) ?
        1 :
        0;
    const teamOneWin =
        Number(data.teamOneRuns) > Number(data.teamTwoRuns) ?
        1 :
        Number(data.teamOneRuns) == Number(data.teamTwoRuns) ?
        0 :
        0;
    const teamTwoWin =
        Number(data.teamTwoRuns) > Number(data.teamOneRuns) ?
        1 :
        Number(data.teamTwoRuns) == Number(data.teamOneRuns) ?
        0 :
        0;
    return {
        teamOneRunRate,
        teamTwoRunRate,
        teamOneNrr,
        teamTwoNrr,
        teamOnePoint,
        teamTwoPoint,
        teamOneWin,
        teamTwoWin,
    };
};

module.exports = {
    getMatchData,
    getPointData,
    updateMatchData,
    updatePointData,
    findWonTeam,
    pointTableCalculation,
    getInitialMatchData,
    getInitialPointData
};