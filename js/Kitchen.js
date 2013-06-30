function Kitchen(canvasId) {

    // get the right requestAnimationFrame for this browser
    var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
    // apply the right animation frame to the window object
    window.requestAnimationFrame = requestAnimationFrame;

    // create a new stage object
    this.stage = new Stage(canvasId);
    this.soundmanager = new SoundManager();

    this.counter = 0;

    this.points = 0;

    // to save the JSON data in attributes
    this.jMenuComponents;
    this.jKitchenComponents;
    this.jUtilities;
    this.jIngredients;
    this.jRecipes;
    this.actRecipe;
    this.jIngredientButtons;
    this.jUtilityButtons;

    // to load the newest version of all JSONs
    var d = new Date();

    // for callback
    var that = this;

    this.mainMenuButton;
    //this.mainMenuButton = new MainMenuButton(this.stage.getContext(), 555, 0, 186, 82, "images/Menu/mainmenubutton.png", 2500);
    //this.stage.addToStage(this.mainMenuButton);

    //this.menuAnim = new MenuBackground(this.stage.getContext())
    //this.menuStage;

    // to save the objects rendered to the stage in arrays (arrays are used in later functions)
    this.pots = [];
    this.ingredients = [];
    this.stoveTops = [];
    this.fridge = [];
    this.knobs = [];
    this.menu = [];
    this.ingredientButtons = [];
    this.utilityButtons = [];
    this.kitchenSlicer;
    this.oven;
    this.bin;


    // reads the needed data from external JSON files

    Ajax.getJSON("json/menuComponents.json?d=" + d.getTime(), function(data){
        that.jMenuComponents = data;
        that.addMenuComponents(that.jMenuComponents);
    });

    Ajax.getJSON("json/kitchenComponents.json?d=" + d.getTime(), function (data){
        that.jKitchenComponents = data;
        that.addKitchenComponents(that.jKitchenComponents);
    });

    Ajax.getJSON("json/utilities.json?d=" + d.getTime(), function(data){
        that.jUtilities = data;
    });

    Ajax.getJSON("json/ingredientButtons.json?d=" + d.getTime(), function(data){
        that.jIngredientButtons = data;
    });

    Ajax.getJSON("json/ingredients.json?d=" + d.getTime(), function(data){
        that.jIngredients = data;
    });

    Ajax.getJSON("json/recipes.json?d=" + d.getTime(), function(data){
        that.jRecipes = data;
    });

    Ajax.getJSON("json/utilityButtons.json?d=" + d.getTime(), function(data){
        that.jUtilityButtons = data;
    });

    this.backgroundSky = new VisualRenderObject(this.stage.getContext(), 0, 0, 1000, 630, "", 0);
    this.stage.addToStage(this.backgroundSky);

    this.bin = new Bin(this.stage.getContext(), 25, 555, 170, 76, "images/utilities/bin.png", 5, "bin");
    this.fridgeButton;
    var kitchenBackground = new VisualRenderObject(this.stage.getContext(), 0, 0, 1000, 630, "images/kitchenComponents/kitchenBackgroundTest.png", 1);
    this.cupboard;
    this.counterTop = new CounterTop(this.stage.getContext(), 643, 410, 357, 220, "images/kitchenComponents/counterTop.png", 2, "countertop");
    this.ovenButton;
    this.stage.addToStage(kitchenBackground);
   // this.stage.addToStage(this.ovenButton);
    this.stage.addToStage(this.bin);
    this.stage.addToStage(this.counterTop);

    this.menu.forEach(function(menuElement){
        that.stage.addToStage(menuElement);
    });



    // registers the needed events
    this.stage.registerEvent('click', this);
    this.stage.registerEvent('dragend', this);




    // start the animation loop
    // parameter this (kitchen itself) needed, because of the closure within the run function
    this.run(this);


}


/**
 * Animation loop
 * @param kit - the kitchen object
 */
