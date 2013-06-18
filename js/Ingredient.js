function Ingredient(context, sx, sy, w, h, imgPath, zOrder, draggable, name, isBaked, isCooked, isCut) {

    VisualRenderObject.call(this, context, sx, sy, w, h, imgPath, zOrder);

    this.setDraggable(draggable);
    this.name = name;
    this.isBaked = isBaked;
    this.isCooked = isCooked;
    this.isCut = isCut;

}


Ingredient.prototype = new VisualRenderObject();
Ingredient.prototype.constructor = Ingredient;