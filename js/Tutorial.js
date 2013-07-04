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
     * The function 'render' renders the tutorial in the given language in the HTML.
     */

    this.render = function(){

        // reference to container from DOM
        var tutorial = document.querySelector('#tutorial');
        var recipeMenu = document.querySelector('#recipeMenu');

        // deletes the containers #recipeMenu and #tutorial when they were blocked
        recipeMenu.innerHTML = ' ';
        tutorial.innerHTML = ' ';

        // creates a headline 1 element
        var nameElement = document.createElement('h1');
        // text of headline 1 element 'nameElement': the name of the application component the cursor hovers over
        //@param tutName - the name of the application, it used as an index
        var name = document.createTextNode(that.jTutorial[tutName].name);

        // 'name' is a child element of 'nameElement'
        nameElement.appendChild(name);
        // 'nameElement' is a child element of 'tutorial'
        tutorial.appendChild(nameElement);

        // creates a paragraph element
        var explanationElement = document.createElement('p');
        /*
        text of the paragraph element 'explanationElement': the explanation to the application component the cursor
        hovers over
        @param tutName - the name of the application, it used as an index
        */
        var explanation = document.createTextNode(that.jTutorial[tutName].message);

        // 'explanation' is a child element of 'explanationElement'
        explanationElement.appendChild(explanation);
        // 'explanationElement' is a element of 'tutorial'
        tutorial.appendChild(explanationElement);

    }

}
