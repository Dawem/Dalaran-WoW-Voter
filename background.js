updateBadge();
chrome.tabs.onUpdated.addListener(function() {
	updateBadge();
});

function updateBadge(){
	chrome.storage.sync.get('lastVote', function(data){
		if(data.lastVote){
			var lastVote = new Date(Date.parse(data.lastVote));
			var now = new Date();
			var nextVote = new Date(lastVote.setHours(lastVote.getHours()+12));
			var timeLeft = (nextVote - now) / 3600000;
			if (now >= nextVote){
				chrome.browserAction.setBadgeText({text:"Vote!"});
				chrome.browserAction.setBadgeBackgroundColor({color: "#00FF00"});	
			} else {
				var splitTime = timeLeft.toString().split('.');
				var hoursLeft = splitTime[0].toString() + "hr";
				chrome.browserAction.setBadgeText({text: hoursLeft});
				chrome.browserAction.setBadgeBackgroundColor({color: "#FF0000"});
			}
		}
	});
}

//TODO:
//Notify if not logged in or login failed
//Better handling of initial vote