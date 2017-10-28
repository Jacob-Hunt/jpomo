// Declare controller
app.controller('controller', [
  "$scope",

  function($scope){

    $scope.constants = {
      INITIAL_INTERVAL_VALUE: 25,
      INITIAL_BREAK_VALUE: 5,

      SECOND: 1000,
      MINUTE: 60000,
    };


    $scope.variables = {
      // Is timer currently counting down?
      isRunning: false,

      // Is timer in interval mode or break mode
      mode: "interval",
    };


    // Create instance of Timer object
    $scope.timerWidget = new Timer("timer");


    // Control buttons on bottom of left column
    $scope.controlButtons = {

      // Test function for debugging purposes
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

      // Start button
      start: function(){
        $scope.variables.isRunning = true;
        $scope.ticker.clock = setInterval($scope.ticker.tick,
                                          $scope.constants.SECOND);
      },

      // Pause button
      pause: function(){
        $scope.variables.isRunning = false;
        clearInterval($scope.ticker.clock);
      },

      // Reset button
      reset: function(){
        // Stop timer
        $scope.variables.isRunning = false;
        if($scope.ticker.clock){
          clearInterval($scope.ticker.clock);
        }

        // Return to interval mode
        $scope.variables.mode = "interval";

        // Calculate time left and render
        $scope.timeLeft.total = $scope.settings.intervalVal * $scope.constants.MINUTE;
        $scope.timeLeft.refresh();
        $scope.animation.setTimerString($scope.timeLeft.stamp.minutes, $scope.timeLeft.stamp.seconds);
      },

    };

    // Interval timer for making pomodoro timer count down
    $scope.ticker = {
      clock: undefined,

      // Every time the clock ticks...
      tick: function(){
        $scope.timeLeft.total -= $scope.constants.SECOND;
        $scope.timeLeft.refresh();
        $scope.animation.setTimerString($scope.timeLeft.stamp.minutes,
                                        $scope.timeLeft.stamp.seconds);
        $scope.animation.updateBar();
        // If timer reaches zero
        if($scope.timeLeft.total <= 0){
          $scope.ticker.switchModes();
          $scope.audio.cuckoo.play();
        } else {
          $scope.audio.tick.play();
        }

      },

      // Switch to/from work/break modes
      switchModes: function(){
        switch($scope.variables.mode){
          case "interval":
            $scope.variables.mode = "break";
            $scope.timeLeft.total = $scope.settings.breakVal * $scope.constants.MINUTE;
            $scope.timeLeft.refresh();
            $scope.animation.setTimerString($scope.timeLeft.stamp.minutes, $scope.timeLeft.stamp.seconds);
            break;
          case "break":
            $scope.variables.mode = "interval";
            $scope.timeLeft.total = $scope.settings.intervalVal * $scope.constants.MINUTE;
            $scope.timeLeft.refresh();
            $scope.animation.setTimerString($scope.timeLeft.stamp.minutes, $scope.timeLeft.stamp.seconds);
            break;
          default:
            console.log("Error: invalid argument for switch statement in $scope.ticker.switchModes()");
            return -1;
        }
      },

    };


    // Amount of time left in countdown
    $scope.timeLeft = {
      // Milliseconds
      total: $scope.constants.INITIAL_INTERVAL_VALUE * $scope.constants.MINUTE,

      // Values for timestamp to show at center of timer
      stamp:{
        minutes: $scope.constants.INITIAL_INTERVAL_VALUE,
        seconds: 0,
      },

      // Convert from milliseconds
      refresh: function(){
        $scope.timeLeft.stamp.minutes = Math.floor($scope.timeLeft.total / $scope.constants.MINUTE);
        $scope.timeLeft.stamp.seconds = ($scope.timeLeft.total / $scope.constants.SECOND)
                                         - ($scope.timeLeft.stamp.minutes * 60);
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
      },

      updateBar: function(){
        var multiplier;
        switch($scope.variables.mode){
          case "interval":
            multiplier = $scope.settings.intervalVal;
            break;
          case "break":
            multiplier = $scope.settings.breakVal;
            break;
          default:
            console.log("Error: invalid agument for switch statement in $scope.animation.updateBar()");
            return -1;
        }

        // Calculate how much of bar to fill in
        var totalTime = multiplier * $scope.constants.MINUTE;
        var timePassed = totalTime - $scope.timeLeft.total;
        var ratio = timePassed / totalTime;
        var percentPassed = Math.floor(100 * ratio);
        $scope.timerWidget.incrimentTo(percentPassed);
      },
    };


    $scope.audio = {
      cuckoo: new Audio("./cuckoo.mp3"),
      tick: new Audio("./tick.mp3"),
    };


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
