/**
 * The OvenButton is a blue print for the oven button. The oven button is used to turn on the oven.
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
 * @param animObj - animation sequence for object that is read from the image sprite
 */

function OvenButton(context, sx, sy, w, h, imgPath, zOrder, name, oven, animObj) {

    VisualRenderAnimation.call(this, context, sx, sy, w, h, imgPath, zOrder, animObj);


    this.name = name;
    this.oven = oven;

    // shows if the knob is turned off or on or if the cursor is hovering over the button
    this.OFF = "off";
    this.ONHOVER = "onHover";
    this.ON = "on";
    this.status = this.OFF;





}

OvenButton.prototype = Object.create(VisualRenderAnimation.prototype);
OvenButton.prototype.constructor = Knob;

/**
 * The function 'setStatus' sets the current status of the oven button and changes its animation sequence to the
 * given status.
 *
 * @param status - new status of the oven button (off, on, on mouse over)
 */

OvenButton.prototype.setStatus = function (status) {

    this.status = status;
    this.oven.setStatus(status);

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
