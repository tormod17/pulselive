let PULSEBALL = {};


PULSEBALL.init = (rankingsJSON) => {
    //y  console.log(PULSEBALL);
    let submitButton = document.getElementById('submitButton');
    let form = document.forms[0];
    let state = rankingsJSON;

    render(state);

    submitButton.addEventListener('click', function() {
       
        let homeTeam = form.querySelector('select[name="home"').value;
        let awayTeam = form.querySelector('select[name="away"').value;

        if (homeTeam === awayTeam) {
            alert('select two different teams')
        } else {
            let homeTeamObj = getTeamInfo(homeTeam);
            let awayTeamObj = getTeamInfo(awayTeam);
            let matchTeams = [homeTeamObj, awayTeamObj];

            let match = generateMatch(matchTeams);
            PULSEBALL.addMatach(match, homeTeamObj, awayTeamObj, state);
        }
    });
}


PULSEBALL.addMatach = (match, homeTeamObj, awayTeamObj, state) => {
    let ratingsDiff = getRatingsDiff(homeTeamObj, awayTeamObj);
    if (match.outcome === 'A') {
        homeWin(homeTeamObj, awayTeamObj, ratingsDiff);
    } else if (match.outcome === 'B') {
        awayWin(homeTeamObj, awayTeamObj, ratingsDiff);
    } else {
        draw(homeTeamObj, awayTeamObj, ratingsDiff);
    }
    /// replace the home and away teams and sort by their new points 
    let newUnRankedTeams = state.map((teamObj) => {
        if (teamObj.team.name === homeTeamObj.team.name) {
            return homeTeamObj;
        } else if (teamObj.team.name === awayTeamObj.team.name) {
            return awayTeamObj;
        } else {
            return teamObj;
        }
    })

    let newRankedTeams = newUnRankedTeams.sort((a, b) => {
        return a.pts - b.pts;
    })

    let newState = newRankedTeams.reverse();
    render(newState);
}



(function() {
    PULSEBALL.init(rankingsJSON);

}());

function generateMatch(matchTeams) {
    let homeTeamObj = matchTeams[0];
    let awayTeamObj = matchTeams[1];
    let matchStatus = generateRandomStatus();

    if (matchStatus !== 'U') {
        let match = {};
        match.matchId = generateRandomInt(0, 2000);
        match.score = generateMatchScore(homeTeamObj, awayTeamObj);
        match.description = " Match " + generateRandomInt(1, 4);
        match.teams = [{
            id: homeTeamObj.team.id,
            name: homeTeamObj.team.name,
            abbreviation: homeTeamObj.team.name.substring(0, 3).toUpperCase()
        }, {
            id: awayTeamObj.team.id,
            name: awayTeamObj.team.name,
            abbreviation: awayTeamObj.team.name.substring(0, 3).toUpperCase()
        }];
        match.status = generateRandomStatus();
        match.outcome = matchOutcome(match.score);
        return match
    } else {
    document.getElementById('message').innerHTML = 'This match is an upcoming match, select another fixture';    
    }
}

function roundToTwoDeci(number) {
    return Math.round((number + 0.00001) * 100) / 100
}

function generateRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


function generateRandomStatus() {
    let randomNumber = generateRandomInt(0, 2);
    let statuses = ['L', 'C', 'U'];
    return statuses[randomNumber];
}

function generateMatchScore(home, away) {
    // score is random number between 1-30; 
    let homeScore = Math.floor(generateRandomInt(0, 33) + home.pts * 0.05)
    let awayScore = Math.floor(generateRandomInt(0, 30) + away.pts * 0.05);
    return [homeScore, awayScore];
}

function matchOutcome(score) {
    return score[0] > score[1] ? 'A' : score[0] === score[1] ? 'D' : 'B';

}


function getTeamInfo(team) {
    let teamArr = rankingsJSON.filter((obj) => {
        return obj.team.name === team
    })
    return teamArr[0];
}

function getRatingsDiff(homeTeamObj, awayTeamObj) {
    let homePoints = homeTeamObj.pts + 3
    let awayPoints = awayTeamObj.pts;
    let ratingsDiff = homePoints - awayPoints;
    if (ratingsDiff > 10) {
        ratingsDiff = 10;
    }
    if (ratingsDiff < -10) {
        ratingsDiff = -10;
    }
    return ratingsDiff;
}

function homeWin(homeTeamObj, awayTeamObj, ratingsDiff) {
    let score = 1 - ratingsDiff / 10;
    homeTeamObj.pts = homeTeamObj.pts + score;
    awayTeamObj.pts = awayTeamObj.pts - score;
    document.getElementById('message').innerHTML = homeTeamObj.team.name + ' win!';
}

function awayWin(homeTeamObj, awayTeamObj, ratingsDiff) {
    let score = 1 + ratingsDiff / 10;
    homeTeamObj.pts = homeTeamObj.pts - score;
    awayTeamObj.pts = awayTeamObj.pts + score;
    document.getElementById('message').innerHTML = awayTeamObj.team.name + ' win!';
}

function draw(homeTeamObj, awayTeamObj, ratingsDiff) {
    homeTeamObj.pts = homeTeamObj.pts + ratingsDiff / 10;
    awayTeamObj.pts = awayTeamObj.pts + ratingsDiff / 10;
    document.getElementById('message').innerHTML = 'it\'s a draw';

}

function createNewState(state, homeTeamObj, awayTeamObj) {
    // homeTeam and Awayteam points and compare them against the rest of the group.
    // sort array according to new points and return new state. 
    console.log(state);
    return state.map((teamObj) => {
        console.log(teamObj.team.name);
        if (teamObj.team.name === homeTeamObj.team.name) {
            return homeTeamObj;
        }
        if (teamObj.team.name === awayTeamObj.team.name) {
            return awayTeamObj;
        }
        return teamObj;
    })
}


function render(state) {
    let createTable = state.forEach((obj, index) => {
        var id = 'team' + index;
        var info = '<li>' + obj.team.name + '</li><li>' + roundToTwoDeci(obj.pts) + '</li><li>' + (index + 1) + '</li>';
        obj.pos = index + 1;
        document.getElementById(id).innerHTML = '';
        document.getElementById(id).innerHTML = info
    });

}
