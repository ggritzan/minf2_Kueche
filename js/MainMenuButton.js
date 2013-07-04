/**
 * The MainMenuButton is a blue print for a main menu button which is used to used to get back to the main menu.
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

function MainMenuButton(context, sx, sy, w, h, imgPath, zOrder, name, animObj) {

    VisualRenderAnimation.call(this, context, sx, sy, w, h, imgPath, zOrder, animObj);

    // shows if the MainMenuButton is turned off or on or if a cursor hovers over it
    this.OFF = "off";
    this.ONHOVER = "onHover";
    this.ON = "on";
    this.status = this.OFF;
    this.name = name;

}

MainMenuButton.prototype = Object.create(VisualRenderAnimation.prototype);
MainMenuButton.prototype.constructor = MainMenuButton;

/**
 * The function 'setStatus' sets a new status to the main menu button and changes the animation sequence to the new
 * status.
 *
 * @param status - new status of the main menu button (off, on, onHover)
 */

MainMenuButton.prototype.setStatus = function (status) {
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
