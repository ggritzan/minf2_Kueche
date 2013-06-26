function CounterTop(context, sx, sy, w, h, imgPath, zOrder, name) {

    VisualRenderObject.call(this, context, sx, sy, w, h, imgPath, zOrder);


    this.name = name;
}

CounterTop.prototype = Object.create(VisualRenderObject.prototype);
CounterTop.prototype.constructor = CounterTop;

CounterTop.prototype.behindIngredient = function (event, kitchen){

    var actTask = kitchen.actRecipe.tasks[kitchen.counter].task;

    var ingX = event.target.x + event.target.width / 2;
    var ingY = event.target.y + event.target.height / 2;

    var counterZone = this.getHitZone();

    if (ingX >= counterZone.hx && ingX <= counterZone.hx + counterZone.hw && ingY >= counterZone.hy && ingY <= counterZone.hy + counterZone.hh){
        if(actTask.utensil == "countertop" && event.target.name == actTask.contentName && event.target.isCut == actTask.ingredientProperties.isCut && event.target.isCooked == actTask.ingredientProperties.isCooked && event.target.isBaked == actTask.ingredientProperties.isBaked){
            kitchen.points = kitchen.points + 10;
            kitchen.counter++;
            console.log("You've got " + kitchen.points + " points now.");
        }
    }
}