/**
 * Master Controller
 */

angular.module('VivoDash')
    .controller('Navigation', ['$scope', '$cookieStore', Navigation]);

function Navigation($scope, $cookieStore) {
    /**
     * Sidebar Toggle & Cookie Control
     */
    var mobileView = 992;

    $scope.getWidth = function() {
        return window.innerWidth;
    };

    $scope.$watch($scope.getWidth, function(newValue, oldValue) {
        if (newValue >= mobileView) {
            if (angular.isDefined($cookieStore.get('toggle'))) {
                $scope.toggle = ! $cookieStore.get('toggle') ? false : true;
            } else {
                $scope.toggle = true;
            }
            if (angular.isDefined($cookieStore.get('navAccount'))) {
                $scope.navAccount = ! $cookieStore.get('navAccount') ? false : true;
            } else {
                $scope.navAccount = true;
            }
            if (angular.isDefined($cookieStore.get('navChannels'))) {
                $scope.navChannels = ! $cookieStore.get('navChannels') ? false : true;
            } else {
                $scope.navChannels = true;
            }
            if (angular.isDefined($cookieStore.get('navDevices'))) {
                $scope.navDevices = ! $cookieStore.get('navDevices') ? false : true;
            } else {
                $scope.navDevices = true;
            }
            if (angular.isDefined($cookieStore.get('navDashboards'))) {
                $scope.navDashboards = ! $cookieStore.get('navDashboards') ? false : true;
            } else {
                $scope.navDashboards = true;
            }
            if (angular.isDefined($cookieStore.get('navSecurity'))) {
                $scope.navSecurity = ! $cookieStore.get('navSecurity') ? false : true;
            } else {
                $scope.navSecurity = true;
            }
            if (angular.isDefined($cookieStore.get('navAuditLog'))) {
                $scope.navAuditLog = ! $cookieStore.get('navAuditLog') ? false : true;
            } else {
                $scope.navAuditLog = true;
            }
        } else {
            $scope.toggle = false;
            $scope.navAccount = false;
            $scope.navChannels = false;
            $scope.navDevices = false;
            $scope.navDashboards = false;
            $scope.navSecurity = false;
            $scope.navAuditLog = false;
        }
    });

    $scope.toggleSidebar = function() {
        $scope.toggle = !$scope.toggle;
        $cookieStore.put('toggle', $scope.toggle);
    };

    $scope.toggleNavAccount = function() {
        $scope.navAccount = !$scope.navAccount;
        $cookieStore.put('navAccount', $scope.navAccount);
    }

    $scope.toggleNavChannels = function() {
        $scope.navChannels = !$scope.navChannels;
        $cookieStore.put('navChannels', $scope.navChannels);
    }

    $scope.toggleNavDevices = function() {
        $scope.navDevices = !$scope.navDevices;
        $cookieStore.put('navDevices', $scope.navDevices);
    }

    $scope.toggleNavDashboards = function() {
        $scope.navDashboards = !$scope.navDashboards;
        $cookieStore.put('navDashboards', $scope.navDashboards);
    }

    $scope.toggleNavSecurity = function() {
        $scope.navSecurity = !$scope.navSecurity;
        $cookieStore.put('navSecurity', $scope.navSecurity);
    }

    $scope.toggleNavAuditLog = function() {
        $scope.navAuditLog = !$scope.navAuditLog;
        $cookieStore.put('navAuditLog', $scope.navAuditLog);
    }
    window.onresize = function() {
        $scope.$apply();
    };
}