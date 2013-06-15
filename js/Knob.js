function Knob(context, sx, sy, w, h, imgPath, zOrder, name, stoveTop) {

    VisualRenderObject.call(this, context, sx, sy, w, h, imgPath, zOrder);




    this.name = name;
    this.stoveTop = stoveTop;

    // Zeigt an ob die Platte ein oder ausgeschaltet ist
    this.OFF = 0;
    this.ON = 1;
    this.status = this.OFF;





}

Knob.prototype = Object.create(VisualRenderObject.prototype);
Knob.prototype.constructor = Knob;


Knob.prototype.setStatus = function (status) {

    this.status = status;
    this.stoveTop.setStatus(status);

}

