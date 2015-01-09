var sidebarToggle = false;
$("#sidebar-button").click(function(){
	if(!sidebarToggle){
		
		$("#sidebar").css('min-width', '100px');
		$("#main").animate({
			'width': '60%'
		}, 500);

		$("#sidebar").animate({
			'width': '40%',
			'height': '100%',
			}, 600, function(){
				$("#sidebar").css('display', 'block');
			});	
	}
	else{
		
		$("#sidebar").css('min-width', '0px');
		$("#main").animate({
			'width': '100%'
		}, 600);

		$("#sidebar").animate({
			'width': '0%'
			}, 500, function(){
				$("#sidebar").css('display', 'none');
			});
	}
	sidebarToggle = !sidebarToggle;
	
	
});