function Bin(context, sx, sy, w, h, imgPath, zOrder, name, animObj) {

    VisualRenderAnimation.call(this, context, sx, sy, w, h, imgPath, zOrder, animObj);
    this.name = name;

}

Bin.prototype = Object.create(VisualRenderAnimation.prototype);
Bin.prototype.constructor = Bin;
