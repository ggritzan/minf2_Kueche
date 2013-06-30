function Oven(context, sx, sy, w, h, imgPath, zOrder, name, animObj) {

    VisualRenderAnimation.call(this, context, sx, sy, w, h, imgPath, zOrder, animObj);

    this.content = [];

    this.OFF = "off";
    this.ON = "on"
    this.status = this.OFF;

    this.name = name;

    this.soundmanager = new SoundManager();
}

Oven.prototype = Object.create(VisualRenderAnimation.prototype);
Oven.prototype.constructor = Oven;

Oven.prototype.setStatus = function (status){
    this.status = status;
    switch(status) {
        case this.OFF: this.changeAnimSequence("off");
            break;
        case this.ON: this.changeAnimSequence("on");
            break;
        default: this.changeAnimSequence("default");
            break;
    }
}

Oven.prototype.clearContent = function (){
    this.content = [];
}

Oven.prototype.baking = function () {
    if(this.status == this.ON && this.content[0] != undefined){
        this.content[0].isBaked = true;
        console.log("The ingredient is baked: " + this.content[0].name + " " +this.content[0].isBaked);
    }
}

Oven.prototype.behindIngredient = function(event, kitchen){

    var actTask = kitchen.actRecipe.tasks[kitchen.counter].task;

    var ingX = event.target.x + event.target.width / 2;
    var ingY = event.target.y + event.target.height / 2;

    //is the ingredient over an oven?
    var zone = this.getHitZone();

    if (ingX >= zone.hx && ingX <= zone.hx + zone.hw && ingY >= zone.hy && ingY <= zone.hy + zone.hh) {

        // if the oven content does not meet the requirements of the current task
        var sameContent = true;

        if(this.content.length <= actTask.utensilProperties.content.length){
            for(var l = 0; l < this.content.length; l++){
                if(!(this.content[l].name == actTask.utensilProperties.content[l])){
                    sameContent = false;
                }
            }
        } else if(this.content.length > actTask.utensilProperties.content.length){
            for(var l = 0; l < actTask.utensilProperties.content.length; l++){
                if(!(this.content[l].name == actTask.utensilProperties.content[l])){
                    sameContent = false;
                }
            }
        }

        // does the oven meet all the property requirements for the task?
        // does the clicked ingredient meet the ingredient properties of the current task?
        if(actTask.utensil == "oven" && sameContent && this.status == actTask.utensilProperties.actState &&event.target.name == actTask.contentName && event.target.isCut == actTask.ingredientProperties.isCut && event.target.isCooked == actTask.ingredientProperties.isCooked && event.target.isBaked == actTask.ingredientProperties.isBaked){

            this.content.push(event.target);
            kitchen.stage.removeFromStage(event.target);
            kitchen.points = kitchen.points + 10;
            kitchen.counter++;
            console.log("You've got " + kitchen.points + " points now.");
            var that = this;

            this.soundmanager.playSound('slicer', function() {
                that.baking();
                kitchen.stage.addToStage(that.content[0]);
                that.clearContent();

            });

        }  else if (!(actTask.utensil == "oven" && sameContent && this.status == actTask.utensilProperties.actState &&event.target.name == actTask.contentName && event.target.isCut == actTask.ingredientProperties.isCut && event.target.isCooked == actTask.ingredientProperties.isCooked && event.target.isBaked == actTask.ingredientProperties.isBaked)){

            this.content.push(event.target);
            kitchen.stage.removeFromStage(event.target);
            kitchen.points = kitchen.points - 10;
            console.log("You've got " + kitchen.points + " points now.");
            var that = this;

            this.soundmanager.playSound('slicer', function() {
                that.baking();
                kitchen.stage.addToStage(that.content[0]);
                that.clearContent();

            });
        }
    }
}