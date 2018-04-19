var friends = require("../data/friends.js");

var path = require('path');

module.exports = function(app) {

    app.get("/api/friends", function(req,res) {
        res.json(friends);
    });

    app.post("/api/friends", function(req,res) {
        
        var bestMatch = 0;
    var bestDiff = 1000; 


    for (var i = friends.length - 1; i >= 0; i--) {

      console.log("comparing with " + friends[i].name);

      var totalDifference = 0;


      for (var k = 0; k < 2; k++ ){
        
        //console.log("someone did " + friendsData[i].scores[k]);
        //console.log("you entered " +  req.body.scores[k]);
        //console.log("you differed by " + Math.abs(friendsData[i].scores[k] - req.body.scores[k]) );

        totalDifference = totalDifference + Math.abs(friends[i].scores[k] - req.body.scores[k]);

      }

      if (totalDifference < bestDiff){
        bestDiff = totalDifference;
        bestMatch = i;
      }

      console.log("total difference for " + friends[i].name + " is " + totalDifference);

    }

    console.log("=============================");
    console.log("best person is " + friends[bestMatch].name + " and best score is " + bestDiff);
    console.log("=============================");

    // push in the user input into the friendArray
    friends.push(req.body);

    // respond back with the best match
    res.json({name: friends[bestMatch].name, photo: friends[bestMatch].photo}); // KEY LINE
    
  });

}