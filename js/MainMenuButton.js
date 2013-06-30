function MainMenuButton(context, sx, sy, w, h, imgPath, zOrder, animObj) {

    VisualRenderAnimation.call(this, context, sx, sy, w, h, imgPath, zOrder, animObj);

    // shows if the knob is turned off or on
    this.OFF = "off";
    this.ONHOVER = "onHover";
    this.ON = "on";
    this.status = this.OFF;

}

MainMenuButton.prototype = Object.create(VisualRenderAnimation.prototype);
MainMenuButton.prototype.constructor = MainMenuButton;

MainMenuButton.prototype.setStatus = function (status) {
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
