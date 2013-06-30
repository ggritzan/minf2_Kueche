function OvenButton(context, sx, sy, w, h, imgPath, zOrder, name, oven, animObj) {

    VisualRenderAnimation.call(this, context, sx, sy, w, h, imgPath, zOrder, animObj);


    this.name = name;
    this.oven = oven;

    // shows if the knob is turned off or on
    this.OFF = "off";
    this.ON = "on";
    this.status = this.OFF;





}

OvenButton.prototype = Object.create(VisualRenderAnimation.prototype);
OvenButton.prototype.constructor = Knob;


OvenButton.prototype.setStatus = function (status) {

    this.status = status;
    this.oven.setStatus(status);

}
