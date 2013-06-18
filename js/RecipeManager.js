/**
 * Created with IntelliJ IDEA.
 * User: Giacomo
 * Date: 18.06.13
 * Time: 10:58
 * To change this template use File | Settings | File Templates.
 */

// Variable für alle Rezepte
var recipes;

// Laden der Rezept Daten aus der recipes.json Datei
Ajax.getJSON("json/recipes.json", function(data){
    recipes = data;
});

this.recipes = [];


Kitchen.prototype.addRecipes = function(recipes){

}
