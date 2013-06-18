function Oven(context, sx, sy, w, h, imgPath, zOrder, name) {

    VisualRenderObject.call(this, context, sx, sy, w, h, imgPath, zOrder);

    this.name = name;
}

Oven.prototype = Object.create(VisualRenderObject.prototype);
Oven.prototype.constructor = Oven;
