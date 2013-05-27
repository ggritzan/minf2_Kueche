function Knob(context, sx, sy, w, h, imgPath, zOrder, name, plate) {

    VisualRenderObject.call(this, context, sx, sy, w, h, imgPath, zOrder);




    this.name = name;
    this.plate = plate;
    // Zeigt an ob die Platte ein oder ausgeschaltet ist
    const on = new Boolean(true);
    const off = new Boolean(false);
    this.status = new Boolean(off);




}

Knob.prototype = new VisualRenderObject;
Knob.prototype.constructor = Knob;


Knob.prototype.changeStatus = function (status) {

    this.status = status;
    this.plate.changeStatus(status);

}

