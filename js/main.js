/*
 * Global Variables
 */
const _MAX_TIME = 6000;
const _MAX_ERRORS = 5;
const _MAX_TODO = 10;
const _NUMBER_TODO_SHOWBOSS = 5;
const _NUMBER_CORRECT_STARTPOWERUP = 10;
const _POINT_MULT_NORMAL = 5;
const _POINT_MULT_POWERUP = 20;

var globalTimer = undefined; 
var timeElapsed = 0;
var insertTimer = 0;
var jobCount = 0;
var jobCompleted = 0;
var jobList = [];
var speed = 2;
var gameStarted = false;
var firedScreen = false;
var totalPoints = 0;
var totalErrors = 0;
var pointMultiplicator = _POINT_MULT_NORMAL;
var correctSequence = 0;

/*
 * Helper functions
 */
function isTodoListFull() {
    return ((jobCount - jobCompleted) > _MAX_TODO);
}
function numberOfToDoJobs() {
    return (jobCount - jobCompleted);
}
function reachedMaxErrors() {
    return (totalErrors >= _MAX_ERRORS);
}
function showArrow(arrowNumber) {
    // Hide all arrows
    $(".arrow").hide();

    // If arrow number not ZERO, show the arrow
    if (arrowNumber != 0) {
        $("#arrow"+arrowNumber).show();
    }
}

/*
 * Display/Hide startup screen (HELLO TITLE)
 */
function showHello() {
    $("#title").show();
}
function hideHello() {
    $("#title").fadeOut();
}

/*
 * Control the progress bar position
 */
function setProgressbar() {
    /*
    $(function() {
        $("#progressbar").progressbar({
            max: _MAX_TIME,
            value: timeElapsed
        });
    });
    */
}

/*
 * Set window background position by the time elapsed (DAY / NIGHT)
 */
function setWindow() {
    var percentDone = (timeElapsed * 100) / _MAX_TIME;
    var halfSize = ($("#window #img").height() / 2);
    var sunPosition = ((halfSize - (halfSize * percentDone / 100)) * -1) + 2;
    $("#window #img").css("top", sunPosition + "px");
}

/*
 * Control action when a job is done (click / correct arrow set)
 */
function jobClick(jobNumber) {
    // Get the Job() element at array[]
    var jobElement = jobList[jobNumber];

    // Verify if the job wasnt already dony
    if (!jobElement.isDone) {
        // Verify if the employee is not working on a job
        //if (!employeeIsWorking) {
            // Call method to complete the job
            jobElement.complete();

            // Set the last job arrow
            showArrow(0);
            if (jobCount > jobCompleted) {
                var lastJob;
                jobFound = false;
                for (i=jobList.length-1;i>0;i--) {
                    lastJob = jobList[i];
                    if (!lastJob.isDone) {
                        jobFound = true;
                        break;
                    }
                }
                if (jobFound) {
                    showArrow(lastJob.dificulty);
                }
                else {
                    showArrow(0);
                }
                
            }

            // Set control variables
            jobCompleted++;

            // Increase correctSequence
            correctSequence++;

            // Move the Employee
            empGetJob(jobElement.dificulty);

            // Increase the total points
            totalPoints += (jobElement.dificulty * pointMultiplicator);

            //DEBUG: Log into console
            //console.log("clicked at jobNumber:", jobNumber, "element:", jobElement.getHtml());

            // Remove html element (who are in the INBOX)
            $("#job"+jobNumber).remove();

            // Add a new html document o the DONE BOX
            $("#done").html(jobElement.getHtml() + $("#done").html());

            // Play audio effect
            playJobDone();
        //}
    }
}

function jobError() {
    // Set control variables
    totalErrors++;

    // Reset correctSequence
    correctSequence = 0;

    // Play audio effect
    playError();
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

    // Show the respective job arrow
    showArrow(newJob.dificulty);

    // Move the new Job to the INBOX (TO DO BOX)
    $("#inbox").html(newJob.getHtml() + $("#inbox").html());

    //DEBUG: Log into console
    //console.log("new job created! id:", jobCount, "html:", newJob.getHtml());
}

/*
 * Increase value of time elapsed, then random create a new job()
 */
