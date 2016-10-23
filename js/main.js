/*
 * Global Variables
 */
const progressMax = 900;
const _POINT_MULT_NORMAL = 5;
const _POINT_MULT_POWERUP = 20;

var globalTimer = undefined; 
var timeElapsed = 0;
var insertTimer = 0;
var jobCount = 0;
var jobList = [];
var speed = 2;
var gameStarted = false;
var firedScreen = false;
var totalPoints = 0;
var pointMultiplicator = _POINT_MULT_NORMAL;

/*
 * Helper functions
 */
function showDialog(dialogMessage) {
    $("#dialog p").html(dialogMessage);
    $("#dialog").dialog();
}

/*
 * Control point multiplicators enabling/disabling the "POWER UP"
 */
function startPowerUp() {
    pointMultiplicator = _POINT_MULT_POWERUP;
}
function stopPowerUp() {
    pointMultiplicator = _POINT_MULT_NORMAL;
}

/*
 * Display/Hide startup screen (HELLO TITLE)
 */
function showHello() {
    $("#title").fadeIn();
}
function hideHello() {
    $("#title").fadeOut();
}

/*
 * Control the progress bar position
 */
function setProgressbar() {
    $(function() {
        $("#progressbar").progressbar({
            max: progressMax,
            value: timeElapsed
        });
    });
}

/*
 * Set window background position by the time elapsed (DAY / NIGHT)
 */
function setWindow() {
    var percentDone = (timeElapsed * 50) / progressMax;
    var halfSize = ($("#window #img").height() / 2);
    var sunPosition = ((halfSize - (halfSize * percentDone / 100)) * -1) + 2;
    $("#window #img").css("top", sunPosition + "px");
}

/*
 * Control actios when a job is done (click / correct arrow set)
 */
function jobClick(jobNumber) {
    // Get the Job() element at array[]
    var jobElement = jobList[jobNumber];

    // Verify if the job wasnt already dony
    if (!jobElement.isDone) {
        // Call method to complete the job
        jobElement.complete();

        // Increase the total points
        totalPoints += (jobElement.dificulty * pointMultiplicator);

        //DEBUG: Log into console
        console.log("clicked at jobNumber:", jobNumber, "element:", jobElement.getHtml());

        // Remove html element (who are in the INBOX)
        $("#job"+jobNumber).remove();

        // Add a new html document o the DONE BOX
        $("#done").html(jobElement.getHtml() + $("#done").html());
    }
}

/*
 * Control creation of a new job
 */
function createJob() {
    // Increase job count
    jobCount++;

    // New Instance of a class Job()
    var newJob = new Job(jobCount);

    // put the new Job into an Array[]
    jobList[jobCount] = newJob;

    // Move the new Job to the INBOX (TO DO BOX)
    $("#inbox").html(newJob.getHtml() + $("#inbox").html());

    //DEBUG: Log into console
    console.log("new job created! id:", jobCount, "html:", newJob.getHtml());
}

/*
 * Increase value of time elapsed, then random create a new job()
 */
function increaseTime() {
    if (timeElapsed <= progressMax) {
        timeElapsed++;
        setProgressbar();
        setWindow();
        if (Math.floor((Math.random() * (100 - speed)) + 1) == Math.floor(Math.round((100 - speed) / 2))) {
            createJob();
        }
    } 
    else gameOver();
}

/*
 * Clear the TODO and DONE boxes
 */
function clearBox() {
    $("#inbox").html("");
    $("#done").html("");
}

/*
 * Reset game: clear all variables and set the game to the start
 */
function resetGame(toStart) {
    // Stop the global game timer
    clearTimeout(globalTimer);

    //Reset the timer
    chonometer.restart();

    // Reset global control variables
    timeElapsed = 0;
    jobCount = 0;
    jobList = [];
    speed = 0;
    gameStarted = false;
    firedScreen = false;
    totalPoints = 0;
    
    // Set point multiplicator to the default value
    stopPowerUp();

    // Clear window controls
    setProgressbar();
    clearBox();

    // If reset game to the start screen
    if (toStart) {
        showHello();
    }

    // Hide some messages
    $("#fired").hide();
}

/*
 * Control the start of the game
 */
function startGame() {
    resetGame(false);
    globalTimer = setInterval("increaseTime()", 10);
    chonometer.start();
    hideHello();
}

/*
 * Control to stop the game, pause timers and display info (Game Over ou Game Finished)
 */
function stopGame() {
    clearTimeout(globalTimer);
    chonometer.stop();
}

/*
 * Display information about the game over
 */
function gameOver() {
    stopGame();
    firedScreen = true;
    $("#fired").fadeIn();
    $("#points").html("POINTS: " + totalPoints).fadeIn();
}

/*
 * Do anything when one arrow key was clicked
 */
function arrowClick(position) {
    if (gameStarted) {
        console.log(position);
    }
}

/*
 * Grab keyboard events
 */
function checkKey(e) {
    var event = window.event ? window.event : e;

    console.log(event.keyCode);

    if (!gameStarted) {
        if (!firedScreen) {
            startGame();
        }
        else {
            resetGame(true);
        }
    }
    else {
        if (event.keyCode == '38' || event.keyCode == '87') {
            totalPoints += 100;
            // up arrow
            arrowClick("up");
        }
        else if (event.keyCode == '40' || event.keyCode == '83') {
            totalPoints += 100;
            // down arrow
            arrowClick("down");
        }
        else if (event.keyCode == '37' || event.keyCode == '65') {
            totalPoints += 100;
            // left arrow
            arrowClick("left");
        }
        else if (event.keyCode == '39' || event.keyCode == '68') {
            totalPoints += 100;
            // right arrow
            arrowClick("right");
        }
    }
}
$(function() {
    document.onkeydown = checkKey;
});

/*
 * Script initialization
 */
$(function() {
    resetGame();
    showHello();
    audio.play("The Elite Rough Cut.mp3");
    // Capture keyboard events
    document.onkeydown = checkKey;
});

/*
 * Grab clicks over the jobs
 */
$(function() {
    $(".job").click(function() {
        jobClick($(this));
    });
});

audio = {
    play: function(audioName) {
        var file = new Audio("audio/" + audioName);
        file.volume = 0.1;
        file.play();
    }
}