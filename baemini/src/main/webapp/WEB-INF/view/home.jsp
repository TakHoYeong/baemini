<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/view/include/link.jsp" %>
<link rel="stylesheet" href="/css/layout/nav.css">
<link rel="stylesheet" href="/css/home.css">
 
<%@ include file="/WEB-INF/view/include/header.jsp" %>
 	<!-- 콘텐츠 -->
    <div class="wrap">
        <main>
            <section class="address_search">
                 <div id="search_box">
                     <div>
                         <input type="hidden" id="deleveryAddress1" placeholder="우편번호" value="${BMaddress.address1}" name="address1" readonly>
                         <input type="text" value="${BMaddress.address2}" onclick="modifyAddress()"
                             id="deleveryAddress2" readonly placeholder="주소를 입력해 주세요" name="address2"><br>
                     </div>
 
                     <div class="search_btn">
                         <label for="search_btn">
                             <i class="fas fa-search"></i>
                         </label>
 
                         <input type="button" name="search" id="search_btn">
 
                     </div>
 					<%@ include file = "/WEB-INF/view/include/modifyAddress.jsp" %>
                 </div>
            </section>
            <section class="category_box">
                <div class="box">
                    <ul class="category">
                    
                                <li>
									<div>
										<div class="img_box">
                                           <img src="/img/pizza2.png" alt="이미지">
										</div>
                                    </div>
                                    <div class="name">피자</div>
                                </li>
                    
                                <li>
									<div>
										<div class="img_box">
                                           <img src="/img/chicken1.png" alt="이미지">
										</div>
                                    </div>
                                    <div class="name">치킨</div>
                                </li>
                    
                                <li>
									<div>
										<div class="img_box">
                                           <img src="/img/hamburger4.png" alt="이미지">
										</div>
                                    </div>
                                    <div class="name">패스트푸드</div>
                                </li>
                    
                                <li>
									<div>
										<div class="img_box">
                                           <img src="/img/bunsik1.png" alt="이미지">
										</div>
                                    </div>
                                    <div class="name">분식</div>
                                </li>
                                
                    
                                <li>
									<div>
										<div class="img_box">
                                           <img src="/img/dessert2.png" alt="이미지">
										</div>
                                    </div>
                                    <div class="name">카페/디저트</div>
                                </li>
                                
                                <li>
									<div>
										<div class="img_box">
                                           <img src="/img/cutlet1.png" alt="이미지">
										</div>
                                    </div>
                                    <div class="name">돈까스/일식</div>
                                </li>
                    
                                <li>
									<div>
										<div class="img_box">
                                           <img src="/img/chinese1.png" alt="이미지">
										</div>
                                    </div>
                                    <div class="name">중국집</div>
                                </li>
                                
                    
                                <li>
									<div>
										<div class="img_box">
                                           <img src="/img/jockbal1.png" alt="이미지">
										</div>
                                    </div>
                                    <div class="name">족발/보쌈</div>
                                </li>
                    
                                <li>
									<div>
										<div class="img_box">
                                           <img src="/img/jockbal2.png" alt="이미지">
										</div>
                                    </div>
                                    <div class="name">야식</div>
                                </li>
                    
                                <li>
									<div>
										<div class="img_box">
                                           <img src="/img/bibimbap.jpg" alt="이미지">
										</div>
                                    </div>
                                    <div class="name">한식</div>
                                </li>
                    
                                <li>
									<div>
										<div class="img_box">
                                           <img src="/img/jockbal3.png" alt="이미지">
										</div>
                                    </div>
                                    <div class="name">1인분</div>
                                </li>
                    
                                <li>
									<div>
										<div class="img_box">
                                           <img src="/img/dosirac.jpg" alt="이미지">
										</div>
                                    </div>
                                    <div class="name">도시락</div>
                                </li>
                            </ul>
                	</div>
            </section>
        </main>
    </div>
    <!-- 콘텐츠 -->
 
 
    <!-- 하단 메뉴 -->
	<%@ include file="/WEB-INF/view/include/nav.jsp" %>
    <!-- 하단 메뉴 -->
 
    <!-- 푸터 -->
    <%@ include file="/WEB-INF/view//include/footer.jsp" %>
    <!-- 푸터 -->
 
<script>
	$(".category li").click(function(){
		let address1 = $("#deleveryAddress1").val();
		if(!address1) {
			swal("배달 받으실 주소를 입력해 주세요");
			return false;
		}
		
		const index = $(this).index();
		
		location.href = "/store/" + (100+index) + "/" +address1;
	})
 
</script>
 
 
</body>
 
</html>
