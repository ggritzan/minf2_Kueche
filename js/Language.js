/**
 * Language is used to change the current text shown in the HTML to tell the user to which language the application has
 * been set to.
 *
 * @param lang - current language setting (either German or English)
 */

function Language(lang){

    this.GERMAN = "ger";  // language set to German
    this.ENGLISH = "eng"; // language set to English

    /**
     * The function 'render' shows the user to which language he/she has set the application by rendering the message
     * in the HTML.
     */

    this.render = function(){

        // reference from DOM
        var recipeMenu = document.querySelector('#recipeMenu');
        var currentRecipe = document.querySelector('#currentRecipe');
        var tutorial = document.querySelector('#tutorial');
        var language = document.querySelector('#language');

        // empty containers if they were blocked (status)
        currentRecipe.innerHTML = ' ';
        recipeMenu.innerHTML = ' ';
        tutorial.innerHTML = ' ';
        language.innerHTML = ' ';


        // give the message specified to the language setting
        if(lang == this.ENGLISH){

            var langSetElement = document.createElement('h2');
            var langSet = document.createTextNode("The language has been set to English.");

            langSetElement.appendChild(langSet);
            language.appendChild(langSetElement);

        } else if (lang == this.GERMAN){

            var langSetElement = document.createElement('h2');
            var langSet = document.createTextNode("Die Sprache wurde in Deutsch geaendert.");

            langSetElement.appendChild(langSet);
            language.appendChild(langSetElement);

        }

    }

}
