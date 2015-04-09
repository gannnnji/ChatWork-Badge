var openedTabId = -1;
chrome.browserAction.onClicked.addListener(function() {
	if(openedTabId == -1) {
		createTab();
	} else {
		chrome.tabs.update(openedTabId,{
			active: true
		}, function(tab) {
			if (chrome.runtime.lastError) {
				createTab();
			}
		});
	}
});

function createTab() {
	chrome.tabs.create({
		url: 'https://www.chatwork.com/'
	}, function(tab) {
		openedTabId = tab.id;
	});
}


$(function(){
	setInterval(function() {
		if(!!localStorage["api_token"]) {
			$.ajax({
				url: "https://api.chatwork.com/v1/my/status",
				cache: false,
				type: 'GET',
				beforeSend: function (request) {
					request.setRequestHeader("X-ChatWorkToken", localStorage["api_token"]);
				},
				success: function(json){
					if(String(json.unread_num) != '0') {
						chrome.browserAction.setBadgeText({text:String(json.unread_num)});
					} else {
						chrome.browserAction.setBadgeText({text:""});
					}
				},
				error: function(e) {
				}
			});
		}
	}, 5000);
});
