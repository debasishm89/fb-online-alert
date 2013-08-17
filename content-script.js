window.onload = function () { setTimeout(function() {firstrun();}, 10000); }
var int=self.setInterval(function(){realtime1()},5000);
var int=self.setInterval(function(){realtime2()},5000);
var first_love = [];//this name accidentally came into my mind. huh..:)
function firstrun()
{

  var check1 = document.getElementsByClassName('fbNubButton')[1].childNodes[2].innerHTML;
  if(check1 == "Chat (Off)")
  {
      console.log('Chat is off');
      chrome.extension.sendRequest({method: "shownotification", key: "Facebook Chat is off Now"}, function(response) {});
      document.getElementsByClassName('fbNubButton')[1].click()
  }
  var a = document.getElementsByClassName('hideToggler')
  if(a.length == 0)
  {
    document.getElementsByClassName('fbNubButton')[1].click(); 
  }
  var users1 = getcurrentonlineuers();
  first_love = users1;
  console.log(first_love);
}


function realtime1()
{
  var a = document.getElementsByClassName('hideToggler')
  if(a.length == 0)
  {
    document.getElementsByClassName('fbNubButton')[1].click();
  }
  for (var t=0;t<=first_love.length;t++)
    {
	if(first_love[t] !== undefined)
	{
	    var res = checkstillonline(first_love[t]);
	    if (res == "FALSE")//user no more online
	    {
	      	var msg = first_love[t] + " gone Offline";
	      	chrome.extension.sendRequest({method: "shownotification", key: msg}, function(response) {});
	      	console.log(first_love[t],' does not exis..removing..')
	      	var index_2 = first_love.indexOf(first_love[t]);
		first_love.splice(index_2, 1);//POP the item
	    }
	}
    }
}
function realtime2()
{
  var a = document.getElementsByClassName('hideToggler')
  if(a.length == 0)
  {
    document.getElementsByClassName('fbNubButton')[1].click(); 
  }
  var fresh = getcurrentonlineuers()
  for (var t=0;t<=fresh.length;t++)
    {
	if(fresh[t] !== undefined)
	{
	      var index_1 = first_love.indexOf(fresh[t]); 
	      if (index_1 == -1)
	      {
		//Does not exist
		console.log(fresh[t],' does not exis..adding')
		first_love.push(fresh[t]);
		var msg = fresh[t] + " is Online!";
		chrome.extension.sendRequest({method: "shownotification", key: msg}, function(response) {});
	      }
	}
    }
}
function getcurrentonlineuers()
{
  current = [];
  try{var lst = document.getElementsByClassName('_42fz active');}catch(err){console.log('eeeee');}
  for (var k = 0;k<=lst.length;k++)
  {
    	try{var name2 = lst[k].childNodes[0].childNodes[3].childNodes[0].childNodes[0].innerHTML;}catch(err){}
    	if (name2 !== undefined)
	{
	  var indexOfMyItem2 = current.indexOf(name2); //check if already exist
	  if (indexOfMyItem2 == -1)
	  {
	      current.push(name2);
	  }
	}
  }
  return current;
}

function checkstillonline(user_name)
{
  var arr = getcurrentonlineuers();
  var index1 = arr.indexOf(user_name);
   if (index1 == -1){
     return "FALSE";//if not online 
  }
  else{
    return "TRUE";//if online 
  }
}
