/**
 * The Oven is a blue print for the oven. The oven is used to bake ingerdients.
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

function Oven(context, sx, sy, w, h, imgPath, zOrder, name, animObj) {

    VisualRenderAnimation.call(this, context, sx, sy, w, h, imgPath, zOrder, animObj);

    // the ingredient content of the oven
    this.content = [];

    // status of the oven
    this.OFF = "off";
    this.ON = "on";
    this.status = this.OFF;

    this.name = name;

    this.soundmanager = new SoundManager();
}

Oven.prototype = Object.create(VisualRenderAnimation.prototype);
Oven.prototype.constructor = Oven;

/**
 * The function 'setStatus' changes the status of the oven t on or off and changes the button's animation sequence to
 * the new status.
 *
 * @param status - new status of the oven (on or off)
 */

Oven.prototype.setStatus = function (status){
    this.status = status;
    switch(status) {
        case this.OFF: this.changeAnimSequence("off");
            break;
        case this.ON: this.changeAnimSequence("on");
            this.baking();
            break;
        default: this.changeAnimSequence("default");
            break;
    }
}

/**
 * The function 'clearContent' clears the ovens ingredients when they are out of the oven (addToStage)
 */

Oven.prototype.clearContent = function (){
    this.content = [];
}

/**
 * The function 'baking' sets the status of the ingredients to 'isBaked = true' when it has one (or more) and changes
 * the ingredients animation sequence.
 *
 * @returns {boolean}
 */

Oven.prototype.baking = function () {
    if(this.status == this.ON && this.content[0] != undefined){
        for(var i = 0; i<this.content.length;i++) {
            this.content[i].isBaked = true;
            this.content[i].changeAnim();
        }
        return true;
    } else {
        return false;
    }
}
