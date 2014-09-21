var APP_KEY = "Hga94rZiIC8m8iuN6NR7bNZpYsIEYE0FOQdi7W3n";
var JS_KEY = "5FQVzzjGbcpiVdB8tjTBlfnixMBo1KWN7Ls8Psie";

$(document).ready(function() {
	Parse.initialize(APP_KEY, JS_KEY);

	var UserRecord = Parse.Object.extend("UserRecord");
	var EventRecord = Parse.Object.extend("EventRecord");


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

	var getOrgName = function(id){
		var query = new Parse.Query(UserRecord);

		query.equalTo("objectId", id);
			query.first({
		success:function(result) {
			return result.get('lastname');
		},
		error:function(error) {
			alert('Error');
		}
	});

	};

	var query = new Parse.Query(EventRecord);
	query.find({
		success:function(results) {
			for(var i=0;i<results.length;i++){

				$('.opport').append('<tr><td> Event Name:</td><td>'+results[i].get('name')+'</td></tr>');
				$('.opport').append('<tr><td> Location: </td><td>'+results[i].get('location')+'</td></tr>');
				$('.opport').append('<tr><td> Time: </td><td>'+results[i].get('timed')+'</td></tr>');
				$('.opport').append('<tr><td> Duration: </td><td>'+results[i].get('duration')+'</td></tr>');
				$('.opport').append('<tr><td><input type="submit" value="Sign up"</td></tr>');
				$('.opport').append('<tr><td style="color:#DDF0E1"> This is empty line</td></tr>');
			}
		},
		error:function(error) {
			alert('Error');
		}
	});



	$('.usr_tabs').addClass('hidden');
	$('.usr_tabs').first().addClass('current').removeClass('hidden');

	$('.tabd a').on('click', function(e){
		e.preventDefault();
		$('.usr_tabs').removeClass('current').addClass('hidden');
		$($(this).attr('href')).addClass('current').removeClass('hidden');
	});

});
