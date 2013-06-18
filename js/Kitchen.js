function Kitchen(canvasId) {

    // get the right requestAnimationFrame for this browser
    var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
    // apply the right animation frame to the window object
    window.requestAnimationFrame = requestAnimationFrame;

    // create a new stage object
    this.stage = new Stage(canvasId);

    var utilities;
    var ingredients;
    var d = new Date();

    Ajax.getJSON("json/utilities.json?d=" + d.getTime(), function(data){
        utilities = data;
    });

    Ajax.getJSON("json/ingredients.json?d=" + d.getTime(), function(data){
        ingredients = data;
    });

    this.pots = [];
    this.ingredients = [];
    this.stoveTops = [];

    this.addUtilities(utilities);
    this.addIngredients(ingredients);


    this.stage.registerEvent('click', this);
    this.stage.registerEvent('dragend', this);


    // start the animation loop
    // parameter this (kitchen itself) needed, because of the closure within the run function
    this.run(this);


}


/**
 * Animation loop
 * @param kit the kitchen object
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

Kitchen.prototype.addUtilities = function(utility){
    var kitchen = this;
    var potblueprint = utility.utilities.potBluePrint;
    var stoveblueprint = utility.utilities.stoveTopBluePrint;
    var knobblueprint = utility.utilities.knobBluePrint;

    potblueprint.pots.forEach(function(pot){
        var pot = new Pot(kitchen.stage.getContext(), pot.sx, pot.sy, potblueprint.image.tileWidth, potblueprint.image.tileHeight, potblueprint.image.imagePath, pot.zOrder, potblueprint.draggable, pot.name, potblueprint);
        kitchen.pots.push(pot);
        kitchen.stage.addToStage(pot);
    });

    stoveblueprint.stoveTops.forEach(function(stoveTop){
        var stoveTop = new StoveTop(kitchen.stage.getContext(), stoveTop.sx, stoveTop.sy, stoveblueprint.image.tileWidth, stoveblueprint.image.tileHeight, stoveblueprint.image.imagePath, stoveTop.zOrder, stoveTop.name);
        kitchen.stoveTops.push(stoveTop);
        kitchen.stage.addToStage(stoveTop);
    });

    for(var i = 0; i < kitchen.stoveTops.length; i++){
        var knob = new Knob(kitchen.stage.getContext(), knobblueprint.knobs[i].sx, knobblueprint.knobs[i].sy, knobblueprint.image.tileWidth, knobblueprint.image.tileHeight, knobblueprint.image.imagePath, knobblueprint.knobs[i].zOrder, knobblueprint.knobs[i].name, kitchen.stoveTops[i]);
        kitchen.stage.addToStage(knob);
    }
}

Kitchen.prototype.addIngredients = function(ingredients){
    var kitchen = this;

    var ingredient = ingredients.ingredients;
    console.log(ingredient);
    ingredient.forEach(function(ingredient){
        var ingredient = new Ingredient(kitchen.stage.getContext(), ingredient.sx, ingredient.sy, ingredient.tileWidth, ingredient.tileHeight, ingredient.imagePath, ingredient.zOrder, ingredients.draggable, ingredient.name);
        kitchen.ingredients.push(ingredient);
        kitchen.stage.addToStage(ingredient);
    });
}


Kitchen.prototype.onClick = function (event) {
    console.log(event);
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
            var overAPlate;
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
        if (!overAPlate) {
            if (event.target.myPlateIndex != null ) {
                this.stoveTops[event.target.myPlateIndex].setCurrentPot(null);
            }
            console.log(event.target.name + " is nowhere");
            event.target.myPlateIndex = null;
            event.target.onPlate = false;
            event.target.setStatus(event.target.OFF);
            overAPlate = false;
        }
    }

}