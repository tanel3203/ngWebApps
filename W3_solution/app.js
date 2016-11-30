(function() {
'use strict';

angular.module('narrowitdownapp', [])
  .controller('NarrowItDownController', NarrowItDownController)
  .service('MenuSearchService', MenuSearchService)
  .directive('foundItems', FoundItemsDirective);



  function FoundItemsDirective () {
  	var ddo = {
  		templateUrl: 'narrowed.html',
  		scope: {
  			found: '<',
  			onRemove: "&"
  		},
  		controller: NarrowItDownController,
  		controllerAs: 'list',
  		bindToController: true
  	};

  	return ddo;

  }

  NarrowItDownController.$inject = ['MenuSearchService'];

  function NarrowItDownController (MenuSearchService) {
  	var narrowItDown = this;

  	narrowItDown.dataInput;

  	narrowItDown.findData = function () {
  	  console.log("Clicked");
  	  var promise = MenuSearchService.getMatchedMenuItems(narrowItDown.dataInput);

  	  promise.then(function (response) {
  	  	narrowItDown.found = response;

  	  	console.log("Vastus: ", response);
  	  })
  	  .catch(function (error) {
  	  	console.log("Something went terribly wrong");
  	  })
  	};

  	narrowItDown.remove = function (itemIndex) {
  		console.log("Remove this one: ", itemIndex);
  		narrowItDown.found.splice(itemIndex,1);
  	};

  };


  MenuSearchService.$inject = ['$http'];

  function MenuSearchService ($http) {
  	var service = this;

  	service.getMatchedMenuItems = function (searchTerm) {
        return $http({
        	method: "GET",
        	url: ("https://davids-restaurant.herokuapp.com/menu_items.json")
        }).then(function (result) {
        // process result and only keep items that match
        var foundItems = [];
        var resultItems = result.data.menu_items;
        for (var i = 0; i < resultItems.length; i++) {
        	if (resultItems[i].name.indexOf(searchTerm) !== -1) {
        		foundItems.push(resultItems[i]);
        	}
        }
        console.log(foundItems);
        // return processed items
        return foundItems;
        });
  	}

  };



})();