/**
 * VisualRenderAnimation is a blue print of sprite animated objects. It uses the given animation sequence to changes the
 * tile image every 80 milliseconds.
 * It inherits from VisualRenderObject.
 *
 * @param context - '2D' oder '3D' context (in this case it is always '2D')
 * @param sx - x-coordinate of the left upper corner of the image for the object
 * @param sy - y-coordinate of the left upper corner of the image for the object
 * @param w - width of the image
 * @param h - height of the image
 * @param imgPath - image path of the image
 * @param zOrder - z-coordinate of the image
 * @param animObject - animation sequence for object that is read from the image sprite
 */

function VisualRenderAnimation(context, sx, sy, w, h, imgPath, zOrder, animObject) {

    // call for the super class
    VisualRenderObject.call(this, context, sx, sy, w, h, imgPath, zOrder);

    // animation configuration object
    this.animations = animObject;

    // the width of the tile image in the image file
    this.tileWidth = this.animations.image.tileWidth || w;
    // the height of the tile image in the image file
    this.tileHeight = this.animations.image.tileHeight || h;

    // gives the maximal number of the rows of the tile images in the image file
    this.maxRows = this.animations.image.imgHeight / this.tileHeight || 1;

    // gives the maximal number of cols of the tile images in the image file
    this.maxCols = this.animations.image.imgWidth / this.tileWidth || 1;

    // defines the current animation that shall be executed
    this.currentAnimation = this.animations.animations["default"].seq || [0];

    // loops the animation
    this.loop = this.animations.animations["default"].loop || false;

    // current tile image of the animation
    this.currentAnimIndex = 0;

    // the last time the image tile of the graphic has been changed
    this.lastSpriteUpdateTime = 0;

    // animation interval in milliseconds
    this.animInterval = 80;
}

VisualRenderAnimation.prototype = Object.create(VisualRenderObject.prototype);

VisualRenderAnimation.prototype.constructor = VisualRenderAnimation;

/**
 *    Overrides the draw method from the VisualRenderObject
 */
VisualRenderAnimation.prototype.draw = function () {

    // in welcher Zeile & Spalte ist die zu zeichnende Fläche
    var row = parseInt(this.currentAnimation[this.currentAnimIndex] / this.maxCols);
    var col = this.currentAnimation[this.currentAnimIndex] % this.maxCols;

    // berechnet die x,y Position
    var imgX = col * this.tileWidth;
    var imgY = row * this.tileHeight;

    // zeichnen
    this.context.drawImage(this.img, imgX, imgY, this.tileWidth, this.tileHeight, this.x, this.y, this.width, this.height);

    var delta = Date.now() - this.lastSpriteUpdateTime;
    if (delta > this.animInterval) {
        this.nextAnimTile();
        this.lastSpriteUpdateTime = Date.now();
    }
}

/**
 * computes the next tile of the current animation sequence
 */
VisualRenderAnimation.prototype.nextAnimTile = function () {

    if (this.currentAnimIndex + 1 < this.currentAnimation.length) {
        this.currentAnimIndex++;
    } else {
        if (this.loop) {
            this.currentAnimIndex = 0;
        }
    }

}

/**
 * The function 'changeAnimSequence' changes the animation
 * @param seqName - name of the animation sequence
 */
VisualRenderAnimation.prototype.changeAnimSequence = function (seqName) {

    try {
        this.currentAnimation = this.animations.animations[seqName].seq;
        this.loop = this.animations.animations[seqName].loop;
        this.currentAnimIndex = 0;
    } catch (ex) {
        console.log("No such animation sequence: " + seqName);
    }

}





















