/**
 * The AjaxManager loads all the needed JSON files for the Kitchen.
 * These JSON files are saved in the following attributes of the kitchen:
 *
 * - jMenuComponents
 * - jKitchenComponents
 * - jUtilities
 * - jIngredientButtons
 * - jIngredients
 * - jContainer
 * - jRecipes
 *
 * @param kit - Kitchen
 * @constructor - AjaxManager (this)
 */

function AjaxManager(kit){

    // to load the newest version of all JSONs
    var d = new Date();

    /*
     Data loaded from the 'menuComponents.json' which contains all the data needed to render the menu of the application
     to the stage. The data is saved in the 'jMenuComponents' attribute of the kitchen.
     */

    Ajax.getJSON("json/menuComponents.json?d=" + d.getTime(), function(data){
        kit.jMenuComponents = data;
        kit.addMenuComponents(kit.jMenuComponents);
    });

    /*
     Data loaded from the 'kitchenComponents.json' which contains all the data needed to render the interactive
     components to the stage that appear at the first glance, such as the stove tops, the knobs to the stove tops, the
     oven, the kitchen slicer and the oven button. The data is saved in the 'jKitchenComponents' attribute of the
     kitchen.
     */

    Ajax.getJSON("json/kitchenComponents.json?d=" + d.getTime(), function (data){
        kit.jKitchenComponents = data;
        kit.addKitchenComponents(kit.jKitchenComponents);
    });

    /*
     Data loaded from the 'utilities.json' which contains all the data needed to render the utilities that are used to
     cook, such as the pots. The data is saved in the 'jUtilities' attribute of the kitchen.
     */

    Ajax.getJSON("json/utilities.json?d=" + d.getTime(), function(data){
        kit.jUtilities = data;
    });

    /*
     Data loaded from the 'ingredients.json' which contains all the data needed to render the ingredient buttons to the
     stage when the fridge button is clicked. The data is saved in the 'jIngredientButtons' attribute of the kitchen.
     */

    Ajax.getJSON("json/ingredientButtons.json?d=" + d.getTime(), function(data){
        kit.jIngredientButtons = data;
    });

    /*
    Data loaded from the 'utilityButtons.json' which contains all the data needed to render the utility buttons to the
    stage, when the cupboard button is clicked. The data is saved in the 'jUtilityButtons' attribute of the kitchen.
     */

    Ajax.getJSON("json/utilityButtons.json?d=" + d.getTime(), function(data){
        kit.jUtilityButtons = data;
    });

    /*
    Data loaded from the 'ingredients.json' which contains all the data needed to render the ingredients to the stage,
    when the specific ingredient button to it is clicked. The data is saved in the 'jIngredients' attribute of the
    kitchen.
     */

    Ajax.getJSON("json/ingredients.json?d=" + d.getTime(), function(data){
        kit.jIngredients = data;
    });

    /*
    Data loaded from the 'container.json' which contains all the data needed to render specific ingredients which are in
    a container to the stage, when the specific ingredient button to it is clicked.
     */

    Ajax.getJSON("json/container.json?d=" + d.getTime(), function(data){
        kit.jContainer = data;
    });

    /*
    Data loaded from the 'recipes.json' which contains all the data needed to see which current recipe shall be cooked
    and which specific ingredient buttons and ingredients are needed for the recipe. Furthermore the data is used to
    check if the current task is being full filled correctly.
     */

    Ajax.getJSON("json/recipes.json?d=" + d.getTime(), function(data){
        kit.jRecipes = data;
    });

}
