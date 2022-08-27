$(document).ready(function() {
	var mobile = false;
	var mobileKeyWords = new Array('iPhone', 'iPod', 'iPad', 'BlackBerry', 'Android', 'Windows CE', 'LG', 'MOT', 'SAMSUNG', 'SonyEricsson');
	for (var word in mobileKeyWords){
		if (navigator.userAgent.match(mobileKeyWords[word]) != null){
			mobile=true;
			break;
		}
	}
	
	var $grid = $('.grid').imagesLoaded(function() {
		$grid.isotope({
			itemSelector : '.grid-item'
		});
		$("#preloader").fadeOut(1200);
		$($(".grid-item").get()).each(function(index) {
			 $(this).delay(index*50).animate({opacity: 1}, 800);
		});
	});
	
	$("h1").click(function() {
		$('html, body').stop().animate({scrollTop: 0}, 500);
	});
	
	
	$(window).bind('scroll', function(e) {
		scrollEvt();
	});
	
	function scrollEvt() {
		if ($(document).scrollTop() > $('#contact').offset().top-$('#contact').height()) {
			$(".adBtn").addClass("top");
		}else{
			$(".adBtn").removeClass("top");
		}
		
		if ($(document).scrollTop() > 50){
			$("#gnb").addClass("scroll");
		}else{
			$("#gnb").removeClass("scroll");
		}
	}
	$(".adBtn").click(function() {
		if($(this).hasClass('top')){
			$('html, body').stop().animate({scrollTop: 0}, 500);
		}else{
			if(!mobile)$('html, body').stop().animate({scrollTop: $('#contact').offset().top-300}, 500);
			if(mobile)$('html, body').stop().animate({scrollTop: $('#contact').offset().top-150}, 500);
		}
		
	});
	
	
	
	$("#contact .btn").click(function() {
		if($('#ucompany').val() == ''){
			alert("회사명을 입력해 주세요.");
			$('#ucompany').focus();
			return false;
		}
		if($('#uname').val() == ''){
			alert("성함을 입력해 주세요.");
			$('#uname').focus();
			return false;
		}
		if($('#unumber').val() == ''){
			alert("연락처를 입력해 주세요.");
			$('#unumber').focus();
			return false;
		}
		if($('#uemail').val() == ''){
			alert("이메일 입력해 주세요.");
			$('#uemail').focus();
			return false;
		}
		if($('#question').val() == ''){
			alert("문의 내용을 입력해 주세요.");
			$('#question').focus();
			return false;
		}
		
		$.ajax({
			type: 'POST',
			url: 'contact.php',
			data: {
				ucompany: $('#ucompany').val()
				,uname: $('#uname').val()
				,unumber: $('#unumber').val()
				,uemail: $('#uemail').val()
				,question: $('#question').val()
			},
			dataType:"json",
			success: function(req) {
				if (req.result=='o')
				{
					alert('문의가 정상적으로 처리되었습니다');
					$('#ucompany').val("");
					$('#uname').val("");
					$('#unumber').val("");
					$('#uemail').val("");
					$('#question').val("");
				}
			}
		});
	});
	
	
})