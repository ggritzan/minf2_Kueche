function CounterTop(context, sx, sy, w, h, imgPath, zOrder, name) {

    VisualRenderObject.call(this, context, sx, sy, w, h, imgPath, zOrder);


    this.name = name;
}

CounterTop.prototype = Object.create(VisualRenderObject.prototype);
CounterTop.prototype.constructor = CounterTop;