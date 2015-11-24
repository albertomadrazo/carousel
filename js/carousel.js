var carousel = (function(){

	var current_img = 1;
	var time_out;
	var changing_time = 3000
	var img_qty = 5;

	function getImgNumber(){
		return current_img;
	}
	function changeImgNumber(img_number){
		if(img_number > img_qty){
			current_img = 1;
		} else if(img_number < 1){
			current_img = img_qty;
		} else {
			current_img = img_number;
		}
	}

	function changeImage(){
		clearTimeout(time_out);
		var curr_circle = "div#_"+current_img;
		$("#circles-container div").css("background", "white");
		$(curr_circle).css("background", "blue");

		$('#image-container').empty();
		$('#image-container').append("<img src='images/0"+current_img+".jpg'>");
	}

	function changeImgByTime(){
		// $('#image-container').fadeOut(changing_time, "linear");
		changeImage();
		time_out = setTimeout(changeImgByTime, changing_time);
		
		if(current_img >= img_qty){
			current_img = 1;
		} else{
			current_img += 1;
		}		

	}

	(function addDots(){
		for(var i = 1; i <= img_qty; i++){
			console.log(1);
			var circle = '<div class="circle clickable" id="_'+i+'"></div>';

			$("#circles-container").append(circle);
		}
	})();

	return{
		changeImage: changeImage,
		changeImgNumber: changeImgNumber,
		changeImgByTime: changeImgByTime,
		getImgNumber: getImgNumber,
		img_qty: img_qty
	}

})();


$(document).ready(function(){
	
	$("div#_1").css("background", "blue");

	carousel.changeImgByTime();
	
	$("div#circles-container div").on("click", function(){
		var circle_clicked = parseInt($(this).attr("id")[1]);
		carousel.changeImgNumber(circle_clicked);
		carousel.changeImgByTime();
	});

	$(".arrow").on("click", function(){
		var direction = $(this).attr("value");
		var direction = (direction === 'left') ? carousel.getImgNumber()-2 : (carousel.getImgNumber())
		if(direction === (-1)){
			direction = carousel.img_qty-1;
		}
		carousel.changeImgNumber(direction);

		carousel.changeImgByTime();
	});
});