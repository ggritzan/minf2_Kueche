function MenuButton(context, sx, sy, w, h, imgPath, zOrder, recipeIndex, animObj) {

    VisualRenderAnimation.call(this, context, sx, sy, w, h, imgPath, zOrder, animObj);
    this.recipeIndex = recipeIndex;
}

MenuButton.prototype = Object.create(VisualRenderAnimation.prototype);
MenuButton.prototype.constructor = MenuButton;