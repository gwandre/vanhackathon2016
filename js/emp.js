/*
 * Global variables to controle Employee status
 */
var employeeIsWorking = false;

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
	$("#emp_stress_1").show();

	// Calc the time to finish the job
	var endJobTime = (dificulty * 300);

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
	$("#emp_stress_2").show();

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
	$("#emp_stress_0").show();
}