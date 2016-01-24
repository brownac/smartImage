var app = angular.module('BuyMe', [
  'lr.upload'
]);

app.controller('imageController', ['$scope', 'upload', function($scope, upload){
	$scope.doUpload = function () {
	console.log(myFile);
    upload({
      url: 'https://api.clarifai.com/v1/token',
      method: 'POST',
      'headers': {
        'Authorization': 'Bearer ' + localStorage.accessToken
      },
      data: {
        aFile: $scope.myFile, // a jqLite type="file" element, upload() will extract all the files from the input and put them into the FormData object before sending.
      }
    }).then(
      function (response) {
        console.log(response.data); // will output whatever you choose to return from the server on a successful upload
      },
      function (response) {
          console.error(response); //  Will return if status code is above 200 and lower than 300, same as $http
      }
    );
  }


	$scope.getImage = function(imgurl){

		$.when(getCredentials())
        	.then(postImage(imgurl))

        
    
}

$scope.add = function(){
  var f = document.getElementById('file').files[0],
      r = new FileReader();
      console.log(r);
  r.onloadend = function(e){
    var data = e.target.result;
    var url = data.split(',')[1];
    $scope.getImage(url);
    //send you binary data via $http or $resource or do anything else with it
  }
  //r.readAsBinaryString(f);
  r.readAsDataURL(f);
  //console.log(url);

	$scope.booty = 'booty';
	$scope.yomama =45;

}



}]);
