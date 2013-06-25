function Kitchen(canvasId) {

    // get the right requestAnimationFrame for this browser
    var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
    // apply the right animation frame to the window object
    window.requestAnimationFrame = requestAnimationFrame;

    // create a new stage object
    this.stage = new Stage(canvasId);
    this.soundmanager = new SoundManager();

    this.points = 0;

    this.counter = 0;


    // to save the JSON data in attributes
    this.jKitchenComponents;
    this.jUtilities;
    this.jIngredients;
    this.jRecipes;
    this.actRecipe;
    this.jIngredientButtons;

    // to load the newest version of all JSONs
    var d = new Date();

    // for callback
    var that = this;

    //this.menuAnim = new MenuBackground(this.stage.getContext())
    this.menuStage = new MenuBackground(this.stage.getContext(), 0, 0, 1000, 630, "images/Menu/startMenu.png", 100);
    this.menuButton1 = new MenuButton(this.stage.getContext(), 500, 300, 200, 60, "images/Menu/menuButton.png", 101, 0);
    this.menuButton2 = new MenuButton(this.stage.getContext(), 500, 400, 200, 60, "images/Menu/menuButton.png", 101, 1);
    this.menuButton3 = new MenuButton(this.stage.getContext(), 500, 500, 200, 60, "images/Menu/menuButton.png", 101, 2);

    // to save the objects rendered to the stage in arrays (arrays are used in later functions)
    this.pots = [];
    this.ingredients = [];
    this.stoveTops = [];
    this.fridge = [];
    this.menu = [];
    this.ingredientButtons = [];
    this.kitchenSlicer;
    this.oven;

    this.menu.push(this.menuStage);
    this.menu.push(this.menuButton1);
    this.menu.push(this.menuButton2);
    this.menu.push(this.menuButton3);


    // reads the needed data from external JSON files

    Ajax.getJSON("json/kitchenComponents.json?d=" + d.getTime(), function (data){
        that.jKitchenComponents = data;
        that.addKitchenComponents(that.jKitchenComponents);
    });

    Ajax.getJSON("json/utilities.json?d=" + d.getTime(), function(data){
        that.jUtilities = data;
        that.addUtilities(that.jUtilities);
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


    var fridgeButton = new FridgeButton(this.stage.getContext(), 150, 150, 30, 30, "images/utilities/fridgeButton.png", 5, "fridgebutton");
    var kitchenBackground = new VisualRenderObject(this.stage.getContext(), 0, 0, 1000, 630, "images/kitchenComponents/kitchenBackgroundTest.png", 1);
    this.counterTop = new CounterTop(this.stage.getContext(), 653, 410, 357, 220, "images/kitchenComponents/counterTop.png", 2, "countertop");
    var ovenButton = new OvenButton(this.stage.getContext(), 800, 40, 58, 58, "images/utilities/knob.png", 23, "ovenButton", this.oven);
    this.stage.addToStage(kitchenBackground);
    this.stage.addToStage(fridgeButton);
    this.stage.addToStage(ovenButton);
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
    kit.pots.forEach(function(pot){
        pot.update()
    });

    // Always render after the updates
    kit.stage.render();
    // keep the loop going
    window.requestAnimationFrame(function () {
        kit.run(kit);
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
    var stoveTopBluePrint = component.kitchenComponent.stoveTops;
    var knobBluePrint = component.kitchenComponent.knobBluePrint;

    stoveTopBluePrint.forEach(function(stoveTop){
        var stoveTop = new StoveTop(that.stage.getContext(), stoveTop.image.sx, stoveTop.image.sy, stoveTop.image.tileWidth, stoveTop.image.tileHeight, stoveTop.image.imagePath, stoveTop.image.zOrder, stoveTop.name, stoveTop);
        that.stoveTops.push(stoveTop);
        that.stage.addToStage(stoveTop);
    });

    for(var i = 0; i < this.stoveTops.length; i++){
        var knob = new Knob(this.stage.getContext(), knobBluePrint.knobs[i].sx, knobBluePrint.knobs[i].sy, knobBluePrint.image.tileWidth, knobBluePrint.image.tileHeight, knobBluePrint.image.imagePath, knobBluePrint.knobs[i].zOrder, knobBluePrint.knobs[i].name, this.stoveTops[i]);
        this.stage.addToStage(knob);
    }
}

/**
 * The function 'addUtilities' renders the pots, knobs and stove tops to the stage.
 * It expects the JSON file with the data of the utilities that shall be rendered.
 *
 * @param utility - utilities.json
 */

Kitchen.prototype.addUtilities = function(utility){

    // for callback
    var that = this;

    // reference to the pots
    var potBluePrint = utility.utilities.potBluePrint;
    // reference to kitchen slicer
    var kitchenSlicerBluePrint = utility.utilities.kitchenSlicerBluePrint;

    var ovenBluePrint = utility.utilities.ovenBluePrint;

    // adds all pots to the stage
    potBluePrint.pots.forEach(function(pot){
        var pot = new Pot(that.stage.getContext(), pot.sx, pot.sy, potBluePrint.image.tileWidth, potBluePrint.image.tileHeight, potBluePrint.image.imagePath, pot.zOrder, potBluePrint.draggable, pot.name, potBluePrint);
        that.pots.push(pot);
        that.stage.addToStage(pot);
    });

    kitchenSlicerBluePrint.kitchenSlicers.forEach(function(kitchenSlicer){
        var kitchenSlicer = new KitchenSlicer(that.stage.getContext(), kitchenSlicer.sx, kitchenSlicer.sy, kitchenSlicerBluePrint.image.tileWidth, kitchenSlicerBluePrint.image.tileHeight, kitchenSlicerBluePrint.image.imagePath, kitchenSlicer.zOrder, kitchenSlicer.name);
        that.kitchenSlicer = kitchenSlicer;
        that.stage.addToStage(kitchenSlicer);
    });

    ovenBluePrint.ovens.forEach(function(oven){
        var oven = new Oven(that.stage.getContext(), oven.sx, oven.sy, ovenBluePrint.image.tileWidth, ovenBluePrint.image.tileHeight, ovenBluePrint.image.imagePath, oven.zOrder, oven.name);
        that.oven = oven;
        that.stage.addToStage(oven);
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
            var ingredient = new Ingredient(that.stage.getContext(), ingredient.sx, ingredient.sy, ingredient.tileWidth, ingredient.tileHeight, ingredient.imagePath, ingredients.zOrder, ingredients.draggable, ingredient.name);
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


Kitchen.prototype.onClick = function (event) {

    var that = this;

    if(event.target instanceof MenuButton){
        this.menu.forEach(function(menuElement){
            that.stage.removeFromStage(menuElement);
        });

        this.fillFridge(this.jRecipes, event.target.recipeIndex);
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

    if(event.target instanceof IngredientButton){
        this.addIngredient(this.jIngredients, event.target.name);
    }

    for(var i = 0; i<this.stoveTops.length; i++) {
        if(this.stoveTops[i].pot != null){
            console.log(this.stoveTops[i].name + " has the pot " + this.stoveTops[i].pot.name + " the pot status is " + this.stoveTops[i].pot.status);
        }
    }

    for(var i = 0; i<this.pots.length; i++) {
        for(var j = 0; j<this.pots[i].ingredients.length; j++){
            if(this.pots[i].ingredients[j] != null){
                console.log("The pot " + this.pots[i].name + " has the following ingredients: " + this.pots[i].ingredients[j].name);
            }
        }
    }
}

Kitchen.prototype.onDragend = function (event) {

    var tasks = this.actRecipe.tasks;


    if (event.target instanceof Ingredient) {

        console.log(this.actRecipe.tasks[this.counter].message);

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
                    if(this.pots[i].ingredients.length <= actTask.utensilProperties.content.length){
                        for(var l = 0; l < this.pots[i].ingredients.length; l++){
                            if(!(this.pots[i].ingredients[l].name == actTask.utensilProperties.content[l])){
                                potContentTrue = false;
                            }
                        }
                    } else if(this.pots[i].ingredients.length > actTask.utensilProperties.content.length){
                        for(var l = 0; l < actTask.utensilProperties.content.length; l++){
                            if(!(this.pots[i].ingredients[l].name == actTask.utensilProperties.content[l])){
                                potContentTrue = false;
                            }
                        }
                    }

                    // does the pot meet all the property requirements for the task?

                    // does the clicked ingredient meet the ingredient properties of the current task?
                    if(actTask.utensil == "pot" && potContentTrue && this.pots[i].status == actTask.utensilProperties.actState && event.target.name == actTask.contentName && event.target.isCut == actTask.ingredientProperties.isCut && event.target.isCooked == actTask.ingredientProperties.isCooked && event.target.isBaked == actTask.ingredientProperties.isBaked){
                        this.pots[i].ingredients.push(event.target);
                        this.stage.removeFromStage(event.target);
                        this.points = this.points + 10;
                        this.counter++;
                        console.log("You've got " + this.points + " points now.");
                        break;

                    // if either the pot or the ingredient do not meet the requirements
                    } else if (!(actTask.utensil == "pot" && potContentTrue && this.pots[i].status == actTask.utensilProperties.actState && event.target.name == actTask.contentName && event.target.isCut == actTask.ingredientProperties.isCut && event.target.isCooked == actTask.ingredientProperties.isCooked && event.target.isBaked == actTask.ingredientProperties.isBaked)){
                        this.pots[i].ingredients.push(event.target);
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

                // if the kitchen slicer  content does not meet the requirements of the current task
                var kitchenSlicerContentTrue = true;
                if(this.kitchenSlicer.content.length <= actTask.utensilProperties.content.length){
                    for(var l = 0; l < this.kitchenSlicer.content.length; l++){
                        if(!(this.kitchenSlicer.content[l].name == actTask.utensilProperties.content[l])){
                            kitchenSlicerContentTrue = false;
                        }
                    }
                } else if(this.kitchenSlicer.content.length > actTask.utensilProperties.content.length){
                    for(var l = 0; l < actTask.utensilProperties.content.length; l++){
                        if(!(this.kitchenSlicer.content[l].name == actTask.utensilProperties.content[l])){
                            kitchenSlicerContentTrue = false;
                        }
                    }
                }

                // does the kitchen slicer meet all the property requirements for the task?


                // does the clicked ingredient meet the ingredient properties of the current task?
                if(actTask.utensil == "kitchenslicer" && kitchenSlicerContentTrue && this.kitchenSlicer.status == actTask.utensilProperties.actState &&event.target.name == actTask.contentName && event.target.isCut == actTask.ingredientProperties.isCut && event.target.isCooked == actTask.ingredientProperties.isCooked && event.target.isBaked == actTask.ingredientProperties.isBaked){

                    this.kitchenSlicer.content.push(event.target);
                    this.kitchenSlicer.setStatus(this.kitchenSlicer.ON);
                    this.soundmanager.playSound(this.soundmanager.boilingWaterSound);
                    this.stage.removeFromStage(event.target);
                    this.points = this.points + 10;
                    this.counter++;
                    console.log("You've got " + this.points + " points now.");
                    var that = this;

                    this.soundmanager.boilingWaterSound.addEventListener('ended', function() {
                        that.kitchenSlicer.setStatus(that.kitchenSlicer.OFF);
                        that.stage.addToStage(that.kitchenSlicer.content[0]);
                        that.kitchenSlicer.clearContent();

                    });

                    console.log("The ingredient is cut: " + event.target.name + event.target.isCut);

                }  else if (!(actTask.utensil == "kitchenslicer" && kitchenSlicerContentTrue && this.kitchenSlicer.status == actTask.utensilProperties.actState &&event.target.name == actTask.contentName && event.target.isCut == actTask.ingredientProperties.isCut && event.target.isCooked == actTask.ingredientProperties.isCooked && event.target.isBaked == actTask.ingredientProperties.isBaked)){

                    this.kitchenSlicer.content.push(event.target);
                    this.kitchenSlicer.setStatus(this.kitchenSlicer.ON);
                    this.soundmanager.playSound(this.soundmanager.boilingWaterSound);
                    this.stage.removeFromStage(event.target);
                    this.points = this.points - 10;
                    console.log("You've got " + this.points + " points now.");

                    var that = this;

                    this.soundmanager.boilingWaterSound.addEventListener('ended', function() {
                        that.kitchenSlicer.setStatus(that.kitchenSlicer.OFF);
                        that.stage.addToStage(that.kitchenSlicer.content[0]);
                        that.kitchenSlicer.clearContent();

                    });

                    console.log("The ingredient is cut: " + event.target.name + event.target.isCut);
                }
            }

            //is the ingredient over a kitchen slicer?
            var ovenZone = this.oven.getHitZone();

            if (ingX >= ovenZone.hx && ingX <= ovenZone.hx + ovenZone.hw && ingY >= ovenZone.hy && ingY <= ovenZone.hy + ovenZone.hh) {
                console.log("yay!");
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
                    this.soundmanager.playSound(this.soundmanager.boilingWaterSound);
                    this.stage.removeFromStage(event.target);
                    this.points = this.points + 10;
                    this.counter++;
                    console.log("You've got " + this.points + " points now.");
                    var that = this;

                    this.soundmanager.boilingWaterSound.addEventListener('ended', function() {
                        that.oven.baking();
                        that.stage.addToStage(that.oven.content[0]);
                        that.oven.clearContent();

                    });

                    console.log("The ingredient is baked: " + event.target.name + event.target.isBaked);

                }  else if (!(actTask.utensil == "oven" && ovenContentTrue && this.oven.status == actTask.utensilProperties.actState &&event.target.name == actTask.contentName && event.target.isCut == actTask.ingredientProperties.isCut && event.target.isCooked == actTask.ingredientProperties.isCooked && event.target.isBaked == actTask.ingredientProperties.isBaked)){

                    this.oven.content.push(event.target);
                    this.soundmanager.playSound(this.soundmanager.boilingWaterSound);
                    this.stage.removeFromStage(event.target);
                    this.points = this.points - 10;
                    console.log("You've got " + this.points + " points now.");

                    var that = this;

                    this.soundmanager.boilingWaterSound.addEventListener('ended', function() {
                        that.oven.baking();
                        that.stage.addToStage(that.oven.content[0]);
                        that.oven.clearContent();

                    });

                    console.log("The ingredient is baked: " + event.target.name + event.target.isBaked);
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