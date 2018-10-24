(function () {
  'use strict';

  angular.module('app', ['restmod', 'ngRoute', 'ngTable', 'ui.router'])

    .factory('Produtos', function (restmod) {
      return restmod.model('http://localhost:4000/produto');
    })

    .controller('ProdutoListaController', function ($scope, Produtos, $state, $location) {

      $scope.title = 'Lista de Produtos';

      $scope.produtos = [];
      $scope.produto = [];
      $scope.selectedProduto = {};
      $scope.selectedProdutoChanged = selectedProdutoChanged;

      activate();

      $scope.apagar = function (id) {
        Produtos.$find(id).$then(function (produto) {
          produto.$destroy();
        });
      }

      $scope.visibilidade = function (produto) {
        produto.del = true;
      }

      function activate() {
        Produtos.$search().$then(function (produtos) {
          $scope.produtos = produtos;
        });
      }

      function selectedProdutoChanged(id) {
        $scope.selectedProduto.id = id;
        $scope.selectedProduto = _.find($scope.produtos, function (produto) {
          return produto.id === $scope.selectedProduto.id;
        });
        $scope.produto = $scope.selectedProduto;
        console.log($scope.selectedProduto.nome);
      }
    })

    .controller('ProdutoNovoController', function ($scope, Produtos, $location) {
      $scope.title = 'Novo Produto';

      $scope.submit = function (produto) {
        salvar(produto);
        $location.path("/");
        return true;
      }

      function salvar(prd) {

        var newProduto = Produtos.$build({
          nome: prd.nome,
          codbarras: prd.codbarras,
          descricao: prd.descricao,
          quantidade: prd.quantidade,
          categoria: prd.categoria
        });

        newProduto.$save();
        Produtos.$search().$then(function (produtos) {
          $scope.produtos = produtos;
        });
      }

    })

    .controller('ProdutoDetalheController', function ($scope, Produtos, $routeParams, $location, $state, $injector) {
      $scope.produto = [];
      $scope.title = 'Detalhes do Produto';

      Produtos.$find($routeParams.id).$then(function (produto) {
        $scope.produto = produto;
        console.log($scope.produto.nome);
      });

      $scope.submit = function (produto) {
        salvar(produto);
        return true;
      }

      function salvar(prd) {
        Produtos.$find($routeParams.id).$then(function (produto) {
          $scope.produto = produto;
          $scope.produto.nome = prd.nome;
          $scope.produto.codbarras = prd.codbarras;
          $scope.produto.descricao = prd.descricao;
          $scope.produto.quantidade = prd.quantidade;
          $scope.produto.categoria = prd.categoria;
          $scope.produto.$save();
          Produtos.$search().$then(function (produtos) {
            $scope.produtos = produtos;
            $location.path("/produtos");
          });
        });
      }
    })
})();