/**
 * The EnglishButton is a blue print for the English button which is used to set the current language to English.
 * It inherits from VisualRenderAnimation which inherits from VisualRenderObject.
 *
 * @param context - '2D' oder '3D' context (in this case it is always '2D')
 * @param sx - x-coordinate of the left upper corner of the image for the object
 * @param sy - y-coordinate of the left upper corner of the image for the object
 * @param w - width of the image
 * @param h - height of the image
 * @param imgPath - image path of the image
 * @param zOrder - z-coordinate of the image
 */

function EnglishButton(context, sx, sy, w, h, imgPath, zOrder) {

    VisualRenderObject.call(this, context, sx, sy, w, h, imgPath, zOrder);
}

EnglishButton.prototype = Object.create(VisualRenderObject.prototype);
EnglishButton.prototype.constructor = EnglishButton;

/**
 * The function 'setLanguage' sets the current language setting of the application to English by changing the JSON file
 * to load the data from.
 *
 * @param kit - the Kitchen object
 */

EnglishButton.prototype.setLanguage = function(kit){

    var d = new Date();

    kit.language = kit.ENGLISH;

    Ajax.getJSON("json/recipes.json?d=" + d.getTime(), function(data){
        kit.jRecipes = data;
    });

}