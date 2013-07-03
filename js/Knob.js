function Knob(context, sx, sy, w, h, imgPath, zOrder, name, stoveTop, animObj) {

    VisualRenderAnimation.call(this, context, sx, sy, w, h, imgPath, zOrder, animObj);

    this.name = name;
    this.stoveTop = stoveTop;

    // shows if the knob is turned off or on
    this.OFF = "off";
    this.ONHOVER = "onHover";
    this.ON = "on";
    this.status = this.OFF;





}

Knob.prototype = Object.create(VisualRenderAnimation.prototype);
Knob.prototype.constructor = Knob;


Knob.prototype.setStatus = function (status) {

    this.status = status;
    if(status == this.ON){
        this.stoveTop.setStatus(status);
    } else if(status != this.ON){
        this.stoveTop.setStatus(this.stoveTop.OFF);
    }

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

