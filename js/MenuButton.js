function MenuButton(context, sx, sy, w, h, imgPath, zOrder, animObj, name) {

    VisualRenderAnimation.call(this, context, sx, sy, w, h, imgPath, zOrder, animObj);
    this.name = name;

    this.OFF = "off";
    this.ONHOVER = "onHover";
    this.ON = "on";
    this.status = this.OFF;
}

MenuButton.prototype = Object.create(VisualRenderAnimation.prototype);
MenuButton.prototype.constructor = MenuButton;

MenuButton.prototype.setStatus = function (status) {
    this.status = status;
    switch(status) {
        case this.OFF: this.changeAnimSequence("off");
            break;
        case this.ONHOVER: this.changeAnimSequence("onHover");
            break;
        case this.ON: this.changeAnimSequence("on");
            break;
        default: this.changeAnimSequence("default");
            break;
    }
}