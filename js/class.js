/*
 * Job Class
 */
function Job(number) {
    // private properties
		this.jobNumber = number;
    this.dificulty = Math.floor((Math.random() * 4) + 1);
		this.isDone = false;

		// Public functions
		this.getHtml = function() {
			var htmlValue = '<div id="job' + this.jobNumber + '" class="job ';
			if (this.isDone) {
				htmlValue += 'jobDone';
			}
			else {
				htmlValue += 'job' + this.dificulty;
			}
			htmlValue += '" onclick="jobClick(' + this.jobNumber + ')">';
			htmlValue += '</div>';
			return htmlValue;
		};
		this.complete = function() {
			this.isDone = true;
		};
}