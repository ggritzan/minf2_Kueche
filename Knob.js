function Knob(context, sx, sy, w, h, imgPath, zOrder, name, Plate) {

    VisualRenderObject.call(this, context, sx, sy, w, h, imgPath, zOrder);




    this.name = name;
    this.Plate = Plate;
    // Zeigt an ob die Platte ein oder ausgeschaltet ist
    this.status = new Boolean(false);




}

Knob.prototype = new VisualRenderObject;
Knob.prototype.constructor = Knob;

