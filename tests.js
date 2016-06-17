   // This is what a simple unit test looks like:
   test('This sample test should always pass!', function(assert) {
       var result = 1 + 1;
       assert.equal(result, 2);
   });

   test('round to two decimal places', function(assert) {
       var result = roundToTwoDeci(0.0455);
       assert.equal(result, 0.05); // we *expect* this to fail
   });

   test('generateRandomInt generates an integer', function(assert) {
       var result = generateRandomInt();
       if (typeof(result) === 'number') {
           result = true;
       } else {
           result = false;
       }
       assert.equal(result, true, 'returns an integer');
   });

   test('generate random status', function(assert) {
       var result = generateRandomStatus();
       console.log(typeof(result), result);
       if (result === 'C' || result === 'L' || result === 'U') {
           result = true;
       } else {
           result = false;
       }
       assert.equal(result, true, 'generates status of L,U or C');
   });

   test('generate match score', function(assert) {
       var home = {};
       var away = {};
       home.pts = 53;
       away.pts = 50;

       var score = generateMatchScore(home, away);

       var result = score.length;
       assert.equal(result, 2, 'returns a an arrary length 2');
       var result = typeof(score[0]);
       assert.equal(result, 'number', 'first element is a number');
       var result = typeof(score[1]);
       assert.equal(result, 'number', 'second element is a number');
   });

   test(' test out come of matchOutcome', function(assert) {
       var result = matchOutcome([20, 10]);
       assert.equal(result, 'A', ' match out come should return A');
       var result = matchOutcome([5, 10]);
       assert.equal(result, 'B', 'matchOutcome should return B');
       var result = matchOutcome([10, 10]);
       assert.equal(result, 'D', 'matchOutcome should return D');
   });

   test('getTeamInfo will return an object given a team name', function(assert) {
       var result = getTeamInfo('Australia');
       console.log('Tinfo', result);
       var expected = {
           "team": { "name": "Australia", "id": 32 },
           "pos": 1,
           "pts": 54.23
       }
       assert.deepEqual(result, expected, 'returns Australia object');

   });

   test('Test getRatings Diff form to objects', function(assert) {
       var home = {
           "team": { "name": "Australia", "id": 32 },
           "pos": 1,
           "pts": 54.23
       }
       var away = {
           "team": { "name": "England", "id": 1 },
           "pos": 4,
           "pts": 53.68
       }
       var result = getRatingsDiff(home, away);
       var expected = 3.549999999999997;
       assert.deepEqual(result, expected, ' returns the difference in points')
   });

   test('a home win will adds points to home subtract from away', function(assert) {
       var homeOrigin = {
           "team": { "name": "Australia", "id": 32 },
           "pos": 1,
           "pts": 54.23
       }
       var awayOrigin = {
           "team": { "name": "England", "id": 1 },
           "pos": 4,
           "pts": 53.68
       }
       var home = Object.assign({}, homeOrigin);
       var away = Object.assign({}, awayOrigin);
       var ratingsDiff = 3.549999999999997;
       homeWin(home, away, ratingsDiff);
       var result;
       if ((home.pts > homeOrigin.pts) && (away.pts < awayOrigin.pts)) {
           result = true;
       } else {
           result = false;
       }
       assert.equal(result, true, 'we increase the home points and decrease the away')
   });

   test('an away win will subtract points from home and add to away', function(assert) {
       var homeOrigin = {
           "team": { "name": "Australia", "id": 32 },
           "pos": 1,
           "pts": 54.23
       }
       var awayOrigin = {
           "team": { "name": "England", "id": 1 },
           "pos": 4,
           "pts": 53.68
       }
       var home = Object.assign({}, homeOrigin);
       var away = Object.assign({}, awayOrigin);
       var ratingsDiff = 3.549999999999997;
       awayWin(home, away, ratingsDiff);
       var result;
       if ((home.pts < homeOrigin.pts) && (away.pts > awayOrigin.pts)) {
           result = true;
       } else {
           result = false;
       }
       assert.equal(result, true, 'we decrease the home points and increase the away')
   });
   
   test('a draw adds points to both', function(assert) {
       var homeOrigin = {
           "team": { "name": "Australia", "id": 32 },
           "pos": 1,
           "pts": 54.23
       }
       var awayOrigin = {
           "team": { "name": "England", "id": 1 },
           "pos": 4,
           "pts": 53.68
       }
       var home = Object.assign({}, homeOrigin);
       var away = Object.assign({}, awayOrigin);
       var ratingsDiff = 3.549999999999997;
       draw(home, away, ratingsDiff);
       var result;
       if (homeOrigin.pts < home.pts && awayOrigin.pts < away.pts) {
           result = true;
       } else {
           result = false;
       }
       assert.equal(result, true, 'home points equals away points')
    });

  test('returns a new state ', function(assert) {
       var newHome = {
           "team": { "name": "Australia", "id": 32 },
           "pos": 1,
           "pts": 56.23
       }
       var newAway = {
           "team": { "name": "England", "id": 1 },
           "pos": 4,
           "pts": 55.68
       }
    var state = rankingsJSON;
    var result = createNewState(state, newHome, newAway);
    assert.notDeepEqual(result, state, 'we have created a new state' )
  });

  test('test that a table has been created', function(assert){ 
      var state  = rankingsJSON;
      render(state);
      var rowsLength = document.querySelectorAll('.team-row > li').length
      var result = rowsLength;
      console.log(rowsLength);
      assert.equal(result, 15, 'render 5 list items in html');
  })



