function AjaxManager(kit){

    // to load the newest version of all JSONs
    var d = new Date();

    // for callback

    Ajax.getJSON("json/menuComponents.json?d=" + d.getTime(), function(data){
        kit.jMenuComponents = data;
        kit.addMenuComponents(kit.jMenuComponents);
    });

    Ajax.getJSON("json/kitchenComponents.json?d=" + d.getTime(), function (data){
        kit.jKitchenComponents = data;
        kit.addKitchenComponents(kit.jKitchenComponents);
    });

    Ajax.getJSON("json/utilities.json?d=" + d.getTime(), function(data){
        kit.jUtilities = data;
    });

    Ajax.getJSON("json/ingredientButtons.json?d=" + d.getTime(), function(data){
        kit.jIngredientButtons = data;
    });

    Ajax.getJSON("json/ingredients.json?d=" + d.getTime(), function(data){
        kit.jIngredients = data;
    });

    Ajax.getJSON("json/container.json?d=" + d.getTime(), function(data){
        kit.jContainer = data;
    });

    Ajax.getJSON("json/recipes.json?d=" + d.getTime(), function(data){
        kit.jRecipes = data;
    });

    Ajax.getJSON("json/utilityButtons.json?d=" + d.getTime(), function(data){
        kit.jUtilityButtons = data;
    });

}
