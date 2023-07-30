$(document).ready(function(){

const pathArr = location.pathname.split("/");
const storeId = pathArr[pathArr.length-1];

$(".move_top").click(function(){
	$("html").animate({ scrollTop: 0 }, 200);
})
	

function errMsg(status){
	if(status.status == 401) {
		alert("권한이 없습니다");
	} else {
		alert("에러");
	}
}

const listInfo = (function(){
	const listArr = ["주문접수 대기 중", "배달 준비 중", "완료"];
	let nowList = listArr[0];
	let page = 1;
	let runNextPage = false; // false일때만 다음페이지 불러올수있다
	let waitCount = 0;
	let procCount = 0;
	let orderList = [];
	let cartList = [];
	
	const getNowList = function(){
		return nowList;
	}
	const setNowList = function(set){
		nowList = listArr[set];
	}
	const resetPage = function(){
		page = 1;
	}
	const nextPage = function(){
		page++;
	}
	const nowPage = function(){
		return page;
	}
	const getRunNextPage = function(){
		return runNextPage;
	}
	const setRunNextPage = function(set){
		runNextPage = set;
	}
	const setWaitCount = function(set){
		waitCount = set;
	} 
	const getWaitcount = function() {
		return waitCount;
	}
	const setProcCount = function(set){
		procCount = set;	
	}
	const getProcCount = function(){
		return procCount;
	}
	const getOrderList = function(index){
		return orderList[index];
	}
	const setOrderList = function(set){
		orderList = set;
	}
	const concatOrderList = function(set){
		orderList = orderList.concat(set);
	}
	const getCartList = function(index){
		return cartList[index];
	}
	const setCartList = function(set){
		cartList = set;
	}
	const concatCartList = function(set){
		cartList = cartList.concat(set);
	}
	const resetList = function(){
		cartList = [];
		orderList = [];
	}
	
	return {
		getNowList : getNowList,
		setNowList : setNowList,
		resetPage : resetPage,
		nextPage : nextPage,
		nowPage : nowPage,
		getRunNextPage : getRunNextPage,
		setRunNextPage : setRunNextPage,
		setWaitCount : setWaitCount,
		getWaitcount : getWaitcount,
		setProcCount : setProcCount,
		getProcCount : getProcCount,
		getOrderList : getOrderList,
		setOrderList : setOrderList,
		getCartList : getCartList,
		setCartList : setCartList,
		concatOrderList : concatOrderList,
		concatCartList : concatCartList,
		resetList : resetList
	}
})();



function updateCount(){
	const waitCount = listInfo.getWaitcount() - 1;
	const procCount = listInfo.getProcCount() + 1;
	$(".wait_count").text(waitCount);
	$(".processing_count").text(procCount);
	listInfo.setWaitCount(waitCount);
	listInfo.setProcCount(procCount);
}



function completeCount(){
	const procCount = listInfo.getProcCount() - 1;
	$(".processing_count").text(procCount);
	listInfo.setProcCount(procCount);
}



function closeModal() {
	$("#modal_bg").hide();
	$(".modal").css("top", "100%");
	$(".modal_box").scrollTop(0);
	$("body").css("overflow", "visible");
	$("input[type='checkBox']").prop("checked", false);
	
	$(".delevery_timer_modal li").removeClass("select");
	$(".delevery_timer_modal section li[data-time=30]").addClass("select");
	$(".order_cancle_modal li").removeClass("select");
};





function htmlWrite(result){
	let html = "";
	for(var i=0;i<result.cartList.length;i++) {
		const orderList = result.orderList[i];
		const cartList = result.cartList[i];
		
		let foodInfo = [];
		for(var j=0;j<cartList.length;j++) {
			foodInfo.push(foodHtml(cartList[j]));	
		}
		
		let btnValue = "";
		let btnClass = "";
		if(listInfo.getNowList() == '주문접수 대기 중') {
			btnValue = "주문 접수";
			btnClass = "order_accept";
		} else {
			btnValue = "완료";
			btnClass = "complete";
		}
		
		html += 
			`<li class="order_box">
				<div class="time">
	    			<div>${moment(orderList.orderDate ).format("MM월 DD일")}</div>
	    			<div>${moment(orderList.orderDate ).format("HH시 mm분")}</div>
	    		</div>
   	
	    		<div class="info">
              		<div style="font-weight: bold;">
               			<span>
              				<span>[메뉴  ${cartList.length }개] ${orderList.totalPrice }원</span> 
              				<span class="payMethod"> ${orderList.payMethod }</span>
            			</span>
           			</div>
                        		
               		<div>${foodInfo } </div>
               		<div>${orderList.deleveryAddress2 }</div>
               		
               		<div>${orderList.storeName }</div> 
	            </div>     	
	            		
                <div class="button_box">
                 	<input type="button" value="${btnValue}" class="${btnClass} btn">
                 </div>
			</li>`;
	}
	return html;
}



function foodHtml(cart){
	let food = cart.foodName;
	
	let option = [];
	if(cart.optionName != null) {
		for(var i=0;i<cart.optionName.length;i++) {
			option.push(cart.optionName[i]);
		}	
	}
	
	if(option != "") {
		option = '[' + option + ']';
	}
	
	return food + option;
}




function orderList(){
	const page = listInfo.nowPage();
	const list = listInfo.getNowList();
	listInfo.setRunNextPage(true);
	
	$.ajax({
		url: "/admin/management/orderList",
		type: "get",
		data: {
			storeId : storeId,
			list : list,
			page : page
		}	
	})
	.done(function(result){
		console.log(result);
		
		const count1 = result.orderList[0].count1;
		const count2 = result.orderList[0].count2;
		
		listInfo.setWaitCount(count1);
		listInfo.setProcCount(count2);
		$(".wait_count").text(count1);
		$(".processing_count").text(count2);
			
			
		const html = htmlWrite(result, list);
		if(page == 1) {
			$(".order_list").html(html);	
			listInfo.setCartList(result.cartList);
			listInfo.setOrderList(result.orderList);
		} else {
			$(".order_list").append(html);
			listInfo.concatCartList(result.cartList);
			listInfo.concatOrderList(result.orderList);
		}
		console.log("orderNum = ")
		console.log(result.orderList[0].orderNum);
		
		if(result.orderList[0].orderNum != null) {
			listInfo.setRunNextPage(false);
		} 
		
	})
	.fail(function(){
		alert("에러가 발생했습니다");
	})	 
}	




// 주문 완료 메세지 받기
/*const socket = new SockJS('/websocket');
const stompClient = Stomp.over(socket);

stompClient.connect({}, function() {

	stompClient.subscribe('/topic/order-complete', function(message) {
		// 화면에 출력중인 view 갯수 
		const list = $(".order_list li").length;
		
		if(list < 10) {
			orderList();
		}
	});
});
*/



$(".aside_tab li").click(function(){
	$(".order_list").html("");
	$(".aside_tab li").removeClass("active");
	$(this).addClass("active");
	
	const index = $(this).index();
	listInfo.setNowList(index);
	listInfo.resetPage();
	listInfo.setRunNextPage(false);
	
	orderList();
})




$(window).scroll(function(){
	const winHeight = $(window).height();
	const docHeight = $(document).height();
	const top = $(window).scrollTop();
	if(docHeight <= winHeight + top + 10 ) {
		if(!listInfo.getRunNextPage()) {
			listInfo.nextPage();
			orderList();
		}
	} 
}) // scroll


orderList();







	
$(document).on("click", ".order_accept", function(){
	const modal = $(".order_accept_modal");
	const orderIndex = $(this).parents("li").index();
	console.log("orderIndex = " + orderIndex);
	
	const orderInfo = listInfo.getOrderList(orderIndex);
	const foodInfo = listInfo.getCartList(orderIndex);
	
	const orderNum = orderInfo.orderNum;
	const userId = orderInfo.userId;
	const deleveryAddress2 = orderInfo.deleveryAddress2;
	const deleveryAddress3 = orderInfo.deleveryAddress3 ? orderInfo.deleveryAddress3 : "";
	const request = orderInfo.request ? orderInfo.request : ""; 
	const phone = orderInfo.phone;
	
	
	let food = "";
	for(i=0;i<foodInfo.length;i++) {
		food += `<li>${ foodHtml(foodInfo[i]) }  ${ foodInfo[i].amount }개</li>`
	}
	
	
	const addressHtml = `<div>${deleveryAddress2}</div>
                    	<div>${deleveryAddress3}</div>
                    	<div>${phone}</div>`
                  	
	
	modal.find(".delevery_address").html(addressHtml);
	modal.find(".request > div").text(request);
	modal.find(".menu ul").html(food);
	
	openModal(modal);
	
	
	 
	// 배달시간 설정 모달
	$(".delevery_timer_btn").off().click(function(){
		openModal($(".delevery_timer_modal"));
	})
 		
	// 시간 설정	
	$(".delevery_timer_modal li").off().click(function(){
		$(".delevery_timer_modal li").removeClass("select");
		$(this).addClass("select");
	})
		
	// 주문수락 완료	
	$(".accept").off().click(function(){
		const time = $(".delevery_timer_modal .select").data("time");
		
		if(!time) {
			swal("시간을설정해주세요");
			return;
		}
		
		const data = {
			orderNum : orderNum,
			time : time,
			userId : userId
		}
		
		$.ajax({
			url: "/admin/orderAccept",
			data: data,
			type: "PATCH"
		})
		.done(function(){
			$(".delevery_timer_modal li").removeClass("select");
			$(".delevery_timer_modal section li[data-time=30]").addClass("select");
			updateCount();
			orderList();
			swal("주문접수완료");
			closeModal();
		})
		.fail(function(){
			swal("실패");
		})
		
	})
	
	
	// 주문 거부하기
	$(".order_cancle_btn").off().click(function(){
		openModal($(".order_cancle_modal"));
		
		let cancleReason = "";
		
		// 거부사유 선택
		$(".order_cancle_modal li").off().click(function(){
			$(".order_cancle_modal li").removeClass("select");
			$(this).addClass("select");
			cancleReason = $(this).data("reason");
		})



			
		// 거부하기
		$(".order_cancle").off().click(function(){
			const impUid = orderInfo.impUid;
			const totalPrice = orderInfo.totalPrice;
			const usedPoint = orderInfo.usedPoint;
			const deleveryTip = orderInfo.deleveryTip;
			
			if(!cancleReason) {
				swal('주문거부 사유를 선택해주세요');
				return;
			}
			
			const data = {
				orderNum : orderNum,
				cancleReason : cancleReason,
				userId : userId,
				impUid : impUid,
				totalPrice : totalPrice,
				usedPoint : usedPoint,
				deleveryTip : deleveryTip
			}
			
			$.ajax({
				url: "/admin/orderCancle",
				type: "PATCH",
				data: data
			})
			.done(function(){
				orderList(); 
				updateCount();
				swal("취소완료");
				// 결제 취소하기
				
				closeModal();
				
			})
			.fail(function(){
				swal("실패");
			})
		})
	})
})



	

// 배달 완료	
$(document).on("click", ".complete", function(){
	const orderIndex = $(this).parents("li").index();
	const orderInfo = listInfo.getOrderList(orderIndex);
	const orderNum = orderInfo.orderNum;
	const userId =  orderInfo.userId;
	const data = {
		userId : userId,
		orderNum : orderNum
	}
	
	swal("배달 완료후 눌러주세요", {
		  buttons: ["취소", "완료"],
	})
	.then(function(value){
		if(!value) {
			return;
		}
		$.ajax({
			url: "/admin/orderComplete",
			type: "PATCH",
			data: data
		})
		.done(function(result){
			orderList();
			completeCount();
		})
		.error(function(){
			swal("에러");
		})
	}) 
})
	
	
	
})