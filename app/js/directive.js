var ngcDirectives = angular.module("ngcDirectives", [])

// main header directive
.directive('dinnacoHeader', function() {
    return {
        restrict: 'A',
        templateUrl: 'partials/header.html'
    }
})
// login modal directive
.directive('loginModal', function() {
    return {
        restrict: 'A',
        templateUrl: 'partials/login-modal.html'
    }
})
// counselor switch modal directive
.directive('counselorSwitchModal', function() {
    return {
        restrict: 'A',
        templateUrl: 'partials/counselor-switch-step-modal.html'
    }
})
// new counselee directive
.directive('newCounselee', function() {
    return {
        restrict: 'A',
        templateUrl: 'partials/new-counselee-modal.html'
    }
})
// filters directive
.directive('filters', function() {
    return {
        restrict: 'A',
        templateUrl: 'partials/filters.html'
    }
})
// learn more modal directive
.directive('learnMoreModal', function() {
    return {
        restrict: 'A',
        templateUrl: 'partials/learn-more-modal.html'
    }
})
// select multi item
.directive('selectedItem', function() {
    return {
        restrict: 'A',
        scope: true,
        link: function(scope, elem, attr) {
            scope.selected = true;
            elem.on('click', function(e) {
                scope.selected = !scope.selected;
                
                if(scope.selected) {
                    scope.$emit('itemSelected', {index: attr.selectedItem})
                } else {
                    scope.$emit('itemRemoved', {index: attr.selectedItem})
                }
                scope.$apply();
            })
        }
    }
})
// adjust right side bg height
.directive('adjustBgHeight', function($window, $timeout) {
    return {
        restrict: 'A',
        link: function(scope, elem, attr) {
            $timeout(function() {
                scope.bgHeight = {'height': $('.view-sort-content').innerHeight()}
            }, 10)
        }
    }
})
// adjust right side bg height
.directive('adjustRightSideHeight', function($window, $timeout) {
    return {
        restrict: 'A',
        link: function(scope, elem, attr) {
            $(elem).on('click', function() {
                $timeout(function() {
                    scope.bgHeight = {'height': $('.view-left-side-col').innerHeight()}
                }, 30)
                scope.$apply();
            })
        }
    }
})
// adjust right side bg height
.directive('adjustPrefHeight', function($window, $timeout) {
    return {
        restrict: 'A',
        link: function(scope, elem, attr) {
            var pHeight = $window.innerHeight - 56;

            if($window.innerHeight > 677){
                scope.pHeight = {'height': pHeight}
            } else {
                scope.pHeight = {'height': 835}
            }
        }
    }
})
// adjust table height
.directive('adjustTableHeight', function($window, $timeout) {
    return {
        restrict: 'A',
        link: function(scope, elem, attr) {

            var width = 1800;
            scope.tableHeight = {'width': width}
            $timeout(function() {
                scope.tableHeight = {'width': 'auto'}
            }, 10)
        }
    }
})
// top margin height
.directive('stepModalHeight', function($window, $timeout) {
    return {
        restrict: 'A',
        link: function(scope, elem, attr) {
            $timeout(function() {
                if($window.innerHeight < 731) {
                    scope.isEnoughHeight = true;
                } else {
                    scope.isEnoughHeight = false;
                }
                
            }, 10)
        }
    }
})
// scroll side bar directive
.directive('scrollSidebar', function() {
    return {
        restrict: 'A',
        link: function(scope, elem, attr) {
            $(window).scroll(function() {
                elem.css('left', -$(this).scrollLeft() + "px");
            });
            
        }
    }
})
// counselor progress bar directive
.directive('counselorProgressBar', function() {
    return {
        restrict: 'A',
        link: function(scope, elem, attr) {
            $(elem).circleProgress(scope.$eval(attr.options));
        }
    }
})


