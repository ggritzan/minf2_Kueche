function FridgeButton(context, sx, sy, w, h, imgPath, zOrder, name) {

    VisualRenderObject.call(this, context, sx, sy, w, h, imgPath, zOrder);
    this.name = name;
}

FridgeButton.prototype = Object.create(VisualRenderObject.prototype);
FridgeButton.prototype.constructor = FridgeButton;