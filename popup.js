$(function(){
	chrome.storage.sync.get(['username','password','voteCount', 'lastVote'], function(data){	
		if (data.username){
			$("#username").val(data.username);
		}
		if(data.password){
			$("#password").val(data.password);
		}
		if(data.voteCount){
			$("#voteCountDiv").show();
			$("#voteCount").val(data.voteCount);
		}
		if(data.lastVote){
			var lastVote = new Date(Date.parse(data.lastVote));
			var now = new Date();
			var nextVote = new Date(lastVote.setHours(lastVote.getHours()+12));
			if (now >= nextVote){
				$("#timeLeft").val("Now! Go vote!");
			} else {		
				var timeLeft = Math.abs(nextVote - now) / 3600000;
				var splitTime = timeLeft.toString().split('.');
				var hoursLeft = splitTime[0].toString();
				var minutesLeft = (splitTime[1] * 60).toString().substring(0,2);
				var timeLeftString = hoursLeft + " Hours " + minutesLeft + " Minutes";
				$("#timeLeft").val(timeLeftString);
			}
		} else {
			$("#timeLeft").val("Error retrieving time left");
		}
	});	

	$("#saveSettings").on("click", function(){
		var username = $("#username").val();
		var password = $("#password").val();
		if (username && password){
			chrome.storage.sync.set({'username': username, 'password': password}, function() {
				var newURL = "http://www.dalaran-wow.com/";
				chrome.tabs.create({ url: newURL });
			});
		}
	});
	
	$("#goToPage").on("click", function(){
		chrome.tabs.getSelected(null, function(tab) {
			var newURL = "http://www.dalaran-wow.com/account/vote/";
			chrome.tabs.create({ url: newURL });
		});
	});
});