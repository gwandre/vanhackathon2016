//Reference
//https://codepen.io/Romlonix/pen/Fwsza

var milliseconds = 0, seconds = 0, minutes = 0, hours = 0, maxMinutes = 1, control;

chonometer = {
    start: function() {
        control = setInterval(StartTimer, 10);
    },
    stop: function() {
        clearInterval(control);
    },
    restart: function() {
        clearInterval(control);
        milliseconds = 0;
        seconds = 0;
        minutes = 0;
        hours = 0;
        Milliseconds.innerHTML = ":00";
        Seconds.innerHTML = ":00";
        Minutes.innerHTML = ":00";
        Hours.innerHTML = "00";
        //document.getElementById("inicio").disabled = false;
        //document.getElementById("parar").disabled = true;
        //document.getElementById("continuar").disabled = true;
        //document.getElementById("reinicio").disabled = true;
    },
    timer: function() {
        if (milliseconds < 99) {
            milliseconds++;
            if (milliseconds < 10) {
                milliseconds = "0" + milliseconds
            }
            Milliseconds.innerHTML = ":" + milliseconds;
        }
        if (milliseconds == 99) milliseconds = -1;
        if (milliseconds == 0) {
            seconds++;
            if (seconds < 10) {
                seconds = "0" + seconds
            }
            Seconds.innerHTML = ":" + seconds;
        }
        if (seconds == 59) seconds = -1;
        if ((milliseconds == 0) && (seconds == 0)) {
            minutes++;
            if (minutes < 10) {
                minutes = "0" + minutes
            }
            Minutes.innerHTML = ":" + minutes;
        }
        if (minutes == 59) minutes = -1;
        if ((milliseconds == 0) && (seconds == 0) && (minutes == 0)) {
            hours++;
            if (hours < 10) {
                hours = "0" + hours
            }
            Hours.innerHTML = hours;
        }
    }
}
 function StartTimer() {
    if (milliseconds < 99) {
        milliseconds++;
        if (milliseconds < 10) {
            milliseconds = "0" + milliseconds
        }
        Milliseconds.innerHTML = ":" + milliseconds;
    }
    if (milliseconds == 99) {
        milliseconds = -1;
    }
    else if (milliseconds == 0) {
        seconds++;
        if (seconds < 10) {
            seconds = "0" + seconds
        }
        Seconds.innerHTML = ":" + seconds;
    }
    if (seconds == 59) {
        seconds = -1;
    }
    if ((milliseconds == 0) && (seconds == 0)) {
        minutes++;
        if (minutes < 10) {
            minutes = "0" + minutes
        }
        Minutes.innerHTML = ":" + minutes;
    }
    if (minutes == 59) {
        minutes = -1;
    }
    if ((milliseconds == 0) && (seconds == 0) && (minutes == 0)) {
        hours++;
        if (hours < 10) {
            hours = "0" + hours
        }
        Hours.innerHTML = hours;
    }
}