(function() {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

ToBuyController.$inject = ['ShoppingListCheckOffService'];
AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];

function ToBuyController (ShoppingListCheckOffService) {
	var toBuy = this;

	toBuy.toBuyItems = ShoppingListCheckOffService.getToBuyItems();
	

	toBuy.boughtItem = function (itemIndex) {
		ShoppingListCheckOffService.boughtItem(itemIndex);
	}

	toBuy.isListEmpty = function (list) {
		return ShoppingListCheckOffService.isListEmpty(list);
	}

};

function AlreadyBoughtController (ShoppingListCheckOffService) {
	var alreadyBought = this;

	alreadyBought.alreadyBoughtItems = ShoppingListCheckOffService.getAlreadyBoughtItems();

	alreadyBought.isListEmpty = function (list) {
		return ShoppingListCheckOffService.isListEmpty(list);
	}
};


function ShoppingListCheckOffService() {
	var service = this;

	var toBuyItems = [
			{name: '1 cookie'}, 
			{name: '1 piece of gum'}, 
			{name: '1 bottle of peptobismol'}, 
			{name: '1 chip'}, 
			{name: '1 apple'}, 
			{name: '1 m-and-m'}, 
			{name: '1 slice of cheese'}, 
			{name: '1234 bags of garlic'}
			];
	var alreadyBoughtItems = [];

	service.getToBuyItems = function () {
		console.log("getToBuyItems executed");
		return toBuyItems;
	}

	service.getAlreadyBoughtItems = function () {
		return alreadyBoughtItems;
	}

	service.boughtItem = function (index) {
		alreadyBoughtItems.push(toBuyItems[index]);
		toBuyItems.splice(index,1);
	}

	service.isListEmpty = function (list) {
		return list.length === 0 ? true : false;
	}



};

})();