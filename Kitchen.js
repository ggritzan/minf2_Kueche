function Kitchen(canvasId) {

    // get the right requestAnimationFrame for this browser
    var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
    // apply the right animation frame to the window object
    window.requestAnimationFrame = requestAnimationFrame;

    // create a new stage object
    this.stage = new Stage(canvasId);

    this.pots = [];
    this.Ingredients = [];

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

    var p1 = new Pot(this.stage.getContext(), 10, 10, 360, 246, "images/pot1.png", 25, true, "Topf");
    var i1 = new Ingredient(this.stage.getContext(), 450, 300, 276, 142, "images/karotte.png", 27, true, "Karotte");
    var i2 = new Ingredient(this.stage.getContext(), 300, 350, 88, 113, "images/tomate.png", 28, true, "Tomate");
    var i3 = new Ingredient(this.stage.getContext(), 20, 300, 255, 255, "images/nudeln.png", 26, true, "Nudeln");

    this.pots.push(p1);
    this.Ingredients.push(i1);
    this.Ingredients.push(i2);
    this.Ingredients.push(i3);

    this.stage.addToStage(p1);
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

Kitchen.prototype.onDragend = function (event) {
    console.log(event);
    if (event.target instanceof Ingredient) {
        console.log("An Ingredient has been dropped.");
        for (var i = 0; i < this.pots.length; i++) {
            //is the ingredient over a pot?
            if (event.target.x + event.target.width / 2 >= this.pots[i].x && event.target.x + event.target.width / 2 <= this.pots[i].x + this.pots[i].width && event.target.y + event.target.height / 2 >= this.pots[i].y && event.target.y + event.target.height / 2 <= this.pots[i].y + this.pots[i].height) {
                this.pots[i].ingredients.push(event.target);
                console.log("You have put the ingredient " + event.target.titel + " into a pot");
                this.stage.removeFromStage(event.target);
                break;
            }
        }
    } else if (event.target instanceof Pot) {
        console.log("A Pot has been moved.");
    }
}





