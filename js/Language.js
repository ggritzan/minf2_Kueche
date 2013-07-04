/**
 * Language is used to change the current text shown in the HTML to tell the user to which language the application has
 * been set to.
 *
 * @param lang - current language setting (either German or English)
 */

function Language(lang){

    this.GERMAN = "ger";
    this.ENGLISH = "eng";

    this.render = function(){

        var recipeMenu = document.querySelector('#recipeMenu');
        var currentRecipe = document.querySelector('#currentRecipe');
        var tutorial = document.querySelector('#tutorial');
        var language = document.querySelector('#language');

        currentRecipe.innerHTML = ' ';
        recipeMenu.innerHTML = ' ';
        tutorial.innerHTML = ' ';
        language.innerHTML = ' ';

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

        } else {

            var langSetElement = document.createElement('h2');
            var langSet = document.createTextNode("blub");

            langSetElement.appendChild(langSet);
            language.appendChild(langSetElement);
        }

    }

}
