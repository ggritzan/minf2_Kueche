function Tutorial(tutName){

    var d = new Date();
    var that = this;

    this.jTutorial;

    Ajax.getJSON("json/tutorial.json?d=" + d.getTime(), function(data){
        that.jTutorial = data;
    });

    this.render = function(){

        console.log(that.jTutorial[tutName]);

        var tutorial = document.querySelector('#tutorial');
        var currentRecipe = document.querySelector('#currentRecipe');
        var recipeMenu = document.querySelector('#recipeMenu');

        recipeMenu.innerHTML = ' ';
        currentRecipe.innerHTML = ' ';
        tutorial.innerHTML = ' ';

        var nameElement = document.createElement('h1');
        var name = document.createTextNode(that.jTutorial[tutName].name);

        console.log(that.jTutorial[tutName].name);

        nameElement.appendChild(name);
        tutorial.appendChild(nameElement);

        var explanationElement = document.createElement('p');
        var explanation = document.createTextNode(that.jTutorial[tutName].message);

        explanationElement.appendChild(explanation);
        tutorial.appendChild(explanationElement);

    }

}
