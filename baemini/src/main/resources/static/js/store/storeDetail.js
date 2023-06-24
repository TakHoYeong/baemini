

$(document).ready(function() {
	const minDelevery = Number($("#min_delevery").data("min_delevery"));
	const deleveryTip = Number($("#delevery_tip").data("delevery_tip"));
	const storeId = $("#store_id").val();
	const storeName = $(".store_name").data("store_name");
	
	const cart = (function(){
		// 장바구니에 담긴 가게번호 (다른가게에서 담은 상품인지 확인) 
		let cartStoreId = null;
		const getCartStoreId = function(){
			return cartStoreId;
		}
		const setCartStoreId = function(set){
			cartStoreId = set;
		}
		// 장바구니에 담긴 상품 수
		let cartSize = 0;
		
		const getCartSize = function(){
			return cartSize;
		}
		
		const setCartSize = function(set){
			cartSize = set;
		}
		
		
		// 장바구니에 담은 메뉴가격 총합
		let menuTotalPrice = 0;
		
		const getMenuTotalPrice = function(){
			return menuTotalPrice;
		}
		
		const setMenuTotalPrice = function(set){
			menuTotalPrice = set;
		}

	
		
		return {
			getCartStoreId : getCartStoreId, 
			setCartStoreId : setCartStoreId,
			getCartSize : getCartSize,
			setCartSize : setCartSize,
			getMenuTotalPrice : getMenuTotalPrice,
			setMenuTotalPrice : setMenuTotalPrice,
			};
	})();
	
	
	
	
	// 가게 입장시 카트리스트 불러오기
	(function(){
		$.ajax({
			url: "/cartList",
			type: "get"
		})
		.done(function(result){
			if(result == "" ) {
				cartReset();
				return;
			}
			cartList(result);
		})
		.fail(function(){
			swal("장바구니 정보 에러");
		})
	})();
	
	



	// 찜하기
	$(".inf i").click(function(){
		let likes ="";
		
		if($(this).hasClass("far")) {
			$(this).removeClass("far").addClass("fas");
			likes = "on";
		} else {
			$(this).removeClass("fas").addClass("far");
			likes = "off";
		}
		
		const data = {
			id : $("#store_id").val(),
			likes : likes
		}
		$.ajax({
			url: "/store/likes",
			type: "POST",
			data: data
		})
		.done(function(result){
			if(result == 0) {
			} else {
				
				let likesCount = $(".likes_count").data("count");
				
				if(likes == "on") {
					$(".likes_count").text(likesCount+1);
					$(".likes_count").data("count", likesCount+1 );
				} else {
					$(".likes_count").text(likesCount-1);
					$(".likes_count").data("count", likesCount-1 );
				}
			}
		})
	}) // 찜





	// 메뉴 클릭시 모달창 
	$(".menu > li .menu_box").click(function() {
		
		const isAdmin = $("#admin_button_box").data("is_admin");
		if(isAdmin) {
			return;
		}
		
		const isOpen = $("#is_open").data("is_open");
		if(!isOpen) {
			swal("지금은 준비중이에요");
			return;
		}
		
		const foodId = $(this).find(".food_id").val();
		$.ajax({
			url: "/foodOption",
			type: "get",
			data: {foodId : foodId}
		})
		.done(function(result){
			foodModalHtml(result);
				
			if(result.length == 0) {
					$("#option").hide();
				} else {
					$("#option").show();
				}
		})
		.fail(function(){
			swal("에러가 발생했습니다");
			food.hide();
		}) // ajax
		
		
		const addCartModal = $(".food_modal");
		const foodImg = $(this).find(".food_img").val();
		const foodName = $(this).find(".food_name").val();
		let foodPrice = Number($(this).find(".food_price").val());
		const foodDec = $(this).find(".food_dec").val();
		const amount = $("#amount").val();
		const totalPrice = amount * foodPrice;

		$(".menu_img").attr("src", foodImg);
		$(".menu_name").text(foodName);
		$(".menu_dec").text(foodDec);
		$(".price").text(Number(foodPrice).toLocaleString() + '원');
		$(".total_price").text(Number(totalPrice).toLocaleString() + '원');
		
		$(".add_cart_food_name").val(foodName);
		$(".add_cart_food_price").val(foodPrice);
		$(".add_cart_food_id").val(foodId);

		openModal(addCartModal);
		




		// 수량 증가 감소
		$(".minus").off().click(function() {
			if (1 < Number($("#amount").val())) {
				$("#amount").val(Number($("#amount").val()) - 1);
			}
			const amount = Number($("#amount").val());
			const totalPrice = amount * foodPrice;
			$(".total_price").text(Number(totalPrice).toLocaleString() + '원');
		})
		
		$(".plus").off().click(function() {
			$("#amount").val(Number($("#amount").val()) + 1);
			const amount = $("#amount").val();
			const totalPrice = amount * foodPrice;
			$(".total_price").text(Number(totalPrice).toLocaleString() + '원');
		})
		
		
		// 옵션 체크박스 변경
		$(document).off().on("click" , ".option_box i", function(){
			const optionPrice = Number($(this).siblings(".option_price").val());
			
			if($(this).siblings(".menu_option").is(":checked")) {
				$(this).siblings(".menu_option").prop("checked" ,false);
				$(this).css("color" , "#ddd");
				
				foodPrice -= optionPrice; 
				
			} else {
				$(this).siblings(".menu_option").prop("checked" , true);
				$(this).css("color" , "#30DAD9");
				
				foodPrice += optionPrice; 
			}
			
			const amount = Number($("#amount").val());
			const totalPrice = amount * foodPrice;
			$(".total_price").text(Number(totalPrice).toLocaleString() + '원');
		})
		
	}) // 메뉴 클릭
	
	
	
	
	
	
	// 장바구니 담기
	$(".add_cart").click(function(){
		const cartStoreId = cart.getCartStoreId();
		if(cartStoreId != null && storeId != cartStoreId ) {
			swal({
				buttons: ["취소", "담기"],
				title: "장바구니에는 같은 가게의 메뉴만 담을 수 있습니다",
				text: "선택하신 메뉴를 장바구니에 담을 경우 이전에 담은 메뉴가 삭제됩니다"
			})
			.then((value) => {
				if (value == true) {
					deleteCartAll();
					addCart($(this));
				}
			});			
		} else {
			addCart($(this));
		}
	}) // 장바구니 담기
	
	
	
	
	// 장바구니 전부 삭제
	$("#cart i").click(function(){
		deleteCartAll();
	})	

	// 리뷰탭 그래프
	const reviewCount = $(".store_review_count").data("review_count");
	
	if(reviewCount != 0) {
		for(var i=1;i<=5;i++) {
			const target = $(".graph.score"+i)
			const score = target.data("score"+i) / reviewCount * 100;
			target.css("background","gold").css("width", score+"%");
		}
	}
	
	
	
	function foodModalHtml(result) {
		let html = "";
			
		for(var i=0;i<result.length;i++) {
			html += `<li>
                <div class="option_box">
                	<span>
            			<i class="fas fa-check-square"></i>
     	 				<input type="checkbox" class="menu_option" name="option" value="${result[i]["optionName"] }"> ${result[i]["optionName"] }
        				<input type="hidden" class="option_price" value="${result[i]["optionPrice"] }">
            			<input type="hidden" class="option_id" value="${result[i]["id"] }">
         	 		</span>
        			<span>${result[i]["optionPrice"] } 원</span>
            	</div>
          	</li>`;
		}
			
		$("#option ul").html(html);
	}
	
	
	function addCart(addCart){
		// 선택한 추가옵션 배열에 저장
		const foodOptionName = [];
		const foodOptionPrice = [];
		const foodOptionId = [];
			
		// 선택된 추가옵션 가져오기 
		$("input[name='option']:checked").each(function() {
			const optionName = $(this).val();
			const optionId = $(this).siblings(".option_id").val();
			const optionPrice = $(this).siblings(".option_price").val();  
			
			foodOptionName.push(optionName);
			foodOptionId.push(optionId);
			foodOptionPrice.push(optionPrice);
		})
		
		const data = {
			foodId : addCart.siblings(".add_cart_food_id").val(),
			foodName : addCart.siblings(".add_cart_food_name").val(),
			foodPrice : addCart.siblings(".add_cart_food_price").val(),
			amount : addCart.parent().siblings(".modal_box").find("#amount").val(),
			optionName : foodOptionName,
			optionId : foodOptionId,
			optionPrice : foodOptionPrice,
			deleveryTip : deleveryTip,
			storeId : storeId, 
			storeName : storeName
		}
		
		$.ajax({
			url: "/addCart",
			type: "post",
			data : data,
			traditional : true
		})
		.done(function(result){
			cartList(result);
			
			alarm();	
			closeModal();
			$("#amount").val(1);
			
			// 밖에 있으니 작동이 안되서 추가
			$(document).on("click", ".cancle_btn", function() {
				const index = $(this).parent().index();
				deleteCartOne(index);
			}); // 장바구니 1개 삭제
			
		}) // done
		.fail(function(){
			swal("에러가 발생했습니다");
		}) // ajax
	} // addCart
	
	
	
	function alarm(text) {
		$(".alarm").text(text);
		
		$(".alarm").show();
		setTimeout(function(){
			$(".alarm").hide();
		},1000);
	}
			
	
	// 장바구니 1개 삭제
	$(document).on("click", ".cancle_btn", function() {
		const index = $(this).parent().index();
		deleteCartOne(index);
	}); 
	
	
	// 장바구니 1개 삭제
	function deleteCartOne(index){
		$.ajax({
			url: "/cartOne",
			type: "DELETE",
			data: {index : index}
		})
		.done(function(result){
			if(result == "") {
				cartReset();
				return;
			}
			cartList(result);
			$(".m_cart_count").css("display" , "block");
			$(".m_cart_count").text(result.cart.length);
		})
		.fail(function(){
			swal("에러가 발생했습니다");
		})
	}
	

	function deleteCartAll(){
		$.ajax({
			url: "/cartAll",
			type: "DELETE"
		})
		.done(function(){
			cartReset();
		})
		.fail(function(){
			swal("에러가 발생했습니다");
		})
	}


	function cartList(result){
		const cartList = result.cart;
		const storeId = result.storeId;
		const storeName = result.storeName;
		const cartTotal = result.cartTotal;
		
		cart.setCartSize(cart.length);
		
		let html = "";
			
		for(var i=0;i<cartList.length;i++) {
			let optionHtml = "";
			if(cartList[i].optionName != null ) {
				for(var j=0;j<cartList[i].optionName.length;j++) {
					const optionName = cartList[i].optionName[j];
					const optionPrice = Number(cartList[i].optionPrice[j]).toLocaleString();
					
					optionHtml += `<div class="cart_menu_option"> ${optionName }  ${optionPrice }원</div>`;
				}
			}
			
			html += `<li> 
						<h3>${cartList[i].foodName  }</h3>
						<div>${cartList[i].foodPrice.toLocaleString()}원</div>
						<div>수량 : ${cartList[i].amount }</div>
						<div>${optionHtml} </div>
						<div>합계 : ${cartList[i].totalPrice.toLocaleString() }원</div>
						<button class="cancle_btn"> ${"ｘ"} </button>
					</li>`; 
					 // 장바구니 추가하면 장바구니 리스트 변경
			
			
		}
		cart.setMenuTotalPrice(cartTotal);
		cart.setCartStoreId(storeId );
		
		$(".cart ul").html(html);
		$(".total").html("총 합계 : " + cartTotal.toLocaleString() + "원");
		$(".m_cart_count").css("display" , "block");
		$(".m_cart_count").text(cartList.length);
		console.log(cartList);
		console.log("장바구니 가게 id " + storeId);
		
		minDeleveryCheck();
	}	



	// 주문금액이 최소주문금액 이상이어야 주문가능
	function minDeleveryCheck() {
		const menuTotalPrice = cart.getMenuTotalPrice();
		
		if(minDelevery <= menuTotalPrice) {
			$(".order_btn").attr("disabled", false); 
			$(".order_btn").css("background", "#30DAD9");
			$(".order_btn").text("주문하기");
		} else {
			$(".order_btn").css("background", "#ddd");
			$(".order_btn").attr("disabled", true); 
			$(".order_btn").text(minDelevery + "원 이상 주문할 수 있습니다");
		}
	}


	// css로 display none시 카카오 맵 깨짐
	$("main ul.info").hide();
	// 탭 눌렀을때 색변경 콘텐츠 변경
	$("ul.tab > li").click(function() {

		const index = $(this).index() + 1;

		$("ul.tab > li").removeClass("select");
		$(this).addClass("select");

		$("main  ul").eq(1).hide();
		$("main  ul").eq(2).hide();
		$("main  ul").eq(3).hide();
		$("main  ul").eq(index).show();

		const offset = $(".offset").offset();
		const scrollPosition = $(document).scrollTop();

		if (offset["top"] < scrollPosition) {
			$("html").animate({ scrollTop: offset.top }, 100);
		}

	});





	function cartReset() {
		$(".cart ul").html("");
		$(".total").html("장바구니가 비었습니다.");
		$(".order_btn").css("background", "#ddd");
		$(".order_btn").attr("disabled", true); 
		$(".order_btn").text("주문하기");
		$(".m_cart_count").css("display" , "none");
		$(".m_cart_count").text("");
		
		cart.setCartSize(0);
		cart.setMenuTotalPrice(0);
	};
	
	
	
	
	// 주문하기
	$(".order_btn").click(function() {
		location.href = "/order";
	});
	// 모바일 주문하기
	$(".m_cart_img_box").click(function() {
		
		if(cart.getCartSize() == 0 ){
			alarm("메뉴를 추가해주세요");
			return;
		}
		location.href = "/order";
	});
	
	



});