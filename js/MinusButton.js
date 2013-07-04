/**
 * MinusButton is a blue print for a MinusButton object. The minus button is used to turn the sound volume lower.
 * It inherits from VisualRenderObject.
 *
 * @param context - '2D' oder '3D' context (in this case it is always '2D')
 * @param sx - x-coordinate of the left upper corner of the image for the object
 * @param sy - y-coordinate of the left upper corner of the image for the object
 * @param w - width of the image
 * @param h - height of the image
 * @param imgPath - image path of the image
 * @param zOrder - z-coordinate of the image
 */

function MinusButton(context, sx, sy, w, h, imgPath, zOrder) {

    VisualRenderObject.call(this, context, sx, sy, w, h, imgPath, zOrder);

    // shows if the knob is turned off or on
    this.OFF = "off";
    this.ON = "on";
    this.status = this.OFF;
}

MinusButton.prototype = Object.create(VisualRenderObject.prototype);
MinusButton.prototype.constructor = MinusButton;


MinusButton.prototype.setStatus = function (status) {
    this.status = status;

}
