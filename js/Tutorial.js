/**
 * The Tutorial is used to render the explanations of each component of the application in the HTML when the user hovers
 * over an interactive object in the tutorial mode.
 *
 * @param tutName - the name of the object the user hovers over
 * @param language - the current language setting in the kitchen
 */

function Tutorial(tutName, language){

    this.ENGLISH = "eng"; // language setting in English
    this.GERMAN = "ger"; // language setting in German

    // to load the newst version of the JSON file
    var d = new Date();

    // for callback
    var that = this;

    // the explanations for the application components in the set language
    this.jTutorial;

    /*
    sets the tutorial in the chosen language
    @param language - the language setting of the kitchen
     */

    if(language == this.GERMAN){
        /*
        loads the explanations in German and saves them in the Tutorial attribute 'jTutorial'
        @param data - data from the 'tutorialGerman.json'
         */

        Ajax.getJSON("json/tutorialGerman.json?d=" + d.getTime(), function(data){
            that.jTutorial = data;
        });
    } else {

        /*
        loads the explanations in English and saves them in the Tutorial attribute 'jTutorial'
        @param data - data from the 'tutorial.json'
         */

        Ajax.getJSON("json/tutorial.json?d=" + d.getTime(), function(data){
            that.jTutorial = data;
        });

    }

    /**
     * The function 'render' renders the tutorial
     */

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
