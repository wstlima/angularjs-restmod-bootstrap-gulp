(function() {
    'use strict';
  
    angular.module('app')
      .config(function($routeProvider) {
        $routeProvider
        
          .when('/produtos', {
            templateUrl: '/views/lista.html',
            controller: 'ProdutoListaController'
          })

          .when('/produtos/novo', {
            templateUrl: '/views/novo.html',
            controller: 'ProdutoNovoController'
          })   

          .when('/produtos/:id', {
            templateUrl: '/views/novo.html',
            controller: 'ProdutoDetalheController'
          })
          
          
          .otherwise({
            redirectTo: '/produtos'
          }
          
          );

      });
  })();