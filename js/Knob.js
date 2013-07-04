/**
 * The Knob is a blue print for a knob. It is used to turn its specific stove top on.
 * It inherits from VisualRenderAnimation which inherits from VisualRenderObject.
 *
 * @param context - '2D' oder '3D' context (in this case it is always '2D')
 * @param sx - x-coordinate of the left upper corner of the image for the object
 * @param sy - y-coordinate of the left upper corner of the image for the object
 * @param w - width of the image
 * @param h - height of the image
 * @param imgPath - image path of the image
 * @param zOrder - z-coordinate of the image
 * @param name - name of the object
 * @param stoveTop - specific stove top belonging to the knob object
 * @param animObj - animation sequence for object that is read from the image sprite
 */

function Knob(context, sx, sy, w, h, imgPath, zOrder, name, stoveTop, animObj) {

    VisualRenderAnimation.call(this, context, sx, sy, w, h, imgPath, zOrder, animObj);

    this.name = name;
    this.stoveTop = stoveTop;

    // shows if the knob is turned off or on or if a cursor hovers over it
    this.OFF = "off";
    this.ONHOVER = "onHover";
    this.ON = "on";
    this.status = this.OFF;

}

Knob.prototype = Object.create(VisualRenderAnimation.prototype);
Knob.prototype.constructor = Knob;

/**
 * The function 'setStatus' sets the status of the pot to the new status and sets also the same status to its stove top,
 * if it has one. It also changes the animation sequence of the knob.
 *
 * @param status
 */

Knob.prototype.setStatus = function (status) {

    this.status = status;
    if(status == this.ON){
        this.stoveTop.setStatus(status);
    } else if(status != this.ON){
        // if the status of the knob is OFF or ONHOVER
        this.stoveTop.setStatus(this.stoveTop.OFF);
    }

    switch(status) {
        case this.OFF: this.changeAnimSequence("off");
            break;
        case this.ONHOVER: this.changeAnimSequence("onHover");
            break;
        case this.ON: this.changeAnimSequence("on");
            break;
        default: this.changeAnimSequence("default");
            break;
    }

}

