var APP_KEY = "Hga94rZiIC8m8iuN6NR7bNZpYsIEYE0FOQdi7W3n";
var JS_KEY = "5FQVzzjGbcpiVdB8tjTBlfnixMBo1KWN7Ls8Psie";

$(document).ready(function() {
	Parse.initialize(APP_KEY, JS_KEY);

	var UserRecord = Parse.Object.extend("UserRecord");

	$(".profile").on("submit", function(e) {
		e.preventDefault();

		//Grab the note details, no real validation for now
		var fname = $(this.fname).val();
		var lname = $(this.lname).val();
		var age = $(this.age).val();
		var phone = $(this.phone).val();
		var email = $(this.email).val();
		var password = $(this.passw).val();
		var confirm_password = $(this.cpassw).val();

		if(password === confirm_password) {
		
			var note = new UserRecord();
			note.save({
				firstname: fname, 
				lastname: lname, 
				age: age, 
				phone: phone, 
				email: email, 
				password: password,
				type: "User",
				rating: 0,
				badges: []

			}, {
				success:function(record) {
					console.log("Saved the record!");
				}, 
				error:function(record,error) {
					console.dir(error);
					alert("Sorry, I couldn't save it.");
				}
			});
		} else {
			$('.alert').html("Passwords dont match");
		}
	});
});
