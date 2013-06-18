function MenuButton(context, sx, sy, w, h, imgPath, zOrder, recipeIndex) {

    VisualRenderObject.call(this, context, sx, sy, w, h, imgPath, zOrder);
    this.recipeIndex = recipeIndex;
}

MenuButton.prototype = Object.create(VisualRenderObject.prototype);
MenuButton.prototype.constructor = MenuButton;