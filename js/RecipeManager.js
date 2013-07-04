/**
 * The RecipeManager is used to show the current recipe in the HTML, hence the user can see which is the current task,
 * which are the ingredients needed for the recipe and his/her score.
 *
 * @param jRecipes - a kitchen attribute that has all recipes from a JSON file, it is used here to set the headlines
 * @param actRecipe - a kitchen attribute that has the selected recipe, it is used to set the current task and the
 *                      ingredients used for the current recipe
 * @param counter - a kitchen attribute that shows the current step number
 * @param points - a kitchen attribute with the current score of the user
 */

function RecipeManager(jRecipes, actRecipe, counter, points){

    /**
     * The function 'render' renders the current recipe in the HTML
     */

    this.render = function(){

        // if the current recipe is not done
        if(actRecipe.tasks.length > counter){


            // reference from DOM
            var currentRecipe = document.querySelector('#currentRecipe');
            var recipeMenu = document.querySelector('#recipeMenu');
            var tutorial = document.querySelector('#tutorial');
            var lang = document.querySelector('#language');

            // delete containers
            lang.innerHTML = ' ';
            tutorial.innerHTML = ' ';
            recipeMenu.innerHTML = ' ';
            currentRecipe.innerHTML = ' ';


            // if current recipe is the tutorial recipe (ID: 0)
            if(actRecipe.id == 0){

                // create a new headline 1 element
                var headlineElement = document.createElement('h1');
                // add the name of the tutorial to it
                var headline = document.createTextNode(actRecipe.name);

                // append child elements
                headlineElement.appendChild(headline);
                currentRecipe.appendChild(headlineElement);

                // creates new paragraph element
                var tutorialExplanationElement = document.createElement('p');
                // adds the explanation to the tutorial
                var tutorialExplanation = document.createTextNode(jRecipes.tutorial.explanation);

                // append child elements
                tutorialExplanationElement.appendChild(tutorialExplanation);
                currentRecipe.appendChild(tutorialExplanationElement);

            }

            // the score title as a headline 1 element
            var scoreElement = document.createElement('h1');
            var score = document.createTextNode(jRecipes.recipeHeadlines.scoreHeadline);

            // append child elements
            scoreElement.appendChild(score);
            currentRecipe.appendChild(scoreElement);

            // if current recipe is the tutorial recipe
            if(actRecipe.id == 0){
                // creates a score explanation as a paragraph element
                var scoreExplanationElement = document.createElement('p');
                var scoreExplanation = document.createTextNode(jRecipes.tutorial.score);

                // append child elements
                scoreExplanationElement.appendChild(scoreExplanation);
                currentRecipe.appendChild(scoreExplanationElement);
            }

            // creates a paragraph element with the user score
            var pointsElement = document.createElement('p');
            var pointsItem = document.createTextNode(points);

            // append child elements
            pointsElement.appendChild(pointsItem);
            currentRecipe.appendChild(pointsElement);

            // if the current recipe is not the tutorial recipe
            if(actRecipe.id != 0){

                // creates a headline 1 element with the recipe name
                var headlineElement = document.createElement('h1');
                var headline = document.createTextNode(actRecipe.name);

                headlineElement.appendChild(headline);
                currentRecipe.appendChild(headlineElement);

                // if the recipe has a video add it to the DOM
                if(actRecipe.video != null){

                    var videoElement = document.createElement('video');
                    videoElement.setAttribute('src', actRecipe.video.src);
                    videoElement.setAttribute('type', actRecipe.video.type);
                    videoElement.width = 300;
                    videoElement.controls = actRecipe.video.controls;
                    currentRecipe.appendChild(videoElement);

                }

            }


            // creates a new headline 2 element with the ingredient list title
            var ingredientsHeadlineElement = document.createElement('h2');
            var ingredientsHeadline = document.createTextNode(jRecipes.recipeHeadlines.ingredientsHeadline);

            ingredientsHeadlineElement.appendChild(ingredientsHeadline);
            currentRecipe.appendChild(ingredientsHeadlineElement);

            // if the current recipe is the tutorial recipe
            if(actRecipe.id == 0){
                var ingredientsExplanationElement = document.createElement('p');
                var ingredientsExplanation = document.createTextNode(jRecipes.tutorial.ingredients);

                ingredientsExplanationElement.appendChild(ingredientsExplanation);
                currentRecipe.appendChild(ingredientsExplanationElement);
            }

            // creates a new unsorted list with the ingredients needed for this recipe
            var ingredientListElement = document.createElement('ul');

            actRecipe.ingredientList.forEach(function(ingr) {
                var listItem = document.createElement('li');
                var ingredientText = document.createTextNode(ingr);
                listItem.appendChild(ingredientText);
                ingredientListElement.appendChild(listItem);
            });

            currentRecipe.appendChild(ingredientListElement);


            // creates a new head line element for the 'Current Task' title
            var currentTaskHeadElement = document.createElement('h2');
            var currentTaskHead = document.createTextNode(jRecipes.recipeHeadlines.currentTaskHeadline);

            currentTaskHeadElement.appendChild(currentTaskHead);
            currentRecipe.appendChild(currentTaskHeadElement);

            // the current task as a paragraph element
            var currentTaskElement = document.createElement('p');
            var currentTaskItem = document.createTextNode(actRecipe.tasks[counter].message);

            currentTaskElement.appendChild(currentTaskItem);
            currentRecipe.appendChild(currentTaskElement);

        } else {

            // when the recipe is finished, empty the div containers

            var currentRecipe = document.querySelector('#currentRecipe');
            var recipeMenu = document.querySelector('#recipeMenu');
            var tutorial = document.querySelector('#tutorial');

            tutorial.innerHTML = ' ';
            recipeMenu.innerHTML = ' ';
            currentRecipe.innerHTML = ' ';

        }

    }
}

