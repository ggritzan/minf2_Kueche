function XButtonOptions(context, sx, sy, w, h, imgPath, zOrder) {

    VisualRenderObject.call(this, context, sx, sy, w, h, imgPath, zOrder);

}

XButtonOptions.prototype = Object.create(VisualRenderObject.prototype);
XButtonOptions.prototype.constructor = XButtonOptions;


