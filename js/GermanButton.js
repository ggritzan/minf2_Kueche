function GermanButton(context, sx, sy, w, h, imgPath, zOrder, name, animObj) {

    VisualRenderObject.call(this, context, sx, sy, w, h, imgPath, zOrder, animObj);
    this.name = name;

    // shows if the button is turned off or on
    this.OFF = "off";
    this.ONHOVER = "onHover";
    this.ON = "on";
    this.status = this.ON;
}

GermanButton.prototype = Object.create(VisualRenderObject.prototype);
GermanButton.prototype.constructor = GermanButton;

GermanButton.prototype.setStatus = function (status) {
    this.status = status;
}

GermanButton.prototype.setLanguage = function(kit){

    var d = new Date();

    kit.language = kit.GERMAN;

    Ajax.getJSON("json/recipesGerman.json?d=" + d.getTime(), function(data){
        kit.jRecipes = data;
    });

}