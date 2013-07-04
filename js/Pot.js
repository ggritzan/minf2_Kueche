/**
 * The Pot is a blue print for a pot which is used to cook ingredients.
 * It inherits from VisualRenderAnimation which inherits from VisualRenderObject.
 *
 * @param context - '2D' oder '3D' context (in this case it is always '2D')
 * @param sx - x-coordinate of the left upper corner of the image for the object
 * @param sy - y-coordinate of the left upper corner of the image for the object
 * @param w - width of the image
 * @param h - height of the image
 * @param imgPath - image path of the image
 * @param zOrder - z-coordinate of the image
 * @param draggable - sets the object draggable if 'true'
 * @param name - name of the object
 * @param animObj - animation sequence for object that is read from the image sprite
 */

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

    // defines in which status the pot is in
    this.COLD = "cold";
    this.COOLING = "cooling";
    this.HEATING = "heating";
    this.BOILING = "boiling";
    this.actState = this.COLD;

    // if the pot is on a plate
    this.onPlate = false;
    // on which plate it is
    this.myPlateIndex;

    this.soundmanager = new SoundManager();

    // sounds of pot:
    this.boilingWaterSound;
}


Pot.prototype = Object.create(VisualRenderAnimation.prototype);
Pot.prototype.constructor = Pot;

/**
 * The function 'setStatus' sets the status of the pot and changes its animation
 * @param status - the new status of the pot
 */

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

/**
 *  The function 'update' keeps the pot temperature updates
 */

Pot.prototype.update = function(){
    if(this.actState == this.COOLING){
        this.cooling();
    } else if(this.actState == this.HEATING){
        this.heating();
    }
}

/**
 * The function 'cooling' cools the pot if the temperature of the pot is higher than the minimum temperature or it is
 * set to the minimum temperature.
 */

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


/**
 * The function 'heating' heats the pot if the temperature of the pot is lower than the maximum temperature or it is
 * set to the maximum temperature.
 */

Pot.prototype.heating = function(){
    if(this.actState == this.HEATING && this.actTemp < this.MAX_TEMP){
        this.actTemp++;
    } else if(this.actState == this.HEATING && this.actTemp == this.MAX_TEMP){
        this.changeState(this.BOILING);
        this.boilingWaterSound = this.soundmanager.playSound('boilingWater', null);
    }
}

/**
 * change the state of this pot and its animation
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