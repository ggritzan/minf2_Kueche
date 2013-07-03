function Container(context, sx, sy, w, h, imgPath, zOrder, draggable, name, animObj) {

    VisualRenderAnimation.call(this, context, sx, sy, w, h, imgPath, zOrder, animObj);

    this.setDraggable(draggable);
    this.name = name;

    this.isBaked = false;
    this.isCooked = false;
    this.isCut = false;

}


Container.prototype = Object.create(VisualRenderAnimation.prototype);
Container.prototype.constructor = Container;

Container.prototype.changeAnim = function(){
        this.changeAnimSequence("overPot");
}
