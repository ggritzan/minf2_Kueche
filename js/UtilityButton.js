/**
 * The UtilityButton is a blue print for an ingredient button which is used to select a utility, such as the pot, which
 * the user can use to cook.
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

function UtilityButton(context, sx, sy, w, h, imgPath, zOrder, name, animObj) {

    VisualRenderAnimation.call(this, context, sx, sy, w, h, imgPath, zOrder, animObj);
    this.name = name;
    this.OFF = "off";   // when the button is turned off
    this.ONHOVER = "onHover";  // when a mouse hovers over the button
    this.status = this.OFF; // current status
}

UtilityButton.prototype = Object.create(VisualRenderAnimation.prototype);
UtilityButton.prototype.constructor = UtilityButton;

/**
 * The function 'setStatus' sets the status of a utility button and changes the animation to it.
 * @param status - the status can on hover (when the mouse hovers over the button) or off and on (when the button is
 *                  clicked)
 */

UtilityButton.prototype.setStatus = function (status) {
    this.status = status;
    switch(status) {
        case this.OFF: this.changeAnimSequence("off");
            break;
        case this.ONHOVER: this.changeAnimSequence("onHover");
            break;
        default: this.changeAnimSequence("default");
            break;
    }
}