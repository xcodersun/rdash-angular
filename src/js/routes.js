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
            .state('channels_summary', {
                url: '/channels_summary',
                templateUrl: 'templates/MenuChannels/channels_summary.html'
            })
            .state('channels_new_channel', {
                url: '/channels_new_channel',
                templateUrl: 'templates/MenuChannels/channels_new_channel.html'
            })
            .state('channels_view_channel', {
                url: '/channels_view_channel',
                templateUrl: 'templates/MenuChannels/channels_view_channel.html'
            })
            .state('devices_summary', {
                url: '/devices_summary',
                templateUrl: 'templates/MenuDevices/devices_summary.html'
            })
            .state('devices_explore', {
                url: '/devices_explore',
                templateUrl: 'templates/MenuDevices/devices_explore.html'
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
