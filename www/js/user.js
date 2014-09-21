var APP_KEY = "Hga94rZiIC8m8iuN6NR7bNZpYsIEYE0FOQdi7W3n";
var JS_KEY = "5FQVzzjGbcpiVdB8tjTBlfnixMBo1KWN7Ls8Psie";

$(document).ready(function() {
	Parse.initialize(APP_KEY, JS_KEY);

	var UserRecord = Parse.Object.extend("UserRecord");

	$.urlParam = function(name){
	    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
	    if (results==null){
	       return null;
	    }
	    else{
	       return results[1] || 0;
	    }
	};
	

	var query = new Parse.Query(UserRecord);

	query.equalTo("email", decodeURIComponent($.urlParam('email')));
	query.equalTo("password", decodeURIComponent($.urlParam('passw')));

	query.first({
		success:function(result) {
			$('#username').html(result.get('firstname') +' '+ result.get('lastname'));
			$('#email').html(result.get('email'));
			$('#age').html(result.get('age'));
			$('#phone').html(result.get('phone'));
		},
		error:function(error) {
			alert('Error');
		}
	});
});
