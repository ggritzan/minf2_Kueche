/**
 * The StoveTop is a blue print for a stove top. Stove tops are used to heat pots, so they can cook the ingredients in
 * them.
 *
 * @param context - '2D' oder '3D' context (in this case it is always '2D')
 * @param sx - x-coordinate of the left upper corner of the image for the object
 * @param sy - y-coordinate of the left upper corner of the image for the object
 * @param w - width of the image
 * @param h - height of the image
 * @param imgPath - image path of the image
 * @param zOrder - z-coordinate of the image
 * @param name - name of the object
 * @param animObj - animation sequence for object that is read from the image sprite
 */

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

