function Ingredient(context, sx, sy, w, h, imgPath, zOrder, draggable, name) {

    VisualRenderObject.call(this, context, sx, sy, w, h, imgPath, zOrder);

    this.setDraggable(draggable);
    this.name = name;

    this.isBaked = false;
    this.isCooked = false;
    this.isCut = false;

}


Ingredient.prototype = Object.create(VisualRenderObject.prototype);
Ingredient.prototype.constructor = Ingredient;

Ingredient.prototype.onDragendAction = function(event, kitchen){

    for (var i = 0; i < kitchen.pots.length; i++) {
        kitchen.pots[i].behindIngredient(event, kitchen);
    }

    kitchen.kitchenSlicer.behindIngredient(event, kitchen);
    kitchen.oven.behindIngredient(event, kitchen);
    kitchen.counterTop.behindIngredient(event, kitchen);
}