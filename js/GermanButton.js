/**
 * The GermanButton is a blue print for the German button which is used to set the current language to German.
 * It inherits from VisualRenderAnimation which inherits from VisualRenderObject.
 *
 * @param context - '2D' oder '3D' context (in this case it is always '2D')
 * @param sx - x-coordinate of the left upper corner of the image for the object
 * @param sy - y-coordinate of the left upper corner of the image for the object
 * @param w - width of the image
 * @param h - height of the image
 * @param imgPath - image path of the image
 * @param zOrder - z-coordinate of the image
 * @param name - name of the object
 * @param animObj - animation sequence for object that is read from the image sprite
 */

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