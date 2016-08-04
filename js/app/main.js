var $ = jQuery;

var ProgressBar = function(progressBarID){
	var self = this;
	self.progressBarSelector = '#' + progressBarID;
	self.init = function() {
		$(self.progressBarSelector).progressbar({
			value: false
		});
	};
	self.getValue = function() {
		return $(self.progressBarSelector).progressbar( 'option', 'value' );
	};
	self.setValue = function(value) {
		$(self.progressBarSelector).progressbar( 'option', 'value', value);
	};
};

var handleValidationAndProgressBarFor = function (selector, validator, progressBar) {
	var length = $(selector).length;
	var offset = 100 / length;
	console.log(offset);
	var progress = 0;
	$(selector ).focusout(function() {
		$(selector).each(function() {
			if(validator.check(this)) {
				console.log(this);
				console.log(offset);
				console.log(progress);
				progress = progress + offset;
			}
		});

		console.log(progress);
		progressBar.setValue(progress);
		progress = 0;
	});
};

$(document).ready(function() {
	var progressBar = new ProgressBar('progressbar');
	progressBar.init();

	var userCreationValidator = userCreationValidation();
	handleValidationAndProgressBarFor('#user-creation-form .text-input:required', userCreationValidator, progressBar);
});
