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

function isDateGreaterThanToday(date) {
	var splitDate = startDate.split('T');
	var month = splitDate[0];
	var day = splitDate[1];
	var year = splitDate[2];
	var splitTime = splitDate[1].split(':');
	var hour = parseInt(splitTime[0]);
}

jQuery.validator.addMethod('endate_greater_startdate', function(value, element) {
	var startDate = jQuery('#event-start-date').val();
	var endDate = jQuery('#event-end-date').val();
	startDate = new Date(startDate);
	endDate = new Date(endDate);
    return endDate > startDate;
}, 'Enddate should be greater than Startdate');

jQuery.validator.addMethod('date_greater_than_now', function(value, element, params) {
	var date = jQuery(params).val();
	var date1 = date.split('T')[0];
	var splitDate = date1.split('-');
	var time = date.split('T')[1];
	var splitTime = time.split(':');
	var year = parseInt(splitDate[0]);
	var month = (parseInt(splitDate[1])) - 1;
	var day = parseInt(splitDate[2]);
	var hours = parseInt(splitTime[0]);
	var minutes = parseInt(splitTime[1]);
	date = new Date(year, month, day, hours, minutes, 0, 0);
    return date > new Date();
}, 'date should be greater than now');

function eventCreationValidation(){
	return jQuery('#event-creation-form').validate({
		rules: {
			startDate: {
				date_greater_than_now: '#event-start-date'
			},
			endDate: {
				endate_greater_startdate: true,
				date_greater_than_now: '#event-end-date'
			}
		},
		messages: {
			eventGuest: {
				required: 'At least one guest is required',
			}
		}
	});
}
