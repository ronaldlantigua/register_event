function userCreationValidation(){
	return jQuery('#user-creation-form').validate({
		rules: {

		},
		messages: {
			userPassword: {
				pattern: 'Password should contain at least one uppercase, lowercase, number and one of these symbols @#$%!',
			}
		}
	});
}

function eventCreationValidation(){
	return jQuery('#event-creation-form').validate({
		rules: {

		},
		messages: {
			eventName: {
				pattern: 'Password should contain at least one uppercase, lowercase, number and one of these symbols @#$%!',
			}
		}
	});
}