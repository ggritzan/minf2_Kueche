function Knob(context, sx, sy, w, h, imgPath, zOrder, name, plate, degree) {

    VisualRenderObject.call(this, context, sx, sy, w, h, imgPath, zOrder, degree);




    this.name = name;
    this.plate = plate;

    // Zeigt an ob die Platte ein oder ausgeschaltet ist
    this.OFF = 0;
    this.ON = 1;
    this.status = this.OFF;
    this.setRotation(0);




}

Knob.prototype = Object.create(VisualRenderObject.prototype);
Knob.prototype.constructor = Knob;


Knob.prototype.setStatus = function (status) {

    this.status = status;
    this.plate.setStatus(status);

}

