$(document).ready(function() {
	const category = $(".category").data("category");
	const address1 = $(".address1").val();
	
	let sort = "기본순";
	$(".option li[data-sort='기본순']").addClass("active");

	$("li[data-category = '" + category + "'] > span").css("border-bottom", "3px solid #333333");
	$("li[data-category = '" + category + "'] > span").css("color", "#333333");

	let winHeight = 0;
	let docHeight = 0;
	let page = 1;
	let run = false;
	
	$(window).scroll(function(){
		winHeight = $(window).height();
		docHeight = $(document).height();
		
		const top = $(window).scrollTop();
		
		if(docHeight <= winHeight + top + 10 ) {
			if(run) {
				return;
			}
			console.log("페이지 추가");
			console.log("sort= " + sort);
			
			page++;
			run = true;
			
			const data = {
				category : category,
				address1 : address1,
				sort : sort,
				page : page
			}
			
			$.ajax({
				url: "/store/storeList",
				type: "GET",
				data : data
			})
			.done(function(result){
				const storeHtml = storeList(result);
				
				$(".store").append(storeHtml);
				
				if(storeHtml != "") {
					run = false;
				}
			})
			.fail(function(data, textStatus, errorThrown){
				swal("다시 시도해주세요");
			})	
		} // if
	}) // scroll
	
	

// 가게 정렬 
$(".option li").click(function() {
	sort = $(this).data("sort");
	page = 1;
	
	$(".option li").removeClass("active");
	$(this).addClass("active");
	
	const data = {
				category : category,
				address1 : address1,
				sort : sort,
				page : page
			}
			
	$.ajax({
		url: "/store/storeList",
		type: "get",
		data: data
	})
	.done(function(result, textStatus, xhr){
		// 페이지 초기화
		run = false;
		const storeHtml = storeList(result);
		$(".box ul.store").html(storeHtml);
		
	})
	.fail(function(data, textStatus, errorThrown){
		swal("다시 시도해주세요");
	})
}); // function




function storeList(result){
	console.log("sort = " + sort);
	let html = "";
		for(var i=0;i<result.length;i++) {
			const store = result[i];
			
			const id = store.id;
			
			const storeImg = store.storeImg;
			const storeThumb = store.storeThumb;
			const storeName = store.storeName;
			const deleveryTime = store.deleveryTime;
			const minDelevery = store.minDelevery.toLocaleString();
			const deleveryTip = store.deleveryTip.toLocaleString();
			const score = store.score.toFixed(1);
			const reviewCount = store.reviewCount;
			const bossCommentCount = store.bossCommentCount;
			const openingTime = store.openingTime;
			const closingTime = store.closingTime;
			
			let scoreHtml = "";
			for(var j=0;j<5;j++) {
				if(Math.round(score)  > j) {
					scoreHtml += "<i class='fas fa-star'></i> ";
				} else {
					scoreHtml += "<i class='far fa-star'></i> ";
				}
			}
			let isOpenHtml = "";
			if(store.isOpen == "false") {
				isOpenHtml = `<div class="is_open">
								<a href="/store/detail/${id }">지금은 준비중입니다</a>
							</div>`;
			}
			
			
			html += 
			`<li>
				<div class="img_box">
					<a href="/store/detail/${id }"><img src="${storeImg }" alt="이미지"/></a>
				</div>
				<div class="info_box">
					<h2><a href="/store/detail/${id }">${storeName }</a></h2>
					<a href="/store/detail/${id }">
						<span>
							<span>평점 ${score }</span>
							<span class="score_box">
								${scoreHtml}
							</span>
						</span>
						
						<span>
							<span>리뷰 ${reviewCount }</span>
							<span>사장님 댓글 ${bossCommentCount }</span>
						</span>
						
						<span>
							<span>최소주문금액 ${minDelevery }원</span>
							<span>배달팁 ${deleveryTip }원</span>
						</span>
						<span>배달시간 ${deleveryTime }분</span>
					</a>
				</div>
        	${isOpenHtml}
        </li>`;
		}
	return html;	
}

});

