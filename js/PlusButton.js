function PlusButton(context, sx, sy, w, h, imgPath, zOrder) {

    VisualRenderObject.call(this, context, sx, sy, w, h, imgPath, zOrder);

    // shows if the knob is turned off or on
    this.OFF = "off";
    this.ON = "on";
    this.status = this.OFF;
}

PlusButton.prototype = Object.create(VisualRenderObject.prototype);
PlusButton.prototype.constructor = PlusButton;


PlusButton.prototype.setStatus = function (status) {
    this.status = status;

}

