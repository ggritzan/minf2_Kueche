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
