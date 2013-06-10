function Plate(context, sx, sy, w, h, imgPath, zOrder, name) {

    VisualRenderObject.call(this, context, sx, sy, w, h, imgPath, zOrder);


    this.name = name;
    // Zeigt an ob die Platte ein oder ausgeschaltet ist
    this.OFF = 0;
    this.ON = 1;
    this.status = this.OFF;


}

Plate.prototype = Object.create(VisualRenderObject.prototype);
Plate.prototype.constructor = Plate;

// Methode die den Power Status aendert
Plate.prototype.setStatus = function (status) {
    this.status = status;
    if (this.pot != null) {
        this.pot.setStatus(this.status);
    }
}

// Methode um den Status zu aendern ob der Topf in position ist
Plate.prototype.setPotInPlace = function (status) {
    this.potInPlace = status;
}

// Methode um den Pot der sich aktuell auf der Platte befindet festzulegen
Plate.prototype.setCurrentPot = function (pot) {
    this.pot = pot;
    if (this.pot != null ) {
        this.pot.setStatus(this.status);
        console.log("Plate State "+ this.status + " Pot State " + this.pot.status);
    }

}

