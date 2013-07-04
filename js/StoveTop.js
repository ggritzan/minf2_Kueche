function StoveTop(context, sx, sy, w, h, imgPath, zOrder, name, animObj) {

    VisualRenderAnimation.call(this, context, sx, sy, w, h, imgPath, zOrder, animObj);

    this.name = name;

    // shows if the stove top is turned off or on
    this.OFF = "off";
    this.ON = "on";
    this.status = this.OFF;
    this.pot = null;


}

StoveTop.prototype = Object.create(VisualRenderAnimation.prototype);
StoveTop.prototype.constructor = StoveTop;

// function to set the power on or off
StoveTop.prototype.setStatus = function (status) {
    this.status = status;
    if (this.pot != null) {
        this.pot.setStatus(this.status);
    }
    switch(status) {
        case this.OFF: this.changeAnimSequence("off");
            break;
        case this.ON: this.changeAnimSequence("on");
            break;
        default: this.changeAnimSequence("default");
            break;
    }
}

// function to give the stove top a pot and to set its status to the same status as the stove top
StoveTop.prototype.setCurrentPot = function (pot) {
    this.pot = pot;
    if (this.pot != null ) {
        this.pot.setStatus(this.status);
        console.log("StoveTop State "+ this.status + " Pot State " + this.pot.status);
    }

}

