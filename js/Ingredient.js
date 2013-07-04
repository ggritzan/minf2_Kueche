/**
 * The Ingredient is a blue print for an ingredient that is used to cook dishes.
 * It inherits from VisualRenderAnimation which inherits from VisualRenderObject.
 *
 * @param context - '2D' oder '3D' context (in this case it is always '2D')
 * @param sx - x-coordinate of the left upper corner of the image for the object
 * @param sy - y-coordinate of the left upper corner of the image for the object
 * @param w - width of the image
 * @param h - height of the image
 * @param imgPath - image path of the image
 * @param zOrder - z-coordinate of the image
 * @param draggable - sets the object draggable if 'true'
 * @param name - name of the object
 * @param animObj - animation sequence for object that is read from the image sprite
 */

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