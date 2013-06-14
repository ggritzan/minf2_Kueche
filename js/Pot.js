function Pot(context, sx, sy, w, h, imgPath, zOrder, draggable, name, animObj) {

    VisualRenderAnimation.call(this, context, sx, sy, w, h, imgPath, zOrder, animObj);

    this.setDraggable(draggable);
    this.name = name;
    this.ingredients = [];

    this.OFF = 0;
    this.ON = 1;
    this.status = this.OFF;

    this.MIN_TEMP = 0;
    this.MAX_TEMP = 100;
    this.actTemp = this.MIN_TEMP;

    this.COLD = "cold";
    this.COOLING = "cooling";
    this.HEATING = "heating";
    this.BOILING = "boiling";
    this.actState = this.COLD;

    var onPlate = false;
    var myPlateIndex;

    this.soundmanager = new SoundManager();
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
    }
}

Pot.prototype.heating = function(){
    if(this.actState == this.HEATING && this.actTemp < this.MAX_TEMP){
        this.actTemp++;
    } else if(this.actState == this.HEATING && this.actTemp == this.MAX_TEMP){
        this.changeState(this.BOILING);
        this.soundmanager.playSound(this.soundmanager.boilingWaterSound);
    }
}

/**
 * change the state of this pot
 * @param String state - the state to be set (cold, heating, cooling, boiling)
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
