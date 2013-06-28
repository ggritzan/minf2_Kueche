function MainMenuButton(context, sx, sy, w, h, imgPath, zOrder) {

    VisualRenderObject.call(this, context, sx, sy, w, h, imgPath, zOrder);

    // shows if the knob is turned off or on
    this.OFF = "off";
    this.ON = "on";
    this.status = this.OFF;

}

MainMenuButton.prototype = Object.create(VisualRenderObject.prototype);
MainMenuButton.prototype.constructor = MainMenuButton;

MainMenuButton.prototype.setStatus = function (status) {
    this.status = status;
    this.oven.setStatus(status);
}
