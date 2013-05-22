function Plate(context, sx, sy, w, h, imgPath, zOrder, name) {

    VisualRenderObject.call(this, context, sx, sy, w, h, imgPath, zOrder);




    this.name = name;
    // Zeigt an ob die Platte ein oder ausgeschaltet ist
    this.status = new Boolean(false);



}

Plate.prototype = new VisualRenderObject;
Plate.prototype.constructor = Plate;

