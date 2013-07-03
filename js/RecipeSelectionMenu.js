function RecipeSelectionMenu(kit){


    this.render = function(){

        var recipeMenu = document.querySelector('#recipeMenu');
        var currentRecipe = document.querySelector('#currentRecipe');
        var tutorial = document.querySelector('#tutorial');
        var lang = document.querySelector('#language');

        lang.innerHTML = ' ';
        currentRecipe.innerHTML = ' ';
        recipeMenu.innerHTML = ' ';
        tutorial.innerHTML = ' ';

        var selectionElement = document.createElement('h1');
        var selection = document.createTextNode(kit.jRecipes.recipeHeadlines.recipeMenu);

        selectionElement.appendChild(selection);
        recipeMenu.appendChild(selectionElement);

        var recipeListElement = document.createElement('ul');

        kit.jRecipes.recipes.forEach(function(recipeItem){

            var recipeItemElement = document.createElement('li');

            if(recipeItem.id > 0){

               // recipeItemElement.appendChild(listText);
                recipeListElement.appendChild(recipeItemElement);
                var headingElement = document.createElement('h2');

                headingElement.setAttribute("id",recipeItem.id );

                var listText = document.createTextNode(recipeItem.name);
                headingElement.appendChild(listText);
                recipeItemElement.appendChild(headingElement);

                var descriptionElement = document.createElement('p');
                var description = document.createTextNode(recipeItem.description);

                descriptionElement.appendChild(description);
                recipeItemElement.appendChild(descriptionElement);

                headingElement.addEventListener('click', function(ev) {

                    currentRecipe.innerHTML = ' ';
                    recipeMenu.innerHTML = ' ';
                    var rId = ev.target.getAttribute("id");
                    kit.hideMainMenu(kit);
                    kit.mainMenuButton.setStatus(kit.mainMenuButton.OFF);
                    kit.setDefault(kit);
                    kit.fillFridge(kit.jRecipes, rId);


                });
            }
        });

        recipeMenu.appendChild(recipeListElement);
    }
}