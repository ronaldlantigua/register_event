function userCreationValidation(){
	return jQuery('#user-creation-form').validate({
		rules: {

		},
		messages: {
			userPassword: {
				pattern: 'Password should be greater than 9 characters and contain at least one uppercase, lowercase, number and one of these symbols @#$%!',
				minlength:'Password should be greater than 9 characters and contain at least one uppercase, lowercase, number and one of these symbols @#$%!'
			}
		}
	});
}

function eventCreationValidation(){
	return jQuery('#event-creation-form').validate({
		rules: {

		},
		messages: {
			eventGuest: {
				required: 'At least one guest is required',
			}
		}
	});
}
