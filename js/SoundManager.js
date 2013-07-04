/**
 * The SoundManager manages all sounds used in the application. The sounds are saved in a sounds array attribute.
 */

function SoundManager () {

    // the max volume possible
    this.MAX_VOLUME = 1.0;
    // the min volume possible
    this.MIN_VOLUME = 0.0;

    // if the sound is on mute
    this.soundMute = false;

    // the current sound volume
    this.soundVolume = this.MAX_VOLUME;

    // sounds array which contains all sounds used in the application
    this.sounds = {};

    // to load the newest version of all JSONs
    var d = new Date();

    // for callback
    var that = this;

    /*
     loads the sounds from the 'sounds.json' and saves them in the sounds array, it also saves an event listener to each
     sound and if the sound shall be looped or not
     the sound name is used as an index value

     @param data - data from the 'sounds.json'
     */

    Ajax.getJSON("json/sounds.json?d=" + d.getTime(), function(data){
        data.sounds.forEach(function(sound){
            that.sounds[sound.name] = [];
            that.sounds[sound.name].push({
                "audio": new Audio(sound.sound),
                "eventListener": null,
                "loop": sound.loop
            });
        });
    });

}

/**
 * The function 'turnVolumeUp' is used to turn the sound volume up when the PlusButton is clicked. The maximal volume
 * cannot be higher than the MAX_VOLUME.
 */

SoundManager.prototype.turnVolumeUp = function(){

    if(this.soundVolume < this.MAX_VOLUME){
        this.tmpVolume = this.soundVolume + 0.1;
        this.soundVolume = Math.round(this.tmpVolume * 10 ) / 10; // to get a number with one decimal place
    }
}

/**
 * The function 'turnVolumeDown' is used to turn the sound volume down when the PlusButton is clicked. The minimal
 * volume cannot be lower than the MIN_VOLUME.
 */

SoundManager.prototype.turnVolumeDown = function(){

    if(this.MIN_VOLUME < this.soundVolume){
        this.tmpVolume = this.soundVolume - 0.1;
        this.soundVolume = Math.round(this.tmpVolume * 10 ) / 10;  // to get a number with one decimal place
    }
}

/**
 * The function 'playSound' plays the wanted sound. It also adds an event listener to it for the event 'ended', when
 * something shall be changed when the sound has ended (optional).
 *
 * @param soundName - the name of the sound
 * @param listener - the 'ended' event listener (optional) else: null
 * @returns audioObj - an audio object
 */

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

            // shall the sound be looped?
            if(obj.loop){
                obj.audio.loop = true;
            }

            // is the sound on mute already?
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

/**
 * The function 'stopSound' stops the sound of the returned audio object from the function 'playSound'
 *
 * @param soundObj - the returned value from the function 'playSound' - an audio object
 */

SoundManager.prototype.stopSound = function(soundObj){

    // pause the sound
    soundObj.pause();
    // set the current time back to 0 milliseconds (reset)
    soundObj.currentTime = 0;
}
