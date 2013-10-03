var AUTH_TOKEN = "";

var intervalID = window.setInterval(showLogin, 250);

function isJqueryLoaded() {
  if (typeof jQuery != 'undefined') {
    return true;
  }
  else {
    return false;
  }
}

function showLogin() {
  if (isJqueryLoaded()) {
    window.clearInterval(intervalID);
    $('#LoginForm').modal();
    window.setTimeout(
      function(){
        $("#username-txt").focus();
      }, 1000
    );
      
  }
}

function authenticate() {
	var username = $("#username-txt").val();
	var password = $("#password-txt").val();

	var auth_data = {
		"auth": {
			"passwordCredentials":	{
				"username": username, 
				"password": password	
			}
		}	
	};

	$.ajax({
      type: "POST",
      url: window.location.protocol + "//" + window.location.hostname + ":" + window.location.port + "/v1/auth",
      contentType: "application/json",
      data: JSON.stringify(auth_data),
      dataType: "text",
      success: function( data ) {

        var returnedJsonObj = JSON.parse(data);
        AUTH_TOKEN = returnedJsonObj["access"]["token"]["id"];
        $('#LoginForm').modal('hide');
      },
      error: function( err ){
        $("#login-error").show();
        console.log("Error: " + err.Message);
      }
  });
}  
