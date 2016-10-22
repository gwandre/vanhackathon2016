/*
 * Job Class
 */
function Job(jobNumber) {
    // private
		this._jobNumber = 0;
    this._dificulty = 0;
		this._isDone = false;

    // Public
    this.setDificulty = function(value) {
				_dificulty = value;
    };
		this.getId = function() {
			return _jobNumber;
		};
		this.getDificulty = function() {
				return _dificulty;
    };
		this.isDone = function() {
			return _isDone;
		}
		this.complete = function() {
			_isDone = true;
		}
		this.getHtml = function() {
			var htmlValue = '<div id="job' + this.getId() + '" class="job job' + this.getDificulty() + '" onclick="jobClick(' + this.getId() + ')">Job: ' + this.getId() + ' Dif: ' + this.getDificulty();
			if (this.isDone()) {
				htmlValue += 'DONE!';
			}
			htmlValue += '</div>';
			return htmlValue;
		};

   var __construct = function() {
		  _jobNumber = jobNumber;
			_dificulty = Math.floor((Math.random() * 4) + 1);
			_isDone = false;
   }();
}