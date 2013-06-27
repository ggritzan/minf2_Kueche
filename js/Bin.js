function Bin(context, sx, sy, w, h, imgPath, zOrder, name) {

    VisualRenderObject.call(this, context, sx, sy, w, h, imgPath, zOrder);
    this.name = name;

}

Bin.prototype = Object.create(VisualRenderObject.prototype);
Bin.prototype.constructor = Bin;
