function userCreationValidation(){
	return jQuery('#user-creation-form').validate({
		rules: {

		},
		messages: {
			userPassword: {
				pattern: 'Password should contain at least one uppercase, lowercase, number and these symbols @#$%!',
			}
		}
	});
}