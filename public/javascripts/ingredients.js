var recipe = angular.module('recipesGenerator', []);
recipe.config(function(){

});
recipe.controller('recipesController', function($scope){
	$scope.ingredients = [""];
	$scope.getIngredients = function(ingredients){
		jQuery.get('http://localhost:3000/rest/search/' + ingredients, function(recipes){
			$("#listOfRecipes").css('display', 'block');
			$scope.recipes = JSON.parse(recipes).recipes;
			console.log($scope.recipes);
			$scope.$apply();
		});
	}

	$scope.addIngredient = function(){
		var latestIngredient = $(".ingredient-search:last");
		if(latestIngredient.val().length > 0){
			(".alert").addClass("hidden");
			$scope.ingredients[$scope.ingredients.length - 1] = latestIngredient.val();
			$scope.ingredients.push("");	
		}
		else{
			$("#empty-input").removeClass('hidden');
		}
		
	}

});