Kitchen.prototype.run = function (kit) {

    // update the objects (StoveTop, Knob, ...)
    if(kit.jRecipes != undefined && kit.actRecipe != undefined){
        var recipeManager = new RecipeManager(kit.jRecipes, kit.actRecipe, kit.counter, kit.points);
        recipeManager.render();
    }

    kit.pots.forEach(function(pot){
        pot.update()
    });
    kit.setBackgroundSky();

    // Always render after the updates
    kit.stage.render();
    // keep the loop going
    window.requestAnimationFrame(function () {
        kit.run(kit);
    });

}

Kitchen.prototype.setDefault = function(that) {
    that.counter = 0;
    for (var i = 0; i < that.pots.length; i++) {
        that.stage.removeFromStage(that.pots[i]);
    }
    for (var i = 0; i< that.ingredients.length; i++) {
        that.stage.removeFromStage(that.ingredients[i]);
    }
    for (var i = 0; i< that.knobs.length; i++) {
        that.knobs[i].setStatus(that.knobs[i].OFF);
        that.knobs[i].setRotation(0);
    }
    for (var i = 0; i<that.ingredientButtons.length; i++) {
        that.stage.removeFromStage(that.ingredientButtons[i]);
    }
    for (var i = 0; i<that.utilityButtons.length; i++) {
        that.stage.removeFromStage(that.utilityButtons[i]);
    }
    that.fridgeButton.setStatus(that.fridgeButton.OFF);
    that.cupboard.setStatus(that.cupboard.OFF);
    that.oven.content = [];
    that.oven.setStatus(that.oven.OFF);
    that.ovenButton.setRotation(0);
    that.kitchenSlicer.content = [];
    that.ingredients = [];
    that.pots = [];
    that.ingredientButtons = [];
    that.utilityButtons = [];
    that.fridge = [];
    that.actRecipe = undefined;
    that.points = 0;
}

Kitchen.prototype.setBackgroundSky = function(){

    var currentTime = new Date();
    if(currentTime.getHours() >= 3 && currentTime.getHours() <= 9) {
        this.backgroundSky.changeImage("images/kitchenComponents/Morning.png");
    } else if(currentTime.getHours()>9 && currentTime.getHours()<=17) {
        this.backgroundSky.changeImage("images/kitchenComponents/Midday.png");
    } else if(currentTime.getHours()>17 && currentTime.getHours()<=22) {
        this.backgroundSky.changeImage("images/kitchenComponents/Evening.png");
    } else {
        this.backgroundSky.changeImage("images/kitchenComponents/Night.png");
    }
}

Kitchen.prototype.addMenuComponents = function(menuElement){

    var that = this;
    var mainMenuButton = menuElement.mainMenuButton;
    var menuStage = menuElement.menuStage;
    var menuButtons = menuElement.menuButtons;

    this.mainMenuButton = new MainMenuButton(this.stage.getContext(), mainMenuButton.image.sx, mainMenuButton.image.sy, mainMenuButton.image.tileWidth, mainMenuButton.image.tileHeight, mainMenuButton.image.imagePath, mainMenuButton.image.zOrder, mainMenuButton);
    this.stage.addToStage(this.mainMenuButton);
    var mainMenuStage = new VisualRenderObject(this.stage.getContext(), menuStage.image.sx, menuStage.image.sy, menuStage.image.tileWidth, menuStage.image.tileHeight, menuStage.image.imagePath, menuStage.image.zOrder);
    this.menu.push(mainMenuStage);
    this.stage.addToStage(mainMenuStage);

    menuButtons.forEach(function(menuButton){
        var menuButton = new MenuButton(that.stage.getContext(), menuButton.image.sx, menuButton.image.sy, menuButton.image.tileWidth, menuButton.image.tileHeight, menuButton.image.imagePath, menuButton.image.zOrder, menuButton.recipeIndex, menuButton);
        that.menu.push(menuButton);
        that.stage.addToStage(menuButton);
    });
}

