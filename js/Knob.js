function Knob(context, sx, sy, w, h, imgPath, zOrder, name, stoveTop, animObj) {

    VisualRenderAnimation.call(this, context, sx, sy, w, h, imgPath, zOrder, animObj);


    this.name = name;
    this.stoveTop = stoveTop;

    // shows if the knob is turned off or on
    this.OFF = "off";
    this.ON = "on";
    this.status = this.OFF;





}

Knob.prototype = Object.create(VisualRenderAnimation.prototype);
Knob.prototype.constructor = Knob;


Knob.prototype.setStatus = function (status) {

    this.status = status;
    this.stoveTop.setStatus(status);

}

