function userCreationValidation(){
	return jQuery('#user-creation-form').validate({
		rules: {

		},
		messages: {
			userPassword: {
				pattern: 'Password should contain at least one uppercase letter and one number',
			}
		}
	});
}