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

      // How much time does countdown have left (in units of milliseconds)
      timeLeft: $scope.constants.INITIAL_INTERVAL_VALUE * 60 * 1000,

      // Is timer in interval mode or break mode
      mode: "interval",
    };


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

      setTimerString: function(min, sec){
        $scope.animation.timerString = min.toString() + ":" + sec.toString();
        $scope.timerWidget.methods.render();
      }
    };

    // Control buttons on bottom of left column
    $scope.controlButtons = {
      test: function(){
        $scope.timerWidget.test();
      },
    },


    // Timer settings
    $scope.settings = {

      // Values of timer settings
      intervalVal: $scope.constants.INITIAL_INTERVAL_VALUE,
      breakVal: $scope.constants.INITIAL_BREAK_VALUE,

      methods: {
        // Adjust interval length setting
        incInterval: function(sign){        
          // Adjust dial display
          if(sign > 0){
            $scope.settings.intervalVal++;
          } else if (sign < 0 && $scope.settings.intervalVal > 0) {
            $scope.settings.intervalVal--;
          } else {
            return;
          }

          // Adjust timer variables
          if($scope.variables.mode === "interval" && sign > 0){
            $scope.timeLeft.total += 60000;
          } else if($scope.variables.mode === "interval" && sign < 0){
            $scope.timeLeft.total -= 60000;
          }
          $scope.timeLeft.refresh();

          // Render new timestamp
          $scope.animation.setTimerString($scope.timeLeft.stamp.minutes,
                                          $scope.timeLeft.stamp.seconds);
          
        },

        // Adjust break length setting
        incBreak: function(sign){
          if(sign > 0){
            $scope.settings.breakVal++;
          } else if (sign < 0 && $scope.settings.breakVal > 0) {
            $scope.settings.breakVal--;
          } else {
            return;
          }
        },
      },

    };

    // Code to be called on controller load
    $scope.timerWidget.setConfig("getText", function(){
        return $scope.animation.timerString;
    });
  },
]);
