function SoundManager () {

    this.boilingWaterSound = new Audio("sounds/kitchenslicer.ogg");
    //this.slicingSound = new Audio("sounds/kitchenslicer.ogg");

}

SoundManager.prototype = Object.create(SoundManager.prototype);
SoundManager.prototype.constructor = SoundManager;

SoundManager.prototype.playSound = function (sound){
    sound.play();

    sound.addEventListener('ended', function() {
        console.log("The sound " + sound.src + " has ended.");
    });

    sound.addEventListener('play', function() {
        console.log("The sound " + sound.src + " is playing.");
    });
}

SoundManager.prototype.stopSound = function(sound){
    sound.pause();
    sound.currentTime = 0;
    console.log("The sound " + sound.src + " has stopped.")
}
