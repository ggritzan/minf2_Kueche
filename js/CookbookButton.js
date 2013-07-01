function CookbookButton(context, sx, sy, w, h, imgPath, zOrder) {

    VisualRenderObject.call(this, context, sx, sy, w, h, imgPath, zOrder);

    // shows if the knob is turned off or on
    this.OFF = "off";
    this.ON = "on";
    this.status = this.OFF;
}

CookbookButton.prototype = Object.create(VisualRenderObject.prototype);
CookbookButton.prototype.constructor = CookbookButton;


CookbookButton.prototype.setStatus = function (status) {
    this.status = status;

}

