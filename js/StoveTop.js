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
    // the current status of the stove top
    this.status = this.OFF;
    // the pot that is on the stove top
    this.pot = null;


}

StoveTop.prototype = Object.create(VisualRenderAnimation.prototype);
StoveTop.prototype.constructor = StoveTop;

/**
 * The function 'setStatus' sets the status of the stove top to 'on' or 'off' and changes the animation sequence, when
 * it is off or on. It also sets its pot's status to its own status when the status is being changed, if it has a pot.
 *
 * @param status - the status of the stove top (on or off)
 */
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

/**
 * The function 'setCurrentPot' gives the stove top a pot when the pot is put on the stove top. It also gives the pot
 * its current status.
 *
 * @param pot - the pot that is put on the stove top
 */
StoveTop.prototype.setCurrentPot = function (pot) {
    this.pot = pot;
    if (this.pot != null ) {
        this.pot.setStatus(this.status);
    }

}

