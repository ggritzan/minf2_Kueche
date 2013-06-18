function KitchenSlicer(context, sx, sy, w, h, imgPath, zOrder, name) {

    VisualRenderObject.call(this, context, sx, sy, w, h, imgPath, zOrder);

    this.name = name;
}

KitchenSlicer.prototype = Object.create(VisualRenderObject.prototype);
KitchenSlicer.prototype.constructor = KitchenSlicer;
