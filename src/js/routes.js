'use strict';

/**
 * Route configuration for the RDash module.
 */
angular.module('RDash').config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {

        // For unmatched routes
        $urlRouterProvider.otherwise('/');

        // Application routes
        $stateProvider
            .state('index', {
                url: '/',
                templateUrl: 'templates/home.html'
            })
            .state('account', {
                url: '/account',
                templateUrl: 'templates/account.html'
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