/**
 * The function 'fillFridge' adds the ingredient names into the fridge array in the kitchen.
 * It expects two parameters: The JSON file with the data of all the recipes and an index to see which recipe
 * is currently needed.
 * It then fills the fridge according to the given names in the needed recipe.
 *
 * @param recipe - recipes.json
 * @param index - index of the needed recipe in the recipes.json
 */

Kitchen.prototype.fillFridge = function(recipe, index){

    this.actRecipe = recipe.recipes[index];


    // for callback
    var that = this;

    // searches for the recipe with the given index number
    var ingredients = this.actRecipe.ingredients;

    // pushes the ingredient names of the needed recipe to the fridge array in the kitchen
    ingredients.forEach(function(ingredient){
        that.fridge.push(ingredient);
    });

}

Kitchen.prototype.addKitchenComponents = function(component){
    var that = this;
    var stoveTops = component.kitchenComponent.stoveTops;
    var knobs = component.kitchenComponent.knobs;
    var cupboardButtonBluePrint = component.kitchenComponent.cupboardButton;
    var fridgeButtonBluePrint = component.kitchenComponent.fridgeButton;
    var kitchenSlicer = component.kitchenComponent.kitchenSlicer;
    var oven = component.kitchenComponent.oven;
    var ovenButton = component.kitchenComponent.ovenButton;

    this.kitchenSlicer = new KitchenSlicer(this.stage.getContext(), kitchenSlicer.image.sx, kitchenSlicer.image.sy, kitchenSlicer.image.tileWidth, kitchenSlicer.image.tileHeight, kitchenSlicer.image.imagePath, kitchenSlicer.image.zOrder, kitchenSlicer.name, kitchenSlicer);
    this.stage.addToStage(this.kitchenSlicer);

    this.oven = new Oven(this.stage.getContext(), oven.image.sx, oven.image.sy, oven.image.tileWidth, oven.image.tileHeight, oven.image.imagePath, oven.image.zOrder, oven.name, oven);
    this.stage.addToStage(this.oven);

    this.ovenButton = new OvenButton(this.stage.getContext(), ovenButton.image.sx, ovenButton.image.sy, ovenButton.image.tileWidth, ovenButton.image.tileHeight, ovenButton.image.imagePath, ovenButton.image.zOrder, ovenButton.name, this.oven, ovenButton);
    this.stage.addToStage(this.ovenButton);

    stoveTops.forEach(function(stoveTop){
        var stoveTop = new StoveTop(that.stage.getContext(), stoveTop.image.sx, stoveTop.image.sy, stoveTop.image.tileWidth, stoveTop.image.tileHeight, stoveTop.image.imagePath, stoveTop.image.zOrder, stoveTop.name, stoveTop);
        that.stoveTops.push(stoveTop);
        that.stage.addToStage(stoveTop);
    });

    for(var i = 0; i < this.stoveTops.length; i++){
        var knob = new Knob(this.stage.getContext(), knobs[i].image.sx, knobs[i].image.sy, knobs[i].image.tileWidth, knobs[i].image.tileHeight, knobs[i].image.imagePath, knobs[i].image.zOrder, knobs[i].name, this.stoveTops[i], knobs[i]);
        this.stage.addToStage(knob);
        this.knobs.push(knob);
    }

    this.cupboard = new CupboardButton(this.stage.getContext(), cupboardButtonBluePrint.image.sx, cupboardButtonBluePrint.image.sy, cupboardButtonBluePrint.image.tileWidth, cupboardButtonBluePrint.image.tileHeight, cupboardButtonBluePrint.image.imagePath, cupboardButtonBluePrint.image.zOrder, cupboardButtonBluePrint.name, cupboardButtonBluePrint);
    this.stage.addToStage(this.cupboard);
    this.fridgeButton = new FridgeButton(this.stage.getContext(), fridgeButtonBluePrint.image.sx, fridgeButtonBluePrint.image.sy, fridgeButtonBluePrint.image.tileWidth, fridgeButtonBluePrint.image.tileHeight, fridgeButtonBluePrint.image.imagePath, fridgeButtonBluePrint.image.zOrder, fridgeButtonBluePrint.name, fridgeButtonBluePrint);
    this.stage.addToStage(this.fridgeButton);
}