function increaseTime() {
    if (timeElapsed <= _MAX_TIME) {
        // Increase time elapsed
        timeElapsed++;

        // Set progress bar position
        setProgressbar();

        // Set window position (sun and moon)
        setWindow();

        // Check if its time for POWER UP
        togglePowerUp();

        // If reached N number of jobs, show the boss sneaking
        if (numberOfToDoJobs() > _NUMBER_TODO_SHOWBOSS) {
            showBoss();
        }
        else {
            hideBoss();
        }

        // Random create another job()
        if (!employeeIsWorking) {
            if (Math.floor((Math.random() * (100 - speed)) + 1) == Math.floor(Math.round((100 - speed) / 2))) {
                createJob();
            }
        }

        // Check if the user reached _MAX_ERRORS or todo list is full
        if (reachedMaxErrors() || isTodoListFull()) {
            // Call game over method
            gameOver();
        }
    } 
    else {
        gameOver();
    }
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
    // Start audio background effect
    stopAudioBg();

    // Stop the global game timer
    clearTimeout(globalTimer);

    //Reset the timer
    chonometer.restart();

    // Reset global control variables
    timeElapsed = 0;
    jobCount = 0;
    jobCompleted = 0;
    jobList = [];
    speed = 0;
    gameStarted = false;
    firedScreen = false;
    totalPoints = 0;
    totalErrors = 0;
    correctSequence = 0;

    // Reset global employee variables
    employeeIsWorking = false;
    
    // Set point multiplicator to the default value
    togglePowerUp();

    // Clear window controls
    setProgressbar();
    clearBox();

    // Hide arrows
    showArrow(0);

    // Hide some messages
    $("#fired").hide();
    $("#hired").hide();

    // If reset game to the start screen
    if (toStart) {
        showHello();
    }

    // Hide the boss
    hideBoss();

    // Set employee image to default
    empNoJob();
}

/*
 * Control the start of the game
 */
function startGame() {
    // Call reset game function
    resetGame(false);

    // Set control variables
    gameStarted = true;

    // Start main timer
    globalTimer = setInterval("increaseTime()", 10);

    // Start the chronometer
    chonometer.start();

    // Hide hello screen
    hideHello();

    // Start audio background effect
    startAudioBg();
}

/*
 * Control to stop the game, pause timers and display info (Game Over ou Game Finished)
 */
function stopGame() {
    // Set control variables
    gameStarted = false;

    // Stop the main timer
    clearTimeout(globalTimer);

    // Stop the chronometer
    chonometer.stop();

    // Start audio background effect
    stopAudioBg();

    // Stop the power up
    stopPowerUp();
}

/*
 * Display information about the game over
 */
function gameOver() {
    // Call stop game function
    stopGame();

    // Set control variables
    firedScreen = true;

    // Display total points at "totalPoints" <div>
    $("#totalPoints").html(totalPoints);

    // Play sound effect
    playGameOver();

    // Show the Fired screen
    if (numberOfToDoJobs() == 0) {
        $("#hired").fadeIn();
        $("#points").html("POINTS: " + totalPoints).fadeIn();
    }
    else {
        $("#fired").fadeIn();
    }
}

/*
 * Do anything when one arrow key was clicked
 */
function arrowClick(position) {
    if (gameStarted) {
        // Get the next job
        var thisJob;

        // If have job at the INBOX
        if (jobCount > jobCompleted) {
            for (i=jobList.length-1;i>0;i--) {
                thisJob = jobList[i];
                if (!thisJob.isDone) {
                    break;
                }
            }

            // If the arrow pressed is equal to the job color
            if (position == thisJob.dificulty) {
                // Do what is needed to complet the job
                jobClick(thisJob.jobNumber);
            }
            else {
                // call job error method 
                jobError();
            }
        }
    }
}

/*
 * Grab keyboard events
 */
function checkKey(e) {
    var event = window.event ? window.event : e;

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
            arrowClick(4);
        }
        else if (event.keyCode == '40' || event.keyCode == '83') {
            totalPoints += 100;
            // down arrow
            arrowClick(3);
        }
        else if (event.keyCode == '37' || event.keyCode == '65') {
            totalPoints += 100;
            // left arrow
            arrowClick(2);
        }
        else if (event.keyCode == '39' || event.keyCode == '68') {
            totalPoints += 100;
            // right arrow
            arrowClick(1);
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