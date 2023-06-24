<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fm" uri="http://java.sun.com/jsp/jstl/fmt" %>  
 <div id="wrap">
    <nav>
    	<c:set var="info" value="${store.storeInfo }" />
        <h1 id="store_name" data-store_name="${info.storeName }" >${info.storeName }</h1>
        <div id="is_open" data-is_open="${store.storeInfo.isOpen }"></div>
		<div class="inf">
			<div>
				
				<span class="score_box">
             		<c:forEach begin="0" end="4" var="i">
             			<c:choose>
	           				<c:when test="${Math.round(info.score) > i }">
		                   		<i class="far fas fa-star"></i>
		                   	</c:when>
		                   	<c:otherwise>
		                   		<i class="far fa-star"></i>
		                   	</c:otherwise>
             			</c:choose> 
             		</c:forEach>
                  		
                  	<span class="store_score" data-score="${info.score }">${info.score }</span>
                  	
				</span><br>
                   
           		<c:choose>
				    <c:when test="${info.isLikes == 1 || isLikes }">
				        <span><i class="fas fa-heart" ></i> 찜 </span>
				    </c:when>
				    
				    <c:otherwise>
				        <span><i class="far fa-heart" ></i> 찜 </span>
				    </c:otherwise>
				</c:choose>  	
				    
				<span class="likes_count" data-count=${info.likesCount } >${info.likesCount }</span>

                  
			</div>
               	<div>
               		<span class="store_review_count" data-review_count="${info.reviewCount }"> 리뷰 ${info.reviewCount }</span>
               		<span>사장님 댓글 ${info.bossCommentCount }</span>
            	</div>
                
               	<div id="min_delevery" data-min_delevery="${info.minDelevery }">최소주문금액 <fm:formatNumber value="${info.minDelevery }" pattern="###,###" />원</div>
               	<div>예상 배달시간 ${info.deleveryTime  }분</div>
               	<div id="delevery_tip" data-delevery_tip="${info.deleveryTip }">배달팁 <fm:formatNumber value="${info.deleveryTip }" pattern="###,###" />원</div>
		</div>
    </nav>


	<!-- 모바일 카트 -->
   	<div class="m_cart_img">
   		<div class="m_cart_img_box">
   			<i class="fas fa-shopping-cart"></i>
   			<span class="m_cart_count"></span>
   		</div>
   	</div>
  	<!-- 모바일 카트 -->
    
    
    
	<!-- 장바구니 -->    
    <aside id="cart">
        <div class="cart">	
            <h2>장바구니</h2>
            <i class="far fa-trash-alt deleteAll" ></i>
            
            <div class="cart_list">
	            <ul>
					<li>
						<h3>메뉴</h3>
  							<div>가격</div>
  							<div>수량 : 0 </div>
  							<div> 옵션  </div>
  							<div>합계 : 0원</div>
  							<button class="cancle_btn"> ｘ </button> 
		            </li>
	            </ul>
            </div>
            
            <div class="order_btn_box">
            	<div class="total">장바구니가 비었습니다.</div>
	            <button class="order_btn" disabled>주문하기</button>
            </div>
        </div>
        
    </aside>
    <div class="alarm">장바구니에 담았습니다</div>
	<!-- 장바구니 -->    
	   

	<main>
		<div class="offset"></div>
        <ul class="tab ">
            <li class="select">메뉴</li>
            <li>정보</li>
            <li>리뷰</li>
        </ul>
	
			
		<!-- 메뉴 탭 -->	
        <ul class="menu">
        	<c:forEach items="${store.foodList }" var="foodList" >
	            <li>
		            <c:if test="${adminPage && SPRING_SECURITY_CONTEXT.authentication.principal.user.role == 'ROLE_ADMIN' }">
		                <label class="menu_delete_label">
		                	<i class="fas fa-check-square" ></i>
		                	<input type="checkbox" class="menu_delete_checkbox" name="deleteNumber" value="${foodList.id }">
	                	</label>
	                </c:if>
	                
	                <div class="menu_box">
	                    <div>
							<h2>${foodList.foodName } </h2>
		                    
   		                    <fm:formatNumber value="${foodList.foodPrice }" pattern="###,###" />원 
		                    <input type="hidden" value="${foodList.storeId }" name="storeId" >
				            <input type="hidden" value="${foodList.id }" name="foodId" class="food_id"   >
				            <input type="hidden" value="${foodList.foodName }" name="foodName" class="food_name" >
				            <input type="hidden" value="${foodList.foodPrice }" name="foodPrice" class="food_price"   >
				            <input type="hidden" value="${foodList.foodDec }" name="foodDec" class="food_dec"   >
				            <input type="hidden" value="${foodList.foodImg }" name="foodImg" class="food_img"   >
				            <input type="hidden" value="${foodList.foodThumb }" name="foodThumb" class="food_thumb"   >
		                </div>
		                
                    	<div><img src="${foodList.foodImg }" alt="이미지"></div>
                    </div>
	             </li>
	        </c:forEach>
        </ul>
		<!-- 메뉴 탭 -->	
		
		
		<!-- 정보 탭 -->
	    <ul class="info" >
	    	<li>
	    		<div>
			        <h2>찾아 오시는 길</h2>
			        
			        <div id="map_box">
			            <div id="map"></div>
			            
			            <div id="position_box">
			                <button class="storePosition" ><i class="far fa-dot-circle"></i> 가게 위치로</button>
			                <button class="userPosition"> <i class="far fa-dot-circle"></i> 내 위치로</button>
			            </div>
			        </div>
			        
			        <h2>위치안내</h2>
			        <div id="store_address" data-address="${info.storeAddress2 }">${info.storeAddress2 }  ${info.storeAddress3 }</div>
			    </div>
			</li>
			 
			<li>
			    <div>
			       <h2>가게 소개</h2>
			       <div>${info.storeDes }</div>
			   </div>
			</li>
			 
			<li>
			    <div>
			        <h2>영업 정보</h2>
			        
			        <div class="info_detail_title">
			            <div>상호명</div>
			            <div>영업시간</div>
			            <div>전화번호</div>
			            
			        </div>
			        
			        <div class="info_detail">
			            <div>${info.storeName }</div>
			            <div>
			                <span><fm:formatNumber value="${info.openingTime }" minIntegerDigits="2" />시 ~</span>
			                <span><fm:formatNumber value="${info.closingTime }" minIntegerDigits="2" />시 </span>
			            </div>
			            <div>${info.storePhone }</div>
			            
			        </div>
			    </div>
			</li>
			 
			<li>
			    <div>
			        <h2>가계 통계</h2>
			        <div class="info_detail_title">
			            <div>최근 주문수</div>
			            <div>전체 리뷰 수</div>
			            <div>찜</div>
			        </div>
			        
			        <div class="info_detail">
			            <%-- 
			            <div>${info.orderCount }</div>
			            <div>${info.reviewCount }</div>
			            <div>${info.likesCount }</div> 
			            --%>
			        </div>
			    </div>
	    	</li>
	    
	    
	       
	    </ul>
		<!-- 메뉴 탭 -->    
	
		
		
		<!-- 리뷰 탭 -->        
		<ul class="comment" >
	    	<li>
			    <div class="score_info">
			        <div>
			            <div class="score">${info.score }</div>
			                   
			            <div>
			                <c:forEach begin="0" end="4" var="i">
			                     <c:choose>
			                           <c:when test="${Math.round(info.score) > i }">
			                               <i class="far fas fa-star"></i>
			                           </c:when>
			                           <c:otherwise>
			                               <i class="far fa-star"></i>
			                           </c:otherwise>
			                     </c:choose>
			                </c:forEach>
			            </div>
			        </div>
			            
			        <div class="score_count">
			            <div> 
			                <div>5점</div>
			                
			                <div class="graph_box">
			                    <div class="graph_background"></div>
			                    <div class="graph score5" data-score5="${info.score5 }"></div>
			                </div>
			                
			                <div class="review_count">${info.score5 }</div>
			            </div>
			            
			            <div> 
			                <div>4점</div>
			                <div class="graph_box">
			                    <div class="graph_background"></div>
			                    <div class="graph score4" data-score4="${info.score4 }"></div>
			                </div>
			                <div class="review_count">${info.score4 }</div>
			            </div>
			                
			            <div> 
			                <div>3점</div>
			                <div class="graph_box">
			                    <div class="graph_background"></div>
			                    <div class="graph score3" data-score3="${info.score3 }"></div>
			                </div>
			                <div class="review_count">${info.score3 }</div>
			            </div>
			            
			            <div> 
			                <div>2점</div>
			                <div class="graph_box">
			                    <div class="graph_background"></div>
			                    <div class="graph score2" data-score2="${info.score2 }"></div>
			                </div>
			                <div class="review_count">${info.score2 }</div>
			            </div>
			            
			            <div> 
			                <div>1점</div>
			                <div class="graph_box">
			                    <div class="graph_background"></div>
			                    <div class="graph score1" data-score1="${info.score1 }"></div>
			                </div>
			                <div class="review_count">${info.score1 }</div>
			            </div>
			        </div>
			    
			    </div>
			</li>
			 
			 
			 
			<c:forEach items="${store.reviewList }" var="reviewList">
			<li>
			    <div class="client">
			        
			        <div class="review_header">
			            <div>
			                <div class="nickname">${reviewList.nickname }</div>
			                <div>
			                    
			                    <c:forEach begin="0" end="4" var="i">
			                        <c:choose>
			                               <c:when test="${Math.round(reviewList.score) > i }">
			                                   <i class="far fas fa-star"></i>
			                               </c:when>
			                               <c:otherwise>
			                                   <i class="far fa-star"></i>
			                               </c:otherwise>
			                         </c:choose>
			                    </c:forEach>
			                    
			                    <span><fm:formatDate value="${reviewList.regiDate }" pattern="yyyy-MM-dd" /> </span>
			                </div>
			            </div>
			        </div> 
			            
			        <div>
			            <c:if test="${!empty reviewList.reviewImg }">
			                <div><img src="${reviewList.reviewImg }" alt="이미지" class="review_img"></div>
			            </c:if>
			            <div>${reviewList.reviewContent } </div>
			        </div>
			    </div>
			    
			    
			    <div class="boss">
			        <c:if test="${!empty reviewList.bossComment }">	
			            <div class="boss_comment_box">
			                <div class="nickname">사장님</div>
			                <div class="boss_comment">${reviewList.bossComment }</div>
			            </div>
			        </c:if>
			    </div>
			    
			    
			     <div class="boss input">
			            <div class="boss_comment_box">
			             <div class="nickname">사장님</div>
			            <div class="boss_comment">
			                <textarea class="comment_area" spellcheck="false"></textarea>
			            </div>
			            
			            <div>
			                <button class="boss_comment_btn reply" >댓글 달기</button>
			                <input type="hidden" value="${reviewList.orderNum }" class="order_num">
			            </div>
			        </div>
			       </div>
			</li>
			</c:forEach>

		</ul>
	</main>
