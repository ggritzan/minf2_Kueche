function IngredientButton(context, sx, sy, w, h, imgPath, zOrder, name, animObj) {

    VisualRenderAnimation.call(this, context, sx, sy, w, h, imgPath, zOrder, animObj);
    this.name = name;

    this.OFF = "off";
    this.ONHOVER = "onHover";
    this.status = this.OFF;
}

IngredientButton.prototype = Object.create(VisualRenderAnimation.prototype);
IngredientButton.prototype.constructor = IngredientButton;

IngredientButton.prototype.setStatus = function (status) {
    this.status = status;
    switch(status) {
        case this.OFF: this.changeAnimSequence("off");
            break;
        case this.ONHOVER: this.changeAnimSequence("onHover");
            break;
        default: this.changeAnimSequence("default");
            break;
    }
}
