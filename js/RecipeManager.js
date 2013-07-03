function RecipeManager(jRecipes, actRecipe, counter, points){

    this.render = function(){

        if(actRecipe.tasks.length > counter){

            var currentRecipe = document.querySelector('#currentRecipe');
            var recipeMenu = document.querySelector('#recipeMenu');
            var tutorial = document.querySelector('#tutorial');
            var lang = document.querySelector('#language');

            lang.innerHTML = ' ';
            tutorial.innerHTML = ' ';
            recipeMenu.innerHTML = ' ';
            currentRecipe.innerHTML = ' ';

            if(actRecipe.id == 0){

                var headlineElement = document.createElement('h1');
                var headline = document.createTextNode(actRecipe.name);

                headlineElement.appendChild(headline);
                currentRecipe.appendChild(headlineElement);

                var tutorialExplanationElement = document.createElement('p');
                var tutorialExplanation = document.createTextNode(jRecipes.tutorial.explanation);

                tutorialExplanationElement.appendChild(tutorialExplanation);
                currentRecipe.appendChild(tutorialExplanationElement);

            }

            var scoreElement = document.createElement('h1');
            var score = document.createTextNode(jRecipes.recipeHeadlines.scoreHeadline);

            scoreElement.appendChild(score);
            currentRecipe.appendChild(scoreElement);

            if(actRecipe.id == 0){
                var scoreExplanationElement = document.createElement('p');
                var scoreExplanation = document.createTextNode(jRecipes.tutorial.score);

                scoreExplanationElement.appendChild(scoreExplanation);
                currentRecipe.appendChild(scoreExplanationElement);
            }

            var pointsElement = document.createElement('p');
            var pointsItem = document.createTextNode(points);

            pointsElement.appendChild(pointsItem);
            currentRecipe.appendChild(pointsElement);

            if(actRecipe.id != 0){

                var headlineElement = document.createElement('h1');
                var headline = document.createTextNode(actRecipe.name);

                headlineElement.appendChild(headline);
                currentRecipe.appendChild(headlineElement);

                if(actRecipe.video != null){

                    var videoElement = document.createElement('video');
                    videoElement.setAttribute('src', actRecipe.video.src);
                    videoElement.setAttribute('type', actRecipe.video.type);
                    videoElement.width = 300;
                    videoElement.controls = actRecipe.video.controls;
                    currentRecipe.appendChild(videoElement);

                }

            }

            var ingredientsHeadlineElement = document.createElement('h2');
            var ingredientsHeadline = document.createTextNode(jRecipes.recipeHeadlines.ingredientsHeadline);

            ingredientsHeadlineElement.appendChild(ingredientsHeadline);
            currentRecipe.appendChild(ingredientsHeadlineElement);

            if(actRecipe.id == 0){
                var ingredientsExplanationElement = document.createElement('p');
                var ingredientsExplanation = document.createTextNode(jRecipes.tutorial.ingredients);

                ingredientsExplanationElement.appendChild(ingredientsExplanation);
                currentRecipe.appendChild(ingredientsExplanationElement);
            }

            var ingredientListElement = document.createElement('ul');

            actRecipe.ingredientList.forEach(function(ingr) {
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
        } else {

            var currentRecipe = document.querySelector('#currentRecipe');
            var recipeMenu = document.querySelector('#recipeMenu');
            var tutorial = document.querySelector('#tutorial');

            tutorial.innerHTML = ' ';
            recipeMenu.innerHTML = ' ';
            currentRecipe.innerHTML = ' ';

        }

    }
}

