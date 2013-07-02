function TutorialButton(context, sx, sy, w, h, imgPath, zOrder) {

    VisualRenderObject.call(this, context, sx, sy, w, h, imgPath, zOrder);

    // shows if the knob is turned off or on
    this.OFF = "off";
    this.ON = "on";
    this.status = this.OFF;
}

TutorialButton.prototype = Object.create(VisualRenderObject.prototype);
TutorialButton.prototype.constructor = TutorialButton;


TutorialButton.prototype.setStatus = function (status) {
    this.status = status;

}
