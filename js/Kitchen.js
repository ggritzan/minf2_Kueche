function Kitchen(canvasId) {

    // get the right requestAnimationFrame for this browser
    var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
    // apply the right animation frame to the window object
    window.requestAnimationFrame = requestAnimationFrame;

    // create a new stage object
    this.stage = new Stage(canvasId);

    this.pots = [];
    this.Ingredients = [];
    this.plates = [];

    var animObj = {
        "image": {
            "tileWidth": 160,
            "tileHeight": 180,
            "imgWidth": 640,
            "imgHeight": 360
        },
        "animations": {
            "default": { "seq": [0], "loop": false},
            "cold": {"seq": [0], "loop": false},
            "heating": {"seq": [1, 2, 3, 3, 2], "loop": true},
            "cooling": {"seq": [1, 1, 2, 3, 2], "loop": true},
            "boiling": {"seq": [4, 5, 6, 7], "loop": true}
        }
    };

    var p1 = new Pot(this.stage.getContext(), 400, 10, 242, 187, "images/pot.png", 25, true, "Topf");
    var p2 = new Pot(this.stage.getContext(), 600, 10, 242, 187, "images/pot.png", 25, true, "Topf2");
    var pl1 = new Plate(this.stage.getContext(), 300, 300, 242, 85, "images/platte.png", 22, "Platte1");
    var pl2 = new Plate(this.stage.getContext(), 600, 300, 242, 85, "images/platte.png", 22, "Platte2");
    var kn1 = new Knob(this.stage.getContext(),  375, 400, 58, 58, "images/knob.png", 1, "Knopf1", pl1 );
    var kn2 = new Knob(this.stage.getContext(),  675, 400, 58, 58, "images/knob.png", 1, "Knopf2", pl2 );
    var i1 = new Ingredient(this.stage.getContext(), 0, 0, 276, 142, "images/karotte.png", 27, true, "Karotte");
    var i2 = new Ingredient(this.stage.getContext(), 0, 0, 88, 113, "images/tomate.png", 28, true, "Tomate");
    var i3 = new Ingredient(this.stage.getContext(), 0, 0, 255, 255, "images/nudeln.png", 26, true, "Nudeln");

    this.pots.push(p1);
    this.pots.push(p2);
    this.plates.push(pl1);
    this.plates.push(pl2);
    this.Ingredients.push(i1);
    this.Ingredients.push(i2);
    this.Ingredients.push(i3);

    this.stage.addToStage(p1);
    this.stage.addToStage(p2);
    this.stage.addToStage(pl1);
    this.stage.addToStage(pl2)
    this.stage.addToStage(kn1);
    this.stage.addToStage(kn2);
    this.stage.addToStage(i1);
    this.stage.addToStage(i2);
    this.stage.addToStage(i3);


    this.stage.registerEvent('click', this);
    this.stage.registerEvent('dragend', this);


    // start the animation loop
    // parameter this (kitchen itself) needed, because of the closure within the run function
    this.run(this);


}


Kitchen.prototype.onClick = function (event) {
    console.log(event);

}

Kitchen.prototype.onDragend = function (event) {
    console.log(event);

}


/**
 * Animation loop
 * @param kit the kitchen object
 */
Kitchen.prototype.run = function (kit) {

    // update the objects (Plate, Knob, ...)


    // Always render after the updates
    kit.stage.render();
    // keep the loop going
    window.requestAnimationFrame(function () {
        kit.run(kit);
    });

}


Kitchen.prototype.onClick = function (event) {
    console.log(event);
    if (event.target instanceof Knob) {
        if(event.target.status == 0) {
            event.target.setStatus(event.target.ON);
            event.target.setRotation(180);
        }else if (event.target.status == 1) {
            event.target.setStatus(event.target.OFF);
            event.target.setRotation(0);
        }else {
            console.log("An unknown action was performed with the following knob " + event.target.name);
        }
    }
    for(var i = 0; i<this.plates.length; i++) {
        console.log(this.plates[i].name + " has status " +this.plates[i].status);
        if(this.plates[i].pot != null){
            console.log(this.plates[i].name + " has the pot " + this.plates[i].pot.name + " the pot status os " + this.plates[i].pot.status);
        }
    }
    for(var i = 0; i<this.pots.length; i++) {
        console.log(this.pots[i].name + " is in state " + this.pots[i].status);
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
        for (var i = 0; i < this.plates.length; i++) {
            var cx = event.target.getBottomCenter().cx;
            var cy = event.target.getBottomCenter().cy;
            var zone = this.plates[i].getHitZone();
            var overAPlate;
            if ((cx > zone.hx && cx < zone.hx + zone.hw) && (cy > zone.hy && cy < zone.hy + zone.hh)){
                overAPlate = true;
            }
            //pot comes from free space
            if (!event.target.onPlate) {
            //to a free plate
                if ((this.plates[i].pot == null) && (cx > zone.hx && cx < zone.hx + zone.hw) && (cy > zone.hy && cy < zone.hy + zone.hh) ) {
                    this.plates[i].setCurrentPot(event.target);
                    event.target.myPlateIndex = i;
                    console.log(this.plates[i].name + " now has pot " + event.target.name );
                    event.target.onPlate = true;
                    break;
            //to an occupied plate
                } else if ((event.target != this.plates[i].pot) && (this.plates[i].pot != null) && (cx > zone.hx && cx < zone.hx + zone.hw) && (cy > zone.hy && cy < zone.hy + zone.hh)) {
                    console.log(this.plates[i].name + " already has pot " + this.plates[i].pot.name);
                    event.target.onPlate = false;
                    event.target.status = 0;
                    break;
                }
            //pot comes from plate
            } else if (event.target.onPlate){
            //to a free plate
                if ((this.plates[i].pot == null) && (cx > zone.hx && cx < zone.hx + zone.hw) && (cy > zone.hy && cy < zone.hy + zone.hh) ) {
                    console.log(this.plates[i].name + " now has pot " + event.target.name);
                    this.plates[event.target.myPlateIndex].setCurrentPot(null);
                    event.target.myPlateIndex = null;
                    this.plates[i].setCurrentPot(event.target);
                    event.target.myPlateIndex = i;
                    event.target.onPlate = true;
                    break;
            //to an occupied plate
                } else if((event.target != this.plates[i].pot) && (this.plates[i].pot != null) && (cx > zone.hx && cx < zone.hx + zone.hw) && (cy > zone.hy && cy < zone.hy + zone.hh)) {
                    console.log(this.plates[i].name + " already has pot " + this.plates[i].pot.name);
                    this.plates[event.target.myPlateIndex].setCurrentPot(null);
                    event.target.myPlateIndex = null;
                    event.target.onPlate = false;
                    event.target.status = 0;
                    break;
                }
            }
        }
        if (!overAPlate) {
            if (event.target.myPlateIndex != null ) {
                this.plates[event.target.myPlateIndex].setCurrentPot(null);
            }
            console.log(event.target.name + " is nowhere");
            event.target.myPlateIndex = null;
            event.target.onPlate = false;
            event.target.status = 0;
            overAPlate = false;
        }
    }

}





