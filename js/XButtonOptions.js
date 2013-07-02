function XButtonOptions(context, sx, sy, w, h, imgPath, zOrder) {

    VisualRenderObject.call(this, context, sx, sy, w, h, imgPath, zOrder);

    // shows if the knob is turned off or on
    this.OFF = "off";
    this.ON = "on";
    this.status = this.OFF;
}

XButtonOptions.prototype = Object.create(VisualRenderObject.prototype);
XButtonOptions.prototype.constructor = XButtonOptions;


XButtonOptions.prototype.setStatus = function (status) {
    this.status = status;

}