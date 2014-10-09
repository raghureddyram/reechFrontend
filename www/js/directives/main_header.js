reech.directive('mainHeader',function($state, $ionicModal, $rootScope, $filter){
  return{
    restrict : 'E',
    scope: true,
    templateUrl: 'templates/main_header.html',
    link: function(scope, element, attrs){
    	 $rootScope.openProfileModal = function(profileId) {
		    $rootScope.currentProfileId = profileId;
		    $ionicModal.fromTemplateUrl('templates/profile.html', {
		      scope: $rootScope,
		      animation: 'slide-in-left'
		    }).then(function(modal) {
		      $rootScope.profileModal = modal;
		      $rootScope.profileModal.show();
		    });
		  };
      $rootScope.selectCategoriesModal = function(){
        if($rootScope.currentState == 'questions' || $rootScope.currentState == 'category_questions') {
          var selectedCategories = localStorage.selectedCategoriesIds != undefined ? JSON.parse(localStorage.selectedCategoriesIds) : [];
          var allCategories = localStorage.categories != undefined ? JSON.parse(localStorage.categories) : [];
          var categories = $filter('columnIn')(allCategories, 'id', selectedCategories);
          alert("open modal");
        }
      }
    }
  }
});
