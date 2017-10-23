// Declare controller
app.controller('controller', [
  "$scope",
  function($scope){

    // String to display in center of timer ring
    $scope.timerString = "JPomo!";

    // Values of timer settings
    $scope.intervalVal = 0;
    $scope.breakVal = 0;


    // Functions for adjusting timer settings
    $scope.incInterval = function(sign){        
      if(sign > 0){
        $scope.intervalVal++;
      } else if (sign < 0) {
        $scope.intervalVal--;
      } else {
        return;
      }
    };

    $scope.incBreak = function(sign){
      if(sign > 0){
        $scope.breakVal++;
      } else if (sign < 0) {
        $scope.breakVal--;
      } else {
        return;
      }
    };

  }
]);
