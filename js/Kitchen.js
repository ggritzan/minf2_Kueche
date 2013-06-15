function Kitchen(canvasId) {

    // get the right requestAnimationFrame for this browser
    var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
    // apply the right animation frame to the window object
    window.requestAnimationFrame = requestAnimationFrame;

    // create a new stage object
    this.stage = new Stage(canvasId);

    var utilities;
    var ingredients;

    Ajax.getJSON("json/utilities.json", function(data){
        utilities = data;
    });

    Ajax.getJSON("json/ingredients.json", function(data){
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
    var KITCHEN = this;
    var POTBLUEPRINT = utility.utilities.potBluePrint;
    var STOVEBLUEPRINT = utility.utilities.stoveTopBluePrint;
    var KNOBBLUEPRINT = utility.utilities.knobBluePrint;

    POTBLUEPRINT.pots.forEach(function(pot){
        var pot = new Pot(KITCHEN.stage.getContext(), pot.sx, pot.sy, POTBLUEPRINT.image.tileWidth, POTBLUEPRINT.image.tileHeight, POTBLUEPRINT.image.imagePath, pot.zOrder, POTBLUEPRINT.draggable, pot.name, POTBLUEPRINT);
        KITCHEN.pots.push(pot);
        KITCHEN.stage.addToStage(pot);
    });

    STOVEBLUEPRINT.stoveTops.forEach(function(stoveTop){
        var stoveTop = new StoveTop(KITCHEN.stage.getContext(), stoveTop.sx, stoveTop.sy, STOVEBLUEPRINT.image.tileWidth, STOVEBLUEPRINT.image.tileHeight, STOVEBLUEPRINT.image.imagePath, stoveTop.zOrder, stoveTop.name);
        KITCHEN.stoveTops.push(stoveTop);
        KITCHEN.stage.addToStage(stoveTop);
    });

    for(var i = 0; i < KITCHEN.stoveTops.length; i++){
        var knob = new Knob(KITCHEN.stage.getContext(), KNOBBLUEPRINT.knobs[i].sx, KNOBBLUEPRINT.knobs[i].sy, KNOBBLUEPRINT.image.tileWidth, KNOBBLUEPRINT.image.tileHeight, KNOBBLUEPRINT.image.imagePath, KNOBBLUEPRINT.knobs[i].zOrder, KNOBBLUEPRINT.knobs[i].name, KITCHEN.stoveTops[i]);
        KITCHEN.stage.addToStage(knob);
    }
}

Kitchen.prototype.addIngredients = function(ingredient){
    var KITCHEN = this;
    var CARROTBLUEPRINT = ingredient.ingredients.carrotBluePrint;
    var TOMATOBLUEPRINT = ingredient.ingredients.tomatoBluePrint;
    var NOODLEBLUEPRINT = ingredient.ingredients.noodleBluePrint;

    CARROTBLUEPRINT.carrots.forEach(function(carrot){
        var carrot = new Ingredient(KITCHEN.stage.getContext(), carrot.sx, carrot.sy, CARROTBLUEPRINT.image.tileWidth, CARROTBLUEPRINT.image.tileHeight, CARROTBLUEPRINT.image.imagePath, carrot.zOrder, ingredient.ingredients.draggable, carrot.name);
        KITCHEN.ingredients.push(carrot);
        KITCHEN.stage.addToStage(carrot);
    });

    TOMATOBLUEPRINT.tomatoes.forEach(function(tomato){
        var tomato = new Ingredient(KITCHEN.stage.getContext(), tomato.sx, tomato.sy, TOMATOBLUEPRINT.image.tileWidth, TOMATOBLUEPRINT.image.tileHeight, TOMATOBLUEPRINT.image.imagePath, tomato.zOrder, ingredient.ingredients.draggable, tomato.name);
        KITCHEN.ingredients.push(tomato);
        KITCHEN.stage.addToStage(tomato);
    });

    NOODLEBLUEPRINT.noodles.forEach(function(noodle){
        var noodle = new Ingredient(KITCHEN.stage.getContext(), noodle.sx, noodle.sy, NOODLEBLUEPRINT.image.tileWidth, NOODLEBLUEPRINT.image.tileHeight, NOODLEBLUEPRINT.image.imagePath, noodle.zOrder, ingredient.ingredients.draggable, noodle.name);
        KITCHEN.ingredients.push(noodle);
        KITCHEN.stage.addToStage(noodle);
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