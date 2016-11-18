/**
 * Master Controller
 */

angular.module('RDash')
    .controller('MasterCtrl', ['$scope', '$cookieStore', MasterCtrl]);

function MasterCtrl($scope, $cookieStore) {
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
            if (angular.isDefined($cookieStore.get('accordion'))) {
                $scope.accordion = ! $cookieStore.get('accordion') ? false : true;
            } else {
                $scope.accordion = true;
            }
        } else {
            $scope.toggle = false;
            $scope.accordion = false;
        }

    });

    $scope.toggleSidebar = function() {
        $scope.toggle = !$scope.toggle;
        $cookieStore.put('toggle', $scope.toggle);
    };

    $scope.accordionSublist = function() {
        $scope.accordion = !$scope.accordion;
        $cookieStore.put('accordion', $scope.accordion);
    }

    window.onresize = function() {
        $scope.$apply();
    };
}