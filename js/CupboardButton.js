function CupboardButton(context, sx, sy, w, h, imgPath, zOrder, name, animObj) {

    VisualRenderAnimation.call(this, context, sx, sy, w, h, imgPath, zOrder, animObj);
    this.name = name;

    // shows if the button is turned off or on
    this.OFF = 0;
    this.ON = 1;
    this.status = this.OFF;
}

CupboardButton.prototype = Object.create(VisualRenderAnimation.prototype);
CupboardButton.prototype.constructor = CupboardButton;

CupboardButton.prototype.setStatus = function (status) {

    this.status = status;

}