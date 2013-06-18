function FridgeButton(context, sx, sy, w, h, imgPath, zOrder, name) {

    VisualRenderObject.call(this, context, sx, sy, w, h, imgPath, zOrder);
    this.name = name;

    // shows if the button is turned off or on
    this.OFF = 0;
    this.ON = 1;
    this.status = this.OFF;
}

FridgeButton.prototype = Object.create(VisualRenderObject.prototype);
FridgeButton.prototype.constructor = FridgeButton;

FridgeButton.prototype.setStatus = function (status) {

    this.status = status;

}