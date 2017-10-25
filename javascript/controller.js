// Declare controller
app.controller('controller', [
  "$scope",

  function($scope){

    $scope.animation = {
      // String to display in center of timer ring
      timerString: "JPomo!",
    };


    // Timer settings
    $scope.settings = {

      // Values of timer settings
      intervalVal: 25,
      breakVal: 5,

      methods: {
        // Adjust interval length setting
        incInterval: function(sign){        
          if(sign > 0){
            $scope.settings.intervalVal++;
          } else if (sign < 0 && $scope.settings.intervalVal > 0) {
            $scope.settings.intervalVal--;
          } else {
            return;
          }
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

  },
]);
