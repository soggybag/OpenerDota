
    var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
    const axios = require('axios');
    // Making API calls to opendota


    //let my_id = '84155330'; //Mine
    //let my_id = '60210210'; //Nate's
    //var id_list = [
    //  '84155330'
      //'59654545'
      //'175616543',
      //'126432550',
      //'78564848'
    //];

    let player;
    //request_player(my_id);
    let matchIDs = [];
    let matchItemTime = [];
    let matchWin = [];

    requestMatchesHero(84155330,98,15,'soul_ring').then(data => {
        console.log(matchItemTime);
        console.log(matchWin);
        let max = [Math.max(...matchItemTime)/10]
        let matchData = [];
        for(let i = 0; i<max; i++){
            let to_add = []
            to_add.push(0);
            to_add.push(0);
            matchData.push(to_add);
        }
        for(let index = 0; index<matchItemTime.length; index++){
            if(matchWin[index] == 1){
                matchData[Math.floor(matchItemTime[index]/10)][0] += 1;
            } else {
                matchData[Math.floor(matchItemTime[index]/10)][1] += 1;
            }
        }
        console.log(matchData)
    });

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



    function requestMatchesHero(id, hero_id, days, item) {
      var url = 'https://api.opendota.com/api/players/' + id + '/matches?hero_id=' + hero_id +'&date=' + days;
      //         https://api.opendota.com/api/players/ 84155330 /matches?hero_id=98
      // console.log(matchData)
      return axios.get(url).then(function(responseData){
          for(let i = 0; i <responseData.data.length; i++){
              matchIDs.push(responseData.data[i].match_id);
              let matchData = requestMatch(responseData.data[i].match_id);
              let index = -999;

              for(let playerSlot = 0; playerSlot < 10; playerSlot++){
                  //console.log(matchData.players[playerSlot].account_id)
                  if(matchData.players[playerSlot].account_id == id){
                    index = playerSlot;
                    // console.log(index)
                    break;
                  }
              }
              // console.log("MATCHDATA", matchData.players[index])
              //console.log(index, matchData.match_id)

              let firstPurchases = matchData.players[index].first_purchase_time;

              if(firstPurchases[item]){
                  matchItemTime.push(firstPurchases[item]);
              } else {
                  matchItemTime.push(0);
              }
              matchWin.push(matchData.players[index].win);
          }
          return;
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
        return raw;
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
