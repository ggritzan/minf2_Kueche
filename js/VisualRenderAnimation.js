function VisualRenderAnimation(context, sx, sy, w, h, imgPath, zOrder, animObject) {

    VisualRenderObject.call(this, context, sx, sy, w, h, imgPath, zOrder);

    // animation configuration object
    this.animations = animObject;

    // gibt die Breite & Höhe einer einzelnen Grafik aus der Gesamtgrafik an
    this.tileWidth = this.animations.image.tileWidth || w;
    this.tileHeight = this.animations.image.tileHeight || h;

    // Ermittell die Anzahl der vorhandenen Zeilen
    this.maxRows = this.animations.image.imgHeight / this.tileHeight || 1;

    // Ermittell die Anzahl der vorhandenen Spalten
    this.maxCols = this.animations.image.imgWidth / this.tileWidth || 1;

    // Definiert die aktuelle Animation die ausgeführt werden soll
    this.currentAnimation = this.animations.animations["default"].seq || [0];

    this.loop = this.animations.animations["default"].loop || false;

    // Index des Animations Arrays für das aktuelle Rendern
    this.currentAnimIndex = 0;

    // Zeit wann das letze mal der Ausschnitt geändert wurde
    this.lastSpriteUpdateTime = 0;
    // Animationsinterval in Milisekunden
    this.animInterval = 80;
}

VisualRenderAnimation.prototype = Object.create(VisualRenderObject.prototype);

VisualRenderAnimation.prototype.constructor = VisualRenderAnimation;

/**
 *    Override
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
 *
 * Berechnet den nächsten Auschnitt der aktuellen Animation
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
 *
 * Wechselt die Animation
 * @param String seqName - Name der Sequence der Animation
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





















