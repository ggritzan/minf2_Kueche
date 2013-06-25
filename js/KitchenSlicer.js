function KitchenSlicer(context, sx, sy, w, h, imgPath, zOrder, name) {

    VisualRenderObject.call(this, context, sx, sy, w, h, imgPath, zOrder);

    this.name = name;

    this.content = [];

    this.OFF = "off";
    this.ON = "on"
    this.status = this.OFF;
}

KitchenSlicer.prototype = Object.create(VisualRenderObject.prototype);
KitchenSlicer.prototype.constructor = KitchenSlicer;

KitchenSlicer.prototype.setStatus = function (status){
    this.status = status;
}
