function Pot(context, sx, sy, w, h, imgPath, zOrder, draggable, name, animObj) {

    VisualRenderAnimation.call(this, context, sx, sy, w, h, imgPath, zOrder, animObj);

    this.setDraggable(draggable);
    this.name = name;
    this.content = [];

    // shows if the pot should be heating/boiling (ON) or cooling/cold (OFF)
    this.OFF = "off";
    this.ON = "on";
    this.status = this.OFF;

    // defines a minimum temperature of the pot and a maximum temperature at which it should be boiling
    this.MIN_TEMP = 0;
    this.MAX_TEMP = 100;
    this.actTemp = this.MIN_TEMP;

    this.COLD = "cold";
    this.COOLING = "cooling";
    this.HEATING = "heating";
    this.BOILING = "boiling";
    this.actState = this.COLD;

    this.onPlate = false;
    this.myPlateIndex;

    this.soundmanager = new SoundManager();

    // sounds of pot:
    this.boilingWaterSound;
}


Pot.prototype = Object.create(VisualRenderAnimation.prototype);
Pot.prototype.constructor = Pot;


Pot.prototype.setStatus = function (status) {
    this.status = status;
    if(this.status == this.ON){
        this.changeState(this.HEATING);
        this.heating();
    } else if (this.status == this.OFF){
        this.changeState(this.COOLING);
        this.cooling();
    }
}

Pot.prototype.update = function(){
    if(this.actState == this.COOLING){
        this.cooling();
    } else if(this.actState == this.HEATING){
        this.heating();
    }
}

Pot.prototype.cooling = function(){
    if(this.actState == this.COOLING && this.actTemp > this.MIN_TEMP){
        this.actTemp--;
    } else if(this.actState === this.COOLING && this.actTemp === this.MIN_TEMP){
        this.changeState(this.COLD);
        if(this.boilingWaterSound != undefined){
            this.soundmanager.stopSound(this.boilingWaterSound);
        }
    }
}

Pot.prototype.heating = function(){
    if(this.actState == this.HEATING && this.actTemp < this.MAX_TEMP){
        this.actTemp++;
    } else if(this.actState == this.HEATING && this.actTemp == this.MAX_TEMP){
        this.changeState(this.BOILING);
        this.boilingWaterSound = this.soundmanager.playSound('boilingWater', null);
    }
}

/**
 * change the state of this pot
 * @param state - the state to be set (cold, heating, cooling, boiling)
 */

Pot.prototype.changeState = function(state){
    this.actState = state;
    switch(state) {
        case this.COLD: this.changeAnimSequence("cold");
            break;
        case this.HEATING: this.changeAnimSequence("heating");
            break;
        case this.COOLING: this.changeAnimSequence("cooling");
            break;
        case this.BOILING: this.changeAnimSequence("boiling");
            break;
        default: this.changeAnimSequence("default");
            break;
    }
}

Pot.prototype.behindIngredient = function(event, kitchen){
    console.log(kitchen.counter);
    console.log(kitchen.actRecipe.length);
    var actTask = kitchen.actRecipe.tasks[kitchen.counter].task;

    var ingX = event.target.x + event.target.width / 2;
    var ingY = event.target.y + event.target.height / 2;

    var zone = this.getHitZone();

    //is the ingredient over a pot?
    if (ingX >= zone.hx && ingX <= zone.hx + zone.hw && ingY >= zone.hy && ingY <= zone.hy + zone.hh) {

        // if the pot content does not meet the requirements of the current task
        var sameContent = true;

        if(this.content.length <= actTask.utensilProperties.content.length){
            for(var l = 0; l < this.content.length; l++){
                if(!(this.content[l].name == actTask.utensilProperties.content[l])){
                    sameContent = false;
                }
            }
        } else if(this.content.length > actTask.utensilProperties.content.length){
            for(var l = 0; l < actTask.utensilProperties.content.length; l++){
                if(!(this.content[l].name == actTask.utensilProperties.content[l])){
                    sameContent = false;
                }
            }
        }

        // does the pot meet all the property requirements for the task?

        // does the clicked ingredient meet the ingredient properties of the current task?
        if(actTask.utensil == "pot" && sameContent && this.status == actTask.utensilProperties.actState && event.target.name == actTask.contentName && event.target.isCut == actTask.ingredientProperties.isCut && event.target.isCooked == actTask.ingredientProperties.isCooked && event.target.isBaked == actTask.ingredientProperties.isBaked){
            this.content.push(event.target);

            if(this.content[0] != undefined){

                kitchen.stage.removeFromStage(event.target);
                kitchen.points = kitchen.points + 10;
                kitchen.counter++;
                console.log("You've got " + kitchen.points + " points now.");
            }

            // if either the pot or the ingredient do not meet the requirements
        } else if (!(actTask.utensil == "pot" && sameContent && this.status == actTask.utensilProperties.actState && event.target.name == actTask.contentName && event.target.isCut == actTask.ingredientProperties.isCut && event.target.isCooked == actTask.ingredientProperties.isCooked && event.target.isBaked == actTask.ingredientProperties.isBaked)){
            this.content.push(event.target);

            if(this.content[0] != undefined){

                kitchen.stage.removeFromStage(event.target);
                kitchen.points = kitchen.points - 10;
                console.log("You've got " + kitchen.points + " points now.");
            }
        }
    }
}
