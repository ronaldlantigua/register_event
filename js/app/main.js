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

var handleValidationAndProgressBarFor = function (selector, validator, progressBar, progressId) {
	var length = $(selector).length;
	var offset = 100 / length;
	var progressValue = 0;
	$(selector).focusout(function() {
		$(selector).each(function() {
			if(validator.check(this)) {
				progressValue = progressValue + offset;
			}
		});

		progressBar.setValue(progressValue);
		$(progressId + ' .porcentage').html(Math.round(progressValue) + '%');
		progressValue = 0;
	});
};

var dataStorage = new function() {
	var self = this;
	self.saveData = function(key, value) {
		localStorage.setItem(key, JSON.stringify(value));
	};
	self.getData = function(key) {
		return JSON.parse(localStorage.getItem(key));
	};
	self.removeData = function(key) {
		localStorage.removeItem(key);
	};
};

var UserCreationModel = function(dataStorage) {
	var self = this;
	self.name = ko.observable();
	self.email = ko.observable();
	self.password = ko.observable();
	self.ocupation = ko.observable();
	self.bornDate = ko.observable();
	self.userObject = ko.computed(function() {
		return {
			name : self.name(),
			email : self.email(),
			password : self.password(),
			ocupation : self.ocupation(),
			bornDate : self.bornDate(),
		};
	});

	self.saveUserData = function() {
		if($('#user-creation-form').valid()) {
			var users = dataStorage.getData('users');
			if(users) {
				users.push(self.userObject());
			} else {
				users = [self.userObject()];
			}
			
			dataStorage.saveData('users', users);
		}
	};
};

var EventModel = function(dataStorage) {
	var self = this;
	self.name = ko.observable();
	self.type = ko.observable();
	self.eventTypes = ['Wedding', 'BirthDay', 'Conference', 'Businnes Meeting', 'sports', 'artistical'];
	self.host = ko.observable();
	self.startDate = ko.observable();
	self.endDate = ko.observable();
	self.guest = ko.observable();
	self.guestList = ko.observableArray();
	self.location = ko.observable();
	self.message = ko.observable();
	self.guestListInvalid = ko.observable(false);
	self.addedGuest = ko.observable();
	self.eventObject = ko.computed(function() {
		return {
			name : self.name(),
			type : self.type(),
			host : self.host(),
			startDate : self.startDate(),
			endDate : self.endDate(),
			guestList : self.guestList(),
			location : self.location(),
			message : self.message(),
		};
	});
	
	self.addGuest = function () {
		if(self.guest() !== '') {
			self.guestList.push(self.guest());
			self.addedGuest(self.guest() + ' added');
			self.guest('');
		}
	};

	self.handleGuestListValidation = function () {
		if(self.guestList().length === 0) {
			self.guestListInvalid(true);
		} else {
			self.guestListInvalid(false);
		}
	};
	
	self.saveEventData = function() {
		self.handleGuestListValidation();

		if($('#event-creation-form').valid()) {
			var events = dataStorage.getData('events');

			if(events) {
				events.push(self.eventObject());
			} else {
				events = [self.eventObject()];
			}
			
			dataStorage.saveData('events', events);
		}
	};
};

$(document).ready(function() {
	/*User Account Creation*/
	var progressBar = new ProgressBar('user-progressbar');
	progressBar.init();

	var userCreationValidator = userCreationValidation();
	handleValidationAndProgressBarFor('#user-creation-form .text-input:required', userCreationValidator, progressBar, '#user-progress');
	ko.applyBindings(new UserCreationModel(dataStorage), document.getElementById('user-creation'));	

	/*Event Creation*/

	var progressBar = new ProgressBar('event-progressbar');
	progressBar.init();

	var eventCreationValidator = eventCreationValidation();
	handleValidationAndProgressBarFor('#event-creation-form .text-input:required', eventCreationValidator, progressBar, '#event-progress');
	ko.applyBindings(new EventModel(dataStorage), document.getElementById('event-creation'));	
});
