function solutionCtrl($scope, $timeout, Solution, $location, $rootScope){
	var timer;
	$scope.previewTime = 8;
	$scope.setPreviewSolution = function(){
    Solution.previewSolution({solution_id: $scope.currentSolution.id}, function(){
      $scope.preview_set = true;
    });
  }
  $scope.grabSolution = function(){
    Solution.purchaseSolution({solution_id: $scope.currentSolution.id}, function(){
      $scope.showSolution = true;
      $scope.cancelTimer();
      $scope.currentSolution.purchased = true;
      $scope.$parent.selectedSolution.purchased = true;
      $scope.setOrginalOwnerDetails();
			$rootScope.setProfile();
    });
  }
  $scope.solutionHi5 = function(){
    Solution.solutionHi5({solution_id: $scope.currentSolution.id}, function(response){
      $scope.showSolution.hi5_count =  response.hi5_count;
      $scope.$parent.selectedSolution.hi5_count = response.hi5_count;
			$rootScope.setProfile();
    });
  }
  if($scope.$parent.selectedSolution) {
  	$scope.currentSolution = $scope.$parent.selectedSolution;
    $scope.currentChatMemberId = $scope.currentSolution.solution_owner_id;
    $scope.showSolution =  !$scope.currentSolution.previewed ||  $scope.currentSolution.current_user_is_solver || $scope.currentSolution.purchased;
    if(!$scope.currentSolution.previewed && !$scope.currentSolution.current_user_is_solver && !$scope.currentSolution.purchased)
    {
      $scope.setPreviewSolution();
      startTimer();
    }

  }
  function startTimer(){
  	timer = $timeout(function() {
      $scope.previewTime -= 1;
      if($scope.previewTime > -1)
      	startTimer();
      else{
      	$scope.previewTime = 0;
        $scope.$parent.closeSolutionModal();
      }
    }, 1000);
  }
  $scope.$on("$destroy", function( event ) {
 	   $scope.cancelTimer();
  });
  $scope.cancelTimer = function(){
  	$timeout.cancel( timer );
    if($scope.preview_set){
      $scope.currentSolution.previewed = true;
      $scope.$parent.selectedSolution.previewed = true;
    }
  }


	$scope.setOrginalOwnerDetails = function(){
    $scope.$parent.selectedSolution.solution_provide_id = $scope.currentSolution.solution_owner_id;
		$scope.$parent.selectedSolution.solution_provider_name = $scope.currentSolution.solution_owner;
  	$scope.$parent.selectedSolution.solver_image = $scope.currentSolution.solution_owner_image;
	}
  $scope.goTo = function(url){
    $scope.modal.remove();
    $scope.$parent.closeSolutionModal();
    $location.path(url);
  }

  $scope.setCurrentChatMember = function(user_id){
    $scope.currentChatMemberId = user_id;
  }
}
