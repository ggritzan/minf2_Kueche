function MainMenuButton(context, sx, sy, w, h, imgPath, zOrder, animObj) {

    VisualRenderAnimation.call(this, context, sx, sy, w, h, imgPath, zOrder, animObj);

    // shows if the knob is turned off or on
    this.OFF = "off";
    this.ON = "on";
    this.status = this.ON;

}

MainMenuButton.prototype = Object.create(VisualRenderAnimation.prototype);
MainMenuButton.prototype.constructor = MainMenuButton;

MainMenuButton.prototype.setStatus = function (status) {
    this.status = status;
}
