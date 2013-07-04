/**
 * The MainMenuButton is a blue print for a main menu button which is used to used to get back to the main menu.
 * It inherits from VisualRenderObject.
 *
 * @param context - '2D' oder '3D' context (in this case it is always '2D')
 * @param sx - x-coordinate of the left upper corner of the image for the object
 * @param sy - y-coordinate of the left upper corner of the image for the object
 * @param w - width of the image
 * @param h - height of the image
 * @param imgPath - image path of the image
 * @param zOrder - z-coordinate of the image
 */

function MenuBackground(context, sx, sy, w, h, imgPath, zOrder) {

    VisualRenderObject.call(this, context, sx, sy, w, h, imgPath, zOrder);
}

MenuBackground.prototype = Object.create(VisualRenderObject.prototype);
MenuBackground.prototype.constructor = MenuBackground;
