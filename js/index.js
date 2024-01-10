var content=document.getElementById("dots").innerHTML;
document.getElementById("dots").innerHTML="";
const cIndex=[content.slice(0,1), content.slice(1,2), content.slice(2,3)]; 

var direction = 1;
var slideIndex = 1;
showSlides(slideIndex);


//Zeitlich gesteuerter Wechsel der Slides
window.setInterval(function(){
	if(cIndex[0]==1){
		if (direction == 1){
			if(slideIndex < 3){
				slideIndex++;
				showSlides(slideIndex);
			}else{
				direction=0;
				slideIndex--;
				showSlides(slideIndex);
			}
		}else{
			if(slideIndex > 1){
				slideIndex--;
				showSlides(slideIndex);
			}else{
				direction=1;
				slideIndex++;
				showSlides(slideIndex);
			}
		}
	}else{
		if(cIndex[1]==1){
			if(slideIndex ==2){
				slideIndex=3;
				showSlides(slideIndex);
				setTimeout(function(){
					slideIndex=1;
					showSlides(slideIndex);
				}, 200);
			}else{ 
				slideIndex++;
				showSlides(slideIndex);
			}
		}else{
			slideIndex++;
			showSlides(slideIndex);
		}
	}
}, 5000);


// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
	if(cIndex[2]==1){
		showSlides(slideIndex = ++n);
	}else{
  		showSlides(slideIndex = n);
  	}
}

//aktuelle Slide anzeigen, andere ausblenden
function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("sec2slides");
  var dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
}