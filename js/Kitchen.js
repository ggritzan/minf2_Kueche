/**
 * The Kitchen is the core of the program. It executes the program and manages all user interactions.
 *
 * @param canvasId - reference to the canvas element in the DOM
 */

function Kitchen(canvasId) {

    // get the right requestAnimationFrame for this browser
    var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
    // apply the right animation frame to the window object
    window.requestAnimationFrame = requestAnimationFrame;

    // the language the application is set to
    this.ENGLISH = "eng";
    this.GERMAN = "ger";

    this.language = this.ENGLISH;

    // create a new stage object
    this.stage = new Stage(canvasId);
    // cerate a new sound manager
    this.soundmanager = new SoundManager();

    // the counter of the current task
    this.counter = 0;

    // the current score of the user
    this.points = 0;

    // to save the JSON data in attributes
    this.jMenuComponents;
    this.jKitchenComponents;
    this.jUtilities;
    this.jIngredients;
    this.jContainer;
    this.jRecipes;
    this.actRecipe;
    this.jIngredientButtons;
    this.jUtilityButtons;


    // for callback
    var that = this;

    this.mainMenuButton;

    // to save the objects rendered to the stage in arrays (arrays are used in later functions)
    this.pots = [];
    this.ingredients = [];
    this.stoveTops = [];
    this.fridge = [];
    this.knobs = [];
    this.menu = [];
    this.options = [];
    this.ingredientButtons = [];
    this.utilityButtons = [];

    // to save single objects in single attributes
    this.kitchenSlicer;
    this.oven;
    this.bin;
    this.judgement = false;


    // reads the needed data from external JSON files

    var ajax = new AjaxManager(this);

    /*
    Create the option menu (the option could not be loaded from a JSON file due to time issues, so it is loaded directly
    in the kitchen, since it was the last element that we added to the application)
     */

    this.optionsMenu = new VisualRenderObject(this.stage.getContext(), 0, 0, 1000, 630, "images/Menu/optionsMenu.png", 400);
    this.xbuttonOptions = new XButtonOptions(this.stage.getContext(), 820, 80, 80, 80, "images/Menu/xbuttonOptionsmenu.png", 401, "xButton");
    this.soundbutton = new VisualRenderObject(this.stage.getContext(), 600, 150, 100, 100, "images/Menu/soundbuttonOn.png", 401);
    this.minusButton = new MinusButton(this.stage.getContext(), 200, 150, 100, 100, "images/Menu/minusbutton.png", 401, "minusButton");
    this.plusButton = new PlusButton(this.stage.getContext(), 450, 150, 100, 100, "images/Menu/plusbutton.png", 401, "plusButton");
    this.germanButton = new GermanButton(this.stage.getContext(), 200, 400, 100, 100, "images/Menu/germanOff.png", 401, "germanButton");
    this.englishButton = new EnglishButton(this.stage.getContext(), 450, 400, 100, 100, "images/Menu/EnglischOff.png", 401, "englishButton");
    this.options.push(this.germanButton);
    this.options.push(this.englishButton);
    this.options.push(this.xbuttonOptions);
    this.options.push(this.optionsMenu);
    this.options.push(this.soundbutton);
    this.options.push(this.minusButton);
    this.options.push(this.plusButton);

    // unanimated kitchen components (due to time issues not loaded from a JSON)
    this.backgroundSky = new VisualRenderObject(this.stage.getContext(), 0, 0, 1000, 630, "", 0);
    this.stage.addToStage(this.backgroundSky);
    this.fridgeButton;
    var kitchenBackground = new VisualRenderObject(this.stage.getContext(), 0, 0, 1000, 630, "images/kitchenComponents/kitchenBackgroundTest.png", 1);
    this.cupboard;
    this.counterTop = new CounterTop(this.stage.getContext(), 643, 410, 357, 220, "images/kitchenComponents/counterTop.png", 2, "countertop");
    this.ovenButton;
    this.stage.addToStage(kitchenBackground);
    this.stage.addToStage(this.counterTop);
    this.setBackgroundSky();

    // renders all the menu components to the stage
    this.menu.forEach(function(menuElement){
        that.stage.addToStage(menuElement);
    });

    // to see if the div container display styles are 'none' or 'block'
    this.tut = document.getElementById('tutorial');
    this.lang = document.getElementById('language');

    // registers the needed events
    this.stage.registerEvent('click', this);
    this.stage.registerEvent('dragend', this);
    this.stage.registerEvent('mouseover', this);
    this.stage.registerEvent('mouseout', this);
    this.stage.registerEvent('dragging', this);

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
 * The function 'showResults' shows the score results of the user depending on how many points he/she has made.
 * (game over)
 *
 * @param that - the Kitchen itself (needed later in another function with a callback that uses this method)
 */

Kitchen.prototype.showResults = function(that) {
    // turn the boiling water sound off when the game is over (since it will not stop looping otherwise)
    for (var i = 0; i < that.pots.length; i++) {
        if(that.pots[i].boilingWaterSound != undefined){
            this.soundmanager.stopSound(that.pots[i].boilingWaterSound)
        }
    }
    // render the specific judgement screen to the current recipe and its results
    that.judgementscreen = new MenuBackground(that.stage.getContext(), 0, 0, 1000, 630, "images/Menu/judgementscreen.png",1000);
    that.dish = new MenuBackground(that.stage.getContext(), 307, 85, 350, 350, that.actRecipe.image,1002);
    that.judgement = true;

    if (that.points == that.actRecipe.tasks.length*10) {
        that.stars = new MenuBackground(that.stage.getContext(), 300, 350, 350, 250, "images/Menu/3stars.png",1001);
        that.stage.addToStage(that.stars);
    } else if(100*that.points/(that.actRecipe.tasks.length*10)>=60) {
        that.stars = new MenuBackground(that.stage.getContext(), 300, 350, 350, 250, "images/Menu/2stars.png",1001);
        that.stage.addToStage(that.stars);
    } else if (100*that.points/(that.actRecipe.tasks.length*10)*10>=30) {
        that.stars = new MenuBackground(that.stage.getContext(), 300, 350, 350, 250, "images/Menu/1stars.png",1001);
        that.stage.addToStage(that.stars);
    } else {
        that.stars = new MenuBackground(that.stage.getContext(), 300, 350, 350, 250, "images/Menu/0stars.png",1001);
        that.stage.addToStage(that.stars);
    }
    that.stage.addToStage(that.judgementscreen);
    that.stage.addToStage(that.dish);
}

/**
 * The function 'setDefault' sets the kitchen to its default settings.
 * @param that - the Kitchen itself (needed later in another function with a callback that uses this method)
 */

Kitchen.prototype.setDefault = function(that) {
    that.counter = 0;
    for (var i = 0; i < that.pots.length; i++) {
        // stop the boiling water sounds
        if(that.pots[i].boilingWaterSound != undefined){
            this.soundmanager.stopSound(that.pots[i].boilingWaterSound)
        }
        that.stage.removeFromStage(that.pots[i]);
        that.pots[i] = null;
    }
    // remove the ingredients
    for (var i = 0; i< that.ingredients.length; i++) {
        that.stage.removeFromStage(that.ingredients[i]);
    }
    // turn the knobs off
    for (var i = 0; i< that.knobs.length; i++) {
        that.knobs[i].setStatus(that.knobs[i].OFF);
        that.knobs[i].stoveTop.setCurrentPot(null);
    }
    // remove the ingredient buttons
    for (var i = 0; i<that.ingredientButtons.length; i++) {
        that.stage.removeFromStage(that.ingredientButtons[i]);
    }
    // remove the utility buttons
    for (var i = 0; i<that.utilityButtons.length; i++) {
        that.stage.removeFromStage(that.utilityButtons[i]);
    }
    // turn all the menu buttons off
    for(var i = 0; i<that.menu.length; i++){
        if(that.menu[i] instanceof MenuButton){
            that.menu[i].setStatus(that.menu[i].OFF);
        }
    }
    // remove the holograms behind the ingredient/utility buttons
    that.stage.removeFromStage(that.fridgehologramm);
    that.stage.removeFromStage(that.cupboardhologramm);
    // turn off the fridge and the cupboard button
    that.fridgeButton.setStatus(that.fridgeButton.OFF);
    that.cupboard.setStatus(that.cupboard.OFF);
    // empty the oven
    that.oven.content = [];
    // turn the oven and its button off
    that.ovenButton.setStatus(that.ovenButton.OFF);
    that.oven.setStatus(that.oven.OFF);
    // empty the kitchen slicer
    that.kitchenSlicer.content = [];
    // clear the kitchen attributes
    that.ingredients = [];
    that.pots = [];
    that.ingredientButtons = [];
    that.utilityButtons = [];
    that.fridge = [];
    that.actRecipe = undefined;
    that.points = 0;
    that.judgement = false;
    // set a new background sky to the current time
    that.setBackgroundSky();
}

/**
 * Changes the background image to the current time.
 */

Kitchen.prototype.setBackgroundSky = function(){

    var currentTime = new Date();
    if(currentTime.getHours() >= 3 && currentTime.getHours() <= 9) {
        this.backgroundSky.changeImage("images/kitchenComponents/Morning.png");
    } else if(currentTime.getHours()>9 && currentTime.getHours()<=17) {
        this.backgroundSky.changeImage("images/kitchenComponents/Midday.png");
    } else if(currentTime.getHours()>17 && currentTime.getHours()<22) {
        this.backgroundSky.changeImage("images/kitchenComponents/Evening.png");
    } else {
        this.backgroundSky.changeImage("images/kitchenComponents/Night.png");
    }
}

/**
 * The function 'addMenuComponents' adds the main menu to the stage reading from the JSON data saved in the kitchen's
 * 'jMenuComponents'.
 *
 * @param menuElement - the JSON data
 */

Kitchen.prototype.addMenuComponents = function(menuElement){

    var that = this;
    var mainMenuButton = menuElement.mainMenuButton;
    var menuStage = menuElement.menuStage;
    var menuButtons = menuElement.menuButtons;

    this.mainMenuButton = new MainMenuButton(this.stage.getContext(), mainMenuButton.image.sx, mainMenuButton.image.sy, mainMenuButton.image.tileWidth, mainMenuButton.image.tileHeight, mainMenuButton.image.imagePath, mainMenuButton.image.zOrder, mainMenuButton.name, mainMenuButton);
    this.stage.addToStage(this.mainMenuButton);
    var mainMenuStage = new VisualRenderObject(this.stage.getContext(), menuStage.image.sx, menuStage.image.sy, menuStage.image.tileWidth, menuStage.image.tileHeight, menuStage.image.imagePath, menuStage.image.zOrder);
    this.menu.push(mainMenuStage);

    menuButtons.forEach(function(menuButton){
        var menuButton = new MenuButton(that.stage.getContext(), menuButton.image.sx, menuButton.image.sy, menuButton.image.tileWidth, menuButton.image.tileHeight, menuButton.image.imagePath, menuButton.image.zOrder, menuButton, menuButton.name);
        that.menu.push(menuButton);
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


    var recipeManager = new RecipeManager(this.jRecipes, this.actRecipe, this.counter, this.points);
    recipeManager.render();

}

/**
 * The function 'addKitchenComponents' adds the specific kitchen components to interact with to the stage reading from
 * the JSON data saved in the kitchen's 'jKitchenComponents'.
 *
 * @param component - the JSON data
 */

Kitchen.prototype.addKitchenComponents = function(component){
    var that = this;
    var stoveTops = component.kitchenComponent.stoveTops;
    var knobs = component.kitchenComponent.knobs;
    var cupboardButtonBluePrint = component.kitchenComponent.cupboardButton;
    var fridgeButtonBluePrint = component.kitchenComponent.fridgeButton;
    var kitchenSlicer = component.kitchenComponent.kitchenSlicer;
    var oven = component.kitchenComponent.oven;
    var ovenButton = component.kitchenComponent.ovenButton;
    var bin = component.kitchenComponent.bin;

    this.bin = new Bin(this.stage.getContext(), bin.image.sx, bin.image.sy, bin.image.tileWidth, bin.image.tileHeight, bin.image.imagePath, bin.image.zOrder, bin.name, bin);
    this.stage.addToStage(this.bin);

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

/**
 * The function 'giveMainMenu' renders the menu to the stage.
 * @param that - the kitchen
 */

Kitchen.prototype.giveMainMenu = function (that) {
    that.menu.forEach(function(menuElement){
        that.stage.addToStage(menuElement);
    });
}

/**
 * The function 'hideMainMenu' removes the menu from the stage.
 * @param that - the kitchen
 */

Kitchen.prototype.hideMainMenu = function(that) {
    that.menu.forEach(function(menuElement){
        that.stage.removeFromStage(menuElement);
    });

    that.options.forEach(function(menuElement){
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

Kitchen.prototype.addIngredient = function(containers, ingredients, ingredientName){

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

    var container = containers.container;

    container.forEach(function(cont){
        if(cont.name == ingredientName){
            var container = new Container(that.stage.getContext(), cont.image.sx, cont.image.sy, cont.image.tileWidth, cont.image.tileHeight, cont.image.imagePath, containers.zOrder, containers.draggable, cont.name, cont);
            that.ingredients.push(container);
            that.stage.addToStage(container);
        }
    });
}

/**
 * The function 'addIngredientButtons' adds the ingredient buttons specifically to the current recipe to the stage when
 * the fridge button is clicked.
 * Furthermore it calculates a hologram that is behind the ingredient buttons.
 *
 * @param ingredientButtons - this.jIngredientButtons (JSON data)
 * @param fridge - the ingredient names in the fridge
 */

Kitchen.prototype.addIngredientButtons = function(ingredientButtons, fridge){
    var that = this;
    var x = 780;
    var y = 70;
    var space = 20;
    var d = 0;
    var h = 0;
     for(var i = 0; i < fridge.length; i++){
         for(var j = 0; j < ingredientButtons.ingredientButtons.length; j++){

             // if the ingredient buttons name is the same as the ingredients in the fridge
             if(ingredientButtons.ingredientButtons[j].name == fridge[i]){
                 console.log(ingredientButtons.ingredientButtons[j].name);
                 var ingredientButton = new IngredientButton(that.stage.getContext(), x, y, ingredientButtons.ingredientButtons[j].image.tileWidth, ingredientButtons.ingredientButtons[j].image.tileHeight,ingredientButtons.ingredientButtons[j].image.imagePath, 250, fridge[i], ingredientButtons.ingredientButtons[j]);
                 that.stage.addToStage(ingredientButton);
                 that.ingredientButtons.push(ingredientButton);
                 x = x + (ingredientButtons.ingredientButtons[i].image.tileWidth + space);
                 d = d + 1;
                 h = h+1;
                 if(d % 3 == 0){
                     x = 780;
                     y = y + (ingredientButtons.ingredientButtons[i].image.tileHeight + space);
                 }
             }
         }
     }

    if(h>1) {
        var h = h/3;
    } else {
        var h = h;
    }
    var holoWidth = (ingredientButtons.ingredientButtons[0].image.tileWidth*3) + (space*3);
    var holoHeight = (ingredientButtons.ingredientButtons[0].image.tileHeight*(h) + (space*(h+2)));
    this.fridgehologramm = new MenuBackground(this.stage.getContext(), 770, 50, holoWidth, holoHeight, "images/kitchenComponents/hologramm.png", 99);
    this.stage.addToStage(this.fridgehologramm);
}

/**
 * Adds the utilities to the stage when the specific utility button is clicked.
 *
 * @param utility - this.jUtilities (JSON data)
 * @param utilityName - the name of the utility button
 */

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

/**
 * Adds the utility buttons to the stage when the cupboard buttons is clicked.
 * Furthermore it renders a hologram to the size of the buttons which appears behind the buttons.
 *
 * @param utilityButtons - this.jUtilityButtons
 */

Kitchen.prototype.addUtilityButtons = function(utilityButtons)  {
    var that = this;
    var x = 230;
    var y = 70;
    var d = 0;
    var space = 20;
    for (var i = 0; i<utilityButtons.utilityButtons.length; i++) {
        var utilityButton = new UtilityButton(that.stage.getContext(), x, y, utilityButtons.utilityButtons[i].image.tileWidth, utilityButtons.utilityButtons[i].image.tileHeight, utilityButtons.utilityButtons[i].image.imagePath, 250, utilityButtons.utilityButtons[i].name, utilityButtons.utilityButtons[i]);
        that.stage.addToStage(utilityButton);
        that.utilityButtons.push(utilityButton);
        x = x + (utilityButtons.utilityButtons[i].image.tileWidth + space);
        d = d + 1;
        if(d % 3 == 0){
            x = 230;
            y = y + (utilityButtons.utilityButtons[i].image.tileHeight + space);
        }
    }
    var h = utilityButtons.utilityButtons.length;
    var holoWidth = (utilityButtons.utilityButtons[0].image.tileWidth*3) + (space*3);
    var holoHeight = (utilityButtons.utilityButtons[0].image.tileHeight*(h) + ((space*h)*2));
    this.cupboardhologramm = new MenuBackground(this.stage.getContext(), 220, 50, holoWidth, holoHeight, "images/kitchenComponents/hologramm.png", 99);
    this.stage.addToStage(this.cupboardhologramm);
}

/**
 * The function 'onMouseover' adds an 'onMouseover' event listener to targets the cursor hovers over.
 * It changes the cursor to a pointer for each interactive object and the animation sequence to on hover on those
 * targets that have one and if the tutorial mode is on, it renders the explanation HTML to the event.target
 *
 * @param event - 'onMouseover'
 */

Kitchen.prototype.onMouseover = function(event){

    if(event.target instanceof MainMenuButton || event.target instanceof CupboardButton || event.target instanceof FridgeButton || event.target instanceof OvenButton || event.target instanceof MenuButton || event.target instanceof Knob){

        // change the cursor to pointer

        document.body.style.cursor = 'pointer';

        if(event.target.status != event.target.ON){

            event.target.setStatus(event.target.ONHOVER);

        }

        // if the tutorial mode is on render the explanation HTML to the event.target

        if(this.actRecipe != undefined && this.actRecipe.id == 0){

            var tutorial = new Tutorial(event.target.name, this.language);
            tutorial.render();
            this.tut.style.display = 'block';

        }

    } else if(event.target instanceof Pot){

        document.body.style.cursor = 'pointer';

        if(this.actRecipe != undefined && this.actRecipe.id == 0){

            var tutorial = new Tutorial(event.target.name, this.language);
            tutorial.render();
            this.tut.style.display = 'block';

        }

    } else if(event.target instanceof IngredientButton){

        document.body.style.cursor = 'pointer';

        if(event.target.status != event.target.ON){

            event.target.setStatus(event.target.ONHOVER);

        }

        if(this.actRecipe != undefined && this.actRecipe.id == 0){

            var tutorial = new Tutorial("ingredientbutton", this.language);
            tutorial.render();
            this.tut.style.display = 'block';

        }

    } else if(event.target instanceof UtilityButton){

        document.body.style.cursor = 'pointer';

        if(event.target.status != event.target.ON){

            event.target.setStatus(event.target.ONHOVER);

        }

        if(this.actRecipe != undefined && this.actRecipe.id == 0){

            var tutorial = new Tutorial("utilitybutton", this.language);
            tutorial.render();
            this.tut.style.display = 'block';

        }

    } else if(event.target instanceof Oven || event.target instanceof KitchenSlicer || event.target instanceof CounterTop || event.target instanceof Knob || event.target instanceof Bin || event.target instanceof Pot || event.target instanceof StoveTop) {

        if(this.actRecipe != undefined && this.actRecipe.id == 0){

            var tutorial = new Tutorial(event.target.name, this.language);
            tutorial.render();
            this.tut.style.display = 'block';

        }

    } else if(event.target instanceof Ingredient){

        document.body.style.cursor = 'pointer';

        if(this.actRecipe != undefined && this.actRecipe.id == 0){

            var tutorial = new Tutorial("ingredient", this.language);
            tutorial.render();
            this.tut.style.display = 'block';

        }

    } else if(event.target instanceof MinusButton || event.target instanceof PlusButton || event.target instanceof XButtonOptions || event.target instanceof GermanButton || event.target instanceof EnglishButton){

        document.body.style.cursor = 'pointer';

    } else {

        document.body.style.cursor = 'default';

    }
}

/**
 * The function 'onMouseout' adds an 'onMouseout' event listener to targets the cursor hovers out of.
 * It changes the cursor to the default cursor and turns the tutorial HTML off it it was on.
 *
 * @param event - 'onMouseout'
 */

Kitchen.prototype.onMouseout = function(event){

    if(event.target instanceof MainMenuButton || event.target instanceof CupboardButton || event.target instanceof FridgeButton || event.target instanceof OvenButton || event.target instanceof MenuButton || event.target instanceof IngredientButton || event.target instanceof UtilityButton || event.target instanceof Knob){

        document.body.style.cursor = 'default';

        if(event.target.status != event.target.ON){

            event.target.setStatus(event.target.OFF);

        }

        if(this.tut.style.display == 'block'){

            this.tut.style.display = 'none';

        }

    } else {

        document.body.style.cursor = 'default';

        if(this.tut.style.display == 'block'){

            this.tut.style.display = 'none';

        }

    }

}

/**
 * The function 'onClick' adds an 'onClick' event listener to targets the cursor clicks.
 *
 * @param event - 'onClick'
 */

Kitchen.prototype.onClick = function (event) {

    var that = this;

    // remove the judgement screen from the stage if it is clicked

    if(this.judgement) {
        this.stage.removeFromStage(this.stars);
        this.stage.removeFromStage(this.judgementscreen);
        this.stage.removeFromStage(this.dish);
        this.setDefault(this);
        this.giveMainMenu(this);
    }

    // change the language if a luanguage button is clicked and tell it the user

    if(event.target instanceof EnglishButton || event.target instanceof GermanButton){

        event.target.setLanguage(this);
        var langSet = new Language(this.language);
        this.lang.style.display = 'block';
        langSet.render();

    }

    // close the options menu if the XButtonOptions is clicked

    if(event.target instanceof XButtonOptions){

        this.options.forEach(function(optionComponent){
            that.stage.removeFromStage(optionComponent);
        });

        if(this.lang.style.display != 'none'){

            this.lang.style.display = 'none';

        }
    }

    // lower the volume of each sound if the MinusButton is clicked

    if(event.target instanceof MinusButton){
        this.soundmanager.turnVolumeDown();
        this.soundmanager.playSound('button', null);
        if(this.lang.style.display != 'none'){

            this.lang.style.display = 'none';

        }
    }

    // turn up each sound if the PlusButon is clicked

    if(event.target instanceof PlusButton){
        this.soundmanager.turnVolumeUp();
        this.soundmanager.playSound('button', null);
        if(this.lang.style.display != 'none'){

            this.lang.style.display = 'none';

        }
    }

    if(event.target instanceof MenuButton){

        // if the language setting message is on, turn it off
        if(this.lang.style.display != 'none'){
            this.lang.style.display = 'none';
        }

        this.soundmanager.playSound('button', null);

        var recipeSelection = new RecipeSelectionMenu(this);
        var menu = document.getElementById('recipeMenu');

        // if the clicked MenuButton is the cookbook button and is turned on, render the HTML recipe selection menu
        if (event.target.name == "cookbook" && event.target.status != event.target.ON && menu.style.display == 'none') {
            event.target.setStatus(event.target.ON);
            menu.style.display = 'block';
            recipeSelection.render();
        // if its turned off, toggle the recipe selection menu off
        } else if(event.target.name == "cookbook" && event.target.status != event.target.OFF){
            event.target.setStatus(event.target.OFF);
            menu.style.display = 'none';
            recipeSelection.render();

        // if the clicked MenuButton is the options button, render the options menu
        } else if(event.target.name == "options" && event.target.status != event.target.ON){
            this.options.forEach(function(optionComponent){
                that.stage.addToStage(optionComponent);
            });
        // if the clicked MenuButton is the tutorial button and it is off, turn it on and go in the tutorial mode
        } else if (event.target.name == "tutorial" && event.target.status != event.target.ON && menu.style.display == 'none') {
            event.target.setStatus(event.target.ON);
            this.hideMainMenu(this);
            this.mainMenuButton.setStatus(this.mainMenuButton.OFF);
            this.setDefault(this);
            this.fillFridge(this.jRecipes, 0);
            var recipeManager = new RecipeManager(this.jRecipes, this.actRecipe, this.counter, this.points);
            recipeManager.render();
        // if it was on and clicked again, turn it and the tutorial mode off
        } else if(event.target.name == "tutorial" && event.target.status != event.target.OFF){
            event.target.setStatus(event.target.OFF);
            menu.style.display = 'none';
            recipeSelection.render();
            this.setDefault(this);
        }
    }

    // if the MainMenuButton is turned off and the current is defined, turn the MainMenuButton on when its clicked
    if(event.target  instanceof MainMenuButton && event.target.status != event.target.ON && this.actRecipe != undefined) {

        // if the language setting screen was on, toggle it off
        if(this.lang.style.display != 'none'){
            this.lang.style.display = 'none';
        }
        this.soundmanager.playSound('button', null);
        // toggle the selection menu off
        var menu = document.getElementById('recipeMenu');
        menu.style.display = 'none';
        // render the main menu
        this.giveMainMenu(this);
        // turn each MenuButton off if it was on, unless the tutorial was on
        this.menu.forEach(function(menuComponent){
            if(menuComponent instanceof MenuButton && menuComponent.name != "tutorial"){
                menuComponent.setStatus(menuComponent.OFF);
            }
        });
        event.target.setStatus(event.target.ON);

        return;
    // if the MainMenuButton was on
    } else if(event.target  instanceof MainMenuButton && event.target.status == event.target.ON){
        this.soundmanager.playSound('button', null);
        // if the actRecipe is defined hide the main menu and render the new recipe status to the HTML
        if(this.actRecipe == undefined) {
            return;
        } else {
         this.hideMainMenu(this);
            event.target.setStatus(event.target.OFF);
            var recipeManager = new RecipeManager(this.jRecipes, this.actRecipe, this.counter, this.points);
            recipeManager.render();
            return;
        }
    }

    if (event.target instanceof Knob) {

        this.soundmanager.playSound('button', null);
        // turn the knob off if it was on, turn the knob on if it was not
        if(event.target.status != event.target.ON) {
            event.target.setStatus(event.target.ON);
        } else if (event.target.status != event.target.OFF) {
            event.target.setStatus(event.target.OFF);
        }
    }

    if(event.target instanceof OvenButton){
        if(event.target.status != event.target.ON){
            event.target.setStatus(event.target.ON);
            // if the oven is turned on, it shall start baking when it has an ingredient
            if(that.oven.baking()) {
                this.soundmanager.playSound('oven', function() {
                    for(var i = 0; i<that.oven.content.length; i++) {
                        that.stage.addToStage(that.oven.content[i]);
                    }
                    that.soundmanager.playSound('beam', null);
                    that.oven.clearContent();
                });

            }
        } else {
            event.target.setStatus(event.target.OFF);
        }
    }


    // if a FridgeButton is clicked and was off, turn it on and render the specific IngredientButtons to the stage
    if(event.target instanceof FridgeButton && event.target.status != event.target.ON){
        event.target.setStatus(event.target.ON);
        this.addIngredientButtons(this.jIngredientButtons, this.fridge);
    } else if(event.target instanceof FridgeButton && event.target.status == event.target.ON){
    // else it shall hide the buttons and turn off
        this.ingredientButtons.forEach(function(ingredientButton){
            event.target.setStatus(event.target.OFF);
            that.stage.removeFromStage(ingredientButton);
        });
        that.stage.removeFromStage(that.fridgehologramm);
    }

    // if a CupboardButton is clicked and was off, turn it on and render the specific UtilityButtons to the stage
    if(event.target instanceof CupboardButton && event.target.status != event.target.ON){
        event.target.setStatus(event.target.ON);
        this.addUtilityButtons(this.jUtilityButtons);
    } else if(event.target instanceof CupboardButton && event.target.status == event.target.ON){
        // else it shall hide the buttons and turn off
        this.utilityButtons.forEach(function(utilityButton){
            event.target.setStatus(event.target.OFF);
            that.stage.removeFromStage(utilityButton);
        });
        that.stage.removeFromStage(that.cupboardhologramm);
    }

    // if an IngredientButton is clicked, it shall beam the specific ingredient
    if(event.target instanceof IngredientButton){
        this.soundmanager.playSound('beam', null);
        this.addIngredient(this.jContainer, this.jIngredients, event.target.name);
    }

    // if a UtilityButton is clicked, it shall beam the specific utility
    if(event.target instanceof UtilityButton){
        this.soundmanager.playSound('beam', null);
        this.addUtilities(this.jUtilities, event.target.name);
    }


    // when the recipe is done show the results
    if (this.actRecipe != undefined && this.actRecipe.tasks.length > this.counter) {
        console.log(this.actRecipe.tasks[this.counter].message);
    } else if (this.actRecipe != undefined && !(event.target instanceof Ingredient && this.actRecipe.tasks.length > this.counter)){
        this.showResults(this);
    } else if(this.actRecipe == undefined) {
        console.log("Please chose a recipe.");
    }
}

/**
 * The function 'onDragging' adds an 'onDragging' event listener to target the cursor is dragging.
 * If a draggable target is dragging over the bin, the bin's animation status changes to ON.
 *
 * @param event - 'onDragging'
 */

Kitchen.prototype.onDragging = function(event){
    var ingX = event.target.x + event.target.width / 2;

    // new hitzone for Container, since they have more transparent pixel
    if(event.target instanceof Container) {
        var ingY = event.target.y + event.target.height/1.2 ;
    } else {
        var ingY = event.target.y + event.target.height/2;
    }
    var zone = this.bin.getHitZone();

    if (ingX >= zone.hx && ingX <= zone.hx + zone.hw && ingY >= zone.hy && ingY <= zone.hy + zone.hh) {
        this.bin.setStatus(this.bin.ON);
    } else {
        this.bin.setStatus(this.bin.OFF);
    }
}

/**
 * The function 'onDragend' adds an 'onDrangend' event listener to target the cursor is putting down.
 *
 * @param event - 'onDragend'
 */

Kitchen.prototype.onDragend = function (event) {

    /*
    If a draggable object is put over a bin it will disappear from the stage
     */

    var tasks = this.actRecipe.tasks;
    var ingX = event.target.x + event.target.width / 2;
    if(event.target instanceof Container) {
        var ingY = event.target.y + event.target.height/1.2;
    } else {
        var ingY = event.target.y + event.target.height/2;
    }

    var zone = this.bin.getHitZone();
    console.log("x: " + ingX + "y: " + ingY);
    console.log(zone);
    if (ingX >= zone.hx && ingX <= zone.hx + zone.hw && ingY >= zone.hy && ingY <= zone.hy + zone.hh) {
        this.stage.removeFromStage(event.target);
        event.target = null;
        this.bin.setStatus(this.bin.OFF);
    }

    if (event.target instanceof Ingredient && this.actRecipe.tasks.length > this.counter) {

        if(tasks[this.counter].task != null && this.counter < tasks.length) {


            //If a recipe has been selected, and the target is put on a pot.

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
                    // if so, add 10 points and remove it from the stage and cook it
                    if(actTask.utensil == "pot" && potContentTrue && this.pots[i].status == actTask.utensilProperties.actState && event.target.name == actTask.contentName && event.target.isCut == actTask.ingredientProperties.isCut && event.target.isCooked == actTask.ingredientProperties.isCooked && event.target.isBaked == actTask.ingredientProperties.isBaked){
                        this.pots[i].content.push(event.target);
                        this.stage.removeFromStage(event.target);
                        //render the nwe points
                        this.points = this.points + 10;
                        this.counter++;
                        var recipeManager = new RecipeManager(this.jRecipes, this.actRecipe, this.counter, this.points);
                        recipeManager.render();
                        break;

                    // if either the pot or the ingredient do not meet the requirements
                    // substract 10 points and remove it from the stage
                    } else if (!(actTask.utensil == "pot" && potContentTrue && this.pots[i].status == actTask.utensilProperties.actState && event.target.name == actTask.contentName && event.target.isCut == actTask.ingredientProperties.isCut && event.target.isCooked == actTask.ingredientProperties.isCooked && event.target.isBaked == actTask.ingredientProperties.isBaked)){
                        this.pots[i].content.push(event.target);
                        this.stage.removeFromStage(event.target);
                        this.points = this.points - 10;
                        this.soundmanager.playSound('error', null);
                        // render the new points
                        var recipeManager = new RecipeManager(this.jRecipes, this.actRecipe, this.counter, this.points);
                        recipeManager.render();
                        break;
                    }
                }
            }

            //is the ingredient over a kitchen slicer?
            var kitZone = this.kitchenSlicer.getHitZone();

            if (ingX >= kitZone.hx && ingX <= kitZone.hx + kitZone.hw && ingY >= kitZone.hy && ingY <= kitZone.hy + kitZone.hh && this.kitchenSlicer.status == this.kitchenSlicer.OFF) {


                // does the kitchen slicer meet all the property requirements for the task?
                // does the clicked ingredient meet the ingredient properties of the current task?
                // if so, add 10 points, else substract 10 points and remove the ingredient from the stage
                if(actTask.utensil == "kitchenslicer" && this.kitchenSlicer.status == actTask.utensilProperties.actState &&event.target.name == actTask.contentName && event.target.isCut == actTask.ingredientProperties.isCut && event.target.isCooked == actTask.ingredientProperties.isCooked && event.target.isBaked == actTask.ingredientProperties.isBaked){

                    this.kitchenSlicer.content.push(event.target);
                    this.kitchenSlicer.setStatus(this.kitchenSlicer.ON);
                    this.stage.removeFromStage(event.target);
                    this.soundmanager.playSound('beam', null);
                    this.points = this.points + 10;
                    this.counter++;
                    // render the new points
                    var recipeManager = new RecipeManager(this.jRecipes, this.actRecipe, this.counter, this.points);
                    recipeManager.render();
                    var that = this;

                    // cut the ingredient and render it back to the stage
                    this.soundmanager.playSound('slicer', function() {
                        that.kitchenSlicer.setStatus(that.kitchenSlicer.OFF);
                        that.stage.addToStage(that.kitchenSlicer.content[0]);
                        that.soundmanager.playSound('beam', null);
                        that.kitchenSlicer.clearContent();

                    });

                }  else if (!(actTask.utensil == "kitchenslicer" && this.kitchenSlicer.status == actTask.utensilProperties.actState &&event.target.name == actTask.contentName && event.target.isCut == actTask.ingredientProperties.isCut && event.target.isCooked == actTask.ingredientProperties.isCooked && event.target.isBaked == actTask.ingredientProperties.isBaked)){

                    this.kitchenSlicer.content.push(event.target);
                    this.kitchenSlicer.setStatus(this.kitchenSlicer.ON);
                    this.soundmanager.playSound('beam', null);
                    this.stage.removeFromStage(event.target);
                    this.points = this.points - 10;
                    this.soundmanager.playSound('error', null);

                    // render the new points
                    var recipeManager = new RecipeManager(this.jRecipes, this.actRecipe, this.counter, this.points);
                    recipeManager.render();

                    var that = this;

                    // cut the ingredient and render it back to the stage
                    this.soundmanager.playSound('slicer', function() {
                        that.kitchenSlicer.setStatus(that.kitchenSlicer.OFF);
                        that.stage.addToStage(that.kitchenSlicer.content[0]);
                        that.soundmanager.playSound('beam', null);
                        that.kitchenSlicer.clearContent();

                    });
                }
            }

            //is the ingredient over the oven?
            var ovenZone = this.oven.getHitZone();

            if (ingX >= ovenZone.hx && ingX <= ovenZone.hx + ovenZone.hw && ingY >= ovenZone.hy && ingY <= ovenZone.hy + ovenZone.hh) {
                // if the oven  content does not meet the requirements of the current task
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

                // does the oven meet all the property requirements for the task?
                // does the clicked ingredient meet the ingredient properties of the current task?
                // if so, add 10 points, else substract 10 points and remove the ingredient from the stage
                if(actTask.utensil == "oven" && ovenContentTrue && this.oven.status == actTask.utensilProperties.actState &&event.target.name == actTask.contentName && event.target.isCut == actTask.ingredientProperties.isCut && event.target.isCooked == actTask.ingredientProperties.isCooked && event.target.isBaked == actTask.ingredientProperties.isBaked){

                    this.oven.content.push(event.target);
                    this.stage.removeFromStage(event.target);
                    this.soundmanager.playSound('beam', null);
                    this.points = this.points + 10;
                    this.counter++;
                    // render new points
                    var recipeManager = new RecipeManager(this.jRecipes, this.actRecipe, this.counter, this.points);
                    recipeManager.render();
                    var that = this;
                    // bake the ingredient and put it back to the stage
                    if(that.oven.baking()) {
                        this.soundmanager.playSound('oven', function() {
                            for(var i = 0; i<that.oven.content.length; i++) {
                                that.stage.addToStage(that.oven.content[i]);
                            }
                            that.soundmanager.playSound('beam', null);
                            that.oven.clearContent();
                        });

                    }

                }  else if (!(actTask.utensil == "oven" && ovenContentTrue && this.oven.status == actTask.utensilProperties.actState &&event.target.name == actTask.contentName && event.target.isCut == actTask.ingredientProperties.isCut && event.target.isCooked == actTask.ingredientProperties.isCooked && event.target.isBaked == actTask.ingredientProperties.isBaked)){

                    this.oven.content.push(event.target);
                    this.stage.removeFromStage(event.target);
                    this.soundmanager.playSound('beam', null);
                    this.points = this.points - 10;
                    this.soundmanager.playSound('error', null);
                    // render the new points
                    var recipeManager = new RecipeManager(this.jRecipes, this.actRecipe, this.counter, this.points);
                    recipeManager.render();

                    var that = this;

                    // bake the ingredient and put it back to the stage
                    if(that.oven.baking()) {
                        this.soundmanager.playSound('oven', function() {
                            for(var i = 0; i<that.oven.content.length; i++) {
                                that.stage.addToStage(that.oven.content[i]);
                            }
                            that.soundmanager.playSound('beam', null);
                            that.oven.clearContent();
                        });

                    }
                }
            }
            var counterZone = this.counterTop.getHitZone();

            // is the ingredient over a counter top and the current task is telling the user to put it there, add 10 points
            if (ingX >= counterZone.hx && ingX <= counterZone.hx + counterZone.hw && ingY >= counterZone.hy && ingY <= counterZone.hy + counterZone.hh){
                if(actTask.utensil == "countertop" && event.target.name == actTask.contentName && event.target.isCut == actTask.ingredientProperties.isCut && event.target.isCooked == actTask.ingredientProperties.isCooked && event.target.isBaked == actTask.ingredientProperties.isBaked){
                    this.points = this.points + 10;
                    this.counter++;
                    // render new points
                    var recipeManager = new RecipeManager(this.jRecipes, this.actRecipe, this.counter, this.points);
                    recipeManager.render();
                }
            }

        /*
        If the current mode is the tutorial mode
        */
        } else if(tasks[this.counter].task == null && this.counter < tasks.length) {

                var ingX = event.target.x + event.target.width / 2;
                var ingY = event.target.y + event.target.height / 2;

                for (var i = 0; i < this.pots.length; i++) {

                    var zone = this.pots[i].getHitZone();

                    //is the ingredient over a pot?
                    if (ingX >= zone.hx && ingX <= zone.hx + zone.hw && ingY >= zone.hy && ingY <= zone.hy + zone.hh) {

                        //remove it from the stage and cook it
                        this.pots[i].content.push(event.target);
                        this.stage.removeFromStage(event.target);
                        break;

                    }
                }

                //is the ingredient over a kitchen slicer?
                var kitZone = this.kitchenSlicer.getHitZone();

                if (ingX >= kitZone.hx && ingX <= kitZone.hx + kitZone.hw && ingY >= kitZone.hy && ingY <= kitZone.hy + kitZone.hh && this.kitchenSlicer.status == this.kitchenSlicer.OFF) {

                    // remove it from the stage
                    this.kitchenSlicer.content.push(event.target);
                    this.kitchenSlicer.setStatus(this.kitchenSlicer.ON);
                    this.stage.removeFromStage(event.target);
                    this.soundmanager.playSound('beam', null);
                    var that = this;

                    // cut it and put it back to the stage when the sound is over
                    this.soundmanager.playSound('slicer', function() {
                        that.kitchenSlicer.setStatus(that.kitchenSlicer.OFF);
                        that.stage.addToStage(that.kitchenSlicer.content[0]);
                        that.soundmanager.playSound('beam', null);
                        that.kitchenSlicer.clearContent();

                    });
                }

                //is the ingredient over an oven?
                var ovenZone = this.oven.getHitZone();

                if (ingX >= ovenZone.hx && ingX <= ovenZone.hx + ovenZone.hw && ingY >= ovenZone.hy && ingY <= ovenZone.hy + ovenZone.hh) {

                    // remove it from the stage
                    this.oven.content.push(event.target);
                    this.stage.removeFromStage(event.target);
                    this.soundmanager.playSound('beam', null);
                    var that = this;

                    // bake it and put it back to the stage when the sound is over
                    if(that.oven.baking()) {
                        this.soundmanager.playSound('oven', function() {
                            for(var i = 0; i<that.oven.content.length; i++) {
                                that.stage.addToStage(that.oven.content[i]);
                            }
                            that.soundmanager.playSound('beam', null);
                            that.oven.clearContent();
                        });

                    }
                }

        }

    } else if(event.target instanceof Container && this.actRecipe.tasks.length > this.counter){

        if(tasks[this.counter].task != null && this.counter < tasks.length) {

            var actTask = tasks[this.counter].task;

            var ingX = event.target.x + event.target.width / 2;
            var ingY = event.target.y + event.target.height / 2;

            for (var i = 0; i < this.pots.length; i++) {

                var zone = this.pots[i].getHitZone();

                //is the container over a pot?
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
                    // does the dragged container meet the ingredient properties of the current task?
                    // if so add 10 points, else subtract 10 points
                    if(actTask.utensil == "pot" && potContentTrue && this.pots[i].status == actTask.utensilProperties.actState && event.target.name == actTask.contentName && event.target.isCut == actTask.ingredientProperties.isCut && event.target.isCooked == actTask.ingredientProperties.isCooked && event.target.isBaked == actTask.ingredientProperties.isBaked){
                        this.pots[i].content.push(event.target);
                        event.target.changeAnim();
                        this.pots[i].content.forEach(function(cont){console.log(cont.name)});
                        this.points = this.points + 10;
                        this.counter++;
                        // render new points
                        var recipeManager = new RecipeManager(this.jRecipes, this.actRecipe, this.counter, this.points);
                        recipeManager.render();
                        break;

                        // if either the pot or the ingredient do not meet the requirements
                    } else if (!(actTask.utensil == "pot" && potContentTrue && this.pots[i].status == actTask.utensilProperties.actState && event.target.name == actTask.contentName && event.target.isCut == actTask.ingredientProperties.isCut && event.target.isCooked == actTask.ingredientProperties.isCooked && event.target.isBaked == actTask.ingredientProperties.isBaked)){
                        this.pots[i].content.push(event.target);
                        event.target.changeAnim();
                        this.pots[i].content.forEach(function(cont){console.log(cont.name)});
                        this.points = this.points - 10;
                        this.soundmanager.playSound('error', null);
                        var recipeManager = new RecipeManager(this.jRecipes, this.actRecipe, this.counter, this.points);
                        recipeManager.render();
                        break;
                    }
                }
            }

        } else if(tasks[this.counter].task == null && this.counter < tasks.length){

            var ingX = event.target.x + event.target.width / 2;
            var ingY = event.target.y + event.target.height / 2;

            for (var i = 0; i < this.pots.length; i++) {

                var zone = this.pots[i].getHitZone();

                //is the container over a pot?
                if (ingX >= zone.hx && ingX <= zone.hx + zone.hw && ingY >= zone.hy && ingY <= zone.hy + zone.hh) {

                    this.pots[i].content.push(event.target);
                    event.target.changeAnim();
                    this.pots[i].content.forEach(function(cont){console.log(cont.name)});
                    // render new points
                    var recipeManager = new RecipeManager(this.jRecipes, this.actRecipe, this.counter, this.points);
                    recipeManager.render();
                    break;
                }
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
                if ((this.stoveTops[i].pot == null) && overAPlate ) {
                    this.stoveTops[i].setCurrentPot(event.target);
                    event.target.myPlateIndex = i;
                    event.target.onPlate = true;
                    break;
                    //to an occupied stoveTop
                } else if ((event.target != this.stoveTops[i].pot) && (this.stoveTops[i].pot != null) && overAPlate) {
                    event.target.onPlate = false;
                    event.target.setStatus(event.target.OFF);
                    break;
                }
                //pot comes from stoveTop
            } else if (event.target.onPlate){
                //to a free stoveTop
                if ((this.stoveTops[i].pot == null) && overAPlate ) {
                    this.stoveTops[event.target.myPlateIndex].setCurrentPot(null);
                    event.target.myPlateIndex = null;
                    this.stoveTops[i].setCurrentPot(event.target);
                    event.target.myPlateIndex = i;
                    event.target.onPlate = true;
                    break;
                    //to an occupied stoveTop
                } else if((event.target != this.stoveTops[i].pot) && (this.stoveTops[i].pot != null) && overAPlate) {
                    this.stoveTops[event.target.myPlateIndex].setCurrentPot(null);
                    event.target.myPlateIndex = null;
                    event.target.onPlate = false;
                    event.target.setStatus(event.target.OFF);
                    break;
                }
            }
        }
        if (!overAPlate) {
            // the pot is nowhere
            if (event.target.myPlateIndex != null ) {
                this.stoveTops[event.target.myPlateIndex].setCurrentPot(null);
            }
            event.target.myPlateIndex = null;
            event.target.onPlate = false;
            event.target.setStatus(event.target.OFF);
        }
    }

}