/*
 * Global Variables
 */
var globalTimer = undefined; 
var timeElapsed = 0;
var jobCount = 0;
var jobList = [];
var speed = 0;

/*
 * Helper functions
 */
function showDialog(dialogMessage) {
    $("#dialog p").html(dialogMessage);
    $("#dialog").dialog();
}

function showHello() {
    showDialog("Hello, welcome to the game!");
}

function setProgressbar() {
    $(function() {
        $("#progressbar").progressbar({
            max: 12000,
            value: timeElapsed
        });
    });
}

/*
 * Control Functions
 */
function jobClick(jobNumber) {
    var jobElement = jobList[jobNumber];
    jobElement.complete();

    console.log("clicked at jobNumber:", jobNumber, "element:", jobElement.getHtml());

    $("#job"+jobNumber).remove();
    $("#done").html(jobElement.getHtml() + $("#done").html());
}
function createJob() {
    jobCount++;
    var newJob = new Job(jobCount);
    jobList[jobCount] = newJob;
    $("#inbox").html(newJob.getHtml() + $("#inbox").html());
    console.log("new job created! id:", jobCount, "html:", newJob.getHtml());
}
function increaseTime() {
    timeElapsed++;
    setProgressbar();
    if (Math.floor((Math.random() * (300 - speed)) + 1) == Math.round((300 - speed) / 2)) {
        createJob();
    }
}
function clearBox() {
    $("#inbox").html("");
    $("#done").html("");
}
function resetGame() {
    clearTimeout(globalTimer);
    timeElapsed = 0;
    jobCount = 0;
    jobList = [];

    setProgressbar();
    clearBox();
}

function startGame() {
    resetGame();
    globalTimer = setInterval("increaseTime()", 10);
}

function stopGame() {
    clearTimeout(globalTimer);
}

function gameOver() {
    stopGame();
    showDialog("You are fired, dude!");
}

function checkKey(e) {
    var event = window.event ? window.event : e;

    if (event.keyCode == '38') {
        // up arrow
        console.log("up");
    }
    else if (event.keyCode == '40') {
        // down arrow
        console.log("down");
    }
    else if (event.keyCode == '37') {
       // left arrow
       console.log("left");
    }
    else if (event.keyCode == '39') {
       // right arrow
       console.log("right");
    }
}

// Initialization
$(function() {
    resetGame();
    showHello();

    // Capture keyboard events
    document.onkeydown = checkKey;
});

$(function() {
    $(".job").click(function() {
        jobClick($(this));
    });
});