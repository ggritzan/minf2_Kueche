function Oven(context, sx, sy, w, h, imgPath, zOrder, name) {

    VisualRenderObject.call(this, context, sx, sy, w, h, imgPath, zOrder);

    this.content = [];

    this.OFF = "off";
    this.ON = "on"
    this.status = this.OFF;

    this.name = name;
}

Oven.prototype = Object.create(VisualRenderObject.prototype);
Oven.prototype.constructor = Oven;

Oven.prototype.setStatus = function (status){
    this.status = status;
}

Oven.prototype.clearContent = function (){
    this.content = [];
}

Oven.prototype.baking = function () {
    if(this.content[0] != undefined && this.status == this.ON){
        this.content[0].isBaked = true;
    }
}