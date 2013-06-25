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

Ingredient.prototype.setBaked = function(status){
    this.isBaked = status;
}

Ingredient.prototype.setCooked = function(status){
    this.isCooked = status;
}

Ingredient.prototype.setCut = function(status){
    this.isCut = status;
}