</div>

	
	<input type="hidden" value="${info.id }" id="store_id">
	<input type="hidden" value="${info.category }" id="store_category">  
	<input type="hidden" value="${info.openingTime }" id="store_opening_time"> 
	<input type="hidden" value="${info.closingTime }" id="store_closing_time"> 
	
	<input type="hidden" value="${BMaddress.address2 }" id="delevery_address">
	
	<script>
    $(document).ready(function(){
    	
		var storeAddress = $("#store_address").data("address");
        
    	var storeName = $("#store_name").data("store_name");
    	
    	var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
    	
    	mapOption = {
    	    center: new kakao.maps.LatLng(33.25110701, 126.570667), // 지도의 중심좌표
    	    level: 3 // 지도의 확대 레벨
    	};  
    	
    	// 지도를 생성합니다    
    	var map = new kakao.maps.Map(mapContainer, mapOption); 
    	
    	// 주소-좌표 변환 객체를 생성합니다	
    	var geocoder = new kakao.maps.services.Geocoder();
    	
    	// 주소로 좌표를 검색합니다
    	geocoder.addressSearch(storeAddress, function(result, status) {
    		
    	    // 정상적으로 검색이 완료됐으면 
    	     if (status === kakao.maps.services.Status.OK) {
    	
    	        var coords = new kakao.maps.LatLng(result[0].y, result[0].x);
    	        
    	        // 결과값으로 받은 위치를 마커로 표시합니다
    	        var marker = new kakao.maps.Marker({
    	            map: map,
    	            position: coords
    	        });
    	
    	        // 인포윈도우로 장소에 대한 설명을 표시합니다
    	        var infowindow = new kakao.maps.InfoWindow({
    	            content: '<div style="width:150px;text-align:center;padding:3px 0;">' + storeName + '</div>'
    	        });
    	        infowindow.open(map, marker);
    	
    	        // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
    	        map.setCenter(coords);
    	        
    	        
    	        $(".storePosition").click(function(){
    	        	map.panTo(coords);  
    	        })
    	        
    	        
    	    } 
    			 
    	});    
    	
    	
    	var userAddress = $("#delevery_address").val();
    	
    	if(userAddress != "" ) {
    		$(".userPosition").css("display" , "inline");
    		
    	  // 주소로 좌표를 검색합니다
    	 	geocoder.addressSearch(userAddress, function(result, status) {
    	 		
    	 	    // 정상적으로 검색이 완료됐으면 
    	 	     if (status === kakao.maps.services.Status.OK) {
    	 	
    	 	        coords = new kakao.maps.LatLng(result[0].y, result[0].x);
    	 	        
    	 	        // 결과값으로 받은 위치를 마커로 표시합니다
    	 	        var marker = new kakao.maps.Marker({
    	 	            map: map,
    	 	            position: coords
    	 	        });
    	 	        
    	 	        // 인포윈도우로 장소에 대한 설명을 표시합니다
    	 	        var infowindow = new kakao.maps.InfoWindow({
    	 	            content: '<div style="width:150px;text-align:center;padding:3px 0;">' + "배달받을위치" + '</div>'
    	 	        });
    	 	        infowindow.open(map, marker);
    	 	        
    	 	      	$(".userPosition").click(function(){
    		        	map.panTo(coords);  
    		        })
    	 	    } 
    	 	}); 
    		 
    	}
    	
        })
	</script>