Kitchen.prototype.giveMainMenu = function (that) {
    that.menu.forEach(function(menuElement){
        that.stage.addToStage(menuElement);
    });
}

Kitchen.prototype.hideMainMenu = function(that) {
    that.menu.forEach(function(menuElement){
        that.stage.removeFromStage(menuElement);
    });
}
/**
 * The function 'addIngredient' renders the specific ingredients needed for the current recipe to the stage.
 * As parameters it expects the JSON file with the data of all the ingredients and the fridge array with the
 * wanted ingredients
 * to chose them from the JSON.
 *
 * @param ingredients - ingredients.json
 * @param ingredientName - fridge array of the kitchen with the ingredient names as Strings
 */

Kitchen.prototype.addIngredient = function(ingredients, ingredientName){

    // for callback
    var that = this;

    var ingredient = ingredients.ingredients;

    ingredient.forEach(function(ingredient){
        if(ingredient.name == ingredientName){
            var ingredient = new Ingredient(that.stage.getContext(), ingredient.image.sx, ingredient.image.sy, ingredient.image.tileWidth, ingredient.image.tileHeight, ingredient.image.imagePath, ingredients.zOrder, ingredients.draggable, ingredient.name, ingredient);
            that.ingredients.push(ingredient);
            that.stage.addToStage(ingredient);
        }
    });
}

Kitchen.prototype.addIngredientButtons = function(ingredientButtons, fridge){
    var that = this;
    var x = 30;
    var y = 30;
    var d = 0;
     for(var i = 0; i < fridge.length; i++){
         for(var j = 0; j < ingredientButtons.ingredientButtons.length; j++){
             if(ingredientButtons.ingredientButtons[j].name == fridge[i]){
                 var ingredientButton = new IngredientButton(that.stage.getContext(), x, y, ingredientButtons.tileWidth, ingredientButtons.tileHeight,ingredientButtons.ingredientButtons[j].imagePath, ingredientButtons.zOrder, fridge[i]);
                 that.stage.addToStage(ingredientButton);
                 that.ingredientButtons.push(ingredientButton);
                 x = x + (ingredientButtons.tileWidth + 20);
                 d = d + 1;
                 if(d % 5 == 0){
                     x = 30;
                     y = y + (ingredientButtons.tileHeight + 20);
                 }
             }
         }
     }
}

Kitchen.prototype.addUtilities = function(utility, utilityName) {
    // for callback
    var that = this;

    // reference to the pots
    var potBluePrint = utility.utilities.potBluePrint;

    if (utilityName == "pots") {
        // adds all pots to the stage
        potBluePrint.pots.forEach(function(pot){
            var pot = new Pot(that.stage.getContext(), pot.sx, pot.sy, potBluePrint.image.tileWidth, potBluePrint.image.tileHeight, potBluePrint.image.imagePath, pot.zOrder, potBluePrint.draggable, pot.name, potBluePrint);
            that.pots.push(pot);
            that.stage.addToStage(pot);
        });
    }
}

Kitchen.prototype.addUtilityButtons = function(utilityButtons)  {
    var that = this;
    var x = 30;
    var y = 30;
    var d = 0;
    for (var i = 0; i<utilityButtons.utilityButtons.length; i++) {
        var utilityButton = new UtilityButton(that.stage.getContext(), x, y, utilityButtons.tileWidth, utilityButtons.tileHeight, utilityButtons.utilityButtons[i].imagePath, utilityButtons.zOrder, utilityButtons.utilityButtons[i].name);
        that.stage.addToStage(utilityButton);
        that.utilityButtons.push(utilityButton);
        x = x + (utilityButtons.tileWidth + 20);
        d = d + 1;
        if(d % 5 == 0){
            x = 30;
            y = y + (utilityButtons.tileHeight + 20);
        }
    }
}


