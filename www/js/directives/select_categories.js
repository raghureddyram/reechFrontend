reech.directive('selectCategories', function($ionicModal, $cordovaContacts, $state, $stateParams, $filter, $location){
	return{
		restrict: 'A',
		scope: false,
		link: function($scope, element, attrs){	
			$scope.selectedCategoryId =  $stateParams.categoryId ? $stateParams.categoryId : '';
		  $scope.openCategoriesModel = function() {
				$ionicModal.fromTemplateUrl('templates/select_categories.html', {
					scope: $scope,
					animation: 'slide-in-left'
				}).then(function(modal) {
					$scope.categoriesModal = modal;
					$scope.categoriesModal.show();
				});
			};
			$scope.closeCategoriesModel = function() {
				if($scope.categoriesModal != undefined)
					$scope.categoriesModal.remove();
			};
			$scope.$on('categoriesModal.hidden', function() {
				$scope.categoriesModal.remove();
			});			

		  var index;
		  $scope.selectedCategories = localStorage.selectedCategoriesIds != undefined ? JSON.parse(localStorage.selectedCategoriesIds) : [];
			$scope.addCategory = function(category_id){				
				index = $scope.selectedCategories.indexOf(category_id);
				if(index < 0)
					$scope.selectedCategories.push(category_id);
				else
					$scope.selectedCategories.splice(index, 1);								
			}
			
			$scope.isCategorySelected = function(category_id){
				return (localStorage.selectedCategoriesIds.indexOf(category_id+"") > -1);
			}
			
			$scope.selectAllCategories = function(){
				var selectedCategories = [];
				$scope.allCategories = JSON.parse(localStorage.categories);
				angular.forEach($scope.allCategories, function(data){
					selectedCategories.push(data.id);
				});
				localStorage.selectedCategoriesIds = JSON.stringify(selectedCategories);
				$scope.categories = $scope.allCategories;				
				$scope.closeCategoriesModel();	
			}
      $scope.submit = function(){
      	localStorage.selectedCategoriesIds = JSON.stringify($scope.selectedCategories);
      	$scope.filterCategories();
      }
			$scope.filterCategories = function(){				
				$scope.selectedCategories = localStorage.selectedCategoriesIds != undefined ? JSON.parse(localStorage.selectedCategoriesIds) : [];
				$scope.allCategories = localStorage.categories != undefined ? JSON.parse(localStorage.categories) : [];
				$scope.categories = $filter('columnIn')($scope.allCategories, 'id', $scope.selectedCategories);
				$scope.closeCategoriesModel();
			}
			$scope.filterCategories();
			$scope.loadQuestions = function(categoryId) {
				if(categoryId == null)
					$location.path("/questions");
				else
  				$location.path("categories/" + categoryId + "/questions");								
			}
		}
	};
});