/**
 * The RecipeSelectionMenu is used to show the user from which recipe he/she can select from. The recipe titles are
 * rendered in the HTML. The user can click on one of them and the information is given to the Kitchen.
 *
 * @param kit - the Kitchen to get all recipes and to tell it later which of them has been selected by the user
 */

function RecipeSelectionMenu(kit){

    /**
     * The function 'render' renders the recipe selection menu in the HTML.
     */

    this.render = function(){

        // reference to container from DOM
        var recipeMenu = document.querySelector('#recipeMenu');
        var currentRecipe = document.querySelector('#currentRecipe');
        var tutorial = document.querySelector('#tutorial');
        var lang = document.querySelector('#language');

        // deletes the containers #lang, #currentRecipe, #recipeMenu and #tutorial when they were blocked
        lang.innerHTML = ' ';
        currentRecipe.innerHTML = ' ';
        recipeMenu.innerHTML = ' ';
        tutorial.innerHTML = ' ';

        // creates a headline 1 element
        var selectionElement = document.createElement('h1');
        /*
        text of headline 1 element 'selectionElement': the selection menu title
        @param kit.jRecipes.recipeHeadlines.recipeMenu - the title of the selection menu from the JSON data in the
        kitchen attribute 'jRecipes'
        */
        var selection = document.createTextNode(kit.jRecipes.recipeHeadlines.recipeMenu);

        // 'selection' is the child element of 'selectionElement'
        selectionElement.appendChild(selection);
        // 'selectionElement' is the child element of the 'recipeMenu'
        recipeMenu.appendChild(selectionElement);

        // creates an unsorted list element
        var recipeListElement = document.createElement('ul');

        // for each recipe in the JSON
        kit.jRecipes.recipes.forEach(function(recipeItem){

            // create a list element
            var recipeItemElement = document.createElement('li');

            // if the recipe is not the tutorial recipe (which has the ID: 0)
            if(recipeItem.id > 0){

                // 'recipeItemElement' is a child element of 'recipeListElement'
                recipeListElement.appendChild(recipeItemElement);

                // creates a new headline 2 element
                var headingElement = document.createElement('h2');

                // the 'headingElement' shall get the recipe's ID value
                headingElement.setAttribute("id",recipeItem.id );

                // the list text shall be the name of the recipe
                var listText = document.createTextNode(recipeItem.name);

                // 'listText' is a child element of 'headingElement'
                headingElement.appendChild(listText);
                // 'headingElement' is a child element of 'recipeItemElement'
                recipeItemElement.appendChild(headingElement);

                // creates a new paragraph element
                var descriptionElement = document.createElement('p');
                // @param recipeItem.description - the text for the paragraph element shall be the recipe description
                var description = document.createTextNode(recipeItem.description);

                // 'description' is a child element of 'descriptionElement'
                descriptionElement.appendChild(description);
                // 'descriptionElement' is a child element of 'recipeItemElement'
                recipeItemElement.appendChild(descriptionElement);


                // if a recipe title is clicked
                headingElement.addEventListener('click', function(ev) {

                    // delete the containers 'currentRecipe' and 'recipeMenu' if they were blocked (style)
                    currentRecipe.innerHTML = ' ';
                    recipeMenu.innerHTML = ' ';
                    // get the recipe ID to know which recipe has been clicked and tell it the kitchen
                    //@param kit - Kitchen
                    var rId = ev.target.getAttribute("id");
                    // hides the main menu and its components
                    kit.hideMainMenu(kit);
                    kit.mainMenuButton.setStatus(kit.mainMenuButton.OFF);
                    kit.setDefault(kit);
                    // fill the fridge with the needed ingredients for the selected recipe
                    kit.fillFridge(kit.jRecipes, rId);


                });
            }
        });

        // 'recipeListElement' is a child element of 'recipeMenu'
        recipeMenu.appendChild(recipeListElement);
    }
}