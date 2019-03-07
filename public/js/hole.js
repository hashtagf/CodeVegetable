angular.module('app', [])
	.controller('TodoListController', function($scope,$http) {

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////Select
		setInterval(function(){

		$scope.vegetable = [
			{idv: 1,namev: "สลัดแก้ว"},
			{idv: 2,namev: "กรีนโอ๊ค"},
			{idv: 3,namev: "เรดโอ๊ค"},
			{idv: 4,namev: "คอส"}
		]

		$scope.datahole = [
			{idhole: 1,statushole: false},
			{idhole: 2,statushole: false},
			{idhole: 3,statushole: false},
			{idhole: 4,statushole: false},
			{idhole: 5,statushole: false},
			{idhole: 6,statushole: false},
			{idhole: 7,statushole: false},
			{idhole: 8,statushole: false},
			{idhole: 9,statushole: false},
			{idhole: 10,statushole: false},
			{idhole: 11,statushole: false},
			{idhole: 12,statushole: false},
			{idhole: 13,statushole: false},
			{idhole: 14,statushole: false},
			{idhole: 15,statushole: false},
			{idhole: 16,statushole: false},
			{idhole: 17,statushole: false},
			{idhole: 18,statushole: false},
			{idhole: 19,statushole: false},
			{idhole: 20,statushole: false},
			{idhole: 21,statushole: false},
			{idhole: 22,statushole: false},
			{idhole: 23,statushole: false},
			{idhole: 24,statushole: false},
			{idhole: 25,statushole: false},
			{idhole: 26,statushole: false},
			{idhole: 27,statushole: false},
			{idhole: 28,statushole: false},
			{idhole: 29,statushole: false},
			{idhole: 30,statushole: false},
			{idhole: 31,statushole: false},
			{idhole: 32,statushole: false},
			{idhole: 33,statushole: false},
			{idhole: 34,statushole: false},
			{idhole: 35,statushole: false},
			{idhole: 36,statushole: false}
		]

		$scope.totaldatahole = []

		function getdatahole () {
			$http.get('/hole').then(res => {
				$scope.totaldatahole = res.data

			})
		}

		getdatahole()

		$scope.hole1 = function(veg1){//////////////////////////////////////////////////hole1
			console.log("OK Hole ---------->1")

			if($scope.totaldatahole[0].statushole === true){
				console.log("hole 1 put")
				if(veg1 == "1"){
					$scope.datahole[0].nameveg = $scope.vegetable[0].namev
					$scope.datahole[0].typeveg = moment().format("MMM Do YY")
					$scope.datahole[0].statushole = true
					$http.put('/hole/' + $scope.totaldatahole[0]._id, $scope.datahole[0]).then(res => {
						console.log("sent hole 1 veg 1 update")
						$scope.totaldatahole[0].statushole =  res.data.status
					})
				}else if(veg1 == "2"){
					$scope.datahole[0].nameveg = $scope.vegetable[1].namev
					$scope.datahole[0].typeveg = moment().format("MMM Do YY")
					$scope.datahole[0].statushole = true
					$http.put('/hole/' + $scope.totaldatahole[0]._id, $scope.datahole[0]).then(res => {
						console.log("sent hole 1 veg 2 update")
						$scope.totaldatahole[0].statushole =  res.data.status
					})
				}else if(veg1 == "3"){
					$scope.datahole[0].nameveg = $scope.vegetable[2].namev
					$scope.datahole[0].typeveg = moment().format("MMM Do YY")
					$scope.datahole[0].statushole = true
					$http.put('/hole/' + $scope.totaldatahole[0]._id, $scope.datahole[0]).then(res => {
						console.log("sent hole 1 veg 3 update")
						$scope.totaldatahole[0].statushole =  res.data.status
					})
				}else if(veg1 == "4"){
					$scope.datahole[0].nameveg = $scope.vegetable[3].namev
					$scope.datahole[0].typeveg = moment().format("MMM Do YY")
					$scope.datahole[0].statushole = true
					$http.put('/hole/' + $scope.totaldatahole[0]._id, $scope.datahole[0]).then(res => {
						console.log("sent hole 1 veg 4 update")
						$scope.totaldatahole[0].statushole =  res.data.status
					})
				}//else
			}else if($scope.datahole[0].statushole === false){
				console.log("hole 1 post")
				if(veg1 == "1"){
					$scope.datahole[0].nameveg = $scope.vegetable[0].namev
					$scope.datahole[0].typeveg = moment().format("MMM Do YY")
					$scope.datahole[0].statushole = true
					// $http.post('/hole', $scope.datahole[0]).then(function (response){
					// 	console.log("sent hole 1 veg 1")
					// })
				}else if(veg1 == "2"){
					$scope.datahole[0].nameveg = $scope.vegetable[1].namev
					$scope.datahole[0].typeveg = moment().format("MMM Do YY")
					$scope.datahole[0].statushole = true
					// $http.post('/hole', $scope.datahole[0]).then(function (response){
					// 	console.log("sent hole 1 veg 2")
					// })
				}else if(veg1 == "3"){
					$scope.datahole[0].nameveg = $scope.vegetable[2].namev
					$scope.datahole[0].typeveg = moment().format("MMM Do YY")
					$scope.datahole[0].statushole = true
					// $http.post('/hole', $scope.datahole[0]).then(function (response){
					// 	console.log("sent hole 1 veg 3")
					// })
				}else if(veg1 == "4"){
					$scope.datahole[0].nameveg = $scope.vegetable[3].namev
					$scope.datahole[0].typeveg = moment().format("MMM Do YY")
					$scope.datahole[0].statushole = true
					// $http.post('/hole', $scope.datahole[0]).then(function (response){
					// 	console.log("sent hole 1 veg 4")
					// })
				}//else
			}
		}//function hole1

		$scope.hole2 = function(veg2){//////////////////////////////////////////////////hole2
			console.log("OK Hole ---------->2")

			if($scope.totaldatahole[1].statushole === true){
				console.log("hole 2 put")
				if(veg1 == "1"){
					$scope.datahole[1].nameveg = $scope.vegetable[0].namev
					$scope.datahole[1].typeveg = moment().format("MMM Do YY")
					$scope.datahole[1].statushole = true
					$http.put('/hole/' + $scope.totaldatahole[1]._id, $scope.datahole[1]).then(res => {
						console.log("sent hole 2 veg 1 update")
						$scope.totaldatahole[1].statushole =  res.data.status
					})
				}else if(veg1 == "2"){
					$scope.datahole[1].nameveg = $scope.vegetable[1].namev
					$scope.datahole[1].typeveg = moment().format("MMM Do YY")
					$scope.datahole[1].statushole = true
					$http.put('/hole/' + $scope.totaldatahole[1]._id, $scope.datahole[1]).then(res => {
						console.log("sent hole 2 veg 2 update")
						$scope.totaldatahole[1].statushole =  res.data.status
					})
				}else if(veg1 == "3"){
					$scope.datahole[1].nameveg = $scope.vegetable[2].namev
					$scope.datahole[1].typeveg = moment().format("MMM Do YY")
					$scope.datahole[1].statushole = true
					$http.put('/hole/' + $scope.totaldatahole[1]._id, $scope.datahole[1]).then(res => {
						console.log("sent hole 2 veg 3 update")
						$scope.totaldatahole[1].statushole =  res.data.status
					})
				}else if(veg1 == "4"){
					$scope.datahole[1].nameveg = $scope.vegetable[3].namev
					$scope.datahole[1].typeveg = moment().format("MMM Do YY")
					$scope.datahole[1].statushole = true
					$http.put('/hole/' + $scope.totaldatahole[1]._id, $scope.datahole[1]).then(res => {
						console.log("sent hole 2 veg 4 update")
						$scope.totaldatahole[1].statushole =  res.data.status
					})
				}//else
			}else if($scope.datahole[1].statushole === false){
				console.log("hole 2 post")
				if(veg1 == "1"){
					$scope.datahole[1].nameveg = $scope.vegetable[0].namev
					$scope.datahole[1].typeveg = moment().format("MMM Do YY")
					$scope.datahole[1].statushole = true
					$http.post('/hole', $scope.datahole[1]).then(function (response){
						console.log("sent hole 2 veg 1")
					})
				}else if(veg1 == "2"){
					$scope.datahole[1].nameveg = $scope.vegetable[1].namev
					$scope.datahole[1].typeveg = moment().format("MMM Do YY")
					$scope.datahole[1].statushole = true
					$http.post('/hole', $scope.datahole[1]).then(function (response){
						console.log("sent hole 2 veg 2")
					})
				}else if(veg1 == "3"){
					$scope.datahole[1].nameveg = $scope.vegetable[2].namev
					$scope.datahole[1].typeveg = moment().format("MMM Do YY")
					$scope.datahole[1].statushole = true
					$http.post('/hole', $scope.datahole[1]).then(function (response){
						console.log("sent hole 2 veg 3")
					})
				}else if(veg1 == "4"){
					$scope.datahole[1].nameveg = $scope.vegetable[3].namev
					$scope.datahole[1].typeveg = moment().format("MMM Do YY")
					$scope.datahole[1].statushole = true
					$http.post('/hole', $scope.datahole[1]).then(function (response){
						console.log("sent hole 2 veg 4")
					})
				}//else
			}
		}//function hole2

		$scope.hole3 = function(veg3){//////////////////////////////////////////////////hole3
			console.log("OK Hole ---------->3")

			if($scope.totaldatahole[2].statushole === true){
				console.log("hole 3 put")
				if(veg1 == "1"){
					$scope.datahole[2].nameveg = $scope.vegetable[0].namev
					$scope.datahole[2].typeveg = moment().format("MMM Do YY")
					$scope.datahole[2].statushole = true
					$http.put('/hole/' + $scope.totaldatahole[2]._id, $scope.datahole[2]).then(res => {
						console.log("sent hole 3 veg 1 update")
						$scope.totaldatahole[2].statushole =  res.data.status
					})
				}else if(veg1 == "2"){
					$scope.datahole[2].nameveg = $scope.vegetable[1].namev
					$scope.datahole[2].typeveg = moment().format("MMM Do YY")
					$scope.datahole[2].statushole = true
					$http.put('/hole/' + $scope.totaldatahole[2]._id, $scope.datahole[2]).then(res => {
						console.log("sent hole 3 veg 2 update")
						$scope.totaldatahole[2].statushole =  res.data.status
					})
				}else if(veg1 == "3"){
					$scope.datahole[2].nameveg = $scope.vegetable[2].namev
					$scope.datahole[2].typeveg = moment().format("MMM Do YY")
					$scope.datahole[2].statushole = true
					$http.put('/hole/' + $scope.totaldatahole[2]._id, $scope.datahole[2]).then(res => {
						console.log("sent hole 3 veg 3 update")
						$scope.totaldatahole[2].statushole =  res.data.status
					})
				}else if(veg1 == "4"){
					$scope.datahole[2].nameveg = $scope.vegetable[3].namev
					$scope.datahole[2].typeveg = moment().format("MMM Do YY")
					$scope.datahole[2].statushole = true
					$http.put('/hole/' + $scope.totaldatahole[2]._id, $scope.datahole[2]).then(res => {
						console.log("sent hole 3 veg 4 update")
						$scope.totaldatahole[2].statushole =  res.data.status
					})
				}//else
			}else if($scope.datahole[2].statushole === false){
				console.log("hole 3 post")
				if(veg1 == "1"){
					$scope.datahole[2].nameveg = $scope.vegetable[0].namev
					$scope.datahole[2].typeveg = moment().format("MMM Do YY")
					$scope.datahole[2].statushole = true
					$http.post('/hole', $scope.datahole[2]).then(function (response){
						console.log("sent hole 3 veg 1")
					})
				}else if(veg1 == "2"){
					$scope.datahole[2].nameveg = $scope.vegetable[1].namev
					$scope.datahole[2].typeveg = moment().format("MMM Do YY")
					$scope.datahole[2].statushole = true
					$http.post('/hole', $scope.datahole[2]).then(function (response){
						console.log("sent hole 3 veg 2")
					})
				}else if(veg1 == "3"){
					$scope.datahole[2].nameveg = $scope.vegetable[2].namev
					$scope.datahole[2].typeveg = moment().format("MMM Do YY")
					$scope.datahole[2].statushole = true
					$http.post('/hole', $scope.datahole[2]).then(function (response){
						console.log("sent hole 3 veg 3")
					})
				}else if(veg1 == "4"){
					$scope.datahole[2].nameveg = $scope.vegetable[3].namev
					$scope.datahole[2].typeveg = moment().format("MMM Do YY")
					$scope.datahole[2].statushole = true
					$http.post('/hole', $scope.datahole[2]).then(function (response){
						console.log("sent hole 3 veg 4")
					})
				}//else
			}
		}//function hole3

		$scope.hole4 = function(veg4){//////////////////////////////////////////////////hole4
			console.log("OK Hole ---------->4")

			if($scope.totaldatahole[3].statushole === true){
				console.log("hole 4 put")
				if(veg1 == "1"){
					$scope.datahole[3].nameveg = $scope.vegetable[0].namev
					$scope.datahole[3].typeveg = moment().format("MMM Do YY")
					$scope.datahole[3].statushole = true
					$http.put('/hole/' + $scope.totaldatahole[3]._id, $scope.datahole[3]).then(res => {
						console.log("sent hole 4 veg 1 update")
						$scope.totaldatahole[3].statushole =  res.data.status
					})
				}else if(veg1 == "2"){
					$scope.datahole[3].nameveg = $scope.vegetable[1].namev
					$scope.datahole[3].typeveg = moment().format("MMM Do YY")
					$scope.datahole[3].statushole = true
					$http.put('/hole/' + $scope.totaldatahole[3]._id, $scope.datahole[3]).then(res => {
						console.log("sent hole 4 veg 2 update")
						$scope.totaldatahole[3].statushole =  res.data.status
					})
				}else if(veg1 == "3"){
					$scope.datahole[3].nameveg = $scope.vegetable[2].namev
					$scope.datahole[3].typeveg = moment().format("MMM Do YY")
					$scope.datahole[3].statushole = true
					$http.put('/hole/' + $scope.totaldatahole[3]._id, $scope.datahole[3]).then(res => {
						console.log("sent hole 4 veg 3 update")
						$scope.totaldatahole[3].statushole =  res.data.status
					})
				}else if(veg1 == "4"){
					$scope.datahole[3].nameveg = $scope.vegetable[3].namev
					$scope.datahole[3].typeveg = moment().format("MMM Do YY")
					$scope.datahole[3].statushole = true
					$http.put('/hole/' + $scope.totaldatahole[3]._id, $scope.datahole[3]).then(res => {
						console.log("sent hole 4 veg 4 update")
						$scope.totaldatahole[3].statushole =  res.data.status
					})
				}//else
			}else if($scope.datahole[3].statushole === false){
				console.log("hole 3 post")
				if(veg1 == "1"){
					$scope.datahole[3].nameveg = $scope.vegetable[0].namev
					$scope.datahole[3].typeveg = moment().format("MMM Do YY")
					$scope.datahole[3].statushole = true
					$http.post('/hole', $scope.datahole[3]).then(function (response){
						console.log("sent hole 4 veg 1")
					})
				}else if(veg1 == "2"){
					$scope.datahole[3].nameveg = $scope.vegetable[1].namev
					$scope.datahole[3].typeveg = moment().format("MMM Do YY")
					$scope.datahole[3].statushole = true
					$http.post('/hole', $scope.datahole[3]).then(function (response){
						console.log("sent hole 4 veg 2")
					})
				}else if(veg1 == "3"){
					$scope.datahole[3].nameveg = $scope.vegetable[2].namev
					$scope.datahole[3].typeveg = moment().format("MMM Do YY")
					$scope.datahole[3].statushole = true
					$http.post('/hole', $scope.datahole[3]).then(function (response){
						console.log("sent hole 4 veg 3")
					})
				}else if(veg1 == "4"){
					$scope.datahole[3].nameveg = $scope.vegetable[3].namev
					$scope.datahole[3].typeveg = moment().format("MMM Do YY")
					$scope.datahole[3].statushole = true
					$http.post('/hole', $scope.datahole[3]).then(function (response){
						console.log("sent hole 4 veg 4")
					})
				}//else
			}
		}//function hole4

		$scope.hole5 = function(veg5){//////////////////////////////////////////////////hole5
			console.log("OK Hole ---------->5")

			if($scope.totaldatahole[4].statushole === true){
				console.log("hole 5 put")
				if(veg1 == "1"){
					$scope.datahole[4].nameveg = $scope.vegetable[0].namev
					$scope.datahole[4].typeveg = moment().format("MMM Do YY")
					$scope.datahole[4].statushole = true
					$http.put('/hole/' + $scope.totaldatahole[4]._id, $scope.datahole[4]).then(res => {
						console.log("sent hole 5 veg 1 update")
						$scope.totaldatahole[4].statushole =  res.data.status
					})
				}else if(veg1 == "2"){
					$scope.datahole[4].nameveg = $scope.vegetable[1].namev
					$scope.datahole[4].typeveg = moment().format("MMM Do YY")
					$scope.datahole[4].statushole = true
					$http.put('/hole/' + $scope.totaldatahole[4]._id, $scope.datahole[4]).then(res => {
						console.log("sent hole 5 veg 2 update")
						$scope.totaldatahole[4].statushole =  res.data.status
					})
				}else if(veg1 == "3"){
					$scope.datahole[4].nameveg = $scope.vegetable[2].namev
					$scope.datahole[4].typeveg = moment().format("MMM Do YY")
					$scope.datahole[4].statushole = true
					$http.put('/hole/' + $scope.totaldatahole[4]._id, $scope.datahole[4]).then(res => {
						console.log("sent hole 5 veg 3 update")
						$scope.totaldatahole[4].statushole =  res.data.status
					})
				}else if(veg1 == "4"){
					$scope.datahole[4].nameveg = $scope.vegetable[3].namev
					$scope.datahole[4].typeveg = moment().format("MMM Do YY")
					$scope.datahole[4].statushole = true
					$http.put('/hole/' + $scope.totaldatahole[4]._id, $scope.datahole[4]).then(res => {
						console.log("sent hole 5 veg 4 update")
						$scope.totaldatahole[4].statushole =  res.data.status
					})
				}//else
			}else if($scope.datahole[4].statushole === false){
				console.log("hole 5 post")
				if(veg1 == "1"){
					$scope.datahole[4].nameveg = $scope.vegetable[0].namev
					$scope.datahole[4].typeveg = moment().format("MMM Do YY")
					$scope.datahole[4].statushole = true
					$http.post('/hole', $scope.datahole[4]).then(function (response){
						console.log("sent hole 5 veg 1")
					})
				}else if(veg1 == "2"){
					$scope.datahole[4].nameveg = $scope.vegetable[1].namev
					$scope.datahole[4].typeveg = moment().format("MMM Do YY")
					$scope.datahole[4].statushole = true
					$http.post('/hole', $scope.datahole[4]).then(function (response){
						console.log("sent hole 5 veg 2")
					})
				}else if(veg1 == "3"){
					$scope.datahole[4].nameveg = $scope.vegetable[2].namev
					$scope.datahole[4].typeveg = moment().format("MMM Do YY")
					$scope.datahole[4].statushole = true
					$http.post('/hole', $scope.datahole[4]).then(function (response){
						console.log("sent hole 5 veg 3")
					})
				}else if(veg1 == "4"){
					$scope.datahole[4].nameveg = $scope.vegetable[3].namev
					$scope.datahole[4].typeveg = moment().format("MMM Do YY")
					$scope.datahole[4].statushole = true
					$http.post('/hole', $scope.datahole[4]).then(function (response){
						console.log("sent hole 5 veg 4")
					})
				}//else
			}
		}//function hole5*/

		$scope.hole6 = function(veg6){//////////////////////////////////////////////////hole5
			console.log("OK Hole ---------->6")

			if($scope.totaldatahole[5].statushole === true){
				console.log("hole 6 put")
				if(veg6 == "1"){
					$scope.datahole[5].nameveg = $scope.vegetable[0].namev
					$scope.datahole[5].typeveg = moment().format("MMM Do YY")
					$scope.datahole[5].statushole = true
					$http.put('/hole/' + $scope.totaldatahole[5]._id, $scope.datahole[5]).then(res => {
						console.log("sent hole 6 veg 1 update")
						$scope.totaldatahole[5].statushole =  res.data.status
					})
				}else if(veg6 == "2"){
					$scope.datahole[5].nameveg = $scope.vegetable[1].namev
					$scope.datahole[5].typeveg = moment().format("MMM Do YY")
					$scope.datahole[5].statushole = true
					$http.put('/hole/' + $scope.totaldatahole[5]._id, $scope.datahole[5]).then(res => {
						console.log("sent hole 6 veg 2 update")
						$scope.totaldatahole[5].statushole =  res.data.status
					})
				}else if(veg6 == "3"){
					$scope.datahole[5].nameveg = $scope.vegetable[2].namev
					$scope.datahole[5].typeveg = moment().format("MMM Do YY")
					$scope.datahole[5].statushole = true
					$http.put('/hole/' + $scope.totaldatahole[5]._id, $scope.datahole[5]).then(res => {
						console.log("sent hole 6 veg 3 update")
						$scope.totaldatahole[5].statushole =  res.data.status
					})
				}else if(veg6 == "4"){
					$scope.datahole[5].nameveg = $scope.vegetable[3].namev
					$scope.datahole[5].typeveg = moment().format("MMM Do YY")
					$scope.datahole[5].statushole = true
					$http.put('/hole/' + $scope.totaldatahole[5]._id, $scope.datahole[5]).then(res => {
						console.log("sent hole 6 veg 4 update")
						$scope.totaldatahole[5].statushole =  res.data.status
					})
				}//else
			}else if($scope.datahole[5].statushole === false){
				console.log("hole 6 post")
				if(veg6 == "1"){
					$scope.datahole[5].nameveg = $scope.vegetable[0].namev
					$scope.datahole[5].typeveg = moment().format("MMM Do YY")
					$scope.datahole[5].statushole = true
					$http.post('/hole', $scope.datahole[5]).then(function (response){
						console.log("sent hole 6 veg 1")
					})
				}else if(veg6 == "2"){
					$scope.datahole[5].nameveg = $scope.vegetable[1].namev
					$scope.datahole[5].typeveg = moment().format("MMM Do YY")
					$scope.datahole[5].statushole = true
					$http.post('/hole', $scope.datahole[5]).then(function (response){
						console.log("sent hole 6 veg 2")
					})
				}else if(veg6 == "3"){
					$scope.datahole[5].nameveg = $scope.vegetable[2].namev
					$scope.datahole[5].typeveg = moment().format("MMM Do YY")
					$scope.datahole[5].statushole = true
					$http.post('/hole', $scope.datahole[5]).then(function (response){
						console.log("sent hole 6 veg 3")
					})
				}else if(veg6 == "4"){
					$scope.datahole[5].nameveg = $scope.vegetable[3].namev
					$scope.datahole[5].typeveg = moment().format("MMM Do YY")
					$scope.datahole[5].statushole = true
					$http.post('/hole', $scope.datahole[5]).then(function (response){
						console.log("sent hole 6 veg 4")
					})
				}//else
			}
		}//function hole6



		}, 1000);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////Select
})//end
