chrome.extension.onRequest.addListener(function(request, sender, sendResponse) 
{
    if (request.method == "shownotification")
    {
    var notification = webkitNotifications.createNotification('https://cdn1.iconfinder.com/data/icons/social_balloons/128px/social_balloon-14.png','FB Online Notification',request.key);
    notification.show();
    setTimeout(function(){notification.cancel();},5000);
    }
});
