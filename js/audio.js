// Define background sound variable
var audioBg = new Audio("audio/bg.mp3");
audioBg.volume = 0.5;

var audioGetJob = new Audio("audio/getjob.mp3");
audioGetJob.volume = 1;

var audioError = new Audio("audio/error.mp3");
audioError.volume = 1;

var audioGameOver = new Audio("audio/gameover.mp3");
audioGameOver.volume = 1;

/*
 * Functions to control the audio
 */
function playError() {
	audioError.play();
}
function playJobDone() {
	// TODO
}
function playGetJob() {
    audioGetJob.play();
}
function playGameOver() {
    audioGameOver.play();
}
function startAudioBg() {
    audioBg.play();
}
function stopAudioBg() {
	audioBg.pause();
}
function playPowerUp() {
    //audioPowerUp.play();
}