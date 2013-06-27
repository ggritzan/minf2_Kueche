function UtilityButton(context, sx, sy, w, h, imgPath, zOrder, name) {

    VisualRenderObject.call(this, context, sx, sy, w, h, imgPath, zOrder);
    this.name = name;
}

UtilityButton.prototype = Object.create(VisualRenderObject.prototype);
UtilityButton.prototype.constructor = UtilityButton;