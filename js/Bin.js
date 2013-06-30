function Bin(context, sx, sy, w, h, imgPath, zOrder, name, animObj) {

    VisualRenderAnimation.call(this, context, sx, sy, w, h, imgPath, zOrder, animObj);
    this.name = name;

    this.OFF = "off";
    this.ON = "on";

    this.status = this.OFF;

}

Bin.prototype = Object.create(VisualRenderAnimation.prototype);
Bin.prototype.constructor = Bin;

Bin.prototype.setStatus = function (status){
    this.status = status;
    switch(status) {
        case this.OFF: this.changeAnimSequence("off");
            break;
        case this.ON: this.changeAnimSequence("on");
            break;
        default: this.changeAnimSequence("default");
            break;
    }
}