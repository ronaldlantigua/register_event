(function($) {
	$(document).ready(function() {
		$('#user-creation-form').validate({
			rules: {

			},
			messages: {
				userPassword: {
					pattern: 'Password should contain at least one uppercase letter and one number',
				}
			}
		});
	});
})(jQuery);