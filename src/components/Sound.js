import React from "react";

export default function SoundEfect() {


    return (
        <div id='bg-sound-control'>
            <audio src="assets/sons/wild-hunter.mp3" loop id='bg-sound'></audio>
            <span className="material-icons" id="sound-mute" >
                volume_up
            </span>
        </div>
    )
}