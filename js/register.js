var password = document.getElementById("register-pw");
var confirm_password = document.getElementById("register-pwrep");
var usrmsg_span=document.getElementById("usrmsg");
var username = document.getElementById("register-username");
var agbcheck = document.getElementById("register-check");

var defvar=document.getElementById("defvar").innerHTML;
document.getElementById("defvar").innerHTML="";
var featvar=document.getElementById("featvar").innerHTML;
document.getElementById("featvar").innerHTML="";
const dIndex=[defvar.slice(0,1), defvar.slice(1,2), defvar.slice(2,3)]; 

if(featvar==1){
	
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

	if(dIndex[2] == 0){
		password.onchange = validatePassword;
		confirm_password.onkeyup = validatePassword;
	}
	
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

}



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
		if(dIndex[1]==1 && username.value.length > 12){
			usrmsg_span.style.color = "red";
			usrmsg_span.innerHTML = "Bitte einen gültigen Namen eingeben:<br>4-12 Zeichen: a-z, A-Z, 0-9, Umlaute";
			username.setCustomValidity("");
		}else{
			if (username.validity.patternMismatch) {
			//Username entspricht nicht den Vorgaben
				usrmsg_span.style.color = "red";
				usrmsg_span.innerHTML = "Bitte einen gültigen Namen eingeben:<br>4-12 Zeichen: a-z, A-Z, 0-9, Umlaute";
				username.setCustomValidity("4-12 Zeichen: a-z, A-Z, 0-9, Umlaute");
			}else{
			//Username wäre gültig -> Prüfüng geht an DB
				var xmlhttp = new XMLHttpRequest();
			    xmlhttp.onreadystatechange = function() {
			      if (this.readyState == 4 && this.status == 200) {
			       		if(this.responseText == 0){
					   		usrmsg_span.innerHTML = "Dieser Name ist verfügbar";
		       				usrmsg_span.style.color = "green";
		       				username.setCustomValidity("");
						}else{
							if(dIndex[0]==1){
								usrmsg_span.innerHTML = "Dieser Name ist verfügbar";
		       					usrmsg_span.style.color = "green";
							}else{
								usrmsg_span.innerHTML = "Dieser Name ist schon vergeben.";
								usrmsg_span.style.color = "red";
							}
	      					username.setCustomValidity("Bitte einen anderen Namen wählen.");
						}
			      }
			    };
			    xmlhttp.open("GET", "./ajax/register.async.php?q="+username.value,true);
			    xmlhttp.send();
			}
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


