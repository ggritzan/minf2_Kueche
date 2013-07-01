function Ingredient(context, sx, sy, w, h, imgPath, zOrder, draggable, name, animObj) {

    VisualRenderAnimation.call(this, context, sx, sy, w, h, imgPath, zOrder, animObj);

    this.setDraggable(draggable);
    this.name = name;

    this.isBaked = false;
    this.isCooked = false;
    this.isCut = false;

}


Ingredient.prototype = Object.create(VisualRenderAnimation.prototype);
Ingredient.prototype.constructor = Ingredient;

Ingredient.prototype.onDragendAction = function(event, kitchen){

    for (var i = 0; i < kitchen.pots.length; i++) {
        kitchen.pots[i].behindIngredient(event, kitchen);
    }

    kitchen.kitchenSlicer.behindIngredient(event, kitchen);
    kitchen.oven.behindIngredient(event, kitchen);
    kitchen.counterTop.behindIngredient(event, kitchen);
}

Ingredient.prototype.changeAnim = function(){
    if(this.isCut && !(this.isBaked || this.isCooked)){
         this.changeAnimSequence("rawCut");
    } else if((this.isBaked || this.isCooked) && !this.isCut){
         this.changeAnimSequence("cookedBaked");
    } else if((this.isBaked || this.isCooked) && this.isCut){
         this.changeAnimSequence("cookedBakedCut");
    } else {
         this.changeAnimSequence("raw");
    }
}