Kitchen.prototype.onClick = function (event) {

    var that = this;

    if(event.target instanceof MenuButton){
        this.hideMainMenu(this);
        this.mainMenuButton.setStatus(this.mainMenuButton.OFF);
        this.setDefault(this);
        this.fillFridge(this.jRecipes, event.target.recipeIndex);
    }

    if(event.target  instanceof MainMenuButton && event.target.status == event.target.OFF) {
        this.giveMainMenu(this);
        event.target.setStatus(event.target.ON);
        return;
    } else if(event.target  instanceof MainMenuButton && event.target.status == event.target.ON){
        if(this.actRecipe == undefined) {
            return;
        } else {
         this.hideMainMenu(this);
            event.target.setStatus(event.target.OFF);
            return;
        }
    }

    if (event.target instanceof Knob) {
        if(event.target.status == event.target.OFF) {
            event.target.setStatus(event.target.ON);
            event.target.setRotation(180);
        }else if (event.target.status == event.target.ON) {
            event.target.setStatus(event.target.OFF);
            event.target.setRotation(0);
        }else {
            console.log("An unknown action was performed with the following knob " + event.target.name);
        }
    }

    if(event.target instanceof OvenButton){
        if(event.target.status == event.target.OFF){
            event.target.setStatus(event.target.ON);
            event.target.setRotation(180);
        } else {
            event.target.setStatus(event.target.OFF);
            event.target.setRotation(0);
        }
    }

    if(event.target instanceof FridgeButton && event.target.status == event.target.OFF){
        event.target.setStatus(event.target.ON);
        this.addIngredientButtons(this.jIngredientButtons, this.fridge);
    } else if(event.target instanceof FridgeButton && event.target.status == event.target.ON){
        this.ingredientButtons.forEach(function(ingredientButton){
            event.target.setStatus(event.target.OFF);
            that.stage.removeFromStage(ingredientButton);
        });
    }

    if(event.target instanceof CupboardButton && event.target.status == event.target.OFF){
        event.target.setStatus(event.target.ON);
        this.addUtilityButtons(this.jUtilityButtons);
    } else if(event.target instanceof CupboardButton && event.target.status == event.target.ON){
        this.utilityButtons.forEach(function(utilityButton){
            event.target.setStatus(event.target.OFF);
            that.stage.removeFromStage(utilityButton);
        });
    }

    if(event.target instanceof IngredientButton){
        this.addIngredient(this.jIngredients, event.target.name);
    }

    if(event.target instanceof UtilityButton){
        this.addUtilities(this.jUtilities, event.target.name);
    }

    for(var i = 0; i<this.stoveTops.length; i++) {
        if(this.stoveTops[i].pot != null){
            console.log(this.stoveTops[i].name + " has the pot " + this.stoveTops[i].pot.name + " the pot status is " + this.stoveTops[i].pot.status);
        }
    }

    for(var i = 0; i<this.pots.length; i++) {
        for(var j = 0; j<this.pots[i].content.length; j++){
            if(this.pots[i].content[j] != null){
                console.log("The pot " + this.pots[i].name + " has the following ingredients: " + this.pots[i].content[j].name);
            }
        }
    }
    if (this.actRecipe != undefined && this.actRecipe.tasks.length > this.counter) {
        console.log(this.actRecipe.tasks[this.counter].message);
    } else if (this.actRecipe != undefined && !(event.target instanceof Ingredient && this.actRecipe.tasks.length > this.counter)){
        console.log("Sie haben das Rezept " + this.actRecipe.name + " mit " + this.points + " von " + this.actRecipe.tasks.length*10 + " möglichen Punkten abgeschlossen.");
        this.setDefault(this);
        this.giveMainMenu(this);
    } else if(this.actRecipe == undefined) {
        console.log("Bitte waehlen Sie ein Rezept im Hauptmenue aus.");
    }
}

