function RecipeSelectionMenu(kit){

    this.recipeNumber = 0;



    this.render = function(){

        var that = this;
        var rn = this.recipeNumber;

        var recipeMenu = document.querySelector('#recipeMenu');
        var currentRecipe = document.querySelector('#currentRecipe');

        currentRecipe.innerHTML = ' ';
        recipeMenu.innerHTML = ' ';

        var selectionElement = document.createElement('h1');
        var selection = document.createTextNode(kit.jRecipes.recipeHeadlines.recipeMenu);

        selectionElement.appendChild(selection);
        recipeMenu.appendChild(selectionElement);

        var recipeListElement = document.createElement('ul');

        kit.jRecipes.recipes.forEach(function(recipeItem){




            var recipeItemElement = document.createElement('li');

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
        });

        recipeMenu.appendChild(recipeListElement);
    }
}