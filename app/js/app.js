/* JS for angular app */

var app = angular.module('app', 
    ['ngRoute', 'ngSanitize', 'ngTouch', 'ngcControllers', 'ngcDirectives', 'ngcServices', 'ngcfilters', 'slick', 
    'angular-click-outside', 'ngDropdowns', 'angular-svg-round-progressbar', 'angularUtils.directives.dirPagination', 
    'ngCsv', 'ngTablescroll'])

.config(['$routeProvider', '$compileProvider', function($routeProvide, $compileProvider) {
    $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|javascript):/);

    $routeProvide
        .when("/login", {
            templateUrl: "partials/login.html",
            controller: 'loginCtrl'
        })
        .when("/dashboard-counselee", {
            templateUrl: "partials/dashboard-counselee.html",
            controller: 'dashboardCtrl'
        })
        .when("/dashboard-counselor", {
            templateUrl: "partials/dashboard-counselor.html",
            controller: 'dashboardCtrl'
        })
        .when("/dashboard-counselee/:quizTaken", {
            templateUrl: "partials/dashboard-counselee.html",
            controller: 'dashboardCtrl'
        })
        .when("/dashboard-talent", {
            templateUrl: "partials/dashboard-talent.html",
            controller: 'dashboardCtrl'
        })
        .when("/preference", {
            templateUrl: "partials/preference-quiz.html",
            controller: 'preferenceQuizCtrl'
        })
        .when("/update-profile", {
            templateUrl: "partials/update-profile.html",
            controller: 'updateProfileCtrl'
        })
        .when("/update-profile-counselor", {
            templateUrl: "partials/update-profile-counselor.html",
            controller: 'updateProfileCtrl'
        })
        .when("/view-sort-matches", {
            templateUrl: "partials/view-sort-matches.html",
            controller: 'viewSortMatchesCtrl'
        })
        .when("/export-preview", {
            templateUrl: "partials/export-preview.html",
            controller: 'exportPreviewCtrl'
        })
        .when("/review-requests", {
            templateUrl: "partials/review-requests.html",
            controller: 'reviewRequestCtrl'
        })
    .otherwise({
        redirectTo: '/login'
    });
}])


//global event handler  
.run(function($rootScope, $window, $location, $timeout) {
    $rootScope.go = function(path) {
        $rootScope.app;
        if (path === 'back') { // Allow a 'back' keyword to go to previous page
            $window.history.back();
        } else { // Go to the specified path
            $location.path(path);
        };
    };

})

