var app = angular.module('Vidzy', ['ngResource', 'ngRoute']);

app.config(['$routeProvider', function($routeProvider){
    $routeProvider
        .when('/', {
            templateUrl: 'partials/fake.html'
        })
        .when('/login', {
            templateUrl: 'partials/login.html'
        })
        .when('/home', {
            templateUrl: 'partials/home.html',
    		controller: 'HomeCtrl'
        })
        .when('/add-project', {
            templateUrl: 'partials/project-form.html',
            controller: 'AddProjectCtrl'
        })
        .when('/project/:id', {
        	templateUrl: 'partials/project-form.html',
        	controller: 'EditProjectCtrl'
    	})
    	.when('/project/delete/:id', {
        templateUrl: 'partials/project-delete.html',
        controller: 'DeleteProjectCtrl'
    })
        .otherwise({
            redirectTo: '/'
        });
}]);

app.controller('HomeCtrl', ['$scope', '$resource', 
    function($scope, $resource){
    	var Project = $resource('/api/project');
        Project.query(function(project){
            $scope.project = project;
        });
    }]);

app.controller('AddProjectCtrl', ['$scope', '$resource', '$location',
    function($scope, $resource, $location){
        $scope.save = function(){
            var Project = $resource('/api/project');
            Project.save($scope.project, function(){
                $location.path('/');
            });
        };
    }]);

app.controller('EditProjectCtrl', ['$scope', '$resource', '$location', '$routeParams',
    function($scope, $resource, $location, $routeParams){	
        var Project = $resource('/api/project/:id', { id: '@_id' }, {
            update: { method: 'PUT' }
        });

        Project.get({ id: $routeParams.id }, function(project){
            $scope.project = project;
        });

        $scope.save = function(){
            Project.update($scope.project, function(){
                $location.path('/');
            });
        }
    }]);

app.controller('DeleteProjectCtrl', ['$scope', '$resource', '$location', '$routeParams',
    function($scope, $resource, $location, $routeParams){
        var Project = $resource('/api/project/:id');

        Project.get({ id: $routeParams.id }, function(project){
            $scope.project = project;
        })

        $scope.delete = function(){
            Project.delete({ id: $routeParams.id }, function(project){
                $location.path('/');
            });
        }
    }]);



