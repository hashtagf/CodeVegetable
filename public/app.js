angular.module('app', [])
  .controller('TodoListController', function ($scope, $http) {

    $scope.conLED = true
    $scope.conPump = true
    $scope.item = ''
    $scope.sheets = []
    $scope.status = 44

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////Data Googlesheets
    //https://sheetsu.com/apis/v1.0/5eac309ffcdc
    //https://sheetsu.com/apis/v1.0/b7e3ea00dedb
    //https://sheetsu.com/apis/v1.0/e36e82f2bcd1
    $http.get('https://sheetsu.com/apis/v1.0su/a5aa9216ff4d').then(function (res) {
      console.log(res.data)
      $scope.items = res.data[res.data.length - 1]
      $scope.sheets = res.data
    })

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////Data Googlesheets

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////Auto Man
    setInterval(function () {
      $scope.sys = [{
        btnsys: 1,
        sysbtn: 'Auto',
        stasys: true
      }]
      $scope.totalsys = []

      function getsys() {
        $http.get('/setsys').then(res => {
          $scope.totalsys = res.data
          $scope.stasystem = $scope.totalsys[0].sysbtn
        })
      }
      getsys()

      $scope.auto = function () {
        $scope.sys[0].sysbtn = 'Auto'
        $scope.sys[0].stasys = true
        // $http.post('/setsys', $scope.sys[0]).then(function (response){})
        $http.put('/setsys/' + $scope.totalsys[0]._id, $scope.sys[0]).then(res => {
          $scope.totalsys[0].stasys = res.data.stasys
        })
        console.log("Auto")
      }

      $scope.man = function () {
        $scope.sys[0].sysbtn = 'Manual'
        $scope.sys[0].stasys = false
        //$http.post('/setsys', $scope.sys[0]).then(function (response){})
        $http.put('/setsys/' + $scope.totalsys[0]._id, $scope.sys[0]).then(res => {
          $scope.totalsys[0].stasys = res.data.stasys
        })
        console.log("Manual")
      }
    }, 1000)
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////Auto Man

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////time

    $scope.stabtn = [{
      btnnum: 1,
      statusbtn: false
    }, {
      btnnum: 2,
      statusbtn: false
    }, {
      btnnum: 3,
      statusbtn: false
    }, {
      btnnum: 4,
      statusbtn: false
    }]

    $scope.totalbtn = []
    // $scope.pumpSta = ''
    $scope.LEDSta = ''

    function getbtn() {
      $http.get('/btn').then(res => {
        $scope.totalbtn = res.data
        $scope.staLED = res.data[0].statusbtn
        $scope.staPump = res.data[1].statusbtn
        $scope.staFog = res.data[2].statusbtn
        $scope.staWater = res.data[3].statusbtn

        if ($scope.staPump == true) {
          $scope.pumpSta = 'ON'
          // console.log("chcek")
        } else if ($scope.staPump == false) {
          $scope.pumpSta = 'OFF'
          // console.log("chcek")
        }

        if ($scope.staLED == true) {
          $scope.LEDSta = 'ON'
          // console.log("chcek")
        } else if ($scope.staLED == false) {
          $scope.LEDSta = 'OFF'
          // console.log("chcek")
        }
        if ($scope.staFog == true) {
          $scope.fogSta = 'ON'
          // console.log("chcek")
        } else if ($scope.staFog == false) {
          $scope.fogSta = 'OFF'
          // console.log("chcek")
        }

        if ($scope.staWater == true) {
          $scope.waterSta = 'ON'
          // console.log("chcek")
        } else if ($scope.staWater == false) {
          $scope.waterSta = 'OFF'
          // console.log("chcek")
        }

      })
    }
    setInterval(function () {
      getbtn()
    }, 1000)

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////time auto
    $scope.autotime = function () {
      var d = new Date()
      $scope.time1 = d.toLocaleTimeString()
      console.log($scope.time1)

      if ($scope.time1 > '18:00:00' || $scope.time1 < '20:05:00') {
        $scope.LEDSta = 'ON'
        $scope.stabtn[0].statusbtn = true
        $http.put('/btn/' + $scope.totalbtn[0]._id, $scope.stabtn[0]).then(res => {
          $scope.totalbtn[0].statusbtn = res.data.statusbtn
        })
        console.log("ledOn")
        console.log("---------------------------------OK")
      } else if ($scope.time1 >= '20:05:00 ' || $scope.time1 <= '18:00:00') {
        $scope.LEDSta = 'OFF'
        $scope.stabtn[0].statusbtn = false
        $http.put('/btn/' + $scope.totalbtn[0]._id, $scope.stabtn[0]).then(res => {
          $scope.totalbtn[0].statusbtn = res.data.statusbtn
        })
        console.log("ledOff")
        console.log("---------------------------------OK")
      }
    }//Auto time


    if ($scope.staLED === true) {
      $scope.LEDSta = 'ON'
      $http.get('/ledOn').then(function (response) {
        // console.log(response)
      })
      console.log("ledOn")
      $scope.stabtn[0].statusbtn = true
      $http.put('/btn/' + $scope.totalbtn[0]._id, $scope.stabtn[0]).then(res => {
        $scope.totalbtn[0].statusbtn = res.data.statusbtn
      })
      console.log("---------------------------------OK")
    } else if ($scope.staLED === false) {
      $scope.LEDSta = 'ON'
      $http.get('/ledOff').then(function (response) {
        // console.log(response)
      })
      console.log("ledOff")
      $scope.stabtn[0].statusbtn = false
      $http.put('/btn/' + $scope.totalbtn[0]._id, $scope.stabtn[0]).then(res => {
        $scope.totalbtn[0].statusbtn = res.data.statusbtn
      })
      console.log("---------------------------------OK")
    }

    if ($scope.staPump === true) {
      $scope.pumpSta = 'ON'
      $http.get('/pumpOn').then(function (response) {
        // console.log(response)
      })
      $scope.stabtn[1].statusbtn = true///////////////////////////////
      console.log("pumpOn")
      $http.put('/btn/' + $scope.totalbtn[1]._id, $scope.stabtn[1]).then(res => {
        $scope.totalbtn[1].statusbtn = res.data.statusbtn
      })

    } else if ($scope.staPump === false) {
      $scope.pumpSta = 'OFF'
      $http.get('/pumpOff').then(function (response) {
        // console.log(response)
      })
      $scope.stabtn[1].statusbtn = false///////////////////////////////
      console.log("pumpOn")
      $http.put('/btn/' + $scope.totalbtn[1]._id, $scope.stabtn[1]).then(res => {
        $scope.totalbtn[1].statusbtn = res.data.statusbtn
      })
    }

    // Fog 
    if ($scope.staFog === true) {
      $scope.fogSta = 'ON'
      $http.get('/fogOn').then(function (response) {
        // console.log(response)
      })
      $scope.stabtn[2].statusbtn = true///////////////////////////////
      console.log("fogOn")
      $http.put('/btn/' + $scope.totalbtn[2]._id, $scope.stabtn[2]).then(res => {
        $scope.totalbtn[2].statusbtn = res.data.statusbtn
      })

    } else if ($scope.staFog === false) {
      $scope.fogSta = 'OFF'
      $http.get('/fogOff').then(function (response) {
        // console.log(response)
      })
      $scope.stabtn[2].statusbtn = false///////////////////////////////
      console.log("fogOff")
      $http.put('/btn/' + $scope.totalbtn[2]._id, $scope.stabtn[2]).then(res => {
        $scope.totalbtn[2].statusbtn = res.data.statusbtn
      })
    }
    //$scope.checkstatus()
    if ($scope.staWater === true) {
      $scope.waterSta = 'ON'
      $http.get('/waterOn').then(function (response) {
        // console.log(response)
      })
      $scope.stabtn[3].statusbtn = true///////////////////////////////
      console.log("waterOn")
      $http.put('/btn/' + $scope.totalbtn[3]._id, $scope.stabtn[3]).then(res => {
        $scope.totalbtn[3].statusbtn = res.data.statusbtn
      })

    } else if ($scope.staWater === false) {
      $scope.waterSta = 'OFF'
      $http.get('/waterOff').then(function (response) {
        // console.log(response)
      })
      $scope.stabtn[3].statusbtn = false///////////////////////////////
      console.log("waterOff")
      $http.put('/btn/' + $scope.totalbtn[3]._id, $scope.stabtn[3]).then(res => {
        $scope.totalbtn[3].statusbtn = res.data.statusbtn
      })
    }
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////fn LEDon

    $scope.ledOn = function () {
      $scope.LEDSta = 'ON'
      $http.get('/ledOn').then(function (response) {
        // console.log(response)
      })
      $scope.stabtn[0].statusbtn = true///////////////////////////////
      // $http.post('/btn', $scope.stabtn[0]).then(function (response){})///////////////////////////////
      console.log("ledOn")
      $http.put('/btn/' + $scope.totalbtn[0]._id, $scope.stabtn[0]).then(res => {
        $scope.totalbtn[0].statusbtn = res.data.statusbtn
        console.log(res.data.statusbtn)
      })
      console.log("---------------------------------OK")
    }

    $scope.ledOff = function () {
      $scope.LEDSta = 'OFF'
      $http.get('/ledOff').then(function (response) {
        // console.log(response)
      })
      $scope.stabtn[0].statusbtn = false///////////////////////////////
      // $http.post('/btn', $scope.stabtn[0]).then(function (response){})///////////////////////////////
      console.log("ledOff")
      $http.put('/btn/' + $scope.totalbtn[0]._id, $scope.stabtn[0]).then(res => {
        $scope.totalbtn[0].statusbtn = res.data.statusbtn
        console.log(res.data.statusbtn)
      })
      console.log("---------------------------------OK")
    }


    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////fn LEDoff

    $scope.pumpOn = function () {
      $scope.pumpSta = 'ON'
      $http.get('/pumpOn').then(function (response) {
        console.log(response)
      })
      $scope.stabtn[1].statusbtn = true///////////////////////////////
      // $http.post('/btn', $scope.stabtn[1]).then(function (response){})///////////////////////////////
      console.log("pumpOn")
      $http.put('/btn/' + $scope.totalbtn[1]._id, $scope.stabtn[1]).then(res => {
        $scope.totalbtn[1].statusbtn = res.data.statusbtn
      })
    }

    $scope.pumpOff = function () {
      $scope.pumpSta = 'OFF'
      $http.get('/pumpOff').then(function (response) {
        // console.log(response)
      })
      $scope.stabtn[1].statusbtn = false///////////////////////////////
      // $http.post('/btn', $scope.stabtn[1]).then(function (response){})///////////////////////////////
      console.log("pumpOff")
      $http.put('/btn/' + $scope.totalbtn[1]._id, $scope.stabtn[1]).then(res => {
        $scope.totalbtn[1].statusbtn = res.data.statusbtn
      })
    }

    $scope.fogOn = function () {
      $scope.fogSta = 'ON'
      $http.get('/fogOn').then(function (response) {
        console.log(response)
      })
      $scope.stabtn[2].statusbtn = true///////////////////////////////
      // $http.post('/btn', $scope.stabtn[1]).then(function (response){})///////////////////////////////
      console.log("fogOn")
      $http.put('/btn/' + $scope.totalbtn[2]._id, $scope.stabtn[2]).then(res => {
        $scope.totalbtn[2].statusbtn = res.data.statusbtn
      })
    }

    $scope.fogOff = function () {
      $scope.fogSta = 'OFF'
      $http.get('/fogOff').then(function (response) {
        console.log(response)
      })
      $scope.stabtn[2].statusbtn = false///////////////////////////////
      // $http.post('/btn', $scope.stabtn[1]).then(function (response){})///////////////////////////////
      console.log("fogOff")
      $http.put('/btn/' + $scope.totalbtn[2]._id, $scope.stabtn[2]).then(res => {
        $scope.totalbtn[2].statusbtn = res.data.statusbtn
      })
    }

    /// Water
    $scope.waterOn = function () {
      $scope.waterSta = 'ON'
      $http.get('/waterOn').then(function (response) {
        console.log(response)
      })
      $scope.stabtn[3].statusbtn = true///////////////////////////////
      // $http.post('/btn', $scope.stabtn[1]).then(function (response){})///////////////////////////////
      console.log("waterOn")
      $http.put('/btn/' + $scope.totalbtn[3]._id, $scope.stabtn[3]).then(res => {
        $scope.totalbtn[3].statusbtn = res.data.statusbtn
      })
    }

    $scope.waterOff = function () {
      $scope.waterSta = 'OFF'
      $http.get('/waterOff').then(function (response) {
        console.log(response)
      })
      $scope.stabtn[3].statusbtn = false///////////////////////////////
      // $http.post('/btn', $scope.stabtn[1]).then(function (response){})///////////////////////////////
      console.log("waterOff")
      $http.put('/btn/' + $scope.totalbtn[3]._id, $scope.stabtn[3]).then(res => {
        $scope.totalbtn[3].statusbtn = res.data.statusbtn
      })
    }


    $scope.takeCam = function () {
      $http.get('/takeCam').then(function (response) {
        console.log(response)
        setTimeout(function () {
          window.location = 'picture.html'
        }, 3000)
      })
      console.log("Take Photo")
    }

    $scope.first = function () {
      $http.post('/btn', $scope.stabtn[1]).then(function (response) { })
      $http.post('/btn', $scope.stabtn[0]).then(function (response) { })
      $http.post('/setsys', $scope.sys[0]).then(function (response) { })
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////control

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////sys
    setInterval(function () {
      if ($scope.stasystem == "Auto") {
        console.log("auto")
        $scope.autotime()
      } else if ($scope.stasystem == "Manual") {
        if ($scope.staLED == true) {
          $scope.LEDSta = 'ON'
        } else if ($scope.staLED == false) {
          $scope.LEDSta = 'OFF'
        }
      }//if man
    }, 2000)

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////sys

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////date2

    setInterval(function () {

      $scope.dateEndDate = []

      $scope.eat = function () {
        var dateforpush = {}
        var end = moment().add(35, 'days').calendar()

        var dateforpush = {
          end: end
        }

        $http.post('/dateend', dateforpush).then(function (response) {
          // $scope.dateEndDate.push(response)
        })
      }

      $scope.getdataeat = function () {
        $http.get('/dateend').then(function (response) {
          $scope.dateEndDate = response.data
        })
      }

      // test tak
      $scope.hole = [
        { hole: 1, status: false },
        { hole: 2, status: false },
        { hole: 3, status: false },
        { hole: 4, status: false },
        { hole: 5, status: false },
        { hole: 6, status: false },
        { hole: 7, status: false },
        { hole: 8, status: false },
        { hole: 9, status: false },
        { hole: 10, status: false },
        { hole: 11, status: false },
        { hole: 12, status: false },
        { hole: 13, status: false },
        { hole: 14, status: false },
        { hole: 15, status: false },
        { hole: 16, status: false },
        { hole: 17, status: false },
        { hole: 18, status: false },
        { hole: 19, status: false },
        { hole: 20, status: false },
        { hole: 21, status: false },
        { hole: 22, status: false },
        { hole: 23, status: false },
        { hole: 24, status: false },
        { hole: 25, status: false },
        { hole: 26, status: false },
        { hole: 27, status: false },
        { hole: 28, status: false },
        { hole: 29, status: false },
        { hole: 30, status: false },
        { hole: 31, status: false },
        { hole: 32, status: false },
        { hole: 33, status: false },
        { hole: 34, status: false },
        { hole: 35, status: false },
        { hole: 36, status: false }
      ]

      $scope.totalHole = []

      function getHole() {
        $http.get('/dateend').then(res => {
          $scope.totalHole = res.data
        })
      }

      getHole()

      var curt = $scope.totalHole.findIndex(i => i.hole === hole)

      $scope.tree = function (hole) {

        var index = $scope.hole.findIndex(i => i.hole === hole)
        $scope.hole[index].status = true
        $scope.hole[index].end = moment().add(36, 'days').calendar()
        $http.post('/dateend', $scope.hole[index]).then(function (response) { })

        if ($scope.totalHole[index].status === false) {
          console.log('first')
          $scope.hole[index].status = true
          $scope.hole[index].end = moment().add(36, 'days').calendar()
          var cur = $scope.totalHole.findIndex(i => i.hole === hole)

          if (cur >= 0) {
            console.log('th')
            // $http.put('/dateend/' +  $scope.totalHole[cur]._id, $scope.totalHole[cur]).then(res => {})
            $http.put('/dateend/' + $scope.totalHole[cur]._id, $scope.hole[index]).then(res => {
              // console.log('th' +res)
              $scope.totalHole[index].status = res.data.status
            })
          } else if (cur === -1) {
            console.log('sec')
            $http.post('/dateend', $scope.hole[index]).then(function (response) { })
          } else {
            $http.post('/dateend', $scope.hole[index]).then(function (response) { })
          }
          getHole()
        } else {
          console.log('four')
          var _id = ''
          $scope.hole[index].end = moment().add(36, 'days').calendar()
          $scope.hole[index].status = false
          $http.get('/dateend').then(res => {
            $scope.dateEndDate = res.data
            res.data.findIndex(i => {
              if (i.hole === hole) {
                _id = i._id
              }
            })
          }).then(() => {
            $scope.hole[index].status = false
            $scope.hole[index].end = moment().add(36, 'days').calendar()
            $http.put('/dateend/' + _id, $scope.hole[index]).then(res => {
              $scope.totalHole[index].status = res.data.status
            })
          })

        }//else
      }//function tree

      $scope.reday = function (list) {
        console.log('list : ' + list)
        $http.get('/dateend').then(res => {
          console.log('hole : ' + res.data[list].hole)

          $scope.hole[list].status = false
          $scope.hole[list].end = moment().add(36, 'days').calendar()
          $http.put('/dateend/' + $scope.totalHole[list]._id, $scope.hole[list]).then(res => {
            $scope.totalHole[list].status = res.data.status
          })
        })

      }//function reday

      $scope.getdataeat = function () {
        $http.get('/dateend').then(function (response) {

          $scope.dateEndDate1 = response.data[0].end
          $scope.dateEndDate2 = response.data[1].end
          $scope.dateEndDate3 = response.data[2].end
          $scope.dateEndDate4 = response.data[3].end
          $scope.dateEndDate5 = response.data[4].end
          $scope.dateEndDate6 = response.data[5].end
          $scope.dateEndDate7 = response.data[6].end
          $scope.dateEndDate8 = response.data[7].end
          $scope.dateEndDate9 = response.data[8].end
          $scope.dateEndDate10 = response.data[9].end
          $scope.dateEndDate11 = response.data[10].end
          $scope.dateEndDate12 = response.data[11].end
          $scope.dateEndDate13 = response.data[12].end
          $scope.dateEndDate14 = response.data[13].end
          $scope.dateEndDate15 = response.data[14].end
          $scope.dateEndDate16 = response.data[15].end
          $scope.dateEndDate17 = response.data[16].end
          $scope.dateEndDate18 = response.data[17].end
          $scope.dateEndDate19 = response.data[18].end
          $scope.dateEndDate20 = response.data[19].end
          $scope.dateEndDate21 = response.data[20].end
          $scope.dateEndDate22 = response.data[21].end
          $scope.dateEndDate23 = response.data[22].end
          $scope.dateEndDate24 = response.data[23].end
          $scope.dateEndDate25 = response.data[24].end
          $scope.dateEndDate26 = response.data[25].end
          $scope.dateEndDate27 = response.data[26].end
          $scope.dateEndDate28 = response.data[27].end
          $scope.dateEndDate29 = response.data[28].end
          $scope.dateEndDate30 = response.data[29].end
          $scope.dateEndDate31 = response.data[30].end
          $scope.dateEndDate32 = response.data[31].end
          $scope.dateEndDate33 = response.data[32].end
          $scope.dateEndDate34 = response.data[33].end
          $scope.dateEndDate35 = response.data[34].end
          $scope.dateEndDate36 = response.data[35].end

          var start = moment()
          var dayend1 = moment($scope.dateEndDate1)
          var dayend2 = moment($scope.dateEndDate2)
          var dayend3 = moment($scope.dateEndDate3)
          var dayend4 = moment($scope.dateEndDate4)
          var dayend5 = moment($scope.dateEndDate5)
          var dayend6 = moment($scope.dateEndDate6)
          var dayend7 = moment($scope.dateEndDate7)
          var dayend8 = moment($scope.dateEndDate8)
          var dayend9 = moment($scope.dateEndDate9)
          var dayend10 = moment($scope.dateEndDate10)
          var dayend11 = moment($scope.dateEndDate11)
          var dayend12 = moment($scope.dateEndDate12)
          var dayend13 = moment($scope.dateEndDate13)
          var dayend14 = moment($scope.dateEndDate14)
          var dayend15 = moment($scope.dateEndDate15)
          var dayend16 = moment($scope.dateEndDate16)
          var dayend17 = moment($scope.dateEndDate17)
          var dayend18 = moment($scope.dateEndDate18)
          var dayend19 = moment($scope.dateEndDate19)
          var dayend20 = moment($scope.dateEndDate20)
          var dayend21 = moment($scope.dateEndDate21)
          var dayend22 = moment($scope.dateEndDate22)
          var dayend23 = moment($scope.dateEndDate23)
          var dayend24 = moment($scope.dateEndDate24)
          var dayend25 = moment($scope.dateEndDate25)
          var dayend26 = moment($scope.dateEndDate26)
          var dayend27 = moment($scope.dateEndDate27)
          var dayend28 = moment($scope.dateEndDate28)
          var dayend29 = moment($scope.dateEndDate29)
          var dayend30 = moment($scope.dateEndDate30)
          var dayend31 = moment($scope.dateEndDate31)
          var dayend32 = moment($scope.dateEndDate32)
          var dayend33 = moment($scope.dateEndDate33)
          var dayend34 = moment($scope.dateEndDate34)
          var dayend35 = moment($scope.dateEndDate35)
          var dayend36 = moment($scope.dateEndDate36)

          $scope.calday1 = dayend1.diff(start, 'days')
          $scope.calday2 = dayend2.diff(start, 'days')
          $scope.calday3 = dayend3.diff(start, 'days')
          $scope.calday4 = dayend4.diff(start, 'days')
          $scope.calday5 = dayend5.diff(start, 'days')
          $scope.calday6 = dayend6.diff(start, 'days')
          $scope.calday7 = dayend7.diff(start, 'days')
          $scope.calday8 = dayend8.diff(start, 'days')
          $scope.calday9 = dayend9.diff(start, 'days')
          $scope.calday10 = dayend10.diff(start, 'days')
          $scope.calday11 = dayend11.diff(start, 'days')
          $scope.calday12 = dayend12.diff(start, 'days')
          $scope.calday13 = dayend13.diff(start, 'days')
          $scope.calday14 = dayend14.diff(start, 'days')
          $scope.calday15 = dayend15.diff(start, 'days')
          $scope.calday16 = dayend16.diff(start, 'days')
          $scope.calday17 = dayend17.diff(start, 'days')
          $scope.calday18 = dayend18.diff(start, 'days')
          $scope.calday19 = dayend19.diff(start, 'days')
          $scope.calday20 = dayend20.diff(start, 'days')
          $scope.calday21 = dayend21.diff(start, 'days')
          $scope.calday22 = dayend22.diff(start, 'days')
          $scope.calday23 = dayend23.diff(start, 'days')
          $scope.calday24 = dayend24.diff(start, 'days')
          $scope.calday25 = dayend25.diff(start, 'days')
          $scope.calday26 = dayend26.diff(start, 'days')
          $scope.calday27 = dayend27.diff(start, 'days')
          $scope.calday28 = dayend28.diff(start, 'days')
          $scope.calday29 = dayend29.diff(start, 'days')
          $scope.calday30 = dayend30.diff(start, 'days')
          $scope.calday31 = dayend31.diff(start, 'days')
          $scope.calday32 = dayend32.diff(start, 'days')
          $scope.calday33 = dayend33.diff(start, 'days')
          $scope.calday34 = dayend34.diff(start, 'days')
          $scope.calday35 = dayend35.diff(start, 'days')
          $scope.calday36 = dayend36.diff(start, 'days')

        })
      }//function getdataeat

      $scope.getdataeat()
      // // test tak

    }, 1000);

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////date2

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////Select
    setInterval(function () {

      $scope.vegetable = [
        { idv: 1, namev: "สลัดแก้ว" },
        { idv: 2, namev: "กรีนโอ๊ค" },
        { idv: 3, namev: "เรดโอ๊ค" },
        { idv: 4, namev: "คอส" }
      ]

      $scope.datahole = [
        { idhole: 1, statushole: false },
        { idhole: 2, statushole: false },
        { idhole: 3, statushole: false },
        { idhole: 4, statushole: false },
        { idhole: 5, statushole: false },
        { idhole: 6, statushole: false },
        { idhole: 7, statushole: false },
        { idhole: 8, statushole: false },
        { idhole: 9, statushole: false },
        { idhole: 10, statushole: false },
        { idhole: 11, statushole: false },
        { idhole: 12, statushole: false },
        { idhole: 13, statushole: false },
        { idhole: 14, statushole: false },
        { idhole: 15, statushole: false },
        { idhole: 16, statushole: false },
        { idhole: 17, statushole: false },
        { idhole: 18, statushole: false },
        { idhole: 19, statushole: false },
        { idhole: 20, statushole: false },
        { idhole: 21, statushole: false },
        { idhole: 22, statushole: false },
        { idhole: 23, statushole: false },
        { idhole: 24, statushole: false },
        { idhole: 25, statushole: false },
        { idhole: 26, statushole: false },
        { idhole: 27, statushole: false },
        { idhole: 28, statushole: false },
        { idhole: 29, statushole: false },
        { idhole: 30, statushole: false },
        { idhole: 31, statushole: false },
        { idhole: 32, statushole: false },
        { idhole: 33, statushole: false },
        { idhole: 34, statushole: false },
        { idhole: 35, statushole: false },
        { idhole: 36, statushole: false }
      ]

      $scope.totaldatahole = []

      function getdatahole() {
        $http.get('/hole').then(res => {
          $scope.totaldatahole = res.data
          $scope.holeveg1 = res.data[0].nameveg
          $scope.holeveg2 = res.data[1].nameveg
          $scope.holeveg3 = res.data[2].nameveg
          $scope.holeveg4 = res.data[3].nameveg
          $scope.holeveg5 = res.data[4].nameveg
          $scope.holeveg6 = res.data[5].nameveg

          $scope.holeveg7 = res.data[6].nameveg
          $scope.holeveg8 = res.data[7].nameveg
          $scope.holeveg9 = res.data[8].nameveg
          $scope.holeveg10 = res.data[9].nameveg
          $scope.holeveg11 = res.data[10].nameveg
          $scope.holeveg12 = res.data[11].nameveg

          $scope.holeveg13 = res.data[12].nameveg
          $scope.holeveg14 = res.data[13].nameveg
          $scope.holeveg15 = res.data[14].nameveg
          $scope.holeveg16 = res.data[15].nameveg
          $scope.holeveg17 = res.data[16].nameveg
          $scope.holeveg18 = res.data[17].nameveg

          $scope.holeveg19 = res.data[18].nameveg
          $scope.holeveg20 = res.data[19].nameveg
          $scope.holeveg21 = res.data[20].nameveg
          $scope.holeveg22 = res.data[21].nameveg
          $scope.holeveg23 = res.data[22].nameveg
          $scope.holeveg24 = res.data[23].nameveg

          $scope.holeveg25 = res.data[24].nameveg
          $scope.holeveg26 = res.data[25].nameveg
          $scope.holeveg27 = res.data[26].nameveg
          $scope.holeveg28 = res.data[27].nameveg
          $scope.holeveg29 = res.data[28].nameveg
          $scope.holeveg30 = res.data[29].nameveg

          $scope.holeveg31 = res.data[30].nameveg
          $scope.holeveg32 = res.data[31].nameveg
          $scope.holeveg33 = res.data[32].nameveg
          $scope.holeveg34 = res.data[33].nameveg
          $scope.holeveg35 = res.data[34].nameveg
          $scope.holeveg36 = res.data[35].nameveg
        })
      }

      getdatahole()

      $scope.hole1 = function (veg1) {//////////////////////////////////////////////////hole1
        console.log("OK Hole ------->1")

        if ($scope.totaldatahole[0].statushole === true) {
          console.log("hole 1 put")
          if (veg1 == "1") {
            $scope.datahole[0].nameveg = $scope.vegetable[0].namev
            $scope.datahole[0].typeveg = moment().format("MMM Do YY")
            $scope.datahole[0].statushole = true
            $http.put('/hole/' + $scope.totaldatahole[0]._id, $scope.datahole[0]).then(res => {
              console.log("sent hole 1 veg 1 update")
              $scope.totaldatahole[0].statushole = res.data.status
            })
          } else if (veg1 == "2") {
            $scope.datahole[0].nameveg = $scope.vegetable[1].namev
            $scope.datahole[0].typeveg = moment().format("MMM Do YY")
            $scope.datahole[0].statushole = true
            $http.put('/hole/' + $scope.totaldatahole[0]._id, $scope.datahole[0]).then(res => {
              console.log("sent hole 1 veg 2 update")
              $scope.totaldatahole[0].statushole = res.data.status
            })
          } else if (veg1 == "3") {
            $scope.datahole[0].nameveg = $scope.vegetable[2].namev
            $scope.datahole[0].typeveg = moment().format("MMM Do YY")
            $scope.datahole[0].statushole = true
            $http.put('/hole/' + $scope.totaldatahole[0]._id, $scope.datahole[0]).then(res => {
              console.log("sent hole 1 veg 3 update")
              $scope.totaldatahole[0].statushole = res.data.status
            })
          } else if (veg1 == "4") {
            $scope.datahole[0].nameveg = $scope.vegetable[3].namev
            $scope.datahole[0].typeveg = moment().format("MMM Do YY")
            $scope.datahole[0].statushole = true
            $http.put('/hole/' + $scope.totaldatahole[0]._id, $scope.datahole[0]).then(res => {
              console.log("sent hole 1 veg 4 update")
              $scope.totaldatahole[0].statushole = res.data.status
            })
          }//else
        } else if ($scope.datahole[0].statushole === false) {
          console.log("hole 1 post")
          if (veg1 == "1") {
            $scope.datahole[0].nameveg = $scope.vegetable[0].namev
            $scope.datahole[0].typeveg = moment().format("MMM Do YY")
            $scope.datahole[0].statushole = true
            $http.post('/hole', $scope.datahole[0]).then(function (response) {
              console.log("sent hole 1 veg 1")
            })
          } else if (veg1 == "2") {
            $scope.datahole[0].nameveg = $scope.vegetable[1].namev
            $scope.datahole[0].typeveg = moment().format("MMM Do YY")
            $scope.datahole[0].statushole = true
            $http.post('/hole', $scope.datahole[0]).then(function (response) {
              console.log("sent hole 1 veg 2")
            })
          } else if (veg1 == "3") {
            $scope.datahole[0].nameveg = $scope.vegetable[2].namev
            $scope.datahole[0].typeveg = moment().format("MMM Do YY")
            $scope.datahole[0].statushole = true
            $http.post('/hole', $scope.datahole[0]).then(function (response) {
              console.log("sent hole 1 veg 3")
            })
          } else if (veg1 == "4") {
            $scope.datahole[0].nameveg = $scope.vegetable[3].namev
            $scope.datahole[0].typeveg = moment().format("MMM Do YY")
            $scope.datahole[0].statushole = true
            $http.post('/hole', $scope.datahole[0]).then(function (response) {
              console.log("sent hole 1 veg 4")
            })
          }//else
        }
      }//function hole1

      $scope.hole2 = function (veg2) {//////////////////////////////////////////////////hole2
        console.log("OK Hole ------->2")

        if ($scope.totaldatahole[1].statushole === true) {
          console.log("hole 2 put")
          if (veg2 == "1") {
            $scope.datahole[1].nameveg = $scope.vegetable[0].namev
            $scope.datahole[1].typeveg = moment().format("MMM Do YY")
            $scope.datahole[1].statushole = true
            $http.put('/hole/' + $scope.totaldatahole[1]._id, $scope.datahole[1]).then(res => {
              console.log("sent hole 2 veg 1 update")
              $scope.totaldatahole[1].statushole = res.data.status
            })
          } else if (veg2 == "2") {
            $scope.datahole[1].nameveg = $scope.vegetable[1].namev
            $scope.datahole[1].typeveg = moment().format("MMM Do YY")
            $scope.datahole[1].statushole = true
            $http.put('/hole/' + $scope.totaldatahole[1]._id, $scope.datahole[1]).then(res => {
              console.log("sent hole 2 veg 2 update")
              $scope.totaldatahole[1].statushole = res.data.status
            })
          } else if (veg2 == "3") {
            $scope.datahole[1].nameveg = $scope.vegetable[2].namev
            $scope.datahole[1].typeveg = moment().format("MMM Do YY")
            $scope.datahole[1].statushole = true
            $http.put('/hole/' + $scope.totaldatahole[1]._id, $scope.datahole[1]).then(res => {
              console.log("sent hole 2 veg 3 update")
              $scope.totaldatahole[1].statushole = res.data.status
            })
          } else if (veg2 == "4") {
            $scope.datahole[1].nameveg = $scope.vegetable[3].namev
            $scope.datahole[1].typeveg = moment().format("MMM Do YY")
            $scope.datahole[1].statushole = true
            $http.put('/hole/' + $scope.totaldatahole[1]._id, $scope.datahole[1]).then(res => {
              console.log("sent hole 2 veg 4 update")
              $scope.totaldatahole[1].statushole = res.data.status
            })
          }//else
        } else if ($scope.datahole[1].statushole === false) {
          console.log("hole 2 post")
          if (veg2 == "1") {
            $scope.datahole[1].nameveg = $scope.vegetable[0].namev
            $scope.datahole[1].typeveg = moment().format("MMM Do YY")
            $scope.datahole[1].statushole = true
            $http.post('/hole', $scope.datahole[1]).then(function (response) {
              console.log("sent hole 2 veg 1")
            })
          } else if (veg2 == "2") {
            $scope.datahole[1].nameveg = $scope.vegetable[1].namev
            $scope.datahole[1].typeveg = moment().format("MMM Do YY")
            $scope.datahole[1].statushole = true
            $http.post('/hole', $scope.datahole[1]).then(function (response) {
              console.log("sent hole 2 veg 2")
            })
          } else if (veg2 == "3") {
            $scope.datahole[1].nameveg = $scope.vegetable[2].namev
            $scope.datahole[1].typeveg = moment().format("MMM Do YY")
            $scope.datahole[1].statushole = true
            $http.post('/hole', $scope.datahole[1]).then(function (response) {
              console.log("sent hole 2 veg 3")
            })
          } else if (veg2 == "4") {
            $scope.datahole[1].nameveg = $scope.vegetable[3].namev
            $scope.datahole[1].typeveg = moment().format("MMM Do YY")
            $scope.datahole[1].statushole = true
            $http.post('/hole', $scope.datahole[1]).then(function (response) {
              console.log("sent hole 2 veg 4")
            })
          }//else
        }
      }//function hole2

      $scope.hole3 = function (veg3) {//////////////////////////////////////////////////hole3
        console.log("OK Hole ------->3")

        if ($scope.totaldatahole[2].statushole === true) {
          console.log("hole 3 put")
          if (veg3 == "1") {
            $scope.datahole[2].nameveg = $scope.vegetable[0].namev
            $scope.datahole[2].typeveg = moment().format("MMM Do YY")
            $scope.datahole[2].statushole = true
            $http.put('/hole/' + $scope.totaldatahole[2]._id, $scope.datahole[2]).then(res => {
              console.log("sent hole 3 veg 1 update")
              $scope.totaldatahole[2].statushole = res.data.status
            })
          } else if (veg3 == "2") {
            $scope.datahole[2].nameveg = $scope.vegetable[1].namev
            $scope.datahole[2].typeveg = moment().format("MMM Do YY")
            $scope.datahole[2].statushole = true
            $http.put('/hole/' + $scope.totaldatahole[2]._id, $scope.datahole[2]).then(res => {
              console.log("sent hole 3 veg 2 update")
              $scope.totaldatahole[2].statushole = res.data.status
            })
          } else if (veg3 == "3") {
            $scope.datahole[2].nameveg = $scope.vegetable[2].namev
            $scope.datahole[2].typeveg = moment().format("MMM Do YY")
            $scope.datahole[2].statushole = true
            $http.put('/hole/' + $scope.totaldatahole[2]._id, $scope.datahole[2]).then(res => {
              console.log("sent hole 3 veg 3 update")
              $scope.totaldatahole[2].statushole = res.data.status
            })
          } else if (veg3 == "4") {
            $scope.datahole[2].nameveg = $scope.vegetable[3].namev
            $scope.datahole[2].typeveg = moment().format("MMM Do YY")
            $scope.datahole[2].statushole = true
            $http.put('/hole/' + $scope.totaldatahole[2]._id, $scope.datahole[2]).then(res => {
              console.log("sent hole 3 veg 4 update")
              $scope.totaldatahole[2].statushole = res.data.status
            })
          }//else
        } else if ($scope.datahole[2].statushole === false) {
          console.log("hole 3 post")
          if (veg3 == "1") {
            $scope.datahole[2].nameveg = $scope.vegetable[0].namev
            $scope.datahole[2].typeveg = moment().format("MMM Do YY")
            $scope.datahole[2].statushole = true
            $http.post('/hole', $scope.datahole[2]).then(function (response) {
              console.log("sent hole 3 veg 1")
            })
          } else if (veg3 == "2") {
            $scope.datahole[2].nameveg = $scope.vegetable[1].namev
            $scope.datahole[2].typeveg = moment().format("MMM Do YY")
            $scope.datahole[2].statushole = true
            $http.post('/hole', $scope.datahole[2]).then(function (response) {
              console.log("sent hole 3 veg 2")
            })
          } else if (veg3 == "3") {
            $scope.datahole[2].nameveg = $scope.vegetable[2].namev
            $scope.datahole[2].typeveg = moment().format("MMM Do YY")
            $scope.datahole[2].statushole = true
            $http.post('/hole', $scope.datahole[2]).then(function (response) {
              console.log("sent hole 3 veg 3")
            })
          } else if (veg3 == "4") {
            $scope.datahole[2].nameveg = $scope.vegetable[3].namev
            $scope.datahole[2].typeveg = moment().format("MMM Do YY")
            $scope.datahole[2].statushole = true
            $http.post('/hole', $scope.datahole[2]).then(function (response) {
              console.log("sent hole 3 veg 4")
            })
          }//else
        }
      }//function hole3

      $scope.hole4 = function (veg4) {//////////////////////////////////////////////////hole4
        console.log("OK Hole ------->4")

        if ($scope.totaldatahole[3].statushole === true) {
          console.log("hole 4 put")
          if (veg4 == "1") {
            $scope.datahole[3].nameveg = $scope.vegetable[0].namev
            $scope.datahole[3].typeveg = moment().format("MMM Do YY")
            $scope.datahole[3].statushole = true
            $http.put('/hole/' + $scope.totaldatahole[3]._id, $scope.datahole[3]).then(res => {
              console.log("sent hole 4 veg 1 update")
              $scope.totaldatahole[3].statushole = res.data.status
            })
          } else if (veg4 == "2") {
            $scope.datahole[3].nameveg = $scope.vegetable[1].namev
            $scope.datahole[3].typeveg = moment().format("MMM Do YY")
            $scope.datahole[3].statushole = true
            $http.put('/hole/' + $scope.totaldatahole[3]._id, $scope.datahole[3]).then(res => {
              console.log("sent hole 4 veg 2 update")
              $scope.totaldatahole[3].statushole = res.data.status
            })
          } else if (veg4 == "3") {
            $scope.datahole[3].nameveg = $scope.vegetable[2].namev
            $scope.datahole[3].typeveg = moment().format("MMM Do YY")
            $scope.datahole[3].statushole = true
            $http.put('/hole/' + $scope.totaldatahole[3]._id, $scope.datahole[3]).then(res => {
              console.log("sent hole 4 veg 3 update")
              $scope.totaldatahole[3].statushole = res.data.status
            })
          } else if (veg4 == "4") {
            $scope.datahole[3].nameveg = $scope.vegetable[3].namev
            $scope.datahole[3].typeveg = moment().format("MMM Do YY")
            $scope.datahole[3].statushole = true
            $http.put('/hole/' + $scope.totaldatahole[3]._id, $scope.datahole[3]).then(res => {
              console.log("sent hole 4 veg 4 update")
              $scope.totaldatahole[3].statushole = res.data.status
            })
          }//else
        } else if ($scope.datahole[3].statushole === false) {
          console.log("hole 3 post")
          if (veg4 == "1") {
            $scope.datahole[3].nameveg = $scope.vegetable[0].namev
            $scope.datahole[3].typeveg = moment().format("MMM Do YY")
            $scope.datahole[3].statushole = true
            $http.post('/hole', $scope.datahole[3]).then(function (response) {
              console.log("sent hole 4 veg 1")
            })
          } else if (veg4 == "2") {
            $scope.datahole[3].nameveg = $scope.vegetable[1].namev
            $scope.datahole[3].typeveg = moment().format("MMM Do YY")
            $scope.datahole[3].statushole = true
            $http.post('/hole', $scope.datahole[3]).then(function (response) {
              console.log("sent hole 4 veg 2")
            })
          } else if (veg4 == "3") {
            $scope.datahole[3].nameveg = $scope.vegetable[2].namev
            $scope.datahole[3].typeveg = moment().format("MMM Do YY")
            $scope.datahole[3].statushole = true
            $http.post('/hole', $scope.datahole[3]).then(function (response) {
              console.log("sent hole 4 veg 3")
            })
          } else if (veg4 == "4") {
            $scope.datahole[3].nameveg = $scope.vegetable[3].namev
            $scope.datahole[3].typeveg = moment().format("MMM Do YY")
            $scope.datahole[3].statushole = true
            $http.post('/hole', $scope.datahole[3]).then(function (response) {
              console.log("sent hole 4 veg 4")
            })
          }//else
        }
      }//function hole4

      $scope.hole5 = function (veg5) {//////////////////////////////////////////////////hole5
        console.log("OK Hole ------->5")

        if ($scope.totaldatahole[4].statushole === true) {
          console.log("hole 5 put")
          if (veg5 == "1") {
            $scope.datahole[4].nameveg = $scope.vegetable[0].namev
            $scope.datahole[4].typeveg = moment().format("MMM Do YY")
            $scope.datahole[4].statushole = true
            $http.put('/hole/' + $scope.totaldatahole[4]._id, $scope.datahole[4]).then(res => {
              console.log("sent hole 5 veg 1 update")
              $scope.totaldatahole[4].statushole = res.data.status
            })
          } else if (veg5 == "2") {
            $scope.datahole[4].nameveg = $scope.vegetable[1].namev
            $scope.datahole[4].typeveg = moment().format("MMM Do YY")
            $scope.datahole[4].statushole = true
            $http.put('/hole/' + $scope.totaldatahole[4]._id, $scope.datahole[4]).then(res => {
              console.log("sent hole 5 veg 2 update")
              $scope.totaldatahole[4].statushole = res.data.status
            })
          } else if (veg5 == "3") {
            $scope.datahole[4].nameveg = $scope.vegetable[2].namev
            $scope.datahole[4].typeveg = moment().format("MMM Do YY")
            $scope.datahole[4].statushole = true
            $http.put('/hole/' + $scope.totaldatahole[4]._id, $scope.datahole[4]).then(res => {
              console.log("sent hole 5 veg 3 update")
              $scope.totaldatahole[4].statushole = res.data.status
            })
          } else if (veg5 == "4") {
            $scope.datahole[4].nameveg = $scope.vegetable[3].namev
            $scope.datahole[4].typeveg = moment().format("MMM Do YY")
            $scope.datahole[4].statushole = true
            $http.put('/hole/' + $scope.totaldatahole[4]._id, $scope.datahole[4]).then(res => {
              console.log("sent hole 5 veg 4 update")
              $scope.totaldatahole[4].statushole = res.data.status
            })
          }//else
        } else if ($scope.datahole[4].statushole === false) {
          console.log("hole 5 post")
          if (veg5 == "1") {
            $scope.datahole[4].nameveg = $scope.vegetable[0].namev
            $scope.datahole[4].typeveg = moment().format("MMM Do YY")
            $scope.datahole[4].statushole = true
            $http.post('/hole', $scope.datahole[4]).then(function (response) {
              console.log("sent hole 5 veg 1")
            })
          } else if (veg5 == "2") {
            $scope.datahole[4].nameveg = $scope.vegetable[1].namev
            $scope.datahole[4].typeveg = moment().format("MMM Do YY")
            $scope.datahole[4].statushole = true
            $http.post('/hole', $scope.datahole[4]).then(function (response) {
              console.log("sent hole 5 veg 2")
            })
          } else if (veg5 == "3") {
            $scope.datahole[4].nameveg = $scope.vegetable[2].namev
            $scope.datahole[4].typeveg = moment().format("MMM Do YY")
            $scope.datahole[4].statushole = true
            $http.post('/hole', $scope.datahole[4]).then(function (response) {
              console.log("sent hole 5 veg 3")
            })
          } else if (veg5 == "4") {
            $scope.datahole[4].nameveg = $scope.vegetable[3].namev
            $scope.datahole[4].typeveg = moment().format("MMM Do YY")
            $scope.datahole[4].statushole = true
            $http.post('/hole', $scope.datahole[4]).then(function (response) {
              console.log("sent hole 5 veg 4")
            })
          }//else
        }
      }//function hole5

      $scope.hole6 = function (veg6) {//////////////////////////////////////////////////hole6
        console.log("OK Hole ------->6")

        if ($scope.totaldatahole[5].statushole === true) {
          console.log("hole 6 put")
          if (veg6 == "1") {
            $scope.datahole[5].nameveg = $scope.vegetable[0].namev
            $scope.datahole[5].typeveg = moment().format("MMM Do YY")
            $scope.datahole[5].statushole = true
            $http.put('/hole/' + $scope.totaldatahole[5]._id, $scope.datahole[5]).then(res => {
              console.log("sent hole 6 veg 1 update")
              $scope.totaldatahole[5].statushole = res.data.status
            })
          } else if (veg6 == "2") {
            $scope.datahole[5].nameveg = $scope.vegetable[1].namev
            $scope.datahole[5].typeveg = moment().format("MMM Do YY")
            $scope.datahole[5].statushole = true
            $http.put('/hole/' + $scope.totaldatahole[5]._id, $scope.datahole[5]).then(res => {
              console.log("sent hole 6 veg 2 update")
              $scope.totaldatahole[5].statushole = res.data.status
            })
          } else if (veg6 == "3") {
            $scope.datahole[5].nameveg = $scope.vegetable[2].namev
            $scope.datahole[5].typeveg = moment().format("MMM Do YY")
            $scope.datahole[5].statushole = true
            $http.put('/hole/' + $scope.totaldatahole[5]._id, $scope.datahole[5]).then(res => {
              console.log("sent hole 6 veg 3 update")
              $scope.totaldatahole[5].statushole = res.data.status
            })
          } else if (veg6 == "4") {
            $scope.datahole[5].nameveg = $scope.vegetable[3].namev
            $scope.datahole[5].typeveg = moment().format("MMM Do YY")
            $scope.datahole[5].statushole = true
            $http.put('/hole/' + $scope.totaldatahole[5]._id, $scope.datahole[5]).then(res => {
              console.log("sent hole 6 veg 4 update")
              $scope.totaldatahole[5].statushole = res.data.status
            })
          }//else
        } else if ($scope.datahole[5].statushole === false) {
          console.log("hole 6 post")
          if (veg6 == "1") {
            $scope.datahole[5].nameveg = $scope.vegetable[0].namev
            $scope.datahole[5].typeveg = moment().format("MMM Do YY")
            $scope.datahole[5].statushole = true
            $http.post('/hole', $scope.datahole[5]).then(function (response) {
              console.log("sent hole 6 veg 1")
            })
          } else if (veg6 == "2") {
            $scope.datahole[5].nameveg = $scope.vegetable[1].namev
            $scope.datahole[5].typeveg = moment().format("MMM Do YY")
            $scope.datahole[5].statushole = true
            $http.post('/hole', $scope.datahole[5]).then(function (response) {
              console.log("sent hole 6 veg 2")
            })
          } else if (veg6 == "3") {
            $scope.datahole[5].nameveg = $scope.vegetable[2].namev
            $scope.datahole[5].typeveg = moment().format("MMM Do YY")
            $scope.datahole[5].statushole = true
            $http.post('/hole', $scope.datahole[5]).then(function (response) {
              console.log("sent hole 6 veg 3")
            })
          } else if (veg6 == "4") {
            $scope.datahole[5].nameveg = $scope.vegetable[3].namev
            $scope.datahole[5].typeveg = moment().format("MMM Do YY")
            $scope.datahole[5].statushole = true
            $http.post('/hole', $scope.datahole[5]).then(function (response) {
              console.log("sent hole 6 veg 4")
            })
          }//else
        }
      }//function hole6

      $scope.hole7 = function (veg7) {//////////////////////////////////////////////////hole7
        console.log("OK Hole ------->7")

        if ($scope.totaldatahole[6].statushole === true) {
          console.log("hole 7 put")
          if (veg7 == "1") {
            $scope.datahole[6].nameveg = $scope.vegetable[0].namev
            $scope.datahole[6].typeveg = moment().format("MMM Do YY")
            $scope.datahole[6].statushole = true
            $http.put('/hole/' + $scope.totaldatahole[6]._id, $scope.datahole[6]).then(res => {
              console.log("sent hole 7 veg 1 update")
              $scope.totaldatahole[6].statushole = res.data.status
            })
          } else if (veg7 == "2") {
            $scope.datahole[6].nameveg = $scope.vegetable[1].namev
            $scope.datahole[6].typeveg = moment().format("MMM Do YY")
            $scope.datahole[6].statushole = true
            $http.put('/hole/' + $scope.totaldatahole[6]._id, $scope.datahole[6]).then(res => {
              console.log("sent hole 7 veg 2 update")
              $scope.totaldatahole[6].statushole = res.data.status
            })
          } else if (veg7 == "3") {
            $scope.datahole[6].nameveg = $scope.vegetable[2].namev
            $scope.datahole[6].typeveg = moment().format("MMM Do YY")
            $scope.datahole[6].statushole = true
            $http.put('/hole/' + $scope.totaldatahole[6]._id, $scope.datahole[6]).then(res => {
              console.log("sent hole 7 veg 3 update")
              $scope.totaldatahole[6].statushole = res.data.status
            })
          } else if (veg7 == "4") {
            $scope.datahole[6].nameveg = $scope.vegetable[3].namev
            $scope.datahole[6].typeveg = moment().format("MMM Do YY")
            $scope.datahole[6].statushole = true
            $http.put('/hole/' + $scope.totaldatahole[6]._id, $scope.datahole[6]).then(res => {
              console.log("sent hole 7 veg 4 update")
              $scope.totaldatahole[6].statushole = res.data.status
            })
          }//else
        } else if ($scope.datahole[6].statushole === false) {
          console.log("hole 7 post")
          if (veg7 == "1") {
            $scope.datahole[6].nameveg = $scope.vegetable[0].namev
            $scope.datahole[6].typeveg = moment().format("MMM Do YY")
            $scope.datahole[6].statushole = true
            $http.post('/hole', $scope.datahole[6]).then(function (response) {
              console.log("sent hole 7 veg 1")
            })
          } else if (veg7 == "2") {
            $scope.datahole[6].nameveg = $scope.vegetable[1].namev
            $scope.datahole[6].typeveg = moment().format("MMM Do YY")
            $scope.datahole[6].statushole = true
            $http.post('/hole', $scope.datahole[6]).then(function (response) {
              console.log("sent hole 7 veg 2")
            })
          } else if (veg7 == "3") {
            $scope.datahole[6].nameveg = $scope.vegetable[2].namev
            $scope.datahole[6].typeveg = moment().format("MMM Do YY")
            $scope.datahole[6].statushole = true
            $http.post('/hole', $scope.datahole[6]).then(function (response) {
              console.log("sent hole 7 veg 3")
            })
          } else if (veg7 == "4") {
            $scope.datahole[6].nameveg = $scope.vegetable[3].namev
            $scope.datahole[6].typeveg = moment().format("MMM Do YY")
            $scope.datahole[6].statushole = true
            $http.post('/hole', $scope.datahole[6]).then(function (response) {
              console.log("sent hole 7 veg 4")
            })
          }//else
        }
      }//function hole7

      $scope.hole8 = function (veg8) {//////////////////////////////////////////////////hole8
        console.log("OK Hole ------->8")

        if ($scope.totaldatahole[7].statushole === true) {
          console.log("hole 8 put")
          if (veg8 == "1") {
            $scope.datahole[7].nameveg = $scope.vegetable[0].namev
            $scope.datahole[7].typeveg = moment().format("MMM Do YY")
            $scope.datahole[7].statushole = true
            $http.put('/hole/' + $scope.totaldatahole[7]._id, $scope.datahole[7]).then(res => {
              console.log("sent hole 8 veg 1 update")
              $scope.totaldatahole[7].statushole = res.data.status
            })
          } else if (veg8 == "2") {
            $scope.datahole[7].nameveg = $scope.vegetable[1].namev
            $scope.datahole[7].typeveg = moment().format("MMM Do YY")
            $scope.datahole[7].statushole = true
            $http.put('/hole/' + $scope.totaldatahole[7]._id, $scope.datahole[7]).then(res => {
              console.log("sent hole 8 veg 2 update")
              $scope.totaldatahole[7].statushole = res.data.status
            })
          } else if (veg8 == "3") {
            $scope.datahole[7].nameveg = $scope.vegetable[2].namev
            $scope.datahole[7].typeveg = moment().format("MMM Do YY")
            $scope.datahole[7].statushole = true
            $http.put('/hole/' + $scope.totaldatahole[7]._id, $scope.datahole[7]).then(res => {
              console.log("sent hole 8 veg 3 update")
              $scope.totaldatahole[7].statushole = res.data.status
            })
          } else if (veg8 == "4") {
            $scope.datahole[7].nameveg = $scope.vegetable[3].namev
            $scope.datahole[7].typeveg = moment().format("MMM Do YY")
            $scope.datahole[7].statushole = true
            $http.put('/hole/' + $scope.totaldatahole[7]._id, $scope.datahole[7]).then(res => {
              console.log("sent hole 8 veg 4 update")
              $scope.totaldatahole[7].statushole = res.data.status
            })
          }//else
        } else if ($scope.datahole[7].statushole === false) {
          console.log("hole 8 post")
          if (veg8 == "1") {
            $scope.datahole[7].nameveg = $scope.vegetable[0].namev
            $scope.datahole[7].typeveg = moment().format("MMM Do YY")
            $scope.datahole[7].statushole = true
            $http.post('/hole', $scope.datahole[7]).then(function (response) {
              console.log("sent hole 8 veg 1")
            })
          } else if (veg8 == "2") {
            $scope.datahole[7].nameveg = $scope.vegetable[1].namev
            $scope.datahole[7].typeveg = moment().format("MMM Do YY")
            $scope.datahole[7].statushole = true
            $http.post('/hole', $scope.datahole[7]).then(function (response) {
              console.log("sent hole 8 veg 2")
            })
          } else if (veg8 == "3") {
            $scope.datahole[7].nameveg = $scope.vegetable[2].namev
            $scope.datahole[7].typeveg = moment().format("MMM Do YY")
            $scope.datahole[7].statushole = true
            $http.post('/hole', $scope.datahole[7]).then(function (response) {
              console.log("sent hole 8 veg 3")
            })
          } else if (veg8 == "4") {
            $scope.datahole[7].nameveg = $scope.vegetable[3].namev
            $scope.datahole[7].typeveg = moment().format("MMM Do YY")
            $scope.datahole[7].statushole = true
            $http.post('/hole', $scope.datahole[7]).then(function (response) {
              console.log("sent hole 8 veg 4")
            })
          }//else
        }
      }//function hole8

      $scope.hole9 = function (veg9) {//////////////////////////////////////////////////hole9
        console.log("OK Hole ------->9")

        if ($scope.totaldatahole[8].statushole === true) {
          console.log("hole 9 put")
          if (veg9 == "1") {
            $scope.datahole[8].nameveg = $scope.vegetable[0].namev
            $scope.datahole[8].typeveg = moment().format("MMM Do YY")
            $scope.datahole[8].statushole = true
            $http.put('/hole/' + $scope.totaldatahole[8]._id, $scope.datahole[8]).then(res => {
              console.log("sent hole 9 veg 1 update")
              $scope.totaldatahole[8].statushole = res.data.status
            })
          } else if (veg9 == "2") {
            $scope.datahole[8].nameveg = $scope.vegetable[1].namev
            $scope.datahole[8].typeveg = moment().format("MMM Do YY")
            $scope.datahole[8].statushole = true
            $http.put('/hole/' + $scope.totaldatahole[8]._id, $scope.datahole[8]).then(res => {
              console.log("sent hole 9 veg 2 update")
              $scope.totaldatahole[8].statushole = res.data.status
            })
          } else if (veg9 == "3") {
            $scope.datahole[8].nameveg = $scope.vegetable[2].namev
            $scope.datahole[8].typeveg = moment().format("MMM Do YY")
            $scope.datahole[8].statushole = true
            $http.put('/hole/' + $scope.totaldatahole[8]._id, $scope.datahole[8]).then(res => {
              console.log("sent hole 9 veg 3 update")
              $scope.totaldatahole[8].statushole = res.data.status
            })
          } else if (veg9 == "4") {
            $scope.datahole[8].nameveg = $scope.vegetable[3].namev
            $scope.datahole[8].typeveg = moment().format("MMM Do YY")
            $scope.datahole[8].statushole = true
            $http.put('/hole/' + $scope.totaldatahole[8]._id, $scope.datahole[8]).then(res => {
              console.log("sent hole 9 veg 4 update")
              $scope.totaldatahole[8].statushole = res.data.status
            })
          }//else
        } else if ($scope.datahole[8].statushole === false) {
          console.log("hole 9 post")
          if (veg9 == "1") {
            $scope.datahole[8].nameveg = $scope.vegetable[0].namev
            $scope.datahole[8].typeveg = moment().format("MMM Do YY")
            $scope.datahole[8].statushole = true
            $http.post('/hole', $scope.datahole[8]).then(function (response) {
              console.log("sent hole 9 veg 1")
            })
          } else if (veg9 == "2") {
            $scope.datahole[8].nameveg = $scope.vegetable[1].namev
            $scope.datahole[8].typeveg = moment().format("MMM Do YY")
            $scope.datahole[8].statushole = true
            $http.post('/hole', $scope.datahole[8]).then(function (response) {
              console.log("sent hole 9 veg 2")
            })
          } else if (veg9 == "3") {
            $scope.datahole[8].nameveg = $scope.vegetable[2].namev
            $scope.datahole[8].typeveg = moment().format("MMM Do YY")
            $scope.datahole[8].statushole = true
            $http.post('/hole', $scope.datahole[8]).then(function (response) {
              console.log("sent hole 9 veg 3")
            })
          } else if (veg9 == "4") {
            $scope.datahole[8].nameveg = $scope.vegetable[3].namev
            $scope.datahole[8].typeveg = moment().format("MMM Do YY")
            $scope.datahole[8].statushole = true
            $http.post('/hole', $scope.datahole[8]).then(function (response) {
              console.log("sent hole 9 veg 4")
            })
          }//else
        }
      }//function hole9

      $scope.hole10 = function (veg10) {//////////////////////////////////////////////////hole10
        console.log("OK Hole ------->10")

        if ($scope.totaldatahole[9].statushole === true) {
          console.log("hole 10 put")
          if (veg10 == "1") {
            $scope.datahole[9].nameveg = $scope.vegetable[0].namev
            $scope.datahole[9].typeveg = moment().format("MMM Do YY")
            $scope.datahole[9].statushole = true
            $http.put('/hole/' + $scope.totaldatahole[9]._id, $scope.datahole[9]).then(res => {
              console.log("sent hole 10 veg 1 update")
              $scope.totaldatahole[9].statushole = res.data.status
            })
          } else if (veg10 == "2") {
            $scope.datahole[9].nameveg = $scope.vegetable[1].namev
            $scope.datahole[9].typeveg = moment().format("MMM Do YY")
            $scope.datahole[9].statushole = true
            $http.put('/hole/' + $scope.totaldatahole[9]._id, $scope.datahole[9]).then(res => {
              console.log("sent hole 10 veg 2 update")
              $scope.totaldatahole[9].statushole = res.data.status
            })
          } else if (veg10 == "3") {
            $scope.datahole[9].nameveg = $scope.vegetable[2].namev
            $scope.datahole[9].typeveg = moment().format("MMM Do YY")
            $scope.datahole[9].statushole = true
            $http.put('/hole/' + $scope.totaldatahole[9]._id, $scope.datahole[9]).then(res => {
              console.log("sent hole 10 veg 3 update")
              $scope.totaldatahole[9].statushole = res.data.status
            })
          } else if (veg10 == "4") {
            $scope.datahole[9].nameveg = $scope.vegetable[3].namev
            $scope.datahole[9].typeveg = moment().format("MMM Do YY")
            $scope.datahole[9].statushole = true
            $http.put('/hole/' + $scope.totaldatahole[9]._id, $scope.datahole[9]).then(res => {
              console.log("sent hole 10 veg 4 update")
              $scope.totaldatahole[9].statushole = res.data.status
            })
          }//else
        } else if ($scope.datahole[9].statushole === false) {
          console.log("hole 10 post")
          if (veg10 == "1") {
            $scope.datahole[9].nameveg = $scope.vegetable[0].namev
            $scope.datahole[9].typeveg = moment().format("MMM Do YY")
            $scope.datahole[9].statushole = true
            $http.post('/hole', $scope.datahole[9]).then(function (response) {
              console.log("sent hole 10 veg 1")
            })
          } else if (veg10 == "2") {
            $scope.datahole[9].nameveg = $scope.vegetable[1].namev
            $scope.datahole[9].typeveg = moment().format("MMM Do YY")
            $scope.datahole[9].statushole = true
            $http.post('/hole', $scope.datahole[9]).then(function (response) {
              console.log("sent hole 10 veg 2")
            })
          } else if (veg10 == "3") {
            $scope.datahole[9].nameveg = $scope.vegetable[2].namev
            $scope.datahole[9].typeveg = moment().format("MMM Do YY")
            $scope.datahole[9].statushole = true
            $http.post('/hole', $scope.datahole[9]).then(function (response) {
              console.log("sent hole 10 veg 3")
            })
          } else if (veg10 == "4") {
            $scope.datahole[9].nameveg = $scope.vegetable[3].namev
            $scope.datahole[9].typeveg = moment().format("MMM Do YY")
            $scope.datahole[9].statushole = true
            $http.post('/hole', $scope.datahole[9]).then(function (response) {
              console.log("sent hole 10 veg 4")
            })
          }//else
        }
      }//function hole10

      $scope.hole11 = function (veg11) {//////////////////////////////////////////////////hole11
        console.log("OK Hole ------->11")

        if ($scope.totaldatahole[10].statushole === true) {
          console.log("hole 11 put")
          if (veg11 == "1") {
            $scope.datahole[10].nameveg = $scope.vegetable[0].namev
            $scope.datahole[10].typeveg = moment().format("MMM Do YY")
            $scope.datahole[10].statushole = true
            $http.put('/hole/' + $scope.totaldatahole[10]._id, $scope.datahole[10]).then(res => {
              console.log("sent hole 11 veg 1 update")
              $scope.totaldatahole[10].statushole = res.data.status
            })
          } else if (veg11 == "2") {
            $scope.datahole[10].nameveg = $scope.vegetable[1].namev
            $scope.datahole[10].typeveg = moment().format("MMM Do YY")
            $scope.datahole[10].statushole = true
            $http.put('/hole/' + $scope.totaldatahole[10]._id, $scope.datahole[10]).then(res => {
              console.log("sent hole 11 veg 2 update")
              $scope.totaldatahole[10].statushole = res.data.status
            })
          } else if (veg11 == "3") {
            $scope.datahole[10].nameveg = $scope.vegetable[2].namev
            $scope.datahole[10].typeveg = moment().format("MMM Do YY")
            $scope.datahole[10].statushole = true
            $http.put('/hole/' + $scope.totaldatahole[10]._id, $scope.datahole[10]).then(res => {
              console.log("sent hole 11 veg 3 update")
              $scope.totaldatahole[10].statushole = res.data.status
            })
          } else if (veg11 == "4") {
            $scope.datahole[10].nameveg = $scope.vegetable[3].namev
            $scope.datahole[10].typeveg = moment().format("MMM Do YY")
            $scope.datahole[10].statushole = true
            $http.put('/hole/' + $scope.totaldatahole[10]._id, $scope.datahole[10]).then(res => {
              console.log("sent hole 11 veg 4 update")
              $scope.totaldatahole[10].statushole = res.data.status
            })
          }//else
        } else if ($scope.datahole[10].statushole === false) {
          console.log("hole 11 post")
          if (veg11 == "1") {
            $scope.datahole[10].nameveg = $scope.vegetable[0].namev
            $scope.datahole[10].typeveg = moment().format("MMM Do YY")
            $scope.datahole[10].statushole = true
            $http.post('/hole', $scope.datahole[10]).then(function (response) {
              console.log("sent hole 11 veg 1")
            })
          } else if (veg11 == "2") {
            $scope.datahole[10].nameveg = $scope.vegetable[1].namev
            $scope.datahole[10].typeveg = moment().format("MMM Do YY")
            $scope.datahole[10].statushole = true
            $http.post('/hole', $scope.datahole[10]).then(function (response) {
              console.log("sent hole 11 veg 2")
            })
          } else if (veg11 == "3") {
            $scope.datahole[10].nameveg = $scope.vegetable[2].namev
            $scope.datahole[10].typeveg = moment().format("MMM Do YY")
            $scope.datahole[10].statushole = true
            $http.post('/hole', $scope.datahole[10]).then(function (response) {
              console.log("sent hole 11 veg 3")
            })
          } else if (veg11 == "4") {
            $scope.datahole[10].nameveg = $scope.vegetable[3].namev
            $scope.datahole[10].typeveg = moment().format("MMM Do YY")
            $scope.datahole[10].statushole = true
            $http.post('/hole', $scope.datahole[10]).then(function (response) {
              console.log("sent hole 11 veg 4")
            })
          }//else
        }
      }//function hole11

      $scope.hole12 = function (veg12) {//////////////////////////////////////////////////hole12
        console.log("OK Hole ------->12")

        if ($scope.totaldatahole[11].statushole === true) {
          console.log("hole 12 put")
          if (veg12 == "1") {
            $scope.datahole[11].nameveg = $scope.vegetable[0].namev
            $scope.datahole[11].typeveg = moment().format("MMM Do YY")
            $scope.datahole[11].statushole = true
            $http.put('/hole/' + $scope.totaldatahole[11]._id, $scope.datahole[11]).then(res => {
              console.log("sent hole 12 veg 1 update")
              $scope.totaldatahole[11].statushole = res.data.status
            })
          } else if (veg12 == "2") {
            $scope.datahole[11].nameveg = $scope.vegetable[1].namev
            $scope.datahole[11].typeveg = moment().format("MMM Do YY")
            $scope.datahole[11].statushole = true
            $http.put('/hole/' + $scope.totaldatahole[11]._id, $scope.datahole[11]).then(res => {
              console.log("sent hole 12 veg 2 update")
              $scope.totaldatahole[11].statushole = res.data.status
            })
          } else if (veg12 == "3") {
            $scope.datahole[11].nameveg = $scope.vegetable[2].namev
            $scope.datahole[11].typeveg = moment().format("MMM Do YY")
            $scope.datahole[11].statushole = true
            $http.put('/hole/' + $scope.totaldatahole[11]._id, $scope.datahole[11]).then(res => {
              console.log("sent hole 12 veg 3 update")
              $scope.totaldatahole[11].statushole = res.data.status
            })
          } else if (veg12 == "4") {
            $scope.datahole[11].nameveg = $scope.vegetable[3].namev
            $scope.datahole[11].typeveg = moment().format("MMM Do YY")
            $scope.datahole[11].statushole = true
            $http.put('/hole/' + $scope.totaldatahole[11]._id, $scope.datahole[11]).then(res => {
              console.log("sent hole 12 veg 4 update")
              $scope.totaldatahole[11].statushole = res.data.status
            })
          }//else
        } else if ($scope.datahole[11].statushole === false) {
          console.log("hole 12 post")
          if (veg12 == "1") {
            $scope.datahole[11].nameveg = $scope.vegetable[0].namev
            $scope.datahole[11].typeveg = moment().format("MMM Do YY")
            $scope.datahole[11].statushole = true
            $http.post('/hole', $scope.datahole[11]).then(function (response) {
              console.log("sent hole 12 veg 1")
            })
          } else if (veg12 == "2") {
            $scope.datahole[11].nameveg = $scope.vegetable[1].namev
            $scope.datahole[11].typeveg = moment().format("MMM Do YY")
            $scope.datahole[11].statushole = true
            $http.post('/hole', $scope.datahole[11]).then(function (response) {
              console.log("sent hole 12 veg 2")
            })
          } else if (veg12 == "3") {
            $scope.datahole[11].nameveg = $scope.vegetable[2].namev
            $scope.datahole[11].typeveg = moment().format("MMM Do YY")
            $scope.datahole[11].statushole = true
            $http.post('/hole', $scope.datahole[11]).then(function (response) {
              console.log("sent hole 12 veg 3")
            })
          } else if (veg12 == "4") {
            $scope.datahole[11].nameveg = $scope.vegetable[3].namev
            $scope.datahole[11].typeveg = moment().format("MMM Do YY")
            $scope.datahole[11].statushole = true
            $http.post('/hole', $scope.datahole[11]).then(function (response) {
              console.log("sent hole 12 veg 4")
            })
          }//else
        }
      }//function hole12

      $scope.hole13 = function (veg13) {//////////////////////////////////////////////////hole13
        console.log("OK Hole ------->13")

        if ($scope.totaldatahole[12].statushole === true) {
          console.log("hole 13 put")
          if (veg13 == "1") {
            $scope.datahole[12].nameveg = $scope.vegetable[0].namev
            $scope.datahole[12].typeveg = moment().format("MMM Do YY")
            $scope.datahole[12].statushole = true
            $http.put('/hole/' + $scope.totaldatahole[12]._id, $scope.datahole[12]).then(res => {
              console.log("sent hole 13 veg 1 update")
              $scope.totaldatahole[12].statushole = res.data.status
            })
          } else if (veg13 == "2") {
            $scope.datahole[12].nameveg = $scope.vegetable[1].namev
            $scope.datahole[12].typeveg = moment().format("MMM Do YY")
            $scope.datahole[12].statushole = true
            $http.put('/hole/' + $scope.totaldatahole[12]._id, $scope.datahole[12]).then(res => {
              console.log("sent hole 13 veg 2 update")
              $scope.totaldatahole[12].statushole = res.data.status
            })
          } else if (veg13 == "3") {
            $scope.datahole[12].nameveg = $scope.vegetable[2].namev
            $scope.datahole[12].typeveg = moment().format("MMM Do YY")
            $scope.datahole[12].statushole = true
            $http.put('/hole/' + $scope.totaldatahole[12]._id, $scope.datahole[12]).then(res => {
              console.log("sent hole 13 veg 3 update")
              $scope.totaldatahole[12].statushole = res.data.status
            })
          } else if (veg13 == "4") {
            $scope.datahole[12].nameveg = $scope.vegetable[3].namev
            $scope.datahole[12].typeveg = moment().format("MMM Do YY")
            $scope.datahole[12].statushole = true
            $http.put('/hole/' + $scope.totaldatahole[12]._id, $scope.datahole[12]).then(res => {
              console.log("sent hole 13 veg 4 update")
              $scope.totaldatahole[12].statushole = res.data.status
            })
          }//else
        } else if ($scope.datahole[12].statushole === false) {
          console.log("hole 13 post")
          if (veg13 == "1") {
            $scope.datahole[12].nameveg = $scope.vegetable[0].namev
            $scope.datahole[12].typeveg = moment().format("MMM Do YY")
            $scope.datahole[12].statushole = true
            $http.post('/hole', $scope.datahole[12]).then(function (response) {
              console.log("sent hole 13 veg 1")
            })
          } else if (veg13 == "2") {
            $scope.datahole[12].nameveg = $scope.vegetable[1].namev
            $scope.datahole[12].typeveg = moment().format("MMM Do YY")
            $scope.datahole[12].statushole = true
            $http.post('/hole', $scope.datahole[12]).then(function (response) {
              console.log("sent hole 13 veg 2")
            })
          } else if (veg13 == "3") {
            $scope.datahole[12].nameveg = $scope.vegetable[2].namev
            $scope.datahole[12].typeveg = moment().format("MMM Do YY")
            $scope.datahole[12].statushole = true
            $http.post('/hole', $scope.datahole[12]).then(function (response) {
              console.log("sent hole 13 veg 3")
            })
          } else if (veg13 == "4") {
            $scope.datahole[12].nameveg = $scope.vegetable[3].namev
            $scope.datahole[12].typeveg = moment().format("MMM Do YY")
            $scope.datahole[12].statushole = true
            $http.post('/hole', $scope.datahole[12]).then(function (response) {
              console.log("sent hole 13 veg 4")
            })
          }//else
        }
      }//function hole13

      $scope.hole14 = function (veg14) {//////////////////////////////////////////////////hole14
        console.log("OK Hole ------->14")

        if ($scope.totaldatahole[13].statushole === true) {
          console.log("hole 14 put")
          if (veg14 == "1") {
            $scope.datahole[13].nameveg = $scope.vegetable[0].namev
            $scope.datahole[13].typeveg = moment().format("MMM Do YY")
            $scope.datahole[13].statushole = true
            $http.put('/hole/' + $scope.totaldatahole[13]._id, $scope.datahole[13]).then(res => {
              console.log("sent hole 14 veg 1 update")
              $scope.totaldatahole[13].statushole = res.data.status
            })
          } else if (veg14 == "2") {
            $scope.datahole[13].nameveg = $scope.vegetable[1].namev
            $scope.datahole[13].typeveg = moment().format("MMM Do YY")
            $scope.datahole[13].statushole = true
            $http.put('/hole/' + $scope.totaldatahole[13]._id, $scope.datahole[13]).then(res => {
              console.log("sent hole 14 veg 2 update")
              $scope.totaldatahole[13].statushole = res.data.status
            })
          } else if (veg14 == "3") {
            $scope.datahole[13].nameveg = $scope.vegetable[2].namev
            $scope.datahole[13].typeveg = moment().format("MMM Do YY")
            $scope.datahole[13].statushole = true
            $http.put('/hole/' + $scope.totaldatahole[13]._id, $scope.datahole[13]).then(res => {
              console.log("sent hole 14 veg 3 update")
              $scope.totaldatahole[13].statushole = res.data.status
            })
          } else if (veg14 == "4") {
            $scope.datahole[13].nameveg = $scope.vegetable[3].namev
            $scope.datahole[13].typeveg = moment().format("MMM Do YY")
            $scope.datahole[13].statushole = true
            $http.put('/hole/' + $scope.totaldatahole[13]._id, $scope.datahole[13]).then(res => {
              console.log("sent hole 14 veg 4 update")
              $scope.totaldatahole[13].statushole = res.data.status
            })
          }//else
        } else if ($scope.datahole[13].statushole === false) {
          console.log("hole 14 post")
          if (veg14 == "1") {
            $scope.datahole[13].nameveg = $scope.vegetable[0].namev
            $scope.datahole[13].typeveg = moment().format("MMM Do YY")
            $scope.datahole[13].statushole = true
            $http.post('/hole', $scope.datahole[13]).then(function (response) {
              console.log("sent hole 14 veg 1")
            })
          } else if (veg14 == "2") {
            $scope.datahole[13].nameveg = $scope.vegetable[1].namev
            $scope.datahole[13].typeveg = moment().format("MMM Do YY")
            $scope.datahole[13].statushole = true
            $http.post('/hole', $scope.datahole[13]).then(function (response) {
              console.log("sent hole 14 veg 2")
            })
          } else if (veg14 == "3") {
            $scope.datahole[13].nameveg = $scope.vegetable[2].namev
            $scope.datahole[13].typeveg = moment().format("MMM Do YY")
            $scope.datahole[13].statushole = true
            $http.post('/hole', $scope.datahole[13]).then(function (response) {
              console.log("sent hole 14 veg 3")
            })
          } else if (veg14 == "4") {
            $scope.datahole[13].nameveg = $scope.vegetable[3].namev
            $scope.datahole[13].typeveg = moment().format("MMM Do YY")
            $scope.datahole[13].statushole = true
            $http.post('/hole', $scope.datahole[13]).then(function (response) {
              console.log("sent hole 14 veg 4")
            })
          }//else
        }
      }//function hole14

      $scope.hole15 = function (veg15) {//////////////////////////////////////////////////hole15
        console.log("OK Hole ------->15")

        if ($scope.totaldatahole[14].statushole === true) {
          console.log("hole 15 put")
          if (veg15 == "1") {
            $scope.datahole[14].nameveg = $scope.vegetable[0].namev
            $scope.datahole[14].typeveg = moment().format("MMM Do YY")
            $scope.datahole[14].statushole = true
            $http.put('/hole/' + $scope.totaldatahole[14]._id, $scope.datahole[14]).then(res => {
              console.log("sent hole 15 veg 1 update")
              $scope.totaldatahole[14].statushole = res.data.status
            })
          } else if (veg15 == "2") {
            $scope.datahole[14].nameveg = $scope.vegetable[1].namev
            $scope.datahole[14].typeveg = moment().format("MMM Do YY")
            $scope.datahole[14].statushole = true
            $http.put('/hole/' + $scope.totaldatahole[14]._id, $scope.datahole[14]).then(res => {
              console.log("sent hole 15 veg 2 update")
              $scope.totaldatahole[14].statushole = res.data.status
            })
          } else if (veg15 == "3") {
            $scope.datahole[14].nameveg = $scope.vegetable[2].namev
            $scope.datahole[14].typeveg = moment().format("MMM Do YY")
            $scope.datahole[14].statushole = true
            $http.put('/hole/' + $scope.totaldatahole[14]._id, $scope.datahole[14]).then(res => {
              console.log("sent hole 15 veg 3 update")
              $scope.totaldatahole[14].statushole = res.data.status
            })
          } else if (veg15 == "4") {
            $scope.datahole[14].nameveg = $scope.vegetable[3].namev
            $scope.datahole[14].typeveg = moment().format("MMM Do YY")
            $scope.datahole[14].statushole = true
            $http.put('/hole/' + $scope.totaldatahole[14]._id, $scope.datahole[14]).then(res => {
              console.log("sent hole 15 veg 4 update")
              $scope.totaldatahole[14].statushole = res.data.status
            })
          }//else
        } else if ($scope.datahole[14].statushole === false) {
          console.log("hole 15 post")
          if (veg15 == "1") {
            $scope.datahole[14].nameveg = $scope.vegetable[0].namev
            $scope.datahole[14].typeveg = moment().format("MMM Do YY")
            $scope.datahole[14].statushole = true
            $http.post('/hole', $scope.datahole[14]).then(function (response) {
              console.log("sent hole 15 veg 1")
            })
          } else if (veg15 == "2") {
            $scope.datahole[14].nameveg = $scope.vegetable[1].namev
            $scope.datahole[14].typeveg = moment().format("MMM Do YY")
            $scope.datahole[14].statushole = true
            $http.post('/hole', $scope.datahole[14]).then(function (response) {
              console.log("sent hole 15 veg 2")
            })
          } else if (veg15 == "3") {
            $scope.datahole[14].nameveg = $scope.vegetable[2].namev
            $scope.datahole[14].typeveg = moment().format("MMM Do YY")
            $scope.datahole[14].statushole = true
            $http.post('/hole', $scope.datahole[14]).then(function (response) {
              console.log("sent hole 15 veg 3")
            })
          } else if (veg15 == "4") {
            $scope.datahole[14].nameveg = $scope.vegetable[3].namev
            $scope.datahole[14].typeveg = moment().format("MMM Do YY")
            $scope.datahole[14].statushole = true
            $http.post('/hole', $scope.datahole[14]).then(function (response) {
              console.log("sent hole 15 veg 4")
            })
          }//else
        }
      }//function hole15

      $scope.hole15 = function (veg15) {//////////////////////////////////////////////////hole15
        console.log("OK Hole ------->15")

        if ($scope.totaldatahole[14].statushole === true) {
          console.log("hole 15 put")
          if (veg15 == "1") {
            $scope.datahole[14].nameveg = $scope.vegetable[0].namev
            $scope.datahole[14].typeveg = moment().format("MMM Do YY")
            $scope.datahole[14].statushole = true
            $http.put('/hole/' + $scope.totaldatahole[14]._id, $scope.datahole[14]).then(res => {
              console.log("sent hole 15 veg 1 update")
              $scope.totaldatahole[14].statushole = res.data.status
            })
          } else if (veg15 == "2") {
            $scope.datahole[14].nameveg = $scope.vegetable[1].namev
            $scope.datahole[14].typeveg = moment().format("MMM Do YY")
            $scope.datahole[14].statushole = true
            $http.put('/hole/' + $scope.totaldatahole[14]._id, $scope.datahole[14]).then(res => {
              console.log("sent hole 15 veg 2 update")
              $scope.totaldatahole[14].statushole = res.data.status
            })
          } else if (veg15 == "3") {
            $scope.datahole[14].nameveg = $scope.vegetable[2].namev
            $scope.datahole[14].typeveg = moment().format("MMM Do YY")
            $scope.datahole[14].statushole = true
            $http.put('/hole/' + $scope.totaldatahole[14]._id, $scope.datahole[14]).then(res => {
              console.log("sent hole 15 veg 3 update")
              $scope.totaldatahole[14].statushole = res.data.status
            })
          } else if (veg15 == "4") {
            $scope.datahole[14].nameveg = $scope.vegetable[3].namev
            $scope.datahole[14].typeveg = moment().format("MMM Do YY")
            $scope.datahole[14].statushole = true
            $http.put('/hole/' + $scope.totaldatahole[14]._id, $scope.datahole[14]).then(res => {
              console.log("sent hole 15 veg 4 update")
              $scope.totaldatahole[14].statushole = res.data.status
            })
          }//else
        } else if ($scope.datahole[14].statushole === false) {
          console.log("hole 15 post")
          if (veg15 == "1") {
            $scope.datahole[14].nameveg = $scope.vegetable[0].namev
            $scope.datahole[14].typeveg = moment().format("MMM Do YY")
            $scope.datahole[14].statushole = true
            $http.post('/hole', $scope.datahole[14]).then(function (response) {
              console.log("sent hole 15 veg 1")
            })
          } else if (veg15 == "2") {
            $scope.datahole[14].nameveg = $scope.vegetable[1].namev
            $scope.datahole[14].typeveg = moment().format("MMM Do YY")
            $scope.datahole[14].statushole = true
            $http.post('/hole', $scope.datahole[14]).then(function (response) {
              console.log("sent hole 15 veg 2")
            })
          } else if (veg15 == "3") {
            $scope.datahole[14].nameveg = $scope.vegetable[2].namev
            $scope.datahole[14].typeveg = moment().format("MMM Do YY")
            $scope.datahole[14].statushole = true
            $http.post('/hole', $scope.datahole[14]).then(function (response) {
              console.log("sent hole 15 veg 3")
            })
          } else if (veg15 == "4") {
            $scope.datahole[14].nameveg = $scope.vegetable[3].namev
            $scope.datahole[14].typeveg = moment().format("MMM Do YY")
            $scope.datahole[14].statushole = true
            $http.post('/hole', $scope.datahole[14]).then(function (response) {
              console.log("sent hole 15 veg 4")
            })
          }//else
        }
      }//function hole15

      $scope.hole16 = function (veg16) {//////////////////////////////////////////////////hole16
        console.log("OK Hole ------->16")

        if ($scope.totaldatahole[15].statushole === true) {
          console.log("hole 16 put")
          if (veg16 == "1") {
            $scope.datahole[15].nameveg = $scope.vegetable[0].namev
            $scope.datahole[15].typeveg = moment().format("MMM Do YY")
            $scope.datahole[15].statushole = true
            $http.put('/hole/' + $scope.totaldatahole[15]._id, $scope.datahole[15]).then(res => {
              console.log("sent hole 16 veg 1 update")
              $scope.totaldatahole[15].statushole = res.data.status
            })
          } else if (veg16 == "2") {
            $scope.datahole[15].nameveg = $scope.vegetable[1].namev
            $scope.datahole[15].typeveg = moment().format("MMM Do YY")
            $scope.datahole[15].statushole = true
            $http.put('/hole/' + $scope.totaldatahole[15]._id, $scope.datahole[15]).then(res => {
              console.log("sent hole 16 veg 2 update")
              $scope.totaldatahole[15].statushole = res.data.status
            })
          } else if (veg16 == "3") {
            $scope.datahole[15].nameveg = $scope.vegetable[2].namev
            $scope.datahole[15].typeveg = moment().format("MMM Do YY")
            $scope.datahole[15].statushole = true
            $http.put('/hole/' + $scope.totaldatahole[15]._id, $scope.datahole[15]).then(res => {
              console.log("sent hole 16 veg 3 update")
              $scope.totaldatahole[15].statushole = res.data.status
            })
          } else if (veg16 == "4") {
            $scope.datahole[15].nameveg = $scope.vegetable[3].namev
            $scope.datahole[15].typeveg = moment().format("MMM Do YY")
            $scope.datahole[15].statushole = true
            $http.put('/hole/' + $scope.totaldatahole[15]._id, $scope.datahole[15]).then(res => {
              console.log("sent hole 16 veg 4 update")
              $scope.totaldatahole[15].statushole = res.data.status
            })
          }//else
        } else if ($scope.datahole[15].statushole === false) {
          console.log("hole 16 post")
          if (veg16 == "1") {
            $scope.datahole[15].nameveg = $scope.vegetable[0].namev
            $scope.datahole[15].typeveg = moment().format("MMM Do YY")
            $scope.datahole[15].statushole = true
            $http.post('/hole', $scope.datahole[15]).then(function (response) {
              console.log("sent hole 16 veg 1")
            })
          } else if (veg16 == "2") {
            $scope.datahole[15].nameveg = $scope.vegetable[1].namev
            $scope.datahole[15].typeveg = moment().format("MMM Do YY")
            $scope.datahole[15].statushole = true
            $http.post('/hole', $scope.datahole[15]).then(function (response) {
              console.log("sent hole 16 veg 2")
            })
          } else if (veg16 == "3") {
            $scope.datahole[15].nameveg = $scope.vegetable[2].namev
            $scope.datahole[15].typeveg = moment().format("MMM Do YY")
            $scope.datahole[15].statushole = true
            $http.post('/hole', $scope.datahole[15]).then(function (response) {
              console.log("sent hole 16 veg 3")
            })
          } else if (veg16 == "4") {
            $scope.datahole[15].nameveg = $scope.vegetable[3].namev
            $scope.datahole[15].typeveg = moment().format("MMM Do YY")
            $scope.datahole[15].statushole = true
            $http.post('/hole', $scope.datahole[15]).then(function (response) {
              console.log("sent hole 16 veg 4")
            })
          }//else
        }
      }//function hole16

      $scope.hole17 = function (veg17) {//////////////////////////////////////////////////hole17
        console.log("OK Hole ------->17")

        if ($scope.totaldatahole[16].statushole === true) {
          console.log("hole 17 put")
          if (veg17 == "1") {
            $scope.datahole[16].nameveg = $scope.vegetable[0].namev
            $scope.datahole[16].typeveg = moment().format("MMM Do YY")
            $scope.datahole[16].statushole = true
            $http.put('/hole/' + $scope.totaldatahole[16]._id, $scope.datahole[16]).then(res => {
              console.log("sent hole 17 veg 1 update")
              $scope.totaldatahole[16].statushole = res.data.status
            })
          } else if (veg17 == "2") {
            $scope.datahole[16].nameveg = $scope.vegetable[1].namev
            $scope.datahole[16].typeveg = moment().format("MMM Do YY")
            $scope.datahole[16].statushole = true
            $http.put('/hole/' + $scope.totaldatahole[16]._id, $scope.datahole[16]).then(res => {
              console.log("sent hole 17 veg 2 update")
              $scope.totaldatahole[16].statushole = res.data.status
            })
          } else if (veg17 == "3") {
            $scope.datahole[16].nameveg = $scope.vegetable[2].namev
            $scope.datahole[16].typeveg = moment().format("MMM Do YY")
            $scope.datahole[16].statushole = true
            $http.put('/hole/' + $scope.totaldatahole[16]._id, $scope.datahole[16]).then(res => {
              console.log("sent hole 17 veg 3 update")
              $scope.totaldatahole[16].statushole = res.data.status
            })
          } else if (veg17 == "4") {
            $scope.datahole[16].nameveg = $scope.vegetable[3].namev
            $scope.datahole[16].typeveg = moment().format("MMM Do YY")
            $scope.datahole[16].statushole = true
            $http.put('/hole/' + $scope.totaldatahole[16]._id, $scope.datahole[16]).then(res => {
              console.log("sent hole 17 veg 4 update")
              $scope.totaldatahole[16].statushole = res.data.status
            })
          }//else
        } else if ($scope.datahole[16].statushole === false) {
          console.log("hole 17 post")
          if (veg17 == "1") {
            $scope.datahole[16].nameveg = $scope.vegetable[0].namev
            $scope.datahole[16].typeveg = moment().format("MMM Do YY")
            $scope.datahole[16].statushole = true
            $http.post('/hole', $scope.datahole[16]).then(function (response) {
              console.log("sent hole 17 veg 1")
            })
          } else if (veg17 == "2") {
            $scope.datahole[16].nameveg = $scope.vegetable[1].namev
            $scope.datahole[16].typeveg = moment().format("MMM Do YY")
            $scope.datahole[16].statushole = true
            $http.post('/hole', $scope.datahole[16]).then(function (response) {
              console.log("sent hole 17 veg 2")
            })
          } else if (veg17 == "3") {
            $scope.datahole[16].nameveg = $scope.vegetable[2].namev
            $scope.datahole[16].typeveg = moment().format("MMM Do YY")
            $scope.datahole[16].statushole = true
            $http.post('/hole', $scope.datahole[16]).then(function (response) {
              console.log("sent hole 17 veg 3")
            })
          } else if (veg17 == "4") {
            $scope.datahole[16].nameveg = $scope.vegetable[3].namev
            $scope.datahole[16].typeveg = moment().format("MMM Do YY")
            $scope.datahole[16].statushole = true
            $http.post('/hole', $scope.datahole[16]).then(function (response) {
              console.log("sent hole 17 veg 4")
            })
          }//else
        }
      }//function hole17

      $scope.hole18 = function (veg18) {//////////////////////////////////////////////////hole18
        console.log("OK Hole ------->18")

        if ($scope.totaldatahole[17].statushole === true) {
          console.log("hole 18 put")
          if (veg18 == "1") {
            $scope.datahole[17].nameveg = $scope.vegetable[0].namev
            $scope.datahole[17].typeveg = moment().format("MMM Do YY")
            $scope.datahole[17].statushole = true
            $http.put('/hole/' + $scope.totaldatahole[17]._id, $scope.datahole[17]).then(res => {
              console.log("sent hole 18 veg 1 update")
              $scope.totaldatahole[17].statushole = res.data.status
            })
          } else if (veg18 == "2") {
            $scope.datahole[17].nameveg = $scope.vegetable[1].namev
            $scope.datahole[17].typeveg = moment().format("MMM Do YY")
            $scope.datahole[17].statushole = true
            $http.put('/hole/' + $scope.totaldatahole[17]._id, $scope.datahole[17]).then(res => {
              console.log("sent hole 18 veg 2 update")
              $scope.totaldatahole[17].statushole = res.data.status
            })
          } else if (veg18 == "3") {
            $scope.datahole[17].nameveg = $scope.vegetable[2].namev
            $scope.datahole[17].typeveg = moment().format("MMM Do YY")
            $scope.datahole[17].statushole = true
            $http.put('/hole/' + $scope.totaldatahole[17]._id, $scope.datahole[17]).then(res => {
              console.log("sent hole 18 veg 3 update")
              $scope.totaldatahole[17].statushole = res.data.status
            })
          } else if (veg18 == "4") {
            $scope.datahole[17].nameveg = $scope.vegetable[3].namev
            $scope.datahole[17].typeveg = moment().format("MMM Do YY")
            $scope.datahole[17].statushole = true
            $http.put('/hole/' + $scope.totaldatahole[17]._id, $scope.datahole[17]).then(res => {
              console.log("sent hole 18 veg 4 update")
              $scope.totaldatahole[17].statushole = res.data.status
            })
          }//else
        } else if ($scope.datahole[17].statushole === false) {
          console.log("hole 18 post")
          if (veg18 == "1") {
            $scope.datahole[17].nameveg = $scope.vegetable[0].namev
            $scope.datahole[17].typeveg = moment().format("MMM Do YY")
            $scope.datahole[17].statushole = true
            $http.post('/hole', $scope.datahole[17]).then(function (response) {
              console.log("sent hole 18 veg 1")
            })
          } else if (veg18 == "2") {
            $scope.datahole[17].nameveg = $scope.vegetable[1].namev
            $scope.datahole[17].typeveg = moment().format("MMM Do YY")
            $scope.datahole[17].statushole = true
            $http.post('/hole', $scope.datahole[17]).then(function (response) {
              console.log("sent hole 18 veg 2")
            })
          } else if (veg18 == "3") {
            $scope.datahole[17].nameveg = $scope.vegetable[2].namev
            $scope.datahole[17].typeveg = moment().format("MMM Do YY")
            $scope.datahole[17].statushole = true
            $http.post('/hole', $scope.datahole[17]).then(function (response) {
              console.log("sent hole 18 veg 3")
            })
          } else if (veg18 == "4") {
            $scope.datahole[17].nameveg = $scope.vegetable[3].namev
            $scope.datahole[17].typeveg = moment().format("MMM Do YY")
            $scope.datahole[17].statushole = true
            $http.post('/hole', $scope.datahole[17]).then(function (response) {
              console.log("sent hole 18 veg 4")
            })
          }//else
        }
      }//function hole18

      $scope.hole19 = function (veg19) {//////////////////////////////////////////////////hole19
        console.log("OK Hole ------->19")

        if ($scope.totaldatahole[18].statushole === true) {
          console.log("hole 19 put")
          if (veg19 == "1") {
            $scope.datahole[18].nameveg = $scope.vegetable[0].namev
            $scope.datahole[18].typeveg = moment().format("MMM Do YY")
            $scope.datahole[18].statushole = true
            $http.put('/hole/' + $scope.totaldatahole[18]._id, $scope.datahole[18]).then(res => {
              console.log("sent hole 19 veg 1 update")
              $scope.totaldatahole[18].statushole = res.data.status
            })
          } else if (veg19 == "2") {
            $scope.datahole[18].nameveg = $scope.vegetable[1].namev
            $scope.datahole[18].typeveg = moment().format("MMM Do YY")
            $scope.datahole[18].statushole = true
            $http.put('/hole/' + $scope.totaldatahole[18]._id, $scope.datahole[18]).then(res => {
              console.log("sent hole 19 veg 2 update")
              $scope.totaldatahole[18].statushole = res.data.status
            })
          } else if (veg19 == "3") {
            $scope.datahole[18].nameveg = $scope.vegetable[2].namev
            $scope.datahole[18].typeveg = moment().format("MMM Do YY")
            $scope.datahole[18].statushole = true
            $http.put('/hole/' + $scope.totaldatahole[18]._id, $scope.datahole[18]).then(res => {
              console.log("sent hole 19 veg 3 update")
              $scope.totaldatahole[18].statushole = res.data.status
            })
          } else if (veg19 == "4") {
            $scope.datahole[18].nameveg = $scope.vegetable[3].namev
            $scope.datahole[18].typeveg = moment().format("MMM Do YY")
            $scope.datahole[18].statushole = true
            $http.put('/hole/' + $scope.totaldatahole[18]._id, $scope.datahole[18]).then(res => {
              console.log("sent hole 19 veg 4 update")
              $scope.totaldatahole[18].statushole = res.data.status
            })
          }//else
        } else if ($scope.datahole[18].statushole === false) {
          console.log("hole 19 post")
          if (veg19 == "1") {
            $scope.datahole[18].nameveg = $scope.vegetable[0].namev
            $scope.datahole[18].typeveg = moment().format("MMM Do YY")
            $scope.datahole[18].statushole = true
            $http.post('/hole', $scope.datahole[18]).then(function (response) {
              console.log("sent hole 19 veg 1")
            })
          } else if (veg19 == "2") {
            $scope.datahole[18].nameveg = $scope.vegetable[1].namev
            $scope.datahole[18].typeveg = moment().format("MMM Do YY")
            $scope.datahole[18].statushole = true
            $http.post('/hole', $scope.datahole[18]).then(function (response) {
              console.log("sent hole 19 veg 2")
            })
          } else if (veg19 == "3") {
            $scope.datahole[18].nameveg = $scope.vegetable[2].namev
            $scope.datahole[18].typeveg = moment().format("MMM Do YY")
            $scope.datahole[18].statushole = true
            $http.post('/hole', $scope.datahole[18]).then(function (response) {
              console.log("sent hole 19 veg 3")
            })
          } else if (veg19 == "4") {
            $scope.datahole[18].nameveg = $scope.vegetable[3].namev
            $scope.datahole[18].typeveg = moment().format("MMM Do YY")
            $scope.datahole[18].statushole = true
            $http.post('/hole', $scope.datahole[18]).then(function (response) {
              console.log("sent hole 19 veg 4")
            })
          }//else
        }
      }//function hole19

      $scope.hole20 = function (veg20) {//////////////////////////////////////////////////hole20
        console.log("OK Hole ------->20")

        if ($scope.totaldatahole[19].statushole === true) {
          console.log("hole 20 put")
          if (veg20 == "1") {
            $scope.datahole[19].nameveg = $scope.vegetable[0].namev
            $scope.datahole[19].typeveg = moment().format("MMM Do YY")
            $scope.datahole[19].statushole = true
            $http.put('/hole/' + $scope.totaldatahole[19]._id, $scope.datahole[19]).then(res => {
              console.log("sent hole 20 veg 1 update")
              $scope.totaldatahole[19].statushole = res.data.status
            })
          } else if (veg20 == "2") {
            $scope.datahole[19].nameveg = $scope.vegetable[1].namev
            $scope.datahole[19].typeveg = moment().format("MMM Do YY")
            $scope.datahole[19].statushole = true
            $http.put('/hole/' + $scope.totaldatahole[19]._id, $scope.datahole[19]).then(res => {
              console.log("sent hole 20 veg 2 update")
              $scope.totaldatahole[19].statushole = res.data.status
            })
          } else if (veg20 == "3") {
            $scope.datahole[19].nameveg = $scope.vegetable[2].namev
            $scope.datahole[19].typeveg = moment().format("MMM Do YY")
            $scope.datahole[19].statushole = true
            $http.put('/hole/' + $scope.totaldatahole[19]._id, $scope.datahole[19]).then(res => {
              console.log("sent hole 20 veg 3 update")
              $scope.totaldatahole[19].statushole = res.data.status
            })
          } else if (veg20 == "4") {
            $scope.datahole[19].nameveg = $scope.vegetable[3].namev
            $scope.datahole[19].typeveg = moment().format("MMM Do YY")
            $scope.datahole[19].statushole = true
            $http.put('/hole/' + $scope.totaldatahole[19]._id, $scope.datahole[19]).then(res => {
              console.log("sent hole 20 veg 4 update")
              $scope.totaldatahole[19].statushole = res.data.status
            })
          }//else
        } else if ($scope.datahole[19].statushole === false) {
          console.log("hole 20 post")
          if (veg20 == "1") {
            $scope.datahole[19].nameveg = $scope.vegetable[0].namev
            $scope.datahole[19].typeveg = moment().format("MMM Do YY")
            $scope.datahole[19].statushole = true
            $http.post('/hole', $scope.datahole[19]).then(function (response) {
              console.log("sent hole 20 veg 1")
            })
          } else if (veg20 == "2") {
            $scope.datahole[19].nameveg = $scope.vegetable[1].namev
            $scope.datahole[19].typeveg = moment().format("MMM Do YY")
            $scope.datahole[19].statushole = true
            $http.post('/hole', $scope.datahole[19]).then(function (response) {
              console.log("sent hole 20 veg 2")
            })
          } else if (veg20 == "3") {
            $scope.datahole[19].nameveg = $scope.vegetable[2].namev
            $scope.datahole[19].typeveg = moment().format("MMM Do YY")
            $scope.datahole[19].statushole = true
            $http.post('/hole', $scope.datahole[19]).then(function (response) {
              console.log("sent hole 20 veg 3")
            })
          } else if (veg20 == "4") {
            $scope.datahole[19].nameveg = $scope.vegetable[3].namev
            $scope.datahole[19].typeveg = moment().format("MMM Do YY")
            $scope.datahole[19].statushole = true
            $http.post('/hole', $scope.datahole[19]).then(function (response) {
              console.log("sent hole 20 veg 4")
            })
          }//else
        }
      }//function hole20

      $scope.hole21 = function (veg21) {//////////////////////////////////////////////////hole21
        console.log("OK Hole ------->21")

        if ($scope.totaldatahole[20].statushole === true) {
          console.log("hole 21 put")
          if (veg21 == "1") {
            $scope.datahole[20].nameveg = $scope.vegetable[0].namev
            $scope.datahole[20].typeveg = moment().format("MMM Do YY")
            $scope.datahole[20].statushole = true
            $http.put('/hole/' + $scope.totaldatahole[20]._id, $scope.datahole[20]).then(res => {
              console.log("sent hole 21 veg 1 update")
              $scope.totaldatahole[20].statushole = res.data.status
            })
          } else if (veg21 == "2") {
            $scope.datahole[20].nameveg = $scope.vegetable[1].namev
            $scope.datahole[20].typeveg = moment().format("MMM Do YY")
            $scope.datahole[20].statushole = true
            $http.put('/hole/' + $scope.totaldatahole[20]._id, $scope.datahole[20]).then(res => {
              console.log("sent hole 21 veg 2 update")
              $scope.totaldatahole[20].statushole = res.data.status
            })
          } else if (veg21 == "3") {
            $scope.datahole[20].nameveg = $scope.vegetable[2].namev
            $scope.datahole[20].typeveg = moment().format("MMM Do YY")
            $scope.datahole[20].statushole = true
            $http.put('/hole/' + $scope.totaldatahole[20]._id, $scope.datahole[20]).then(res => {
              console.log("sent hole 21 veg 3 update")
              $scope.totaldatahole[20].statushole = res.data.status
            })
          } else if (veg21 == "4") {
            $scope.datahole[20].nameveg = $scope.vegetable[3].namev
            $scope.datahole[20].typeveg = moment().format("MMM Do YY")
            $scope.datahole[20].statushole = true
            $http.put('/hole/' + $scope.totaldatahole[20]._id, $scope.datahole[20]).then(res => {
              console.log("sent hole 21 veg 4 update")
              $scope.totaldatahole[20].statushole = res.data.status
            })
          }//else
        } else if ($scope.datahole[20].statushole === false) {
          console.log("hole 21 post")
          if (veg21 == "1") {
            $scope.datahole[20].nameveg = $scope.vegetable[0].namev
            $scope.datahole[20].typeveg = moment().format("MMM Do YY")
            $scope.datahole[20].statushole = true
            $http.post('/hole', $scope.datahole[20]).then(function (response) {
              console.log("sent hole 21 veg 1")
            })
          } else if (veg21 == "2") {
            $scope.datahole[20].nameveg = $scope.vegetable[1].namev
            $scope.datahole[20].typeveg = moment().format("MMM Do YY")
            $scope.datahole[20].statushole = true
            $http.post('/hole', $scope.datahole[20]).then(function (response) {
              console.log("sent hole 21 veg 2")
            })
          } else if (veg21 == "3") {
            $scope.datahole[20].nameveg = $scope.vegetable[2].namev
            $scope.datahole[20].typeveg = moment().format("MMM Do YY")
            $scope.datahole[20].statushole = true
            $http.post('/hole', $scope.datahole[20]).then(function (response) {
              console.log("sent hole 21 veg 3")
            })
          } else if (veg21 == "4") {
            $scope.datahole[20].nameveg = $scope.vegetable[3].namev
            $scope.datahole[20].typeveg = moment().format("MMM Do YY")
            $scope.datahole[20].statushole = true
            $http.post('/hole', $scope.datahole[20]).then(function (response) {
              console.log("sent hole 21 veg 4")
            })
          }//else
        }
      }//function hole21

      $scope.hole22 = function (veg22) {//////////////////////////////////////////////////hole22
        console.log("OK Hole ------->22")

        if ($scope.totaldatahole[21].statushole === true) {
          console.log("hole 22 put")
          if (veg22 == "1") {
            $scope.datahole[21].nameveg = $scope.vegetable[0].namev
            $scope.datahole[21].typeveg = moment().format("MMM Do YY")
            $scope.datahole[21].statushole = true
            $http.put('/hole/' + $scope.totaldatahole[21]._id, $scope.datahole[21]).then(res => {
              console.log("sent hole 22 veg 1 update")
              $scope.totaldatahole[21].statushole = res.data.status
            })
          } else if (veg22 == "2") {
            $scope.datahole[21].nameveg = $scope.vegetable[1].namev
            $scope.datahole[21].typeveg = moment().format("MMM Do YY")
            $scope.datahole[21].statushole = true
            $http.put('/hole/' + $scope.totaldatahole[21]._id, $scope.datahole[21]).then(res => {
              console.log("sent hole 22 veg 2 update")
              $scope.totaldatahole[21].statushole = res.data.status
            })
          } else if (veg22 == "3") {
            $scope.datahole[21].nameveg = $scope.vegetable[2].namev
            $scope.datahole[21].typeveg = moment().format("MMM Do YY")
            $scope.datahole[21].statushole = true
            $http.put('/hole/' + $scope.totaldatahole[21]._id, $scope.datahole[21]).then(res => {
              console.log("sent hole 22 veg 3 update")
              $scope.totaldatahole[21].statushole = res.data.status
            })
          } else if (veg22 == "4") {
            $scope.datahole[21].nameveg = $scope.vegetable[3].namev
            $scope.datahole[21].typeveg = moment().format("MMM Do YY")
            $scope.datahole[21].statushole = true
            $http.put('/hole/' + $scope.totaldatahole[21]._id, $scope.datahole[21]).then(res => {
              console.log("sent hole 22 veg 4 update")
              $scope.totaldatahole[21].statushole = res.data.status
            })
          }//else
        } else if ($scope.datahole[21].statushole === false) {
          console.log("hole 22 post")
          if (veg22 == "1") {
            $scope.datahole[21].nameveg = $scope.vegetable[0].namev
            $scope.datahole[21].typeveg = moment().format("MMM Do YY")
            $scope.datahole[21].statushole = true
            $http.post('/hole', $scope.datahole[21]).then(function (response) {
              console.log("sent hole 22 veg 1")
            })
          } else if (veg22 == "2") {
            $scope.datahole[21].nameveg = $scope.vegetable[1].namev
            $scope.datahole[21].typeveg = moment().format("MMM Do YY")
            $scope.datahole[21].statushole = true
            $http.post('/hole', $scope.datahole[21]).then(function (response) {
              console.log("sent hole 22 veg 2")
            })
          } else if (veg22 == "3") {
            $scope.datahole[21].nameveg = $scope.vegetable[2].namev
            $scope.datahole[21].typeveg = moment().format("MMM Do YY")
            $scope.datahole[21].statushole = true
            $http.post('/hole', $scope.datahole[21]).then(function (response) {
              console.log("sent hole 22 veg 3")
            })
          } else if (veg22 == "4") {
            $scope.datahole[21].nameveg = $scope.vegetable[3].namev
            $scope.datahole[21].typeveg = moment().format("MMM Do YY")
            $scope.datahole[21].statushole = true
            $http.post('/hole', $scope.datahole[21]).then(function (response) {
              console.log("sent hole 22 veg 4")
            })
          }//else
        }
      }//function hole22

      $scope.hole23 = function (veg23) {//////////////////////////////////////////////////hole23
        console.log("OK Hole ------->23")

        if ($scope.totaldatahole[22].statushole === true) {
          console.log("hole 23 put")
          if (veg23 == "1") {
            $scope.datahole[22].nameveg = $scope.vegetable[0].namev
            $scope.datahole[22].typeveg = moment().format("MMM Do YY")
            $scope.datahole[22].statushole = true
            $http.put('/hole/' + $scope.totaldatahole[22]._id, $scope.datahole[22]).then(res => {
              console.log("sent hole 23 veg 1 update")
              $scope.totaldatahole[22].statushole = res.data.status
            })
          } else if (veg23 == "2") {
            $scope.datahole[22].nameveg = $scope.vegetable[1].namev
            $scope.datahole[22].typeveg = moment().format("MMM Do YY")
            $scope.datahole[22].statushole = true
            $http.put('/hole/' + $scope.totaldatahole[22]._id, $scope.datahole[22]).then(res => {
              console.log("sent hole 23 veg 2 update")
              $scope.totaldatahole[22].statushole = res.data.status
            })
          } else if (veg23 == "3") {
            $scope.datahole[22].nameveg = $scope.vegetable[2].namev
            $scope.datahole[22].typeveg = moment().format("MMM Do YY")
            $scope.datahole[22].statushole = true
            $http.put('/hole/' + $scope.totaldatahole[22]._id, $scope.datahole[22]).then(res => {
              console.log("sent hole 23 veg 3 update")
              $scope.totaldatahole[22].statushole = res.data.status
            })
          } else if (veg23 == "4") {
            $scope.datahole[22].nameveg = $scope.vegetable[3].namev
            $scope.datahole[22].typeveg = moment().format("MMM Do YY")
            $scope.datahole[22].statushole = true
            $http.put('/hole/' + $scope.totaldatahole[22]._id, $scope.datahole[22]).then(res => {
              console.log("sent hole 23 veg 4 update")
              $scope.totaldatahole[22].statushole = res.data.status
            })
          }//else
        } else if ($scope.datahole[22].statushole === false) {
          console.log("hole 23 post")
          if (veg23 == "1") {
            $scope.datahole[22].nameveg = $scope.vegetable[0].namev
            $scope.datahole[22].typeveg = moment().format("MMM Do YY")
            $scope.datahole[22].statushole = true
            $http.post('/hole', $scope.datahole[22]).then(function (response) {
              console.log("sent hole 23 veg 1")
            })
          } else if (veg23 == "2") {
            $scope.datahole[22].nameveg = $scope.vegetable[1].namev
            $scope.datahole[22].typeveg = moment().format("MMM Do YY")
            $scope.datahole[22].statushole = true
            $http.post('/hole', $scope.datahole[22]).then(function (response) {
              console.log("sent hole 23 veg 2")
            })
          } else if (veg23 == "3") {
            $scope.datahole[22].nameveg = $scope.vegetable[2].namev
            $scope.datahole[22].typeveg = moment().format("MMM Do YY")
            $scope.datahole[22].statushole = true
            $http.post('/hole', $scope.datahole[22]).then(function (response) {
              console.log("sent hole 23 veg 3")
            })
          } else if (veg23 == "4") {
            $scope.datahole[22].nameveg = $scope.vegetable[3].namev
            $scope.datahole[22].typeveg = moment().format("MMM Do YY")
            $scope.datahole[22].statushole = true
            $http.post('/hole', $scope.datahole[22]).then(function (response) {
              console.log("sent hole 23 veg 4")
            })
          }//else
        }
      }//function hole23

      $scope.hole24 = function (veg24) {//////////////////////////////////////////////////hole24
        console.log("OK Hole ------->24")

        if ($scope.totaldatahole[23].statushole === true) {
          console.log("hole 24 put")
          if (veg24 == "1") {
            $scope.datahole[23].nameveg = $scope.vegetable[0].namev
            $scope.datahole[23].typeveg = moment().format("MMM Do YY")
            $scope.datahole[23].statushole = true
            $http.put('/hole/' + $scope.totaldatahole[23]._id, $scope.datahole[23]).then(res => {
              console.log("sent hole 24 veg 1 update")
              $scope.totaldatahole[23].statushole = res.data.status
            })
          } else if (veg24 == "2") {
            $scope.datahole[23].nameveg = $scope.vegetable[1].namev
            $scope.datahole[23].typeveg = moment().format("MMM Do YY")
            $scope.datahole[23].statushole = true
            $http.put('/hole/' + $scope.totaldatahole[23]._id, $scope.datahole[23]).then(res => {
              console.log("sent hole 24 veg 2 update")
              $scope.totaldatahole[23].statushole = res.data.status
            })
          } else if (veg24 == "3") {
            $scope.datahole[23].nameveg = $scope.vegetable[2].namev
            $scope.datahole[23].typeveg = moment().format("MMM Do YY")
            $scope.datahole[23].statushole = true
            $http.put('/hole/' + $scope.totaldatahole[23]._id, $scope.datahole[23]).then(res => {
              console.log("sent hole 24 veg 3 update")
              $scope.totaldatahole[23].statushole = res.data.status
            })
          } else if (veg24 == "4") {
            $scope.datahole[23].nameveg = $scope.vegetable[3].namev
            $scope.datahole[23].typeveg = moment().format("MMM Do YY")
            $scope.datahole[23].statushole = true
            $http.put('/hole/' + $scope.totaldatahole[23]._id, $scope.datahole[23]).then(res => {
              console.log("sent hole 24 veg 4 update")
              $scope.totaldatahole[23].statushole = res.data.status
            })
          }//else
        } else if ($scope.datahole[23].statushole === false) {
          console.log("hole 24 post")
          if (veg24 == "1") {
            $scope.datahole[23].nameveg = $scope.vegetable[0].namev
            $scope.datahole[23].typeveg = moment().format("MMM Do YY")
            $scope.datahole[23].statushole = true
            $http.post('/hole', $scope.datahole[23]).then(function (response) {
              console.log("sent hole 24 veg 1")
            })
          } else if (veg24 == "2") {
            $scope.datahole[23].nameveg = $scope.vegetable[1].namev
            $scope.datahole[23].typeveg = moment().format("MMM Do YY")
            $scope.datahole[23].statushole = true
            $http.post('/hole', $scope.datahole[23]).then(function (response) {
              console.log("sent hole 24 veg 2")
            })
          } else if (veg24 == "3") {
            $scope.datahole[23].nameveg = $scope.vegetable[2].namev
            $scope.datahole[23].typeveg = moment().format("MMM Do YY")
            $scope.datahole[23].statushole = true
            $http.post('/hole', $scope.datahole[23]).then(function (response) {
              console.log("sent hole 24 veg 3")
            })
          } else if (veg24 == "4") {
            $scope.datahole[23].nameveg = $scope.vegetable[3].namev
            $scope.datahole[23].typeveg = moment().format("MMM Do YY")
            $scope.datahole[23].statushole = true
            $http.post('/hole', $scope.datahole[23]).then(function (response) {
              console.log("sent hole 24 veg 4")
            })
          }//else
        }
      }//function hole24

      $scope.hole25 = function (veg25) {//////////////////////////////////////////////////hole25
        console.log("OK Hole ------->25")

        if ($scope.totaldatahole[24].statushole === true) {
          console.log("hole 25 put")
          if (veg25 == "1") {
            $scope.datahole[24].nameveg = $scope.vegetable[0].namev
            $scope.datahole[24].typeveg = moment().format("MMM Do YY")
            $scope.datahole[24].statushole = true
            $http.put('/hole/' + $scope.totaldatahole[24]._id, $scope.datahole[24]).then(res => {
              console.log("sent hole 25 veg 1 update")
              $scope.totaldatahole[24].statushole = res.data.status
            })
          } else if (veg25 == "2") {
            $scope.datahole[24].nameveg = $scope.vegetable[1].namev
            $scope.datahole[24].typeveg = moment().format("MMM Do YY")
            $scope.datahole[24].statushole = true
            $http.put('/hole/' + $scope.totaldatahole[24]._id, $scope.datahole[24]).then(res => {
              console.log("sent hole 25 veg 2 update")
              $scope.totaldatahole[24].statushole = res.data.status
            })
          } else if (veg25 == "3") {
            $scope.datahole[24].nameveg = $scope.vegetable[2].namev
            $scope.datahole[24].typeveg = moment().format("MMM Do YY")
            $scope.datahole[24].statushole = true
            $http.put('/hole/' + $scope.totaldatahole[24]._id, $scope.datahole[24]).then(res => {
              console.log("sent hole 25 veg 3 update")
              $scope.totaldatahole[24].statushole = res.data.status
            })
          } else if (veg25 == "4") {
            $scope.datahole[24].nameveg = $scope.vegetable[3].namev
            $scope.datahole[24].typeveg = moment().format("MMM Do YY")
            $scope.datahole[24].statushole = true
            $http.put('/hole/' + $scope.totaldatahole[24]._id, $scope.datahole[24]).then(res => {
              console.log("sent hole 25 veg 4 update")
              $scope.totaldatahole[24].statushole = res.data.status
            })
          }//else
        } else if ($scope.datahole[24].statushole === false) {
          console.log("hole 25 post")
          if (veg25 == "1") {
            $scope.datahole[24].nameveg = $scope.vegetable[0].namev
            $scope.datahole[24].typeveg = moment().format("MMM Do YY")
            $scope.datahole[24].statushole = true
            $http.post('/hole', $scope.datahole[24]).then(function (response) {
              console.log("sent hole 25 veg 1")
            })
          } else if (veg25 == "2") {
            $scope.datahole[24].nameveg = $scope.vegetable[1].namev
            $scope.datahole[24].typeveg = moment().format("MMM Do YY")
            $scope.datahole[24].statushole = true
            $http.post('/hole', $scope.datahole[24]).then(function (response) {
              console.log("sent hole 25 veg 2")
            })
          } else if (veg25 == "3") {
            $scope.datahole[24].nameveg = $scope.vegetable[2].namev
            $scope.datahole[24].typeveg = moment().format("MMM Do YY")
            $scope.datahole[24].statushole = true
            $http.post('/hole', $scope.datahole[24]).then(function (response) {
              console.log("sent hole 25 veg 3")
            })
          } else if (veg25 == "4") {
            $scope.datahole[24].nameveg = $scope.vegetable[3].namev
            $scope.datahole[24].typeveg = moment().format("MMM Do YY")
            $scope.datahole[24].statushole = true
            $http.post('/hole', $scope.datahole[24]).then(function (response) {
              console.log("sent hole 25 veg 4")
            })
          }//else
        }
      }//function hole25

      $scope.hole26 = function (veg26) {//////////////////////////////////////////////////hole26
        console.log("OK Hole ------->26")

        if ($scope.totaldatahole[25].statushole === true) {
          console.log("hole 26 put")
          if (veg26 == "1") {
            $scope.datahole[25].nameveg = $scope.vegetable[0].namev
            $scope.datahole[25].typeveg = moment().format("MMM Do YY")
            $scope.datahole[25].statushole = true
            $http.put('/hole/' + $scope.totaldatahole[25]._id, $scope.datahole[25]).then(res => {
              console.log("sent hole 26 veg 1 update")
              $scope.totaldatahole[25].statushole = res.data.status
            })
          } else if (veg26 == "2") {
            $scope.datahole[25].nameveg = $scope.vegetable[1].namev
            $scope.datahole[25].typeveg = moment().format("MMM Do YY")
            $scope.datahole[25].statushole = true
            $http.put('/hole/' + $scope.totaldatahole[25]._id, $scope.datahole[25]).then(res => {
              console.log("sent hole 26 veg 2 update")
              $scope.totaldatahole[25].statushole = res.data.status
            })
          } else if (veg26 == "3") {
            $scope.datahole[25].nameveg = $scope.vegetable[2].namev
            $scope.datahole[25].typeveg = moment().format("MMM Do YY")
            $scope.datahole[25].statushole = true
            $http.put('/hole/' + $scope.totaldatahole[25]._id, $scope.datahole[25]).then(res => {
              console.log("sent hole 26 veg 3 update")
              $scope.totaldatahole[25].statushole = res.data.status
            })
          } else if (veg26 == "4") {
            $scope.datahole[25].nameveg = $scope.vegetable[3].namev
            $scope.datahole[25].typeveg = moment().format("MMM Do YY")
            $scope.datahole[25].statushole = true
            $http.put('/hole/' + $scope.totaldatahole[25]._id, $scope.datahole[25]).then(res => {
              console.log("sent hole 26 veg 4 update")
              $scope.totaldatahole[25].statushole = res.data.status
            })
          }//else
        } else if ($scope.datahole[25].statushole === false) {
          console.log("hole 26 post")
          if (veg26 == "1") {
            $scope.datahole[25].nameveg = $scope.vegetable[0].namev
            $scope.datahole[25].typeveg = moment().format("MMM Do YY")
            $scope.datahole[25].statushole = true
            $http.post('/hole', $scope.datahole[25]).then(function (response) {
              console.log("sent hole 26 veg 1")
            })
          } else if (veg26 == "2") {
            $scope.datahole[25].nameveg = $scope.vegetable[1].namev
            $scope.datahole[25].typeveg = moment().format("MMM Do YY")
            $scope.datahole[25].statushole = true
            $http.post('/hole', $scope.datahole[25]).then(function (response) {
              console.log("sent hole 26 veg 2")
            })
          } else if (veg26 == "3") {
            $scope.datahole[25].nameveg = $scope.vegetable[2].namev
            $scope.datahole[25].typeveg = moment().format("MMM Do YY")
            $scope.datahole[25].statushole = true
            $http.post('/hole', $scope.datahole[25]).then(function (response) {
              console.log("sent hole 26 veg 3")
            })
          } else if (veg26 == "4") {
            $scope.datahole[25].nameveg = $scope.vegetable[3].namev
            $scope.datahole[25].typeveg = moment().format("MMM Do YY")
            $scope.datahole[25].statushole = true
            $http.post('/hole', $scope.datahole[25]).then(function (response) {
              console.log("sent hole 26 veg 4")
            })
          }//else
        }
      }//function hole26

      $scope.hole27 = function (veg27) {//////////////////////////////////////////////////hole27
        console.log("OK Hole ------->27")

        if ($scope.totaldatahole[26].statushole === true) {
          console.log("hole 27 put")
          if (veg27 == "1") {
            $scope.datahole[26].nameveg = $scope.vegetable[0].namev
            $scope.datahole[26].typeveg = moment().format("MMM Do YY")
            $scope.datahole[26].statushole = true
            $http.put('/hole/' + $scope.totaldatahole[26]._id, $scope.datahole[26]).then(res => {
              console.log("sent hole 27 veg 1 update")
              $scope.totaldatahole[26].statushole = res.data.status
            })
          } else if (veg27 == "2") {
            $scope.datahole[26].nameveg = $scope.vegetable[1].namev
            $scope.datahole[26].typeveg = moment().format("MMM Do YY")
            $scope.datahole[26].statushole = true
            $http.put('/hole/' + $scope.totaldatahole[26]._id, $scope.datahole[26]).then(res => {
              console.log("sent hole 27 veg 2 update")
              $scope.totaldatahole[26].statushole = res.data.status
            })
          } else if (veg27 == "3") {
            $scope.datahole[26].nameveg = $scope.vegetable[2].namev
            $scope.datahole[26].typeveg = moment().format("MMM Do YY")
            $scope.datahole[26].statushole = true
            $http.put('/hole/' + $scope.totaldatahole[26]._id, $scope.datahole[26]).then(res => {
              console.log("sent hole 27 veg 3 update")
              $scope.totaldatahole[26].statushole = res.data.status
            })
          } else if (veg27 == "4") {
            $scope.datahole[26].nameveg = $scope.vegetable[3].namev
            $scope.datahole[26].typeveg = moment().format("MMM Do YY")
            $scope.datahole[26].statushole = true
            $http.put('/hole/' + $scope.totaldatahole[26]._id, $scope.datahole[26]).then(res => {
              console.log("sent hole 27 veg 4 update")
              $scope.totaldatahole[26].statushole = res.data.status
            })
          }//else
        } else if ($scope.datahole[26].statushole === false) {
          console.log("hole 27 post")
          if (veg27 == "1") {
            $scope.datahole[26].nameveg = $scope.vegetable[0].namev
            $scope.datahole[26].typeveg = moment().format("MMM Do YY")
            $scope.datahole[26].statushole = true
            $http.post('/hole', $scope.datahole[26]).then(function (response) {
              console.log("sent hole 27 veg 1")
            })
          } else if (veg27 == "2") {
            $scope.datahole[26].nameveg = $scope.vegetable[1].namev
            $scope.datahole[26].typeveg = moment().format("MMM Do YY")
            $scope.datahole[26].statushole = true
            $http.post('/hole', $scope.datahole[26]).then(function (response) {
              console.log("sent hole 27 veg 2")
            })
          } else if (veg27 == "3") {
            $scope.datahole[26].nameveg = $scope.vegetable[2].namev
            $scope.datahole[26].typeveg = moment().format("MMM Do YY")
            $scope.datahole[26].statushole = true
            $http.post('/hole', $scope.datahole[26]).then(function (response) {
              console.log("sent hole 27 veg 3")
            })
          } else if (veg27 == "4") {
            $scope.datahole[26].nameveg = $scope.vegetable[3].namev
            $scope.datahole[26].typeveg = moment().format("MMM Do YY")
            $scope.datahole[26].statushole = true
            $http.post('/hole', $scope.datahole[26]).then(function (response) {
              console.log("sent hole 27 veg 4")
            })
          }//else
        }
      }//function hole27

      $scope.hole28 = function (veg28) {//////////////////////////////////////////////////hole28
        console.log("OK Hole ------->28")

        if ($scope.totaldatahole[27].statushole === true) {
          console.log("hole 28 put")
          if (veg28 == "1") {
            $scope.datahole[27].nameveg = $scope.vegetable[0].namev
            $scope.datahole[27].typeveg = moment().format("MMM Do YY")
            $scope.datahole[27].statushole = true
            $http.put('/hole/' + $scope.totaldatahole[27]._id, $scope.datahole[27]).then(res => {
              console.log("sent hole 28 veg 1 update")
              $scope.totaldatahole[27].statushole = res.data.status
            })
          } else if (veg28 == "2") {
            $scope.datahole[27].nameveg = $scope.vegetable[1].namev
            $scope.datahole[27].typeveg = moment().format("MMM Do YY")
            $scope.datahole[27].statushole = true
            $http.put('/hole/' + $scope.totaldatahole[27]._id, $scope.datahole[27]).then(res => {
              console.log("sent hole 28 veg 2 update")
              $scope.totaldatahole[27].statushole = res.data.status
            })
          } else if (veg28 == "3") {
            $scope.datahole[27].nameveg = $scope.vegetable[2].namev
            $scope.datahole[27].typeveg = moment().format("MMM Do YY")
            $scope.datahole[27].statushole = true
            $http.put('/hole/' + $scope.totaldatahole[27]._id, $scope.datahole[27]).then(res => {
              console.log("sent hole 28 veg 3 update")
              $scope.totaldatahole[27].statushole = res.data.status
            })
          } else if (veg28 == "4") {
            $scope.datahole[27].nameveg = $scope.vegetable[3].namev
            $scope.datahole[27].typeveg = moment().format("MMM Do YY")
            $scope.datahole[27].statushole = true
            $http.put('/hole/' + $scope.totaldatahole[27]._id, $scope.datahole[27]).then(res => {
              console.log("sent hole 28 veg 4 update")
              $scope.totaldatahole[27].statushole = res.data.status
            })
          }//else
        } else if ($scope.datahole[27].statushole === false) {
          console.log("hole 28 post")
          if (veg28 == "1") {
            $scope.datahole[27].nameveg = $scope.vegetable[0].namev
            $scope.datahole[27].typeveg = moment().format("MMM Do YY")
            $scope.datahole[27].statushole = true
            $http.post('/hole', $scope.datahole[27]).then(function (response) {
              console.log("sent hole 28 veg 1")
            })
          } else if (veg28 == "2") {
            $scope.datahole[27].nameveg = $scope.vegetable[1].namev
            $scope.datahole[27].typeveg = moment().format("MMM Do YY")
            $scope.datahole[27].statushole = true
            $http.post('/hole', $scope.datahole[27]).then(function (response) {
              console.log("sent hole 28 veg 2")
            })
          } else if (veg28 == "3") {
            $scope.datahole[27].nameveg = $scope.vegetable[2].namev
            $scope.datahole[27].typeveg = moment().format("MMM Do YY")
            $scope.datahole[27].statushole = true
            $http.post('/hole', $scope.datahole[27]).then(function (response) {
              console.log("sent hole 28 veg 3")
            })
          } else if (veg28 == "4") {
            $scope.datahole[27].nameveg = $scope.vegetable[3].namev
            $scope.datahole[27].typeveg = moment().format("MMM Do YY")
            $scope.datahole[27].statushole = true
            $http.post('/hole', $scope.datahole[27]).then(function (response) {
              console.log("sent hole 28 veg 4")
            })
          }//else
        }
      }//function hole28

      $scope.hole29 = function (veg29) {//////////////////////////////////////////////////hole29
        console.log("OK Hole ------->29")

        if ($scope.totaldatahole[28].statushole === true) {
          console.log("hole 29 put")
          if (veg29 == "1") {
            $scope.datahole[28].nameveg = $scope.vegetable[0].namev
            $scope.datahole[28].typeveg = moment().format("MMM Do YY")
            $scope.datahole[28].statushole = true
            $http.put('/hole/' + $scope.totaldatahole[28]._id, $scope.datahole[28]).then(res => {
              console.log("sent hole 29 veg 1 update")
              $scope.totaldatahole[28].statushole = res.data.status
            })
          } else if (veg29 == "2") {
            $scope.datahole[28].nameveg = $scope.vegetable[1].namev
            $scope.datahole[28].typeveg = moment().format("MMM Do YY")
            $scope.datahole[28].statushole = true
            $http.put('/hole/' + $scope.totaldatahole[28]._id, $scope.datahole[28]).then(res => {
              console.log("sent hole 29 veg 2 update")
              $scope.totaldatahole[28].statushole = res.data.status
            })
          } else if (veg29 == "3") {
            $scope.datahole[28].nameveg = $scope.vegetable[2].namev
            $scope.datahole[28].typeveg = moment().format("MMM Do YY")
            $scope.datahole[28].statushole = true
            $http.put('/hole/' + $scope.totaldatahole[28]._id, $scope.datahole[28]).then(res => {
              console.log("sent hole 29 veg 3 update")
              $scope.totaldatahole[28].statushole = res.data.status
            })
          } else if (veg29 == "4") {
            $scope.datahole[28].nameveg = $scope.vegetable[3].namev
            $scope.datahole[28].typeveg = moment().format("MMM Do YY")
            $scope.datahole[28].statushole = true
            $http.put('/hole/' + $scope.totaldatahole[28]._id, $scope.datahole[28]).then(res => {
              console.log("sent hole 29 veg 4 update")
              $scope.totaldatahole[28].statushole = res.data.status
            })
          }//else
        } else if ($scope.datahole[28].statushole === false) {
          console.log("hole 29 post")
          if (veg29 == "1") {
            $scope.datahole[28].nameveg = $scope.vegetable[0].namev
            $scope.datahole[28].typeveg = moment().format("MMM Do YY")
            $scope.datahole[28].statushole = true
            $http.post('/hole', $scope.datahole[28]).then(function (response) {
              console.log("sent hole 29 veg 1")
            })
          } else if (veg29 == "2") {
            $scope.datahole[28].nameveg = $scope.vegetable[1].namev
            $scope.datahole[28].typeveg = moment().format("MMM Do YY")
            $scope.datahole[28].statushole = true
            $http.post('/hole', $scope.datahole[28]).then(function (response) {
              console.log("sent hole 29 veg 2")
            })
          } else if (veg29 == "3") {
            $scope.datahole[28].nameveg = $scope.vegetable[2].namev
            $scope.datahole[28].typeveg = moment().format("MMM Do YY")
            $scope.datahole[28].statushole = true
            $http.post('/hole', $scope.datahole[28]).then(function (response) {
              console.log("sent hole 29 veg 3")
            })
          } else if (veg29 == "4") {
            $scope.datahole[28].nameveg = $scope.vegetable[3].namev
            $scope.datahole[28].typeveg = moment().format("MMM Do YY")
            $scope.datahole[28].statushole = true
            $http.post('/hole', $scope.datahole[28]).then(function (response) {
              console.log("sent hole 29 veg 4")
            })
          }//else
        }
      }//function hole29

      $scope.hole30 = function (veg30) {//////////////////////////////////////////////////hole30
        console.log("OK Hole ------->30")

        if ($scope.totaldatahole[29].statushole === true) {
          console.log("hole 30 put")
          if (veg30 == "1") {
            $scope.datahole[29].nameveg = $scope.vegetable[0].namev
            $scope.datahole[29].typeveg = moment().format("MMM Do YY")
            $scope.datahole[29].statushole = true
            $http.put('/hole/' + $scope.totaldatahole[29]._id, $scope.datahole[29]).then(res => {
              console.log("sent hole 30 veg 1 update")
              $scope.totaldatahole[29].statushole = res.data.status
            })
          } else if (veg30 == "2") {
            $scope.datahole[29].nameveg = $scope.vegetable[1].namev
            $scope.datahole[29].typeveg = moment().format("MMM Do YY")
            $scope.datahole[29].statushole = true
            $http.put('/hole/' + $scope.totaldatahole[29]._id, $scope.datahole[29]).then(res => {
              console.log("sent hole 30 veg 2 update")
              $scope.totaldatahole[29].statushole = res.data.status
            })
          } else if (veg30 == "3") {
            $scope.datahole[29].nameveg = $scope.vegetable[2].namev
            $scope.datahole[29].typeveg = moment().format("MMM Do YY")
            $scope.datahole[29].statushole = true
            $http.put('/hole/' + $scope.totaldatahole[29]._id, $scope.datahole[29]).then(res => {
              console.log("sent hole 30 veg 3 update")
              $scope.totaldatahole[29].statushole = res.data.status
            })
          } else if (veg30 == "4") {
            $scope.datahole[29].nameveg = $scope.vegetable[3].namev
            $scope.datahole[29].typeveg = moment().format("MMM Do YY")
            $scope.datahole[29].statushole = true
            $http.put('/hole/' + $scope.totaldatahole[29]._id, $scope.datahole[29]).then(res => {
              console.log("sent hole 30 veg 4 update")
              $scope.totaldatahole[29].statushole = res.data.status
            })
          }//else
        } else if ($scope.datahole[29].statushole === false) {
          console.log("hole 30 post")
          if (veg30 == "1") {
            $scope.datahole[29].nameveg = $scope.vegetable[0].namev
            $scope.datahole[29].typeveg = moment().format("MMM Do YY")
            $scope.datahole[29].statushole = true
            $http.post('/hole', $scope.datahole[29]).then(function (response) {
              console.log("sent hole 30 veg 1")
            })
          } else if (veg30 == "2") {
            $scope.datahole[29].nameveg = $scope.vegetable[1].namev
            $scope.datahole[29].typeveg = moment().format("MMM Do YY")
            $scope.datahole[29].statushole = true
            $http.post('/hole', $scope.datahole[29]).then(function (response) {
              console.log("sent hole 30 veg 2")
            })
          } else if (veg30 == "3") {
            $scope.datahole[29].nameveg = $scope.vegetable[2].namev
            $scope.datahole[29].typeveg = moment().format("MMM Do YY")
            $scope.datahole[29].statushole = true
            $http.post('/hole', $scope.datahole[29]).then(function (response) {
              console.log("sent hole 30 veg 3")
            })
          } else if (veg30 == "4") {
            $scope.datahole[29].nameveg = $scope.vegetable[3].namev
            $scope.datahole[29].typeveg = moment().format("MMM Do YY")
            $scope.datahole[29].statushole = true
            $http.post('/hole', $scope.datahole[29]).then(function (response) {
              console.log("sent hole 30 veg 4")
            })
          }//else
        }
      }//function hole30

      $scope.hole31 = function (veg31) {//////////////////////////////////////////////////hole31
        console.log("OK Hole ------->31")

        if ($scope.totaldatahole[30].statushole === true) {
          console.log("hole 31 put")
          if (veg31 == "1") {
            $scope.datahole[30].nameveg = $scope.vegetable[0].namev
            $scope.datahole[30].typeveg = moment().format("MMM Do YY")
            $scope.datahole[30].statushole = true
            $http.put('/hole/' + $scope.totaldatahole[30]._id, $scope.datahole[30]).then(res => {
              console.log("sent hole 31 veg 1 update")
              $scope.totaldatahole[30].statushole = res.data.status
            })
          } else if (veg31 == "2") {
            $scope.datahole[30].nameveg = $scope.vegetable[1].namev
            $scope.datahole[30].typeveg = moment().format("MMM Do YY")
            $scope.datahole[30].statushole = true
            $http.put('/hole/' + $scope.totaldatahole[30]._id, $scope.datahole[30]).then(res => {
              console.log("sent hole 31 veg 2 update")
              $scope.totaldatahole[30].statushole = res.data.status
            })
          } else if (veg31 == "3") {
            $scope.datahole[30].nameveg = $scope.vegetable[2].namev
            $scope.datahole[30].typeveg = moment().format("MMM Do YY")
            $scope.datahole[30].statushole = true
            $http.put('/hole/' + $scope.totaldatahole[30]._id, $scope.datahole[30]).then(res => {
              console.log("sent hole 31 veg 3 update")
              $scope.totaldatahole[30].statushole = res.data.status
            })
          } else if (veg31 == "4") {
            $scope.datahole[30].nameveg = $scope.vegetable[3].namev
            $scope.datahole[30].typeveg = moment().format("MMM Do YY")
            $scope.datahole[30].statushole = true
            $http.put('/hole/' + $scope.totaldatahole[30]._id, $scope.datahole[30]).then(res => {
              console.log("sent hole 31 veg 4 update")
              $scope.totaldatahole[30].statushole = res.data.status
            })
          }//else
        } else if ($scope.datahole[30].statushole === false) {
          console.log("hole 31 post")
          if (veg31 == "1") {
            $scope.datahole[30].nameveg = $scope.vegetable[0].namev
            $scope.datahole[30].typeveg = moment().format("MMM Do YY")
            $scope.datahole[30].statushole = true
            $http.post('/hole', $scope.datahole[30]).then(function (response) {
              console.log("sent hole 31 veg 1")
            })
          } else if (veg31 == "2") {
            $scope.datahole[30].nameveg = $scope.vegetable[1].namev
            $scope.datahole[30].typeveg = moment().format("MMM Do YY")
            $scope.datahole[30].statushole = true
            $http.post('/hole', $scope.datahole[30]).then(function (response) {
              console.log("sent hole 31 veg 2")
            })
          } else if (veg31 == "3") {
            $scope.datahole[30].nameveg = $scope.vegetable[2].namev
            $scope.datahole[30].typeveg = moment().format("MMM Do YY")
            $scope.datahole[30].statushole = true
            $http.post('/hole', $scope.datahole[30]).then(function (response) {
              console.log("sent hole 31 veg 3")
            })
          } else if (veg31 == "4") {
            $scope.datahole[30].nameveg = $scope.vegetable[3].namev
            $scope.datahole[30].typeveg = moment().format("MMM Do YY")
            $scope.datahole[30].statushole = true
            $http.post('/hole', $scope.datahole[30]).then(function (response) {
              console.log("sent hole 31 veg 4")
            })
          }//else
        }
      }//function hole31

      $scope.hole32 = function (veg32) {//////////////////////////////////////////////////hole32
        console.log("OK Hole ------->32")

        if ($scope.totaldatahole[31].statushole === true) {
          console.log("hole 32 put")
          if (veg32 == "1") {
            $scope.datahole[31].nameveg = $scope.vegetable[0].namev
            $scope.datahole[31].typeveg = moment().format("MMM Do YY")
            $scope.datahole[31].statushole = true
            $http.put('/hole/' + $scope.totaldatahole[31]._id, $scope.datahole[31]).then(res => {
              console.log("sent hole 32 veg 1 update")
              $scope.totaldatahole[31].statushole = res.data.status
            })
          } else if (veg32 == "2") {
            $scope.datahole[31].nameveg = $scope.vegetable[1].namev
            $scope.datahole[31].typeveg = moment().format("MMM Do YY")
            $scope.datahole[31].statushole = true
            $http.put('/hole/' + $scope.totaldatahole[31]._id, $scope.datahole[31]).then(res => {
              console.log("sent hole 32 veg 2 update")
              $scope.totaldatahole[31].statushole = res.data.status
            })
          } else if (veg32 == "3") {
            $scope.datahole[31].nameveg = $scope.vegetable[2].namev
            $scope.datahole[31].typeveg = moment().format("MMM Do YY")
            $scope.datahole[31].statushole = true
            $http.put('/hole/' + $scope.totaldatahole[31]._id, $scope.datahole[31]).then(res => {
              console.log("sent hole 32 veg 3 update")
              $scope.totaldatahole[31].statushole = res.data.status
            })
          } else if (veg32 == "4") {
            $scope.datahole[31].nameveg = $scope.vegetable[3].namev
            $scope.datahole[31].typeveg = moment().format("MMM Do YY")
            $scope.datahole[31].statushole = true
            $http.put('/hole/' + $scope.totaldatahole[31]._id, $scope.datahole[31]).then(res => {
              console.log("sent hole 32 veg 4 update")
              $scope.totaldatahole[31].statushole = res.data.status
            })
          }//else
        } else if ($scope.datahole[31].statushole === false) {
          console.log("hole 32 post")
          if (veg32 == "1") {
            $scope.datahole[31].nameveg = $scope.vegetable[0].namev
            $scope.datahole[31].typeveg = moment().format("MMM Do YY")
            $scope.datahole[31].statushole = true
            $http.post('/hole', $scope.datahole[31]).then(function (response) {
              console.log("sent hole 32 veg 1")
            })
          } else if (veg32 == "2") {
            $scope.datahole[31].nameveg = $scope.vegetable[1].namev
            $scope.datahole[31].typeveg = moment().format("MMM Do YY")
            $scope.datahole[31].statushole = true
            $http.post('/hole', $scope.datahole[31]).then(function (response) {
              console.log("sent hole 32 veg 2")
            })
          } else if (veg32 == "3") {
            $scope.datahole[31].nameveg = $scope.vegetable[2].namev
            $scope.datahole[31].typeveg = moment().format("MMM Do YY")
            $scope.datahole[31].statushole = true
            $http.post('/hole', $scope.datahole[31]).then(function (response) {
              console.log("sent hole 32 veg 3")
            })
          } else if (veg32 == "4") {
            $scope.datahole[31].nameveg = $scope.vegetable[3].namev
            $scope.datahole[31].typeveg = moment().format("MMM Do YY")
            $scope.datahole[31].statushole = true
            $http.post('/hole', $scope.datahole[31]).then(function (response) {
              console.log("sent hole 32 veg 4")
            })
          }//else
        }
      }//function hole32

      $scope.hole33 = function (veg33) {//////////////////////////////////////////////////hole33
        console.log("OK Hole ------->33")

        if ($scope.totaldatahole[32].statushole === true) {
          console.log("hole 33 put")
          if (veg33 == "1") {
            $scope.datahole[32].nameveg = $scope.vegetable[0].namev
            $scope.datahole[32].typeveg = moment().format("MMM Do YY")
            $scope.datahole[32].statushole = true
            $http.put('/hole/' + $scope.totaldatahole[32]._id, $scope.datahole[32]).then(res => {
              console.log("sent hole 33 veg 1 update")
              $scope.totaldatahole[32].statushole = res.data.status
            })
          } else if (veg33 == "2") {
            $scope.datahole[32].nameveg = $scope.vegetable[1].namev
            $scope.datahole[32].typeveg = moment().format("MMM Do YY")
            $scope.datahole[32].statushole = true
            $http.put('/hole/' + $scope.totaldatahole[32]._id, $scope.datahole[32]).then(res => {
              console.log("sent hole 33 veg 2 update")
              $scope.totaldatahole[32].statushole = res.data.status
            })
          } else if (veg33 == "3") {
            $scope.datahole[32].nameveg = $scope.vegetable[2].namev
            $scope.datahole[32].typeveg = moment().format("MMM Do YY")
            $scope.datahole[32].statushole = true
            $http.put('/hole/' + $scope.totaldatahole[32]._id, $scope.datahole[32]).then(res => {
              console.log("sent hole 33 veg 3 update")
              $scope.totaldatahole[32].statushole = res.data.status
            })
          } else if (veg33 == "4") {
            $scope.datahole[32].nameveg = $scope.vegetable[3].namev
            $scope.datahole[32].typeveg = moment().format("MMM Do YY")
            $scope.datahole[32].statushole = true
            $http.put('/hole/' + $scope.totaldatahole[32]._id, $scope.datahole[32]).then(res => {
              console.log("sent hole 33 veg 4 update")
              $scope.totaldatahole[32].statushole = res.data.status
            })
          }//else
        } else if ($scope.datahole[32].statushole === false) {
          console.log("hole 33 post")
          if (veg33 == "1") {
            $scope.datahole[32].nameveg = $scope.vegetable[0].namev
            $scope.datahole[32].typeveg = moment().format("MMM Do YY")
            $scope.datahole[32].statushole = true
            $http.post('/hole', $scope.datahole[32]).then(function (response) {
              console.log("sent hole 33 veg 1")
            })
          } else if (veg33 == "2") {
            $scope.datahole[32].nameveg = $scope.vegetable[1].namev
            $scope.datahole[32].typeveg = moment().format("MMM Do YY")
            $scope.datahole[32].statushole = true
            $http.post('/hole', $scope.datahole[32]).then(function (response) {
              console.log("sent hole 33 veg 2")
            })
          } else if (veg33 == "3") {
            $scope.datahole[32].nameveg = $scope.vegetable[2].namev
            $scope.datahole[32].typeveg = moment().format("MMM Do YY")
            $scope.datahole[32].statushole = true
            $http.post('/hole', $scope.datahole[32]).then(function (response) {
              console.log("sent hole 33 veg 3")
            })
          } else if (veg33 == "4") {
            $scope.datahole[32].nameveg = $scope.vegetable[3].namev
            $scope.datahole[32].typeveg = moment().format("MMM Do YY")
            $scope.datahole[32].statushole = true
            $http.post('/hole', $scope.datahole[32]).then(function (response) {
              console.log("sent hole 33 veg 4")
            })
          }//else
        }
      }//function hole33

      $scope.hole34 = function (veg34) {//////////////////////////////////////////////////hole34
        console.log("OK Hole ------->34")

        if ($scope.totaldatahole[33].statushole === true) {
          console.log("hole 34 put")
          if (veg34 == "1") {
            $scope.datahole[33].nameveg = $scope.vegetable[0].namev
            $scope.datahole[33].typeveg = moment().format("MMM Do YY")
            $scope.datahole[33].statushole = true
            $http.put('/hole/' + $scope.totaldatahole[33]._id, $scope.datahole[33]).then(res => {
              console.log("sent hole 34 veg 1 update")
              $scope.totaldatahole[33].statushole = res.data.status
            })
          } else if (veg34 == "2") {
            $scope.datahole[33].nameveg = $scope.vegetable[1].namev
            $scope.datahole[33].typeveg = moment().format("MMM Do YY")
            $scope.datahole[33].statushole = true
            $http.put('/hole/' + $scope.totaldatahole[33]._id, $scope.datahole[33]).then(res => {
              console.log("sent hole 34 veg 2 update")
              $scope.totaldatahole[33].statushole = res.data.status
            })
          } else if (veg34 == "3") {
            $scope.datahole[33].nameveg = $scope.vegetable[2].namev
            $scope.datahole[33].typeveg = moment().format("MMM Do YY")
            $scope.datahole[33].statushole = true
            $http.put('/hole/' + $scope.totaldatahole[33]._id, $scope.datahole[33]).then(res => {
              console.log("sent hole 34 veg 3 update")
              $scope.totaldatahole[33].statushole = res.data.status
            })
          } else if (veg34 == "4") {
            $scope.datahole[33].nameveg = $scope.vegetable[3].namev
            $scope.datahole[33].typeveg = moment().format("MMM Do YY")
            $scope.datahole[33].statushole = true
            $http.put('/hole/' + $scope.totaldatahole[33]._id, $scope.datahole[33]).then(res => {
              console.log("sent hole 34 veg 4 update")
              $scope.totaldatahole[33].statushole = res.data.status
            })
          }//else
        } else if ($scope.datahole[33].statushole === false) {
          console.log("hole 34 post")
          if (veg34 == "1") {
            $scope.datahole[33].nameveg = $scope.vegetable[0].namev
            $scope.datahole[33].typeveg = moment().format("MMM Do YY")
            $scope.datahole[33].statushole = true
            $http.post('/hole', $scope.datahole[33]).then(function (response) {
              console.log("sent hole 34 veg 1")
            })
          } else if (veg34 == "2") {
            $scope.datahole[33].nameveg = $scope.vegetable[1].namev
            $scope.datahole[33].typeveg = moment().format("MMM Do YY")
            $scope.datahole[33].statushole = true
            $http.post('/hole', $scope.datahole[33]).then(function (response) {
              console.log("sent hole 34 veg 2")
            })
          } else if (veg34 == "3") {
            $scope.datahole[33].nameveg = $scope.vegetable[2].namev
            $scope.datahole[33].typeveg = moment().format("MMM Do YY")
            $scope.datahole[33].statushole = true
            $http.post('/hole', $scope.datahole[33]).then(function (response) {
              console.log("sent hole 34 veg 3")
            })
          } else if (veg34 == "4") {
            $scope.datahole[33].nameveg = $scope.vegetable[3].namev
            $scope.datahole[33].typeveg = moment().format("MMM Do YY")
            $scope.datahole[33].statushole = true
            $http.post('/hole', $scope.datahole[33]).then(function (response) {
              console.log("sent hole 34 veg 4")
            })
          }//else
        }
      }//function hole34

      $scope.hole35 = function (veg35) {//////////////////////////////////////////////////hole35
        console.log("OK Hole ------->35")

        if ($scope.totaldatahole[34].statushole === true) {
          console.log("hole 35 put")
          if (veg35 == "1") {
            $scope.datahole[34].nameveg = $scope.vegetable[0].namev
            $scope.datahole[34].typeveg = moment().format("MMM Do YY")
            $scope.datahole[34].statushole = true
            $http.put('/hole/' + $scope.totaldatahole[34]._id, $scope.datahole[34]).then(res => {
              console.log("sent hole 35 veg 1 update")
              $scope.totaldatahole[34].statushole = res.data.status
            })
          } else if (veg35 == "2") {
            $scope.datahole[34].nameveg = $scope.vegetable[1].namev
            $scope.datahole[34].typeveg = moment().format("MMM Do YY")
            $scope.datahole[34].statushole = true
            $http.put('/hole/' + $scope.totaldatahole[34]._id, $scope.datahole[34]).then(res => {
              console.log("sent hole 35 veg 2 update")
              $scope.totaldatahole[34].statushole = res.data.status
            })
          } else if (veg35 == "3") {
            $scope.datahole[34].nameveg = $scope.vegetable[2].namev
            $scope.datahole[34].typeveg = moment().format("MMM Do YY")
            $scope.datahole[34].statushole = true
            $http.put('/hole/' + $scope.totaldatahole[34]._id, $scope.datahole[34]).then(res => {
              console.log("sent hole 35 veg 3 update")
              $scope.totaldatahole[34].statushole = res.data.status
            })
          } else if (veg35 == "4") {
            $scope.datahole[34].nameveg = $scope.vegetable[3].namev
            $scope.datahole[34].typeveg = moment().format("MMM Do YY")
            $scope.datahole[34].statushole = true
            $http.put('/hole/' + $scope.totaldatahole[34]._id, $scope.datahole[34]).then(res => {
              console.log("sent hole 35 veg 4 update")
              $scope.totaldatahole[34].statushole = res.data.status
            })
          }//else
        } else if ($scope.datahole[34].statushole === false) {
          console.log("hole 35 post")
          if (veg35 == "1") {
            $scope.datahole[34].nameveg = $scope.vegetable[0].namev
            $scope.datahole[34].typeveg = moment().format("MMM Do YY")
            $scope.datahole[34].statushole = true
            $http.post('/hole', $scope.datahole[34]).then(function (response) {
              console.log("sent hole 35 veg 1")
            })
          } else if (veg35 == "2") {
            $scope.datahole[34].nameveg = $scope.vegetable[1].namev
            $scope.datahole[34].typeveg = moment().format("MMM Do YY")
            $scope.datahole[34].statushole = true
            $http.post('/hole', $scope.datahole[34]).then(function (response) {
              console.log("sent hole 35 veg 2")
            })
          } else if (veg35 == "3") {
            $scope.datahole[34].nameveg = $scope.vegetable[2].namev
            $scope.datahole[34].typeveg = moment().format("MMM Do YY")
            $scope.datahole[34].statushole = true
            $http.post('/hole', $scope.datahole[34]).then(function (response) {
              console.log("sent hole 35 veg 3")
            })
          } else if (veg35 == "4") {
            $scope.datahole[34].nameveg = $scope.vegetable[3].namev
            $scope.datahole[34].typeveg = moment().format("MMM Do YY")
            $scope.datahole[34].statushole = true
            $http.post('/hole', $scope.datahole[34]).then(function (response) {
              console.log("sent hole 35 veg 4")
            })
          }//else
        }
      }//function hole35

      $scope.hole36 = function (veg36) {//////////////////////////////////////////////////hole36
        console.log("OK Hole ------->36")

        if ($scope.totaldatahole[35].statushole === true) {
          console.log("hole 36 put")
          if (veg36 == "1") {
            $scope.datahole[35].nameveg = $scope.vegetable[0].namev
            $scope.datahole[35].typeveg = moment().format("MMM Do YY")
            $scope.datahole[35].statushole = true
            $http.put('/hole/' + $scope.totaldatahole[35]._id, $scope.datahole[35]).then(res => {
              console.log("sent hole 36 veg 1 update")
              $scope.totaldatahole[35].statushole = res.data.status
            })
          } else if (veg36 == "2") {
            $scope.datahole[35].nameveg = $scope.vegetable[1].namev
            $scope.datahole[35].typeveg = moment().format("MMM Do YY")
            $scope.datahole[35].statushole = true
            $http.put('/hole/' + $scope.totaldatahole[35]._id, $scope.datahole[35]).then(res => {
              console.log("sent hole 36 veg 2 update")
              $scope.totaldatahole[35].statushole = res.data.status
            })
          } else if (veg36 == "3") {
            $scope.datahole[35].nameveg = $scope.vegetable[2].namev
            $scope.datahole[35].typeveg = moment().format("MMM Do YY")
            $scope.datahole[35].statushole = true
            $http.put('/hole/' + $scope.totaldatahole[35]._id, $scope.datahole[35]).then(res => {
              console.log("sent hole 36 veg 3 update")
              $scope.totaldatahole[35].statushole = res.data.status
            })
          } else if (veg36 == "4") {
            $scope.datahole[35].nameveg = $scope.vegetable[3].namev
            $scope.datahole[35].typeveg = moment().format("MMM Do YY")
            $scope.datahole[35].statushole = true
            $http.put('/hole/' + $scope.totaldatahole[35]._id, $scope.datahole[35]).then(res => {
              console.log("sent hole 36 veg 4 update")
              $scope.totaldatahole[35].statushole = res.data.status
            })
          }//else
        } else if ($scope.datahole[35].statushole === false) {
          console.log("hole 36 post")
          if (veg36 == "1") {
            $scope.datahole[35].nameveg = $scope.vegetable[0].namev
            $scope.datahole[35].typeveg = moment().format("MMM Do YY")
            $scope.datahole[35].statushole = true
            $http.post('/hole', $scope.datahole[35]).then(function (response) {
              console.log("sent hole 36 veg 1")
            })
          } else if (veg36 == "2") {
            $scope.datahole[35].nameveg = $scope.vegetable[1].namev
            $scope.datahole[35].typeveg = moment().format("MMM Do YY")
            $scope.datahole[35].statushole = true
            $http.post('/hole', $scope.datahole[35]).then(function (response) {
              console.log("sent hole 36 veg 2")
            })
          } else if (veg36 == "3") {
            $scope.datahole[35].nameveg = $scope.vegetable[2].namev
            $scope.datahole[35].typeveg = moment().format("MMM Do YY")
            $scope.datahole[35].statushole = true
            $http.post('/hole', $scope.datahole[35]).then(function (response) {
              console.log("sent hole 36 veg 3")
            })
          } else if (veg36 == "4") {
            $scope.datahole[35].nameveg = $scope.vegetable[3].namev
            $scope.datahole[35].typeveg = moment().format("MMM Do YY")
            $scope.datahole[35].statushole = true
            $http.post('/hole', $scope.datahole[35]).then(function (response) {
              console.log("sent hole 36 veg 4")
            })
          }//else
        }
      }//function hole36



    }, 1000);

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////Select
  })//end
