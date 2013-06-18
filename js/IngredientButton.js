function IngredientButton(context, sx, sy, w, h, imgPath, zOrder, name) {

    VisualRenderObject.call(this, context, sx, sy, w, h, imgPath, zOrder);
    this.name = name;
}

IngredientButton.prototype = Object.create(VisualRenderObject.prototype);
IngredientButton.prototype.constructor = IngredientButton;