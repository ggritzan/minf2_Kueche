/**
 * The Bin is a blue print for a bin object. It inherits from VisualRenderAnimation which inherits from
 * VisualRenderObject. A bin used to delete and remove draggable things from the stage when they are dragged on it.
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

function Bin(context, sx, sy, w, h, imgPath, zOrder, name, animObj) {

    VisualRenderAnimation.call(this, context, sx, sy, w, h, imgPath, zOrder, animObj);
    this.name = name;

    this.OFF = "off";
    this.ON = "on";

    this.status = this.OFF;

}

Bin.prototype = Object.create(VisualRenderAnimation.prototype);
Bin.prototype.constructor = Bin;

/**
 * The function 'setStatus' sets the status of the bin and changes the animation sequence to the new status.
 *
 * @param status - the new status
 */

Bin.prototype.setStatus = function (status){
    this.status = status;
    switch(status) {
        case this.OFF: this.changeAnimSequence("off");
            break;
        case this.ON: this.changeAnimSequence("on");
            break;
        default: this.changeAnimSequence("default");
            break;
    }
}