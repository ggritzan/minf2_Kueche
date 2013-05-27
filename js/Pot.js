function Pot(context, sx, sy, w, h, imgPath, zOrder, draggable, name) {

    VisualRenderObject.call(this, context, sx, sy, w, h, imgPath, zOrder);

    this.setDraggable(draggable);
    this.name = name;
    this.ingredients = [];
}


Pot.prototype = new VisualRenderObject;
Pot.prototype.constructor = Pot;


/**
 *function Pot(context, sx, sy, w, h, imgPath, zOrder, draggable, name, animObj ) {
*	
*	VisualRenderAnimation.call(this, context, sx, sy, w, h, imgPath, zOrder, animObj );
*	
*	this.setDraggable(draggable);
*	this.name = name;
*	this.ingredients = [];
*}
 *
 *
 *Pot.prototype = new VisualRenderAnimation);
 *Pot.prototype.constructor = Pot;
 */