var myApp = angular.module('myApp', ['ngRoute']);

myApp.config(function($routeProvider) {
    $routeProvider
        .when('/profile', {
            templateUrl: 'partials/home.html',
            access: { restricted: true }
        })
        .when('/login', {
            templateUrl: 'partials/login.html',
            controller: 'loginController',
            access: { restricted: false }
        })
        .when('/logout', {
            controller: 'logoutController',
            access: { restricted: true }
        })
        .when('/register', {
            templateUrl: 'partials/register.html',
            controller: 'registerController',
            access: { restricted: false }
        })
        .when('/subjects', {
            templateUrl: 'partials/subjects.html',
            access: {restricted: true}
          })
        .when('/classes', {
            templateUrl: 'partials/classes.html',
            access: {restricted: true}
          })
          .when('/attend', {
            templateUrl: 'partials/attend.html',
            access: {restricted: true}
          })
          .when('/attended', {
            templateUrl: 'partials/attended.html',
            access: {restricted: true}
          })
          .when('/option', {
            templateUrl: 'partials/option.html',
            access: {restricted: true}
          })
          .when('/check', {
            templateUrl: 'partials/check.html',
            access: {restricted: true}
          })
        .otherwise({
            redirectTo: '/login'
        });
});

myApp.run(function($rootScope, $location, $route, AuthService) {
    $rootScope.$on('$routeChangeStart',
        function(event, next, current) {
            AuthService.getUserStatus()
                .then(function() {
                    if (next.access.restricted && !AuthService.isLoggedIn()) {
                        $location.path('/login');
                        $route.reload();
                    }
                });
        });
});