function Plate(context, sx, sy, w, h, imgPath, zOrder, name) {

    VisualRenderObject.call(this, context, sx, sy, w, h, imgPath, zOrder);


    this.name = name;
    // Zeigt an ob die Platte ein oder ausgeschaltet ist
    const on = new Boolean(true);
    const off = new Boolean(false);
    this.status = new Boolean(off);
    this.potInPlace = new Boolean(false);


}

Plate.prototype = new VisualRenderObject;
Plate.prototype.constructor = Plate;

// Methode die den Power Status aendert
Plate.prototype.changeStatus = function (status) {
    this.status = status;
};

// Methode um den Status zu aendern ob der Topf in position ist
Plate.prototype.changePotInPlace = function (status) {
    this.potInPlace = status;
};

// Methode um den Pot der sich aktuell auf der Platte befindet festzulegen
Plate.prototype.setCurrentPot = function (pot) {
    this.pot = pot;
}
