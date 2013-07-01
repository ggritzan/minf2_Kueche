function RecipeManager(jRecipes, actRecipe, counter, points){

    this.render = function(){
        // Referenz auf das ul Element holen

        var currentRecipe = document.querySelector('#currentRecipe');
        var recipeMenu = document.querySelector('#recipeMenu');
       // var rezeptDetailsElement = document.querySelector('#rezeptdetails');

        recipeMenu.innerHTML = ' ';
        currentRecipe.innerHTML = ' ';

        var scoreElement = document.createElement('h1');
        var score = document.createTextNode(jRecipes.recipeHeadlines.scoreHeadline);

        scoreElement.appendChild(score);
        currentRecipe.appendChild(scoreElement);

        var pointsElement = document.createElement('p');
        var pointsItem = document.createTextNode(points);

        pointsElement.appendChild(pointsItem);
        currentRecipe.appendChild(pointsElement);

        var headlineElement = document.createElement('h1');
        var headline = document.createTextNode(actRecipe.name);

        // text an das h1 anhängen
        headlineElement.appendChild(headline);

        // h1 ins DOM einfügen
        currentRecipe.appendChild(headlineElement);

        var ingredientsHeadlineElement = document.createElement('h2');
        var ingredientsHeadline = document.createTextNode(jRecipes.recipeHeadlines.ingredientsHeadline);

        ingredientsHeadlineElement.appendChild(ingredientsHeadline);
        currentRecipe.appendChild(ingredientsHeadlineElement);

        var ingredientListElement = document.createElement('ul');

        actRecipe.ingredients.forEach(function(ingr) {
            var listItem = document.createElement('li');
            var ingredientText = document.createTextNode(ingr);
            listItem.appendChild(ingredientText);
            ingredientListElement.appendChild(listItem);
        });

        currentRecipe.appendChild(ingredientListElement);

        var currentTaskHeadElement = document.createElement('h2');
        var currentTaskHead = document.createTextNode(jRecipes.recipeHeadlines.currentTaskHeadline);

        currentTaskHeadElement.appendChild(currentTaskHead);
        currentRecipe.appendChild(currentTaskHeadElement);

        var currentTaskElement = document.createElement('p');
        var currentTaskItem = document.createTextNode(actRecipe.tasks[counter].message);

        currentTaskElement.appendChild(currentTaskItem);
        currentRecipe.appendChild(currentTaskElement);

        /*// li beim Eventhandler registrieren
        headlineElement.addEventListener('click', function() {

            // alle Kinderelemente löschen
            rezeptDetailsElement.innerHTML = ' ';

            var rezeptDetails = new RecipeDetails(rezeptDetailsElement, recipe);

            // rendern
            rezeptDetails.render();

        });*/
    }
}

