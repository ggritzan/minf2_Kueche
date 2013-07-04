/**
 * The KitchenSlicer is a blue print for the kitchen slicer. The kitchen slicer is used to chop ingredients.
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

function KitchenSlicer(context, sx, sy, w, h, imgPath, zOrder, name, animObj) {

    VisualRenderAnimation.call(this, context, sx, sy, w, h, imgPath, zOrder, animObj);

    this.name = name;

    // the ingredients that are in the kitchen slicer
    this.content = [];

    this.OFF = "off";
    this.ON = "on";
    this.status = this.OFF;

    this.soundmanager = new SoundManager();
}

KitchenSlicer.prototype = Object.create(VisualRenderAnimation.prototype);
KitchenSlicer.prototype.constructor = KitchenSlicer;

/**
 * Sets a new status of the kitchen slicer and changes the animation sequence to it. If the kitchen slicer has an
 * ingredient (this.content) and is on, it changes the ingredients status to 'isCut' = true
 *
 * @param status -  the new status of the kitchen slicer
 */

KitchenSlicer.prototype.setStatus = function (status){
    this.status = status;
    switch(status) {
        case this.OFF: this.changeAnimSequence("off");
            break;
        case this.ON: this.changeAnimSequence("on");
            break;
        default: this.changeAnimSequence("default");
            break;
    }
    if(this.status == this.ON && this.content[0] != undefined){
        this.content[0].isCut = true;
        this.content[0].changeAnim();
    }
}

KitchenSlicer.prototype.clearContent = function (){
    this.content = [];
}

KitchenSlicer.prototype.behindIngredient = function(event, kitchen){

    var actTask = kitchen.actRecipe.tasks[kitchen.counter].task;

    var ingX = event.target.x + event.target.width / 2;
    var ingY = event.target.y + event.target.height / 2;

    //is the ingredient over a kitchen slicer?
    var zone = this.getHitZone();

    if (ingX >= zone.hx && ingX <= zone.hx + zone.hw && ingY >= zone.hy && ingY <= zone.hy + zone.hh && this.status == this.OFF) {


        // does the kitchen slicer meet all the property requirements for the task?
        // does the clicked ingredient meet the ingredient properties of the current task?
        if(actTask.utensil == "kitchenslicer" && this.status == actTask.utensilProperties.actState &&event.target.name == actTask.contentName && event.target.isCut == actTask.ingredientProperties.isCut && event.target.isCooked == actTask.ingredientProperties.isCooked && event.target.isBaked == actTask.ingredientProperties.isBaked){

            this.content.push(event.target);
            this.setStatus(this.ON);

            kitchen.stage.removeFromStage(event.target);
            kitchen.points = kitchen.points + 10;
            kitchen.counter++;
            var that = this;

            this.soundmanager.playSound('slicer', function() {
                that.setStatus(that.OFF);
                kitchen.stage.addToStage(that.content[0]);
                that.clearContent();

            });

        }  else if (!(actTask.utensil == "kitchenslicer" && this.status == actTask.utensilProperties.actState &&event.target.name == actTask.contentName && event.target.isCut == actTask.ingredientProperties.isCut && event.target.isCooked == actTask.ingredientProperties.isCooked && event.target.isBaked == actTask.ingredientProperties.isBaked)){

            this.content.push(event.target);
            this.setStatus(this.ON);

            kitchen.stage.removeFromStage(event.target);
            kitchen.points = kitchen.points - 10;
            var that = this;

            this.soundmanager.playSound('slicer', function() {
                that.setStatus(that.OFF);
                kitchen.stage.addToStage(that.content[0]);
                that.clearContent();

            });
        }
    }
}
