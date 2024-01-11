var password = document.getElementById("register-pw");
var confirm_password = document.getElementById("register-pwrep");
var usrmsg_span=document.getElementById("usrmsg");
var username = document.getElementById("register-username");
var agbcheck = document.getElementById("register-check");
var regform = document.getElementById("regform");
var dropdownRole = document.getElementById("register-role");
var userlist= Array("");
/*var defvar=document.getElementById("defvar").innerHTML;
document.getElementById("defvar").innerHTML="";
var featvar=document.getElementById("featvar").innerHTML;
document.getElementById("featvar").innerHTML="";
const dIndex=[defvar.slice(0,1), defvar.slice(1,2), defvar.slice(2,3)]; 
*/



document.addEventListener('invalid', (function () {
	return function (e) {
		//Verhindert Validierungs Popups
		e.preventDefault();
		//Required Felder
		if(username.validity.valueMissing){
			usrmsg_span.style.color = "red";
			document.getElementById("usrmsg").innerHTML="Bitte einen Nutzernamen eingeben";
		}
		if(password.validity.valueMissing){
			document.getElementById("pwmsg").innerHTML="Bitte ein Passwort eingeben";
		}
		if(agbcheck.validity.valueMissing){
			document.getElementById("agbmsg").innerHTML="Bitte den AGB zustimmen";
		}
	};
})(), true);

username.onkeyup = checkUsername;


password.onchange = validatePassword;
confirm_password.onkeyup = validatePassword;


//Gibt eine Fehlermeldung am Eingabefeld aus, falls das eingabemuster für "password" nicht eingehalten wurde.
password.addEventListener("input", function () {
	if (password.validity.patternMismatch) {
	password.setCustomValidity("8-20 Zeichen: a-z, A-Z, 0-9, @$!%*?");
	document.getElementById("pwmsg").innerHTML="8-20 Zeichen: a-z, A-Z, 0-9, @$!%*?";
	} else {
	password.setCustomValidity("");
	document.getElementById("pwmsg").innerHTML="";
	}
});





function validatePassword(){
	//prüft ob in beiden PWfeldern der gleiche Wert eingetragen wurde
  if(password.value != confirm_password.value) {
    confirm_password.setCustomValidity("Die Passwörter stimmen nicht überein");
    document.getElementById("repwmsg").innerHTML="Die Passwörter stimmen nicht überein";
  } else {
    confirm_password.setCustomValidity('');
    document.getElementById("repwmsg").innerHTML="";
  }
}

function checkUsername(){
	//Überprüft den Username auf Gültigkeit und fragt falls gültig die DB an, ob der Name bereits vergeben ist.
	
	if(username.value.length > 3){
		
			if (username.validity.patternMismatch) {
			//Username entspricht nicht den Vorgaben
				usrmsg_span.style.color = "red";
				usrmsg_span.innerHTML = "Bitte einen gültigen Namen eingeben:<br>4-12 Zeichen: a-z, A-Z, 0-9, Umlaute";
				username.setCustomValidity("4-12 Zeichen: a-z, A-Z, 0-9, Umlaute");
			
			}else{
				username.setCustomValidity('');
				usrmsg_span.innerHTML = "";
			}
		
	}else{
	//username zu kurz
		username.setCustomValidity("Bitte mindestens 4 Zeichen eingeben.");	
		if(username.value.length == 0){
			usrmsg_span.innerHTML = "";
		}else{
			usrmsg_span.style.color = "red";
			usrmsg_span.innerHTML = "Bitte mindestens 4 Zeichen eingeben.";
		}
	}
}

function register(){
	if(regform.reportValidity()){
		document.getElementById("modal-register").style.display="None";
		document.getElementById("register-overlay").style.display="Block";
		document.getElementById("successusrname").innerHTML=username.value;
		document.getElementById("successpw").innerHTML=password.value;
		document.getElementById("successtype").innerHTML=dropdownRole.options[dropdownRole.selectedIndex].text;
		userlist = JSON.parse(sessionStorage.getItem("Users"));
		console.log(userlist);
		userlist.push([username.value, password.value, dropdownRole.options[dropdownRole.selectedIndex].text]);
		sessionStorage.setItem("Users", JSON.stringify(userlist))
		
	}
	

}
