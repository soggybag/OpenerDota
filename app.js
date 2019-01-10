var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const axios = require('axios');
// Making API calls to opendota


var my_id = '84155330';
//var id_list = [
//  '84155330'
  //'59654545'
  //'175616543',
  //'126432550',
  //'78564848'
//];

var player;
//request_player(my_id);
requestMatchesHero(my_id,98);
var matches = [];

function request_player(id) {
    var url = 'https://api.opendota.com/api/players/' + id;
    axios.get(url).then(function(responseData){
        console.log(responseData.data.profile.personaname);
        player = responseData.data;
    });
}

    /*var http_request = new XMLHttpRequest();
    http_request.open("GET", url, false);
    http_request.responseType = "json";
    http_request.send();
    var raw = JSON.parse(http_request.responseText);*/
    // players.push(raw);



function requestMatchesHero(id, hero_id) {
  var url = 'https://api.opendota.com/api/players/' + id + '/matches?hero_id=' + hero_id;
  //         https://api.opendota.com/api/players/ 84155330 /matches?hero_id=98
  axios.get(url).then(function(responseData){
      for(var i = 0; i <responseData.data.length; i++){
          matches.push(responseData.data[i].match_id);
      }
      console.log(matches);
  })
}
  /*var http_request = new XMLHttpRequest();
  http_request.open("GET", url, false);
  http_request.responseType = "json";
  http_request.send();
  var raw = JSON.parse(http_request.responseText);
  recentMatches.push(raw);*/

function requestMatch(id){
    var url = 'https://api.opendota.com/api/matches/' + id;
    var http_request = new XMLHttpRequest();
    http_request.open("GET", url, false);
    http_request.responseType = "json";
    http_request.send();
    //console.log(http_request);
    var raw = JSON.parse(http_request.responseText);
    matches.push(raw);
}

// Creating arrays of strings from JSON objects to output in our HTML

/*var player_name = [];
var player_mmr = [];

Object.keys(players).forEach(function(i) {
  player_name.push(players[i].profile.personaname);
  player_mmr.push(players[i].solo_competitive_rank);
});*/



//requestMatch(4312310062);
//console.log(matches[0].radiant_win);
