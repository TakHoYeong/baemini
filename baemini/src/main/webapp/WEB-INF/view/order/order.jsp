<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/view/include/link.jsp" %>
<!-- <link rel="stylesheet" href="/css/layout/nav.css"> -->
<link rel="stylesheet" href="/css/order/order.css">
 
<%@ include file="/WEB-INF/view/include/header.jsp" %>
	
	
	<div class="temp_img_box">
		<img src="/img/temp3.png" class="temp_img" alt="이미지">
	</div>
	
	<c:if test="${empty cartList }">
		<img src="/img/temp3.png" class="temp_img" alt="이미지">
	</c:if>
	
	<c:if test="${!empty cartList }">
	
	
	
	<input type="hidden" value="${user.id }" id="user_id">
		
 
   
	<section class="title">
		<h1>주문하기</h1>
	</section>
	
	<main>
		
	<form>
	
	<ul>
		<li>
			<div class="order_info">
				<h2><span>${cartList.storeName }</span><button type="button" class="delete_all">전체삭제</button></h2><hr>
				
				<h2>주문정보</h2>
				
				
				<ul>
					<c:set var="cart" value="${cartList.cart }" />
					
					<c:forEach begin="0" end="${fn:length(cart) -1 }" var="j"  >
						<li>
							<div class="food_name_box">
								<div class="food_name">${cart[j].foodName }</div>
								<div><i class="fas fa-times delete"></i></div>
							</div>
							<div class="price">ㆍ기본가격 <fm:formatNumber value="${cart[j].foodPrice }"  pattern="###,###" />원</div>
						
							
							<c:if test="${fn:length(cart[j].optionName) > 0 }">
								<c:forEach  begin="0" end="${fn:length(cart[j].optionName) -1 }" var="i"  >
								
									<div class="menu_option"> 
										<span>ㆍ${cart[j].optionName[i]  }</span>
										<span><fm:formatNumber  value="${cart[j].optionPrice[i] }" pattern="###,###" />원</span>
									</div>
															
								</c:forEach> 
							</c:if>
							
							<div class="amount">
								<div class="sum">
									<fm:formatNumber value="${cart[j].totalPrice }" pattern="###,###" />원
								</div>
								<!-- 메뉴 하나 총합 -->
								<div class="amount_box">
				                    <button type="button" class="minus">-</button>
				                    <input type="number" class="amount_text" min="1" value="${cart[j].amount }" readonly >
				                    <button type="button" class="plus">+</button>
			                   </div>
							</div>
							
						</li>
						
					</c:forEach>
				</ul>
			</div>
		</li>
	
		<li class="delevery_cont">
		
			<div class="delevery_info">
				<h2>배달정보 </h2>
				<div>
					<span>주소 :</span> 
					<span class="address1">${BMaddress.address2}</span> 
					<button type="button" onclick="modifyAddress()" id="delevery_modify" >주소 변경하기</button>
	             	<%@ include file="/WEB-INF/view/include/modifyAddress.jsp" %>
				</div>
				
				<input type="hidden" id="deleveryAddress1" value="${BMaddress.address1 }" name="deleveryAddress1"> 
				<input type="hidden" id="deleveryAddress2" value="${BMaddress.address2 }" name="deleveryAddress2"> 
				
				
				<div>상세 주소</div>
				<div class="input_area"><input type="text" id="deleveryAddress3" maxlength="100" value="${BMaddress3 }"  name="deleveryAddress3"> </div>
				 
				<div>전화번호</div>
				<c:if test="${!empty user  }">
					<div class="input_area"> <input type="number" value="${user.phone }" name="phone" readonly required onkeypress="return lenthCheck(this, 11)" autocomplete="off" > </div>
				</c:if>
				<c:if test="${empty user.phone || empty user  }">
					<div class="input_area"> <input type="number" name="phone" required onkeypress="return lenthCheck(this, 11)" autocomplete="off" > </div>
				</c:if>
			</div>
		<hr>
		</li>
		
		<li class="request">
			<div>요청사항</div>
				<textarea rows="5" cols="50" name="request" maxlength="500"  ></textarea> 
			<hr>
		</li>
		
		
		<li>
			<h2>결제수단</h2>
				
				<label><input type="radio" checked="checked" value="신용카드" name="payMethod" >신용카드</label>
				
				<label><input type="radio" value="현장결제" name="payMethod">현장결제</label>
			<hr>
		</li>
		
		<li class="point_area">
			<h2>포인트</h2>
			
			<div class="point">
				<div class="point_click">
					<c:if test="${!empty user  }">
						<span><fm:formatNumber value="${user.point }"  pattern="###,###" />원 사용 가능</span>
						<input type="hidden" value="${user.point }" id="point">
					</c:if>
					
					<c:if test="${empty user  }">
						<span >로그인후 사용 가능합니다.</span>
					</c:if>
					
					<span class="icon"> <i class="fas fa-chevron-down"></i>  </span>
				</div>
				
				<div class="point_input_box" >
					<input type="number" name="usedPoint" value="0" pattern="/d" class="point_input" placeholder="사용 할 포인트"  >
					<button class="use_point" type="button">사용하기</button>
				</div>
			
			</div><hr>
				
		</li>
		
		<li class="pay">
			<div class="order_price">주문금액 : <fm:formatNumber value="${cartList.cartTotal }"  pattern="###,###" />원</div>
			<div>배달팁 <fm:formatNumber value="${cartList.deleveryTip }"  pattern="###,###" />원 </div> 
			
			<div class="point_dis"><span>포인트 할인 </span><span></span> </div>
				
			<div class="total">
				<fm:formatNumber value="${cartList.cartTotal + cartList.deleveryTip}"  pattern="###,###" />원 결제하기
			</div>
			
			<input type="hidden" value="${cartList.cartTotal + cartList.deleveryTip}" name="total" id="total"> 
			<input type="hidden" value="${cartList.deleveryTip }" name="deleveryTip" id="delevery_tip"> 
			<input type="hidden" value="${orderNum }" id="order_num">
			
			<input type="button" value="주문하기" class="order_btn">
		</li>
		
		
		</ul>
		
		</form>
	</main>
 
	
 
	</c:if>
 
    <!-- 하단 메뉴 -->
   	<%-- <%@ include file="/WEB-INF/view/include/nav.jsp" %> --%>
    <!-- 하단 메뉴 -->
 
	<!-- 푸터 -->
	<%@ include file="/WEB-INF/view/include/footer.jsp" %>
	<!-- 푸터 -->
	
	<script type="text/javascript" src="/js/order/order.js" ></script>
</body>
</html>