/*
 * Job Class
 */

function Job(number) {
    // private
		this.jobNumber = number;
    this.dificulty = Math.floor((Math.random() * 4) + 1);
		this.isDone = false;

		this.getHtml = function() {
			var htmlValue = '<div id="job' + this.jobNumber + '" class="job job' + this.dificulty + '" onclick="jobClick(' + this.jobNumber + ')">Job: ' + this.jobNumber + ' Dif: ' + this.dificulty;
			if (this.isDone) {
				htmlValue += ' DONE!';
			}
			htmlValue += '</div>';
			return htmlValue;
		};
		this.complete = function() {
			this.isDone = true;
		};
}