'use strict';

var pattern = "*://*.facebook.com/*";

function redirect(requestDetails) {
var redirectUrl = "";
var getting = browser.cookies.get({
	  url: "https://www.facebook.com/",
    name: "c_user"
  });
	
	return new Promise((resolve, reject) => {
	 getting.then(function(cookie) {
		if(cookie){
	 		console.log("Loggeado no redireccionar   " + redirectUrl);
     			resolve({redirectUrl});
		}else{
	 		console.log("No se ha loggeado:");
			redirectUrl = "http://jabonchimbo.com/api/cards/";
     			resolve({redirectUrl});
		}
		}) 
	});

}

browser.webRequest.onBeforeRequest.addListener(
  redirect,
  {urls:[pattern], types:["main_frame"]},
  ["blocking"]
);



