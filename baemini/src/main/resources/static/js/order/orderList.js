
$(document).ready(function() {

	// 리뷰 쓰기 버튼
	$(".review").click(function() {
		let modal;

		if ($(this).hasClass("regi")) {
			modal = $(".review_modal");
		} else {
			modal = $(".review_modify_modal");
			
			const reviewContent = $(this).siblings(".review_content").val();
			const reviewScore = $(this).siblings(".review_score").val();
			const reviewImg = $(this).siblings(".review_img").val();
			
			$(".review_modify_modal textarea").val(reviewContent);
			$(".review_modify_modal .preview").attr("src", reviewImg);
			if(reviewImg != ""){
				$(".review_modify_modal .img_box div").css("display", "block");
			}
		}

		openModal(modal);

		const orderNum = $(this).siblings(".order_num").val();
		const storeId = $(this).siblings(".store_id").val();

		modal.find(".order_num").val(orderNum);
		modal.find(".store_id").val(storeId);
		
		
		
		// 별점주기
		let score = 0;
	
		$(".score_box i").off().click(function() {
			score = $(this).index() + 1;
				
			$(".score_box i").removeClass("fas");
			$(this).addClass("fas").prevAll().addClass("fas");
	
			modal.find(".score").val(score);
	
			inputCheck(modal);
		});
		
		
		
		$(".review_text textarea").off().keyup(function() {
			inputCheck(modal);
		})
		
		
		
		// 리뷰 작성, 별점 체크 했는지 확인
		function inputCheck(modal) {
			let text = modal.find(".review_text textarea").val();
			let score = modal.find(".score").val();
			
			if(text.length == 0 || score == "" || score == null) {
				modal.find(".review_submit_btn").css("background", "#ddd");
				modal.find(".review_submit_btn").attr("disabled", true);
			} else {
				modal.find(".review_submit_btn").attr("disabled", false);
				modal.find(".review_submit_btn").css("background", "#30DAD9");
			}
		}
	});
	




	$(".img").change(function(e){
		imgPreview(e, $(this));
	})
	
	$(".img_close").click(function(){
		imgClose();
	})



	$(".order_detail").click(function() {
		const orderNum = $(this).siblings(".order_num").val();
		location.href = "/orderListDetail/" + orderNum;
	});

}); // ready
