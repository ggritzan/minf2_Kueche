function StoveTop(context, sx, sy, w, h, imgPath, zOrder, name, animObj) {

    VisualRenderAnimation.call(this, context, sx, sy, w, h, imgPath, zOrder, animObj);

    this.name = name;

    // shows if the stove top is turned off or on
    this.OFF = 0;
    this.ON = 1;
    this.status = this.OFF;


}

StoveTop.prototype = Object.create(VisualRenderAnimation.prototype);
StoveTop.prototype.constructor = StoveTop;

// Methode die den Power Status aendert
StoveTop.prototype.setStatus = function (status) {
    this.status = status;
    if (this.pot != null) {
        this.pot.setStatus(this.status);
    }
}

// Methode um den Status zu aendern ob der Topf in position ist
StoveTop.prototype.setPotInPlace = function (status) {
    this.potInPlace = status;
}

// Methode um den Pot der sich aktuell auf der Platte befindet festzulegen
StoveTop.prototype.setCurrentPot = function (pot) {
    this.pot = pot;
    if (this.pot != null ) {
        this.pot.setStatus(this.status);
        console.log("StoveTop State "+ this.status + " Pot State " + this.pot.status);
    }

}

