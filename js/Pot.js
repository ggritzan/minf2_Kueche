function Pot(context, sx, sy, w, h, imgPath, zOrder, draggable, name) {

    VisualRenderObject.call(this, context, sx, sy, w, h, imgPath, zOrder);

    this.setDraggable(draggable);
    this.name = name;
    this.ingredients = [];
    this.OFF = 0;
    this.ON = 1;
    this.status = this.OFF;
    this.COLD = 0;
    this.COOLING = 1;
    this.HEATING = 2;
    this.BOILING = 3;
    this.temp = this.cold;
    this.heat = this.cold;
    var onPlate = false;
    var myPlateIndex;
}


Pot.prototype = new VisualRenderObject;
Pot.prototype.constructor = Pot;


Pot.prototype.setStatus = function (status) {
    this.status = status;
}
