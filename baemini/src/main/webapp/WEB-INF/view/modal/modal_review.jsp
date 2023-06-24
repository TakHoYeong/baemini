<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!-- 리뷰 쓰기 모달 -->
    <div id="modal_bg"></div>

    <div class="review_modal modal">
    	<div id="modal_header">
			<button class="closeA"><i class="fas fa-times"></i></button>
			<h1>리뷰 쓰기</h1>
    	</div>
    	
	    <form action="/store/review" method="post"  enctype="multipart/form-data"> 
    	<div class="modal_box">
	    	<div class="score_box">
				<i class="far fa-star"></i>
				<i class="far fa-star"></i>
				<i class="far fa-star"></i>
				<i class="far fa-star"></i>
				<i class="far fa-star"></i> 
	    	</div>
	    	
	    	<input type="hidden" name="score" class="score" >
	    	
	    	<div class="review_text">
	    		<textarea rows="10" cols="50" name="reviewContent" maxlength="500" ></textarea>
	    	</div>
	    	
	    	<div class="img_box">
	    		<label for="img">사진첨부</label>
	    			<input type="file" id="img" class="img" name="file" >
	    		
	    	
	    		<div>
	    			<img class="preview">
	    			<button type="button" class="img_close"><i class="fas fa-times"></i></button>
    			</div>
	    	</div>
    	</div>
    	
    	<div id="btn_box">
    		<input type="hidden" class="order_num" name="orderNum">
    		<input type="hidden" class="store_id" name="storeId">
 			<button type="button" class="closeB">취소</button>
 			<button type="submit" class="review_submit_btn" disabled >리뷰 작성</button>
    	</div>
    	
    	
    	</form>
    </div>
	<!-- 리뷰 쓰기 모달 -->
  
  
  
	<!-- 리뷰 수정하기 모달 -->
    <div class="review_modify_modal modal">
    	<div id="modal_header">
		    <button class="closeA"><i class="fas fa-times"></i></button>
	    	<h1>리뷰 수정하기</h1>
    	</div>

	    <form action="/store/reviewModify" method="post"  enctype="multipart/form-data">
    	<div class="modal_box">
	    	<div class="score_box">
				<i class="far fa-star"></i>
				<i class="far fa-star"></i>
				<i class="far fa-star"></i>
				<i class="far fa-star"></i>
				<i class="far fa-star"></i> 
	    	</div>
	    	
	    	<input type="hidden" name="score" class="score" >
	    	
	    	<div class="review_text">
	    		<textarea rows="10" cols="50" name="reviewContent" maxlength="500" ></textarea>
	    	</div>
	    	
	    	<div class="img_box">
	    		<label for="img2">사진첨부</label>
    			<input type="file" id="img2" class="img" name="file" >
	    			
	    		<div>
	    			<img class="preview">
	    			<button type="button" class="img_close"><i class="fas fa-times"></i></button>
    			</div>
	    	</div>
    	</div>
    	
    	<div id="btn_box">
    		<input type="hidden" class="order_num" name="orderNum">
    		<input type="hidden" class="store_id" name="storeId">
 			<button type="button" class="closeB">취소</button>
 			<button type="submit" class="review_submit_btn" disabled >리뷰 수정하기</button>
    	</div>
    	
    	</form>
    </div>
	<!-- 리뷰 수정하기 모달 -->