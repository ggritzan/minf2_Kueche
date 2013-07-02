function SoundManager () {

    this.MAX_VOLUME = 1.0;
    this.MIN_VOLUME = 0.0;

    this.soundMute = false;

    this.soundVolume = this.MAX_VOLUME;

    this.sounds = {
        "boilingWater": [],
        "slicer": [],
        "button": [],
        "error": [],
        "beam": [],
        "oven": []
    };

    // to load the newest version of all JSONs
    var d = new Date();

    // for callback
    var that = this;


    Ajax.getJSON("json/sounds.json?d=" + d.getTime(), function(data){
        data.sounds.forEach(function(sound){
            that.sounds[sound.name].push({
                "audio": new Audio(sound.sound),
                "eventListener": null,
                "loop": sound.loop
            });
        });
    });

}

SoundManager.prototype.turnVolumeUp = function(){

    if(this.soundVolume < this.MAX_VOLUME){
        this.tmpVolume = this.soundVolume + 0.1;
        this.soundVolume = Math.round(this.tmpVolume * 10 ) / 10;
    }

    console.log("sound volume: " + this.soundVolume);
}

SoundManager.prototype.turnVolumeDown = function(){

    if(this.MIN_VOLUME < this.soundVolume){
        this.tmpVolume = this.soundVolume - 0.1;
        this.soundVolume = Math.round(this.tmpVolume * 10 ) / 10;
    }

    console.log("sound volume: " + this.soundVolume);
}

SoundManager.prototype.playSound = function (soundName, listener){
    // inter through Array "soundName"
    // the first sound that is not playing
    // -> play it

    //this.sounds[soundName][0].play();

    // for callback
    var audioObj;

    var that = this;

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

            if(obj.loop){
                obj.audio.loop = true;
            }

            if(!that.soundMute){
                obj.audio.volume = that.soundVolume;
            } else {
                obj.audio.volume = 0.0;
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
