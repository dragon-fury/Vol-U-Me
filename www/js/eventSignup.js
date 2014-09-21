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

	var email = decodeURIComponent($.urlParam('email'));
	var password = decodeURIComponent($.urlParam('passw'));
	
	var query = new Parse.Query(UserRecord);
	var orgId = 0;
	var orgName = "Dont know";
	query.equalTo("email", email);
	query.equalTo("password", password);

	query.first({
		success:function(result) {
			orgId = result.id;
			orgName = result.get('firstname');
			$('.orgNameForPage').html(orgName);
		},
		error:function(error) {
			alert('Error');
		}
	});

	$('.org_profile').on('submit', function(e) {
		e.preventDefault();
		var query = new Parse.Query(EventRecord);
		var events = new EventRecord();
		var org = new UserRecord();
		org.id = orgId;

		var orgName = $(this.org_name).val();
		var location = $(this.locate).val();
		var ageLow = $(this.ageLow).val();
		var ageUp = $(this.ageUp).val();
		var timed = $(this.timed).val();
		var duration = $(this.duration).val();
		var need = $(this.need).val();
		var describe = $(this.describe).val();

		events.save({
			parent: org,
			name: orgName,
			location: location,
			ageLow: ageLow,
			ageUp: ageUp,
			timed: timed,
			duration: duration,
			need: need,
			describe: describe
		 }, {
			 success: function() {
				window.location.href="eventSignUp.html?email="+email+"&passw="+password;
			 },
			 error: function() {
			 	alert('error');
			 }
		});
	});

	$('.past_events_disp').on('click', function(e){
		var org = new UserRecord();
		org.id = orgId;
		var query = new Parse.Query(EventRecord);
		query.equalTo("parent", org);

		query.find({
			success:function(results) {
				for(var i=0;i<results.length;i++){
					$('.events').append('<tr><td> Organization Name:</td><td>'+orgName+'</td></tr>');
					$('.events').append('<tr><td> Event Name:</td><td>'+results[i].get('name')+'</td></tr>');
					$('.events').append('<tr><td> Location: </td><td>'+results[i].get('location')+'</td></tr>');
					$('.events').append('<tr><td> Age Lower Limit:</td><td>'+results[i].get('ageLow')+'</td></tr>');
					$('.events').append('<tr><td> Age Upper Limit: </td><td>'+results[i].get('ageUp')+'</td></tr>');
					$('.events').append('<tr><td> Time: </td><td>'+results[i].get('timed')+'</td></tr>');
					$('.events').append('<tr><td> Duration: </td><td>'+results[i].get('duration')+'</td></tr>');
					$('.events').append('<tr><td> Volunteers needed:</td><td>'+results[i].get('need')+'</td></tr>');
					$('.events').append('<tr><td> Description: </td><td>'+results[i].get('describe')+'</td></tr>');
					$('.events').append('<tr><td style="color:#DDF0E1"> This is empty line</td></tr>');
				}
			},
			error:function(error) {
				alert('Error');
			}
		});
	});


	$('.org_tabs').addClass('hidden');
	$('.org_tabs').first().addClass('current').removeClass('hidden');

	$('.event_signup_tab > li > button').on('click', function(e){
		$('.org_tabs').removeClass('current').addClass('hidden');
		$($(this).attr('goto')).addClass('current').removeClass('hidden');
	});

});
