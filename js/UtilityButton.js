function UtilityButton(context, sx, sy, w, h, imgPath, zOrder, name, animObj) {

    VisualRenderAnimation.call(this, context, sx, sy, w, h, imgPath, zOrder, animObj);
    this.name = name;
    this.OFF = "off";
    this.ONHOVER = "onHover";
    this.status = this.OFF;
}

UtilityButton.prototype = Object.create(VisualRenderAnimation.prototype);
UtilityButton.prototype.constructor = UtilityButton;

UtilityButton.prototype.setStatus = function (status) {
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