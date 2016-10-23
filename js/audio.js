audio = {
    play: function(audioName) {
        var file = new Audio("audio/" + audioName);
        file.volume = 0.1;
        file.play();
    }
}

function playError() {
	// TODO
}
function playJobDone() {
	// TODO
}
function startAudioBg() {
	audio.play("bg.mp3");
}
function stopAudioBg() {
	// TODO
}