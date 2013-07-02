function OptionsButton(context, sx, sy, w, h, imgPath, zOrder) {

    VisualRenderObject.call(this, context, sx, sy, w, h, imgPath, zOrder);

    // shows if the knob is turned off or on
    this.OFF = "off";
    this.ON = "on";
    this.status = this.OFF;
}

OptionsButton.prototype = Object.create(VisualRenderObject.prototype);
OptionsButton.prototype.constructor = OptionsButton;


OptionsButton.prototype.setStatus = function (status) {
    this.status = status;

}
