// Declare controller
app.controller('controller', [
  "$scope",

  function($scope){

    $scope.constants = {
      INITIAL_INTERVAL_VALUE: 25,
      INITIAL_BREAK_VALUE: 5,
    };


    // Create instance of Timer object
    $scope.timerWidget = new Timer("timer");


    $scope.variables = {
      // Is timer currently counting down?
      isRunning: false,

      // Is timer in interval mode or break mode
      mode: "interval",
    };


    // Amount of time left in countdown
    $scope.timeLeft = {
      // Milliseconds
      total: $scope.constants.INITIAL_INTERVAL_VALUE * 60 * 1000,

      // Values for timestamp to show at center of timer
      stamp:{
        minutes: $scope.constants.INITIAL_INTERVAL_VALUE,
        seconds: 0,
      },

      // Convert from milliseconds
      refresh: function(){
        $scope.timeLeft.stamp.minutes = Math.floor(($scope.timeLeft.total / 1000) / 60);
        $scope.timeLeft.stamp.seconds = ($scope.timeLeft.total / 1000) - ($scope.timeLeft.stamp.minutes * 60);
      },
    };


    $scope.animation = {
      // String to display in center of timer ring
      timerString: "25:00",

      // Generate new timerString value
      setTimerString: function(min, sec){
        // Generate string
        $scope.animation.timerString = min.toString() + ":";
        if(sec < 10){
          $scope.animation.timerString += "0";
        }
        $scope.animation.timerString += sec.toString();

        // Refresh display
        $scope.timerWidget.methods.render();
      }
    };

    // Control buttons on bottom of left column
    $scope.controlButtons = {
      test: function(){
        switch($scope.variables.isRunning){
          case true:
            $scope.variables.isRunning = false;
            break;
          case false:
            $scope.variables.isRunning = true;
            break;
        }
        $scope.timerWidget.test();
      },
    },


    // Timer settings
    $scope.settings = {

      // Values of timer settings
      intervalVal: $scope.constants.INITIAL_INTERVAL_VALUE,
      breakVal: $scope.constants.INITIAL_BREAK_VALUE,

      methods: {
        // Adjust work/break interval length setting
        incInterval: function(mode, sign){

          // Set variable for indicating weather to adjust current time left
          switch(mode){
            case "work":
              watchSign = "interval";
              dialVar = "intervalVal";
              break;
            case "break":
              watchSign = "break";
              dialVar = "breakVal";
              break;
            default:
              console.log("Error: invalid argument[0] for incInterval(mode, sign)");
              return -1;
          }

          // Adjust dial display
          if(sign > 0){
            $scope.settings[dialVar]++;
          } else if (sign < 0 && $scope.settings.intervalVal > 0) {
            $scope.settings[dialVar]--;
          } else {
            console.log("Error: invalid argument[1] for incInterval(mode, sign)");
            return -1;
          }

          // Adjust timer variables
          if($scope.variables.mode === watchSign && sign > 0){
            $scope.timeLeft.total += 60000;
          } else if($scope.variables.mode === watchSign && sign < 0){
            $scope.timeLeft.total -= 60000;
          }
          $scope.timeLeft.refresh();

          // Render new timestamp
          $scope.animation.setTimerString($scope.timeLeft.stamp.minutes,
                                          $scope.timeLeft.stamp.seconds);          
        },

      },
    };

    // Code to be called on controller load
    $scope.timerWidget.setConfig("getText", function(){
        return $scope.animation.timerString;
    });
  },
]);
