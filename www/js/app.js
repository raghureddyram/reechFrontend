// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
reech = angular.module('reech', ['ionic', 'ngResource'])

reech.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

reech.config(function ($stateProvider, $urlRouterProvider) {

    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider
       .state('reech', {
            url: '/reech',
            abstract: true,
            templateUrl: 'templates/reech.html'
        })

        .state('reech.questions', {
            url: '/questions',
            views: {
                'reech-questions': {
                    templateUrl: 'templates/questions.html',
                    controller: 'questionsCtrl'
                }
            }
        })

        .state('reech.friends', {
            url: '/friends',
            views: {
                'reech-friends': {
                    templateUrl: 'templates/friends.html',
                    controller: 'friendsCtrl'
                }
            }  
        })
        .state('leader_board', {
            url: '/leader_board/:boardType',
            templateUrl: 'templates/leader_board.html',
            controller: 'leaderBoardCtrl'
        });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/reech/questions');

});
