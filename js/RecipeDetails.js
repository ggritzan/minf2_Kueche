function RecipeDetails(container, data){
    this.container = container;
    this.data = data;


    this.render = function() {
        // erzeugen der Überschrift Rezept
        var headlineElement = document.createElement('h1');
        var headlineText = document.createTextNode('Rezept');

        // Test ans h1 Element anhängen
        headlineElement.appendChild(headlineText);

        // anhängen der Überschrift im DOM
        this.container.appendChild(headlineElement);


        // Title
        var rezeptTitleElement = document.createElement('h2');
        var titleText = document.createTextNode(this.data.name);
        rezeptTitleElement.appendChild(titleText);

        // ans DOM anhängen
        this.container.appendChild(rezeptTitleElement);



        // Title-Zutaten
        var headlineElement = document.createElement('h3');
        var headlineZutatenText = document.createTextNode('Zutaten');

        // Test ans h3 Element anhängen
        headlineElement.appendChild(headlineZutatenText);

        // anhängen der Überschrift im DOM
        this.container.appendChild(headlineElement);



        // Zutatenliste erzeugen
        var ingredientList = document.createElement("ul");


        // Zutaten
        this.data.ingredients.forEach(function(ingr) {
            var listItem = document.createElement("li");
            var ingredientText = document.createTextNode(ingr);
            listItem.appendChild(ingredientText);
            ingredientList.appendChild(listItem);
        });


        // ans DOM anhängen
        this.container.appendChild(ingredientList);


        // Taskliste erzeugen
        var taskList = document.createElement("ul");

        //Tasks
        this.data.tasks.forEach(function(task) {
            var listItem = document.createElement("li");
            var taskText = document.createTextNode(task.message);
            listItem.appendChild(taskText);
            taskList.appendChild(listItem);
        });

        // ans DOM anhängen
        this.container.appendChild(taskList);





    }



}