Kitchen.prototype.onDragend = function (event) {

    var tasks = this.actRecipe.tasks;
    var ingX = event.target.x + event.target.width / 2;
    var ingY = event.target.y + event.target.height / 2;
    var zone = this.bin.getHitZone();
    if (ingX >= zone.hx && ingX <= zone.hx + zone.hw && ingY >= zone.hy && ingY <= zone.hy + zone.hh) {
        this.stage.removeFromStage(event.target);
        event.target = null;
    }

    if (event.target instanceof Ingredient && this.actRecipe.tasks.length > this.counter) {

        if(this.counter < tasks.length) {

            var actTask = tasks[this.counter].task;

            var ingX = event.target.x + event.target.width / 2;
            var ingY = event.target.y + event.target.height / 2;

            for (var i = 0; i < this.pots.length; i++) {

                var zone = this.pots[i].getHitZone();

                //is the ingredient over a pot?
                if (ingX >= zone.hx && ingX <= zone.hx + zone.hw && ingY >= zone.hy && ingY <= zone.hy + zone.hh) {

                    // if the pot content does not meet the requirements of the current task
                    var potContentTrue = true;
                    if(this.pots[i].content.length <= actTask.utensilProperties.content.length){
                        for(var l = 0; l < this.pots[i].content.length; l++){
                            if(!(this.pots[i].content[l].name == actTask.utensilProperties.content[l])){
                                potContentTrue = false;
                            }
                        }
                    } else if(this.pots[i].content.length > actTask.utensilProperties.content.length){
                        for(var l = 0; l < actTask.utensilProperties.content.length; l++){
                            if(!(this.pots[i].content[l].name == actTask.utensilProperties.content[l])){
                                potContentTrue = false;
                            }
                        }
                    }

                    // does the pot meet all the property requirements for the task?

                    // does the clicked ingredient meet the ingredient properties of the current task?
                    if(actTask.utensil == "pot" && potContentTrue && this.pots[i].status == actTask.utensilProperties.actState && event.target.name == actTask.contentName && event.target.isCut == actTask.ingredientProperties.isCut && event.target.isCooked == actTask.ingredientProperties.isCooked && event.target.isBaked == actTask.ingredientProperties.isBaked){
                        this.pots[i].content.push(event.target);
                        this.stage.removeFromStage(event.target);
                        this.points = this.points + 10;
                        this.counter++;
                        console.log("You've got " + this.points + " points now.");
                        break;

                    // if either the pot or the ingredient do not meet the requirements
                    } else if (!(actTask.utensil == "pot" && potContentTrue && this.pots[i].status == actTask.utensilProperties.actState && event.target.name == actTask.contentName && event.target.isCut == actTask.ingredientProperties.isCut && event.target.isCooked == actTask.ingredientProperties.isCooked && event.target.isBaked == actTask.ingredientProperties.isBaked)){
                        this.pots[i].content.push(event.target);
                        this.stage.removeFromStage(event.target);
                        this.points = this.points - 10;
                        console.log("You've got " + this.points + " points now.");
                        break;
                    }
                }
            }

            //is the ingredient over a kitchen slicer?
            var kitZone = this.kitchenSlicer.getHitZone();

            if (ingX >= kitZone.hx && ingX <= kitZone.hx + kitZone.hw && ingY >= kitZone.hy && ingY <= kitZone.hy + kitZone.hh && this.kitchenSlicer.status == this.kitchenSlicer.OFF) {


                // does the kitchen slicer meet all the property requirements for the task?


                // does the clicked ingredient meet the ingredient properties of the current task?
                if(actTask.utensil == "kitchenslicer" && this.kitchenSlicer.status == actTask.utensilProperties.actState &&event.target.name == actTask.contentName && event.target.isCut == actTask.ingredientProperties.isCut && event.target.isCooked == actTask.ingredientProperties.isCooked && event.target.isBaked == actTask.ingredientProperties.isBaked){

                    this.kitchenSlicer.content.push(event.target);
                    this.kitchenSlicer.setStatus(this.kitchenSlicer.ON);
                    this.stage.removeFromStage(event.target);
                    this.points = this.points + 10;
                    this.counter++;
                    console.log("You've got " + this.points + " points now.");
                    var that = this;

                    this.soundmanager.playSound('slicer', function() {
                        that.kitchenSlicer.setStatus(that.kitchenSlicer.OFF);
                        that.stage.addToStage(that.kitchenSlicer.content[0]);
                        that.kitchenSlicer.clearContent();

                    });

                }  else if (!(actTask.utensil == "kitchenslicer" && this.kitchenSlicer.status == actTask.utensilProperties.actState &&event.target.name == actTask.contentName && event.target.isCut == actTask.ingredientProperties.isCut && event.target.isCooked == actTask.ingredientProperties.isCooked && event.target.isBaked == actTask.ingredientProperties.isBaked)){

                    this.kitchenSlicer.content.push(event.target);
                    this.kitchenSlicer.setStatus(this.kitchenSlicer.ON);
                    this.stage.removeFromStage(event.target);
                    this.points = this.points - 10;
                    console.log("You've got " + this.points + " points now.");

                    var that = this;

                    this.soundmanager.playSound('slicer', function() {
                        that.kitchenSlicer.setStatus(that.kitchenSlicer.OFF);
                        that.stage.addToStage(that.kitchenSlicer.content[0]);
                        that.kitchenSlicer.clearContent();

                    });
                }
            }

            //is the ingredient over a kitchen slicer?
            var ovenZone = this.oven.getHitZone();

            if (ingX >= ovenZone.hx && ingX <= ovenZone.hx + ovenZone.hw && ingY >= ovenZone.hy && ingY <= ovenZone.hy + ovenZone.hh) {
                // if the kitchen slicer  content does not meet the requirements of the current task
                var ovenContentTrue = true;
                if(this.oven.content.length <= actTask.utensilProperties.content.length){
                    for(var l = 0; l < this.oven.content.length; l++){
                        if(!(this.oven.content[l].name == actTask.utensilProperties.content[l])){
                            ovenContentTrue = false;
                        }
                    }
                } else if(this.oven.content.length > actTask.utensilProperties.content.length){
                    for(var l = 0; l < actTask.utensilProperties.content.length; l++){
                        if(!(this.oven.content[l].name == actTask.utensilProperties.content[l])){
                            ovenContentTrue = false;
                        }
                    }
                }

                // does the kitchen slicer meet all the property requirements for the task?


                // does the clicked ingredient meet the ingredient properties of the current task?
                if(actTask.utensil == "oven" && ovenContentTrue && this.oven.status == actTask.utensilProperties.actState &&event.target.name == actTask.contentName && event.target.isCut == actTask.ingredientProperties.isCut && event.target.isCooked == actTask.ingredientProperties.isCooked && event.target.isBaked == actTask.ingredientProperties.isBaked){

                    this.oven.content.push(event.target);
                    this.stage.removeFromStage(event.target);
                    this.points = this.points + 10;
                    this.counter++;
                    console.log("You've got " + this.points + " points now.");
                    var that = this;

                    this.soundmanager.playSound('slicer', function() {
                        that.oven.baking();
                        that.stage.addToStage(that.oven.content[0]);
                        that.oven.clearContent();

                    });

                }  else if (!(actTask.utensil == "oven" && ovenContentTrue && this.oven.status == actTask.utensilProperties.actState &&event.target.name == actTask.contentName && event.target.isCut == actTask.ingredientProperties.isCut && event.target.isCooked == actTask.ingredientProperties.isCooked && event.target.isBaked == actTask.ingredientProperties.isBaked)){

                    this.oven.content.push(event.target);
                    this.stage.removeFromStage(event.target);
                    this.points = this.points - 10;
                    console.log("You've got " + this.points + " points now.");

                    var that = this;

                    this.soundmanager.playSound('slicer', function() {
                        that.oven.baking();
                        that.stage.addToStage(that.oven.content[0]);
                        that.oven.clearContent();

                    });
                }
            }

            var counterZone = this.counterTop.getHitZone();

            if (ingX >= counterZone.hx && ingX <= counterZone.hx + counterZone.hw && ingY >= counterZone.hy && ingY <= counterZone.hy + counterZone.hh){
                if(actTask.utensil == "countertop" && event.target.name == actTask.contentName && event.target.isCut == actTask.ingredientProperties.isCut && event.target.isCooked == actTask.ingredientProperties.isCooked && event.target.isBaked == actTask.ingredientProperties.isBaked){
                    this.points = this.points + 10;
                    this.counter++;
                    console.log("You've got " + this.points + " points now.");
                }
            }

        } else {
            console.log("Ihr Rezept ist beendet.");
        }

    } else if (event.target instanceof Pot) {
        for (var i = 0; i < this.stoveTops.length; i++) {
            var cx = event.target.getBottomCenter().cx;
            var cy = event.target.getBottomCenter().cy;
            var zone = this.stoveTops[i].getHitZone();
            var overAPlate = false;
            if ((cx > zone.hx && cx < zone.hx + zone.hw) && (cy > zone.hy && cy < zone.hy + zone.hh)){
                overAPlate = true;
            }
            //pot comes from free space
            if (!event.target.onPlate) {
                //to a free stoveTop
                if ((this.stoveTops[i].pot == null) && (cx > zone.hx && cx < zone.hx + zone.hw) && (cy > zone.hy && cy < zone.hy + zone.hh) ) {
                    this.stoveTops[i].setCurrentPot(event.target);
                    event.target.myPlateIndex = i;
                    console.log(this.stoveTops[i].name + " now has pot " + event.target.name );
                    event.target.onPlate = true;
                    break;
                    //to an occupied stoveTop
                } else if ((event.target != this.stoveTops[i].pot) && (this.stoveTops[i].pot != null) && (cx > zone.hx && cx < zone.hx + zone.hw) && (cy > zone.hy && cy < zone.hy + zone.hh)) {
                    console.log(this.stoveTops[i].name + " already has pot " + this.stoveTops[i].pot.name);
                    event.target.onPlate = false;
                    event.target.setStatus(event.target.OFF);
                    break;
                }
                //pot comes from stoveTop
            } else if (event.target.onPlate){
                //to a free stoveTop
                if ((this.stoveTops[i].pot == null) && (cx > zone.hx && cx < zone.hx + zone.hw) && (cy > zone.hy && cy < zone.hy + zone.hh) ) {
                    console.log(this.stoveTops[i].name + " now has pot " + event.target.name);
                    this.stoveTops[event.target.myPlateIndex].setCurrentPot(null);
                    event.target.myPlateIndex = null;
                    this.stoveTops[i].setCurrentPot(event.target);
                    event.target.myPlateIndex = i;
                    event.target.onPlate = true;
                    break;
                    //to an occupied stoveTop
                } else if((event.target != this.stoveTops[i].pot) && (this.stoveTops[i].pot != null) && (cx > zone.hx && cx < zone.hx + zone.hw) && (cy > zone.hy && cy < zone.hy + zone.hh)) {
                    console.log(this.stoveTops[i].name + " already has pot " + this.stoveTops[i].pot.name);
                    this.stoveTops[event.target.myPlateIndex].setCurrentPot(null);
                    event.target.myPlateIndex = null;
                    event.target.onPlate = false;
                    event.target.setStatus(event.target.OFF);
                    break;
                }
            }
        }
        if (overAPlate == false) {
            if (event.target.myPlateIndex != null ) {
                this.stoveTops[event.target.myPlateIndex].setCurrentPot(null);
            }
            console.log(event.target.name + " is nowhere");
            event.target.myPlateIndex = null;
            event.target.onPlate = false;
            event.target.setStatus(event.target.OFF);
        }
    }

}