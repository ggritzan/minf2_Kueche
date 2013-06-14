function SoundManager () {

    this.boilingWaterSound = new Audio("sounds/boiling-water-1.wav");

}

SoundManager.prototype = Object.create(SoundManager.prototype);
SoundManager.prototype.constructor = SoundManager;

SoundManager.prototype.playSound = function (sound){

    sound.controls = true;
    sound.play();

    sound.addEventListener('ended', function() {
        console.log('sound has ended');
    });

    sound.addEventListener('play', function() {
        console.log('Play event!');
    });
}
