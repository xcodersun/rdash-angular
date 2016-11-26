'use strict';

/**
 * Route configuration for the VivoDash module.
 */
angular.module('VivoDash').config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {

        // For unmatched routes
        $urlRouterProvider.otherwise('/');

        // Application routes
        $stateProvider
            .state('index', {
                url: '/',
                templateUrl: 'templates/home.html'
            })
            .state('account_company_profile', {
                url: '/account_company_profile',
                templateUrl: 'templates/MenuAccount/account_company_profile.html'
            })
            .state('account_api_token', {
                url: '/account_api_token',
                templateUrl: 'templates/MenuAccount/account_api_token.html'
            })
            .state('account_bill_plan', {
                url: '/account_bill_plan',
                templateUrl: 'templates/MenuAccount/account_bill_plan.html'
            })
            .state('channels', {
                url: '/channels',
                templateUrl: 'templates/channels.html'
            })
            .state('devices', {
                url: '/devices',
                templateUrl: 'templates/devices.html'
            })
            .state('dashboards', {
                url: '/dashboards',
                templateUrl: 'templates/dashboards.html'
            })
            .state('security', {
                url: '/security',
                templateUrl: 'templates/security.html'
            })
            .state('auditlog', {
                url: '/auditlog',
                templateUrl: 'templates/audit_log.html'
            });
    }
]);
