<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/view/include/link.jsp" %>

<link rel="stylesheet" href="/css/store/store.css">
<link rel="stylesheet" href="/css/store/store-li.css">

<%@ include file="/WEB-INF/view/include/header.jsp" %>


    <!-- 콘텐츠 -->
    <main>
        <div class="container">
            <div class="category" data-category="${category }">
                <ul>
                    <li data-category ='100' onclick="location.href='/store/100/${address1 }'"><span>피자</span></li>
                    <li data-category ='101' onclick="location.href='/store/101/${address1 }'"><span>치킨</span></li>
                    <li data-category ='102' onclick="location.href='/store/102/${address1 }'"><span>패스트푸드</span></li>
                    <li data-category ='103' onclick="location.href='/store/103/${address1 }'"><span>분식</span></li>
                    <li data-category ='104' onclick="location.href='/store/104/${address1 }'"><span>카페/디저트</span></li>
                    <li data-category ='105' onclick="location.href='/store/105/${address1 }'"><span>돈까스/일식</span></li>
                    <li data-category ='106' onclick="location.href='/store/106/${address1 }'"><span>중국집</span></li>
                    <li data-category ='107' onclick="location.href='/store/107/${address1 }'"><span>족발/보쌈</span></li>
                    <li data-category ='108' onclick="location.href='/store/108/${address1 }'"><span>야식</span></li>
                    <li data-category ='109' onclick="location.href='/store/109/${address1 }'"><span>한식</span></li>
                    <li data-category ='110' onclick="location.href='/store/110/${address1 }'"><span>1인분</span></li>
                    <li data-category ='111' onclick="location.href='/store/111/${address1 }'"><span>도시락</span></li>
                </ul>
            </div>

			<input type="hidden" value="${address1 }" class="address1">

           <div class="option">
                <ul>    
                	<li data-sort="기본순">기본순</li>
                    <li data-sort="배달 빠른 순">배달 빠른 순</li>
                    <li data-sort="배달팁 낮은 순">배달팁 낮은 순</li>
                    <li data-sort="별점 높은 순">별점 높은 순</li>
                    <li data-sort="리뷰 많은 순">리뷰 많은 순</li>
                    <li data-sort="최소 주문 금액 순">최소 주문 금액 순</li>
                </ul> 
           </div>
           
           

            <div class="box">
				
				<c:if test="${empty storeList }">
					<img class="temp_img" alt="이미지" src="/img/temp2.png">
					<style>main .box {background: #F6F6F6; max-width: 100%; }</style>
				</c:if>
				
				
                <ul class="store">
                	<c:set var="store_admin" value="/store" />
                	<c:forEach items="${storeList }" var="storeList">
                    	<%@ include file="/WEB-INF/view/store/store-li.jsp" %>
                    </c:forEach>
                </ul>
            </div>

        </div>
    </main>
     <!-- 콘텐츠 -->
      
     
    <!-- 하단 메뉴 -->
	<%@ include file="/WEB-INF/view/include/nav.jsp" %>
    <!-- 하단 메뉴 -->

    <!-- 푸터 -->
    <%@ include file="/WEB-INF/view/include/footer.jsp" %>
    <!-- 푸터 -->

	<script type="text/javascript" src="/js/store/store.js" ></script>
    
</body>
</html>