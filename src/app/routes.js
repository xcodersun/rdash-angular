'use strict';

/**
 * Route configuration for the VivoDash module.
 */
angular.module('VivoDash')
.config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {

        // For unmatched routes
        $urlRouterProvider.otherwise('/sidebar');

        // Application routes
        $stateProvider
            .state('index', {
                abstract: true,
                views: {
                    '@' : {
                        templateUrl: 'templates/layout/layout.html',
                    },
                    'layout-left@index': {
                        templateUrl: 'templates/layout/left.html',
                    },
                    'layout-top@index': {
                        templateUrl: 'templates/layout/top.html',
                    },
                    'layout-middle@index': {
                        templateUrl: 'templates/layout/middle.html',
                    },
                    'layout-main@index': {
                        templateUrl: 'templates/layout/main.html',
                    },
                },
            })
            .state('sidebar', {
                parent: 'index',
                url: '/sidebar',
                templateUrl: 'templates/layout/sidebar.html',
            })
            .state('sidebar.home', {
                url: '/home/:title',
                views: {
                    'title@index' : {
                        templateUrl: 'templates/layout/title.html',
                        controller: 'TitleCtrl',
                    },
                    'detail@index' : {
                        templateUrl: 'templates/menu-home/home.html',
                    },
                },
            })
            .state('sidebar.account_company_profile', {
                url: '/account_company_profile/:title',
                views: {
                    'title@index' : {
                        templateUrl: 'templates/layout/title.html',
                        controller: 'TitleCtrl',
                    },
                    'detail@index' : {
                        templateUrl: 'templates/menu-account/account_company_profile.html'
                    },
                },
            })
            .state('sidebar.account_api_token', {
                url: '/account_api_token/:title',
                views: {
                    'title@index' : {
                        templateUrl: 'templates/layout/title.html',
                        controller: 'TitleCtrl',
                    },
                    'detail@index' : {
                        templateUrl: 'templates/menu-account/account_api_token.html'
                    },
                },
            })
            .state('sidebar.account_bill_plan', {
                url: '/account_bill_plan/:title',
                views: {
                    'title@index' : {
                        templateUrl: 'templates/layout/title.html',
                        controller: 'TitleCtrl',
                    },
                    'detail@index' : {
                        templateUrl: 'templates/menu-account/account_bill_plan.html'
                    },
                },
            })
    }
]).controller('TitleCtrl', ['$scope', '$stateParams', TitleCtrl])

function TitleCtrl($scope, $stateParams) {
    title = $stateParams.title;
    $scope.title = title.charAt(0).toUpperCase() + title.slice(1);
    switch (title) {
        case 'home':
            $scope.icon = 'fa fa-home';
            break;
        case 'account':
            $scope.icon = 'fa fa-user-circle-o';
            break;
    }
}
