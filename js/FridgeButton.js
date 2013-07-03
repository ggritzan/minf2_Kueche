function FridgeButton(context, sx, sy, w, h, imgPath, zOrder, name, animObj) {

    VisualRenderAnimation.call(this, context, sx, sy, w, h, imgPath, zOrder, animObj);
    this.name = name;

    // shows if the button is turned off or on
    this.OFF = "off";
    this.ONHOVER = "onHover";
    this.ON = "on";
    this.status = this.OFF;
}

FridgeButton.prototype = Object.create(VisualRenderAnimation.prototype);
FridgeButton.prototype.constructor = FridgeButton;

FridgeButton.prototype.setStatus = function (status) {

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