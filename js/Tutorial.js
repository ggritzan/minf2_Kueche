function Tutorial(tutName, language){

    this.ENGLISH = "eng";
    this.GERMAN = "ger";

    var d = new Date();
    var that = this;

    this.jTutorial;

    if(language == this.GERMAN){
        Ajax.getJSON("json/tutorialGerman.json?d=" + d.getTime(), function(data){
            that.jTutorial = data;
        });
    } else {

        Ajax.getJSON("json/tutorial.json?d=" + d.getTime(), function(data){
            that.jTutorial = data;
        });

    }



    this.render = function(){

        var tutorial = document.querySelector('#tutorial');
        var currentRecipe = document.querySelector('#currentRecipe');
        var recipeMenu = document.querySelector('#recipeMenu');

        recipeMenu.innerHTML = ' ';
        tutorial.innerHTML = ' ';

        var nameElement = document.createElement('h1');
        var name = document.createTextNode(that.jTutorial[tutName].name);

        nameElement.appendChild(name);
        tutorial.appendChild(nameElement);

        var explanationElement = document.createElement('p');
        var explanation = document.createTextNode(that.jTutorial[tutName].message);

        explanationElement.appendChild(explanation);
        tutorial.appendChild(explanationElement);

    }

}
