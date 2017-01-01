'use strict';

/**
 * Route configuration for the VivoDash module.
 */
angular.module('VivoDash').config(['$stateProvider', '$urlRouterProvider',
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
            .state('sidebar.account_company_profile', {
                url: '/account_company_profile',
                views: {
                    'detail@index' : {
                        templateUrl: 'templates/menu-account/account_company_profile.html'
                    },
                },
            })
            .state('sidebar.account_api_token', {
                url: '/account_api_token',
                views: {
                    'detail@index' : {
                        templateUrl: 'templates/menu-account/account_api_token.html'
                    },
                },
            })
            .state('sidebar.account_bill_plan', {
                url: '/account_bill_plan',
                views: {
                    'detail@index' : {
                        templateUrl: 'templates/menu-account/account_bill_plan.html'
                    },
                },
            })
    }
]);
