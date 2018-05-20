if (window.location.hostname === "www.dalaran-wow.com"){
	console.log("At dalaran site...");
	chrome.storage.sync.get(['username','password'], function(data){
		var username = data.username;
		var password = data.password;
		if(username && password){
			$.post("http://www.dalaran-wow.com/loginframe.php?SSID:"
			,{accountName: username, password: password, persistLogin: "true", app: "com-sc2"}
			,function(data){
				if (data.indexOf("<p><h3>Success</h3></p>") >= 0 || data.indexOf("<h3><font color='green'>You're Logged In</font></h3>") >= 0){
					console.log("Logged in");
					vote(1);
				}
			});
		} else {
			console.log("Not logged in.");
		}
	});
	
	var voteCount;
	chrome.storage.sync.get('voteCount', function(data) {
		if(data.voteCount){
			voteCount = data.voteCount;
		} else {
			voteCount = 0;
		}
	});
}
if (window.location.href === "http://www.dalaran-wow.com/account-log/"){
	setTimeout(function(){
		window.location.replace("http://www.dalaran-wow.com/account/vote/");
	},3000)
}

function vote (voteId){
		if (voteId <= 4){
			$.post("http://www.dalaran-wow.com/account/vote/" + voteId, function(data){
				if (data.indexOf("You have already voted in the last 24 hours") >= 0){
					console.log("Vote " + voteId + ": Already voted")
				} else {
					voteCount++;
					var lastVote = Date().toString();
					chrome.storage.sync.set({'voteCount': voteCount, 'lastVote': lastVote}, function() {
						console.log("Vote " + voteId + ": Success")
					});
				}
				voteId++;
				vote(voteId);
			});
		} else {
			console.log("Done voting.")
		}
	}