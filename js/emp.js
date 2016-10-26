/*
 * Global variables to control Employee status
 */
var employeeIsWorking = false;
var powerUp = false;

/*
 * Control move: Employee hide all
 */
function empHideAll() {
	$(".emp").hide();
}

/*
 * Control move: Employee get the job
 */
function empGetJob(dificulty) {
	// Set control variable
	employeeIsWorking = true;

	// Hide all employee images
	empHideAll();

	// Show employee image getting the job
	if (powerUp) {
		$("#emp_up_1").show();
	}
	else {
		$("#emp_stress_1").show();
	}

	// Calc the time to finish the job
	var endJobTime = (dificulty * 300);

	// Play audio effect
	playGetJob();

	// Set timer to give up the ended job
	setTimeout("empEndJob()", endJobTime);
}

/*
 * Control move: Employee end the job
 */
function empEndJob() {
	// Set control variable
	employeeIsWorking = false;
	
	// Hide all employee images
	empHideAll();

	// Show employee image getting the job
	if (powerUp) {
		$("#emp_up_2").show();
	}
	else {
		$("#emp_stress_2").show();
	}

	// Set timer to give up the ended job
	setTimeout("empNoJob()", 300);
}

/*
 * Control move: Employee without job
 */
function empNoJob() {
	// Hide all employee images
	empHideAll();
	
	// Show employee whitout job
	if (powerUp) {
		$("#emp_up_0").show();
	}
	else {
		$("#emp_stress_0").show();
	}
}

/*
 * Control point multiplicators enabling/disabling the "POWER UP"
 */
function startPowerUp() {
	if (!powerUp) {
		// Set control variables
		powerUp = true;
		pointMultiplicator = _POINT_MULT_POWERUP;

		// Start play BG effect Power Up
		startAudioBgPowerUp();

		// Force the figure to refresh
		empNoJob();
	}

	// Blink Power Up Info
	$("#powerup").fadeIn(150).fadeOut(300);
}
function stopPowerUp() {
	if (powerUp) {
		// Set control variables
		powerUp = false;
		pointMultiplicator = _POINT_MULT_NORMAL;

		// Stop play BG effect Power Up
		stopAudioBgPowerUp();

		// Force the figure to refresh
		empNoJob();
	}

	// Hide Power Up Info
	$("#powerup").hide();
}
function togglePowerUp() {
	if (correctSequence >= _NUMBER_CORRECT_STARTPOWERUP) {
		startPowerUp();
	}
	else {
		stopPowerUp();
	}
}