function MenuBackground(context, sx, sy, w, h, imgPath, zOrder) {

    VisualRenderObject.call(this, context, sx, sy, w, h, imgPath, zOrder);
}

MenuBackground.prototype = Object.create(VisualRenderObject.prototype);
MenuBackground.prototype.constructor = MenuBackground;
