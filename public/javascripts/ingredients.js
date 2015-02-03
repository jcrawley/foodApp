var recipe = angular.module('recipesGenerator', ['ngTouch']);
recipe.config(function(){

});
recipe.controller('recipesController', function($scope){
	$scope.ingredients = [""];
	$scope.getRecipes= function(){
		var ingredients = $($(".ingredient-search")[0]).val();
		jQuery.get('http://localhost:3000/rest/search/' + ingredients, function(recipes){
			$("#listOfRecipes").css('display', 'block');
			$scope.recipes = JSON.parse(recipes).recipes;
			console.log($scope.recipes);
			$scope.$apply();

			$(".recipeCard:first").addClass('current');
			$scope.addClickTracker();
			$(".container2").css('margin-top', '5%');
			$("#title-text p").html("Not what you're looking for, try other ingredients");
		});
	}

	$scope.addClickTracker = function(){
		var recipeCard = $($(".recipeCard.current")[0]);
		recipeCard.on("touchstart", function(){

	        recipeCard.data('mouseX', event.changedTouches[0].clientX);
	        recipeCard.data('mouseY', event.changedTouches[0].clientY); 
	        console.log(event.changedTouches[0].clientX); 
			recipeCard.on('touchmove', function(){

				var changeX = event.changedTouches[0].clientX - recipeCard.data('mouseX');
	            var changeY = event.changedTouches[0].clientY - recipeCard.data('mouseY');

	            var newX = parseInt(recipeCard.css('left')) + changeX;
	            var newY = parseInt(recipeCard.css('top')) + changeY;
	            
	            console.log(recipeCard.data('mouseX'));
	            recipeCard.css('left', newX);
	            recipeCard.css('top', newY);
	        
	            recipeCard.data('mouseX', event.changedTouches[0].clientX);
	            recipeCard.data('mouseY', event.changedTouches[0].clientY);

			});
			recipeCard.on("touchend", function(){
				recipeCard.off('touchend');
				recipeCard.css('left', 0);
	            recipeCard.css('top', 0);
			})
		});
		$scope.expand = function(){

		}
		$scope.next = function(){
			recipeCard.remove();
			$(".recipeCard:first").addClass("current");
			$scope.addClickTracker();
		}

	};

	// $scope.addIngredient = function(e){
	// 	var textbox = e.path[2];
	// 	var buttonText = e.path[0].innerText;
	// 	console.log(textbox);
	// 	var latestIngredient = $(".ingredient-search:last");
	// 	if(buttonText.charCodeAt(0) === 43){
			
	// 		if(latestIngredient.val().length > 0){
	// 			$(".alert").addClass("hidden");
	// 			$scope.ingredients[$scope.ingredients.length - 1] = latestIngredient.val();
	// 			$scope.ingredients.push("");	
	// 		}
	// 		else{
	// 			$("#empty-input").removeClass('hidden');
	// 		}
	// 	}
	// 	else{
	// 		var deleteIngredient = $(textbox.childNodes[0]).val();
	// 		textbox.remove();
	// 		$scope.ingredients.splice($.inArray(deleteIngredient, $scope.ingredients), 1, latestIngredient.val());
	// 	}
		
		
	// }

});

