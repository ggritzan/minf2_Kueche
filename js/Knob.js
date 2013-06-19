function Knob(context, sx, sy, w, h, imgPath, zOrder, name, stoveTop) {

    VisualRenderObject.call(this, context, sx, sy, w, h, imgPath, zOrder);


    this.name = name;
    this.stoveTop = stoveTop;

    // shows if the knob is turned off or on
    this.OFF = "off";
    this.ON = "on";
    this.status = this.OFF;





}

Knob.prototype = Object.create(VisualRenderObject.prototype);
Knob.prototype.constructor = Knob;


Knob.prototype.setStatus = function (status) {

    this.status = status;
    this.stoveTop.setStatus(status);

}

