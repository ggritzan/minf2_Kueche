function SoundManager () {

   // this.boilingWaterSound = new Audio("sounds/kitchenslicer.ogg");
    //this.slicingSound = new Audio("sounds/kitchenslicer.ogg");
    this.sounds = {
        "boilingWater":[],
        "slicer":[]
    };

    // schleife
    this.sounds.boilingWater.push({"audio":new Audio("sounds/boiling-water-1.wav"), "eventListener":null });
    this.sounds.slicer.push({"audio":new Audio("sounds/kitchenslicer.ogg"), "eventListener":null });



}

SoundManager.prototype.playSound = function (soundName, listener){
    // inter through Array "soundName"
    // the first sound that is not playing
    // -> play it

    //this.sounds[soundName][0].play();

    // for callback
    var audioObj;

    this.sounds[soundName].forEach(function(obj, index, soundArray){
       // obj.audio -> AudioObject
        // obj.listener -> function

        if(!obj.audio.currentTime < obj.audio.duration || obj.audio.currentTime === 0){
              // is there already a listener?
            if(obj.eventListener != null) {
                // delete former event handler
                obj.audio.removeEventListener('ended',obj.eventListener);

            }

            if(listener != null){
                // save new listener in array
                soundArray[index].eventListener = listener;
                // register an audio object for the ended event
                obj.audio.addEventListener('ended', listener);
            }
            // play sound
            obj.audio.play();
            // reference to the audio object
            audioObj = obj.audio;
        }

    });

    return audioObj;
}

SoundManager.prototype.stopSound = function(soundObj){
    soundObj.pause();
    soundObj.currentTime = 0;
    console.log("The sound " + soundObj.src + " has stopped.");
}
