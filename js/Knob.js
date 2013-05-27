function Knob(context, sx, sy, w, h, imgPath, zOrder, name, plate, degree) {

    VisualRenderObject.call(this, context, sx, sy, w, h, imgPath, zOrder, degree);




    this.name = name;
    this.plate = plate;

    // Zeigt an ob die Platte ein oder ausgeschaltet ist
    this.OFF = 0;
    this.ON = 1;
    this.actStatus = this.OFF;




}

Knob.prototype = new VisualRenderObject;
Knob.prototype.constructor = Knob;


Knob.prototype.changeStatus = function (actstatus) {

    this.status = actstatus;
    this.plate.changeStatus(actstatus);

}

