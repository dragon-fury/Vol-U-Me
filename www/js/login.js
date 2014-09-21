var APP_KEY = "Hga94rZiIC8m8iuN6NR7bNZpYsIEYE0FOQdi7W3n";
var JS_KEY = "5FQVzzjGbcpiVdB8tjTBlfnixMBo1KWN7Ls8Psie";

$(document).ready(function() {
	Parse.initialize(APP_KEY, JS_KEY);

	var UserRecord = Parse.Object.extend("UserRecord");

	$('.login_form').on('submit', function(e) {
		e.preventDefault();
		var query = new Parse.Query(UserRecord);
		var self = this;

		query.equalTo("email", $(this.email).val());
		query.equalTo("password", $(this.passw).val());

		query.find({
			success:function(object) {
				console.dir(object);
				$('form').get(0).setAttribute('method', 'POST');
				$('form').get(0).setAttribute('action', 'user.html');
				$('form').get(0).submit();
			},
			error:function(error) {
				alert('gone');
			}
		});

	});
});