var login_password = document.getElementById("login-password");
var login_usrmsg_span = document.getElementById("login-username-msg");
var login_username = document.getElementById("login-username");
var login_pwdmsg_span = document.getElementById("login-password-msg");
var login_submit = document.getElementById("login-submit");
var loginform = document.getElementById("loginform");
var ListUserData = JSON.parse(sessionStorage.getItem("Users"));
var UserPW="";
var UserRole="";

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
	let usrnameFound = false;

	ListUserData = JSON.parse(sessionStorage.getItem("Users"));
	ListUserData.forEach(element => {
		if(element[0] == login_username.value){
			usrnameFound= true;
			UserPW = element[1];
			UserRole = element[2];
		}
	});
	if(usrnameFound){
		login_usrmsg_span.innerHTML = "";
	}else{
		login_pwdmsg_span.innerHTML = "";
		login_usrmsg_span.innerHTML = "Dieser User existiert nicht.";
		login_usrmsg_span.style.color = "red";
	}
} 

function checkLoginPassword(){

	//Überprüft das Passwort auf Gültigkeit
	if(login_password.value == UserPW){
		login_pwdmsg_span.innerHTML = "";
		sessionStorage.setItem("LoggedIn", [login_username.value, login_password.value, UserRole]);
		window.location.replace('index.html');
	}else{
		login_usrmsg_span.innerHTML = "";
		login_pwdmsg_span.innerHTML = "Benutzername oder Passwort falsch";
		login_pwdmsg_span.style.color = "red";
		login_username.select();
		login_password.value = "";
	}

} 


