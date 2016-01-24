//get an access token

function getCredentials(){
  var data = {
        'grant_type': 'client_credentials',
        'client_id': '1NT612vobqwYi5xVXzTvC8W0dqXTvjfuAY8nyaj8',
        'client_secret': 'UPTAzrNPCoDtdDqkf7R1ekdlSQ1rR3hYod3N3_Tz'
      };

      $.ajax({
        'url': 'https://api.clarifai.com/v1/token',
        'data': data,
        'type': 'POST'
      })
      .then(function(r) {
        localStorage.setItem('accessToken', r.access_token);
      });

      //console.log(localStorage.getItem('accessToken'));
  }

//POST request

function postImage(imgurl) {

    var accessToken = localStorage.getItem('accessToken');
    var data = {'encoded_image': imgurl};
    return $.ajax({
      'url': 'https://api.clarifai.com/v1/tag',
      'headers': {
        'Authorization': 'Bearer ' + accessToken
      },
      'data': data,
      'type': 'POST'
    }).success(function(r){
        //console.log(r);
        localStorage.setItem('tagResp', r);
        parseResponse(r);


    }).error(function(err){
      console.log(err);
    });
  }


  //parse the response

  function  parseResponse(resp) {
    //console.log(resp);
    var tags = [];
    if (resp.status_code === 'OK') {
      var results = resp.results;
      tags = results[0].result.tag.classes;
    } else {
      console.log('Sorry, something is wrong.');
    }

    console.log(tags);

    //var tag = $('#print').text(tags.toString().replace(/,/g, ', '));

    var str = 'http://www.amazon.com/s/field-keywords=';
    for(var i = 0; i<5; i++){
      str = str.concat(tags[i]).concat('%20');
    }
    console.log(str);
    location.assign(str);

    /*$jsonAdd = JSON.stringify(tags);
    $jsonAdd = JSON.parse($jsonAdd);*/

  }
