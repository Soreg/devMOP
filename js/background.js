chrome.browserAction.onClicked.addListener(function(activeTab){
  var newURL = "/test.html";
  chrome.tabs.create({ url: newURL });
});
