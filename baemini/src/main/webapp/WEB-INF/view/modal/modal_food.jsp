<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fm" uri="http://java.sun.com/jsp/jstl/fmt" %>  

	<div id="modal_bg"></div>

	<div class="food_modal modal">
	
    	<div id="modal_header">
			<button type="button" class="closeA"><i class="fas fa-times"></i></button>
			<h1>메뉴 상세</h1>
    	</div>
	            
		<div class="modal_box" >
            
	        <img src="" alt="이미지" class="menu_img" >
	        <h2 class="menu_name">메뉴 이름</h2>
	        <div class="menu_dec"></div>
	        <div class="price"><span>가격</span><span class="menu_price" >0</span></div>

			<div id="option">
				<h2>옵션 선택</h2>
	            <ul>
	                <li>
		                <div class="option_box">
		                	<span>
	                			<i class="fas fa-check-square"></i>
               	 				
             	 				<input type="checkbox" class="menu_option" name="option" value="123">123
                				<input type="hidden" class="option_price" value="">
    	            			<input type="hidden" class="option_num" value="">
                 	 		</span>
                			<span>0원</span>
	                	</div>
	              	</li>
	                <li>
		                <div class="option_box">
		                	<span>
	                			<i class="fas fa-check-square"></i>
             	 				<input type="checkbox" class="menu_option" name="option" value="123">123
                				<input type="hidden" class="option_price" value="">
    	            			<input type="hidden" class="option_id" value="">
                 	 		</span>
                			<span>0원</span>
	                	</div>
	              	</li>
	              	
	     
	            </ul>
		    </div>        
	
            <div class="amount">
                <span class="amount_text">수량</span>
                
                <span class="amount_box">
                    <button class="minus">-</button>
                    <input type="number" id="amount" min="1" value="1" readonly >
                    <button class="plus">+</button>
                </span>
                
            </div>
		</div>
			
		<div id="btn_box">
			
			<input type="hidden" class="add_cart_food_name" >
			<input type="hidden" class="add_cart_food_price" >
			<input type="hidden" class="add_cart_food_id" >
			<div>
			<div class="min_delevery">배달최소주문금액 <fm:formatNumber value="${store.storeInfo.minDelevery }" pattern="###,###" />원 </div>
            <div class="sum"><span>총 주문금액</span><span class="total_price">0</span></div>
            </div>
          		
       		<button class=closeB type="button">취소</button>
       		<button class="add_cart" type="button">장바구니에 담기 </button>
        </div>
	</div>

    
    
    
	 