angular.module('app', [])
  .controller('TodoListController', function ($scope, $http) {

    $scope.conLED = true
    $scope.conPump = true
    $scope.item = ''
    $scope.sheets = []
    $scope.status = 44
    $scope.timeCount = 60
    $scope.totaldatahole = []
    $scope.floor = 0
    //$scope.timeStart = new Date(1970, 0, 1, 05, 00, 0);
    //$scope.timeEnd = new Date(1970, 0, 1, 20, 35, 0);
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
        stasys: true,
        sysTimeStart: new Date(1970, 0, 1, 05, 00, 0),
        sysTimeEnd: new Date(1970, 0, 1, 20, 35, 0),
        sysTimeFog: 480,
        sysTemp: 28,
        sysHumi: 70
      }]
      $scope.totalsys = []

      function getsys() {
        $http.get('/setsys').then(res => {
          $scope.totalsys = res.data
          $scope.stasystem = $scope.totalsys[0].sysbtn
          $scope.timeStart = new Date($scope.totalsys[0].sysTimeStart)
          $scope.timeEnd = new Date($scope.totalsys[0].sysTimeEnd)
          $scope.timeFog = $scope.totalsys[0].sysTimeFog
          $scope.temp = parseFloat($scope.totalsys[0].sysTemp)
          $scope.humi = parseFloat($scope.totalsys[0].sysHumi)
          // console.log("getsys", $scope.timeEnd, $scope.totalsys[0].sysTimeEnd)
        })
        if ($scope.totalsys == []) {
          let obj = {
            "btnsys" : 1,
            "stasys" : true,
            "sysHumi" : 70,
            "sysTemp" : "29",
            "sysTimeEnd" : "1970-01-01T15:30:00.000Z",
            "sysTimeFog" : 480,
            "sysTimeStart" : "1969-12-31T22:00:00.000Z",
            "sysbtn" : "Auto"
          }
          $http.post('/setsys',obj).then(res => {
            $scope.totalsys[0] = obj
          })
        }
      }
      getsys()
      $scope.autoTime = function () {
        // $http.post('/setsys', $scope.sys[0]).then(function (response){})
        $scope.sys[0].sysTimeStart = $scope.timeStart
        $scope.sys[0].sysTimeEnd = $scope.timeEnd
        $scope.sys[0].sysTimeFog = $scope.timeFog
        $scope.sys[0].sysTemp = $scope.temp
        $scope.sys[0].sysHumi = $scope.humi
        console.log($scope.sys[0])
        $http.put('/setsys/' + $scope.totalsys[0]._id, $scope.sys[0]).then(res => {
          $scope.totalsys[0].sysTimeStart = res.data.sysTimeStart
          $scope.totalsys[0].sysTimeEnd = res.data.sysTimeEnd
          $scope.totalsys[0].sysTimeFog = res.data.sysTimeFog
          $scope.totalsys[0].sysTemp = res.data.sysTemp
          $scope.totalsys[0].sysHumi = res.data.sysHumi
        })
        // console.log("AutoTime", $scope.sys[0].sysTimeStart)
      }
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
      $scope.time1 = d.toLocaleTimeString('it-IT')
      let timeStartStr = $scope.timeStart.toLocaleTimeString('it-IT')
      let timeEndStr = $scope.timeEnd.toLocaleTimeString('it-IT')
      let timeFog = parseInt($scope.timeFog)
      let timeHr = parseInt($scope.time1.split(':')[0])
      let timeM = parseInt($scope.time1.split(':')[1])
      let convertTime = parseInt(timeHr * 60) + parseInt(timeM)
      if ($scope.time1 > timeStartStr && $scope.time1 < timeEndStr) {
        $scope.LEDSta = 'ON'
        $scope.stabtn[0].statusbtn = true
        $http.put('/btn/' + $scope.totalbtn[0]._id, $scope.stabtn[0]).then(res => {
          $scope.totalbtn[0].statusbtn = res.data.statusbtn
        })
        console.log("ledOn")
        $http.get('/ledOn').then(res => {
          console.log("---------------------------------OK")
        })
      } else {
        $scope.LEDSta = 'OFF'
        $scope.stabtn[0].statusbtn = false
        $http.put('/btn/' + $scope.totalbtn[0]._id, $scope.stabtn[0]).then(res => {
          $scope.totalbtn[0].statusbtn = res.data.statusbtn
        })
        console.log("ledOff")
        $http.get('/ledOff').then(res => {
          console.log("---------------------------------OK")
        })

      }

      // Auto TimeFog every x minutes
      // console.log("--------", convertTime, timeFog)
      // if (convertTime % timeFog == 0) {
      //   console.log("---> fogOn Auto")
      //   $scope.fogOn()
      // } else {
      //   console.log("---> fogOff Auto")
      //   $scope.fogOff()
      // }
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
      $scope.stabtn[0].statusbtn = false
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
      $scope.stabtn[1].statusbtn = true
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
      console.log("fogOn")
      $http.put('/btn/' + $scope.totalbtn[2]._id, $scope.stabtn[2]).then(res => {
        console.log(res)
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
        console.log(res)
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
      $http.put('/btn/' + $scope.totalbtn[3]._id, ).then(res => {
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

      $scope.daysDiffFunc = function (d1) {
        var d2 = new Date();
        let end = new Date(d1).getTime() + 1000 * 3600 * 24 * 35;
        var timeDiff = end - d2.getTime()
        var DaysDiff = timeDiff / (1000 * 3600 * 24);
        var HoursDiff = (timeDiff - Math.floor(DaysDiff) * (1000 * 3600 * 24)) / (1000 * 3600)
        var MinsDiff = (timeDiff - Math.floor(HoursDiff) * (1000 * 3600) - Math.floor(DaysDiff) * (1000 * 3600 * 24)) / (1000 * 60)
        return { "days": Math.floor(DaysDiff), "hours": Math.floor(HoursDiff), "mins": Math.floor(MinsDiff) }
      }

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


      function getdatahole() {
        $http.get('/hole').then(res => {
          if (JSON.stringify($scope.totaldatahole) !== JSON.stringify(res.data)) {
            $scope.totaldatahole = res.data
          }

        })
      }

      getdatahole()

      $scope.hole = function (id, veg) {//////////////////////////////////////////////////hole1

        let nameMap = { "cos": 0, "lettuce": 1, "greenoak": 2, "redoak": 3 }
        console.log($scope.totaldatahole)

        if ($scope.totaldatahole[id]) {
          let obj
          console.log("hole 1 put")
          if (veg == null)//clear
            obj = {
              "idhole": id,
              "nameveg": veg,
              "typeveg": null,
              "statushole": false
            }
          else {//put
            obj = {
              "idhole": id,
              "nameveg": veg,
              "typeveg": new Date(),
              "statushole": true
            }
          }
          if ((veg == null && $scope.totaldatahole[id].statushole) || (veg !== null && !$scope.totaldatahole[id].statushole))
            $http.put('/hole/' + $scope.totaldatahole[id]._id, obj).then(res => {
              console.log("sent hole 1 veg 1 update")
              //$scope.totaldatahole[id].statushole = res.data.status
            })
          //else
        } else {
          console.log("hole 1 post")
          let obj = {
            "idhole": id,
            "nameveg": veg,
            "typeveg": new Date(),
            "statushole": true
          }
          $http.post('/hole', obj).then(function (response) {
            console.log(response)
          })
        }
      }

    }, 1000);

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////Select
  })//end
