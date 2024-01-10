var defvar=String(defectvar);
//const defIndex=[defvar.slice(0,1), defvar.slice(1,2)];
var buttonRefresh = document.getElementById('buttonRefresh');	

aktualisiereWarenkorb();

if(buttonRefresh != null){
buttonRefresh.addEventListener("click", function(){

aktualisiereWarenkorb();
});
}



function aktualisiereWarenkorb() {
	
	var cartCount = document.getElementById('cartCount');
	var arr = document.getElementsByClassName('zugreifen');
	
	if(defvar==0){
		var count = 0;
		for (var i = 0; i < arr.length; i++) {
		count += parseInt(arr[i].value);
	}
	console.log(count);
	cartCount.innerHTML=count;
	
	}
	if(defvar==1){
		var count = -1;
		for (var i = 0; i < arr.length; i++) {
		count += parseInt(arr[i].value);
	}
	console.log(count);
	cartCount.innerHTML=count;
	
	}
	
	
}
	

	