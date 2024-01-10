var login_password = document.getElementById("login-password");
var login_usrmsg_span = document.getElementById("login-username-msg");
var login_username = document.getElementById("login-username");
var login_pwdmsg_span = document.getElementById("login-password-msg");
var login_submit = document.getElementById("login-submit");
var loginform = document.getElementById("loginform");

login_username.addEventListener("focusout", checkLoginUsername);
//loginform.addEventListener("submit", checkLoginPassword);

document.onkeypress = enter;
function enter(e) {
  if (e.which == 13) { 
	checkLoginUsername();
	if(login_pwdmsg_span.innerHTML == "") {
		checkLoginPassword();
	}
  }
}

function checkLoginUsername(){
	//Überprüft den Username auf Gültigkeit
	var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
       		if (this.responseText != 0 && this.responseText != 1) { console.log(this.responseText); }
       		if(this.responseText == 0){
				login_pwdmsg_span.innerHTML = "";
		   		login_usrmsg_span.innerHTML = "Dieser User existiert nicht.";
				login_usrmsg_span.style.color = "red";
			} else {
				login_usrmsg_span.innerHTML = "";
			}
      }
    };
    xmlhttp.open("GET", "./ajax/register.async.php?q="+login_username.value,true);
    xmlhttp.send();
} 

function checkLoginPassword(){
	//alert("Prüfe Login-Passwort");
	//Überprüft das Passwort auf Gültigkeit
	var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
			switch(parseInt(this.responseText)) {
				case 0:
				    // Passwort falsch
				    login_usrmsg_span.innerHTML = "";
					login_pwdmsg_span.innerHTML = "Benutzername oder Passwort falsch";
					login_pwdmsg_span.style.color = "red";
					login_username.select();
					login_password.value = "";
				    break;
				case 1:
				    // Formular nur submitten, wenn Login ok
					login_pwdmsg_span.innerHTML = "";
					loginform.submit();
				    break;
				case 2:
				    // Account gesperrt
				    login_usrmsg_span.innerHTML = "";
					login_pwdmsg_span.innerHTML = "Account ist gesperrt";
					login_pwdmsg_span.style.color = "red";
					login_username.select();
					login_password.value = "";
				    break;  
				case 3:
					// Account wurde gerade entsperrt
					document.getElementById("overlay").style.display = "none";
					document.getElementById("loginentsperrt-overlay").style.display = "block";
				default:
				    console.log(this.responseText);
			}
        }
    };
    xmlhttp.open("GET", "login.php?user="+login_username.value+"&pass="+login_password.value,true);
    xmlhttp.send();
} 


