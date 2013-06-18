function Kitchen(canvasId) {

    // get the right requestAnimationFrame for this browser
    var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
    // apply the right animation frame to the window object
    window.requestAnimationFrame = requestAnimationFrame;

    // create a new stage object
    this.stage = new Stage(canvasId);


    // to save the JSON data in attributes
    this.jUtilities;
    this.jIngredients;
    this.jRecipes;
    this.jIngredientButtons;

    // to load the newest version of all JSONs
    var d = new Date();

    // for callback
    var that = this;

    this.menuStage = new MenuBackground(this.stage.getContext(), 0, 0, 1000, 600, "images/Menu/startMenu.png", 100);
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

    this.menu.push(this.menuStage);
    this.menu.push(this.menuButton1);
    this.menu.push(this.menuButton2);
    this.menu.push(this.menuButton3);


    // reads the needed data from external JSON files

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

    this.stage.addToStage(fridgeButton);

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

    // for callback
    var that = this;

    // searches for the recipe with the given index number
    var ingredients = recipe.recipes[index].ingredients;

    // pushes the ingredient names of the needed recipe to the fridge array in the kitchen
    ingredients.forEach(function(ingredient){
        that.fridge.push(ingredient);
    });


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
    // reference to the stove tops
    var stoveBluePrint = utility.utilities.stoveTopBluePrint;
    // reference to the knobs
    var knobBluePrint = utility.utilities.knobBluePrint;
    // reference to kitchen slicer
    var kitchenSlicerBluePrint = utility.utilities.kitchenSlicerBluePrint;

    var ovenBluePrint = utility.utilities.ovenBluePrint;

    // adds all pots to the stage
    potBluePrint.pots.forEach(function(pot){
        var pot = new Pot(that.stage.getContext(), pot.sx, pot.sy, potBluePrint.image.tileWidth, potBluePrint.image.tileHeight, potBluePrint.image.imagePath, pot.zOrder, potBluePrint.draggable, pot.name, potBluePrint);
        that.pots.push(pot);
        that.stage.addToStage(pot);
    });

    // adds all stove tops to the stage
    stoveBluePrint.stoveTops.forEach(function(stoveTop){
        var stoveTop = new StoveTop(that.stage.getContext(), stoveTop.sx, stoveTop.sy, stoveBluePrint.image.tileWidth, stoveBluePrint.image.tileHeight, stoveBluePrint.image.imagePath, stoveTop.zOrder, stoveTop.name);
        that.stoveTops.push(stoveTop);
        that.stage.addToStage(stoveTop);
    });

    // adds all knobs to the stage
    // a for-loop is needed since each knob has also a specific stove top
    for(var i = 0; i < that.stoveTops.length; i++){
        var knob = new Knob(that.stage.getContext(), knobBluePrint.knobs[i].sx, knobBluePrint.knobs[i].sy, knobBluePrint.image.tileWidth, knobBluePrint.image.tileHeight, knobBluePrint.image.imagePath, knobBluePrint.knobs[i].zOrder, knobBluePrint.knobs[i].name, that.stoveTops[i]);
        that.stage.addToStage(knob);
    }

    kitchenSlicerBluePrint.kitchenSlicers.forEach(function(kitchenSlicer){
        var kitchenSlicer = new KitchenSlicer(that.stage.getContext(), kitchenSlicer.sx, kitchenSlicer.sy, kitchenSlicerBluePrint.image.tileWidth, kitchenSlicerBluePrint.image.tileHeight, kitchenSlicerBluePrint.image.imagePath, kitchenSlicer.zOrder, kitchenSlicer.name);
        that.stage.addToStage(kitchenSlicer);
    });

    ovenBluePrint.ovens.forEach(function(oven){
        var oven = new Oven(that.stage.getContext(), oven.sx, oven.sy, ovenBluePrint.image.tileWidth, ovenBluePrint.image.tileHeight, ovenBluePrint.image.imagePath, oven.zOrder, oven.name);
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
    console.log(event);

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
        console.log(this.stoveTops[i].name + " has status " +this.stoveTops[i].status);
        if(this.stoveTops[i].pot != null){
            console.log(this.stoveTops[i].name + " has the pot " + this.stoveTops[i].pot.name + " the pot status is " + this.stoveTops[i].pot.status);
        }
    }

    for(var i = 0; i<this.pots.length; i++) {
        console.log(this.pots[i].name + " is in state " + this.pots[i].status);
        for(var j = 0; j<this.pots[i].ingredients.length; j++){
            if(this.pots[i].ingredients[j] != null){
                console.log("The pot " + this.pots[i].name + " has the following ingredients: " + this.pots[i].ingredients[j].name);
            }
        }
    }
}

Kitchen.prototype.onDragend = function (event) {
    console.log(event);
    if (event.target instanceof Ingredient) {
        for (var i = 0; i < this.pots.length; i++) {
            //is the ingredient over a pot?
            if (event.target.x + event.target.width / 2 >= this.pots[i].x && event.target.x + event.target.width / 2 <= this.pots[i].x + this.pots[i].width && event.target.y + event.target.height / 2 >= this.pots[i].y && event.target.y + event.target.height / 2 <= this.pots[i].y + this.pots[i].height) {
                this.pots[i].ingredients.push(event.target);
                this.stage.removeFromStage(event.target);
                break;
            }
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