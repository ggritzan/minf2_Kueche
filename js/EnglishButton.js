function EnglishButton(context, sx, sy, w, h, imgPath, zOrder, name, animObj) {

    VisualRenderObject.call(this, context, sx, sy, w, h, imgPath, zOrder, animObj);
    this.name = name;

    // shows if the button is turned off or on
    this.OFF = "off";
    this.ONHOVER = "onHover";
    this.ON = "on";
    this.status = this.ON;
}

EnglishButton.prototype = Object.create(VisualRenderObject.prototype);
EnglishButton.prototype.constructor = EnglishButton;

EnglishButton.prototype.setStatus = function (status) {
    this.status = status;
}

EnglishButton.prototype.setLanguage = function(kit){

    var d = new Date();

    kit.language = kit.ENGLISH;

    Ajax.getJSON("json/recipes.json?d=" + d.getTime(), function(data){
        kit.jRecipes = data;
    });

}