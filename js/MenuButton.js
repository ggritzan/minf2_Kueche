/**
 * MenuButton is a blue print for a menu button such as the option button, the cookbook button and the tutorial button.
 * The cookbook button starts the cooking application where you are judged if you cooked the meal well or bad using a
 * point system.
 * The tutorial button starts the cooking application with explanations to each component of the application. You are
 * not judged in this mode.
 * The options button starts the options menu where you can set sound and language options.
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

function MenuButton(context, sx, sy, w, h, imgPath, zOrder, animObj, name) {

    VisualRenderAnimation.call(this, context, sx, sy, w, h, imgPath, zOrder, animObj);
    this.name = name;

    // the status of a menu button (off, on or if a cursor hovers over it)
    this.OFF = "off";
    this.ONHOVER = "onHover";
    this.ON = "on";
    this.status = this.OFF;
}

MenuButton.prototype = Object.create(VisualRenderAnimation.prototype);
MenuButton.prototype.constructor = MenuButton;

/**
 * The function 'setStatus' sets a new status to the menu button and changes the animation sequence to the new status.
 *
 * @param status - new status of the menu button (off, on, onHover)
 */

MenuButton.prototype.setStatus = function (status) {
    this.status = status;
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