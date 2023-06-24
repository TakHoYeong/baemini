function menuReset(){
	$(".temp_img_box").show();
	$("main").remove();
	$("section").remove();
}
 
 
function deleteCartOne(index){
	$.ajax({
		url: "/cartOne",
		type: "DELETE",
		data: {index : index}
	})	
	.done(function(result){
		priceModify(result)
	})
	.fail(function(){
		alert("에러가 발생했습니다");
	})
}
 
function deleteCartAll(){
	$.ajax({
		url: "/cartAll",
		type: "DELETE"
	})
	.done(function(){
		menuReset();
	})
	.fail(function(){
		alert("에러가 발생했습니다");
	})
}
 
 
 
function priceModify(cartList){
	if(!cartList) return;
	const total = cartList.cartTotal;
	const deleveryTip = cartList.deleveryTip;
	
	$(".order_price").text("주문금액 : " + total.toLocaleString() + "원");
	$(".total").text((total + deleveryTip).toLocaleString() +  "원 결제하기");
	$("#total").val(total + deleveryTip);
}
 
 
 
 
 
function payment(){
	
	const data = {
		payMethod : $("input[type='radio']:checked").val(),
		orderNum : $("#order_num").val(),
		name : $(".order_info li").eq(0).find(".food_name").text(),
		amount : Number($("#total").val()) - Number($(".point_input").val()),
		phone : $("input[name='phone']").val(),
		request : $("textarea[name='request']").val(),
		usedPoint : $("input[name='usedPoint']").val(),
		deleveryAddress1 : $("#deleveryAddress1").val(),
	 	deleveryAddress2 : $("#deleveryAddress2").val(),
	 	deleveryAddress3 : $("#deleveryAddress3").val(),
	 	totalPrice : $("#total").val()
	}
	
	if(!data.deleveryAddress1 || !data.deleveryAddress2 ) {
		swal('배달 받으실 주소를 입력해 주세요')
		return;
	}
	
	if($(".order_info li").length < 1) {
		return;
	}
	
	if(!data.phone) {
		swal('전화번호를 입력해주세요');
		return;
	}
	
	if(data.payMethod == "현장결제") {
		paymentCash(data);
		return;
	}
	
	paymentCash(data);
}
 
 
 
	
// 현장에서 결제
function paymentCash(data){
	
	$.ajax({
		url: "/order/payment-cash",
        method: "POST",
        data: data,
	})
	.done(function() {
		/*messageSend();*/
			
        swal({
			text: "주문이 완료되었습니다",
			closeOnClickOutside : false
		})
		.then(function(){
			location.replace("/orderList");
		})
		
	}) // done 
    .fail(function() {
		alert("에러");
		location.replace("/");
	}) 
}
 
// 계산 완료
/*function paymentComplete(data) {
	
	 $.ajax({
		url: "/order/payment/complete",
        method: "POST",
        data: data,
	})
	.done(function(result) {
		messageSend();
        swal({
			text: result,
			closeOnClickOutside : false
		})
		.then(function(){
			location.replace("/orderList");
		})
	}) // done 
    .fail(function() {
		alert("에러");
		location.replace("/");
	}) 
}  
*/
 
 
// 관리자 페이지로 주문요청 메세지
/*function messageSend() {
	let socket = new SockJS('/websocket');
 
	let stompClient = Stomp.over(socket);
 
	stompClient.connect({}, function() {
		const message = {
			message : "새 주문이 들어왔습니다"
		}
		stompClient.send("/message/order-complete-message", {}, JSON.stringify(message));
		stompClient.disconnect();
	});
}*/
 
 
 
	
if($("#user_id").val() != ""){
 
	$(".point_click").click(function(){
		$(".point_input_box").fadeToggle(200);
	});
	
	$(".use_point").click(function(){
		
		const point = Number($(".point_input").val());
		/*const deleveryTip = Number($("#delevery_tip").val());*/
		const total = Number($("#total").val());
		
		if(point != 0) {
			$(".total").html("");
			const html = (total - point).toLocaleString() +"원 결제하기";
			$(".total").html(html);
			
			$(".point_dis").show();
			$(".point_dis").html("포인트 할인 -" + point.toLocaleString() + "원");
		}
	});
	
	
	
	
 	$(".point_input").focusout(function(){
 		const total = Number($("#total").val());
		const userPoint = Number($("#point").val());
		const deleveryTip = Number($("#delevery_tip").val());
		
		if($(this).val() > userPoint)
			$(this).val(userPoint);
		if($(this).val() > total-deleveryTip)
			$(this).val(total-deleveryTip);
		if($(this).val() < 0)
			$(this).val(null);
	});
	
} else {
	 swal("", {
		  buttons: ["비회원으로 주문하기", "로그인"],
		})
		.then((value) => {
			 if(value == true) {
				 location.href = "/login";
			 }
		});
	
	
	 $(".point_area .point").css("border" , "1px solid #ddd"); 
	 $(".point_area .point").css("cursor" , "default"); 
	 $(".point_area span").css("color" , "#ddd"); 
	 $(".point_area span").css("cursor" , "default"); 
 
}			
	
	
if(!$("input[name='phone']").val()) {
	$("input[name='phone']").attr("readonly", false);
}
	
	
	
	
$(".order_btn").click(function(){
	payment();
})
	
	
	    
	       
 
 
// 메뉴 1개 삭제
$(".order_info li .delete").click(function(){
	const index = $(this).parents("li").index();
	deleteCartOne(index);
	
	if($(".order_info li").length > 1) {
		$(".order_info li").eq(index).remove();
	} else {
		menuReset();
	}
	
})
 
//메뉴 전체삭제
$(".order_info .delete_all").click(function(){
	deleteCartAll();
})
 
	
 
 
$(".amount_box button").click(function(){
	const amount = $(this).siblings(".amount_text");
	const index = $(this).parents("li").index();
	let foodPrice = $(this).parent().siblings(".sum");
	let clickBtn = "";
	
	console.log(index);
	if($(this).hasClass("plus")){
		clickBtn = "plus";
	} else {
		if(amount.val() <= 1) {
			return;
		}
		clickBtn = "minus";
	}
	$.ajax({
		url : "/cartAmount",
	    type : "PATCH",
	    data : {cartNum : index, clickBtn : clickBtn }
	})
	.done(function(result){
		const cart = result.cart[index];
		foodPrice.text(cart.totalPrice.toLocaleString() + "원");
    	amount.val(cart.amount);
    	priceModify(result);
	})
	.fail(function(){
		alert("다시 시도해주세요");
	})
})