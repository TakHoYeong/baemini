<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/view/include/link.jsp" %>
<link rel="stylesheet" href="/css/layout/nav.css" >
<link rel="stylesheet" href="/css/store/likes.css" >
<link rel="stylesheet" href="/css/store/store-li.css">
<%@ include file="/WEB-INF/view/include/header.jsp" %>
 
	<div class="wrap">
    	<c:if test="${!empty likesList }">
	    	<style>body {background: #fff; }</style>
		    <section class="title">
		        <h1>찜</h1>
		    </section>
		</c:if>	    
 
	    <main>
	    	<div class="box">
	    	<c:if test="${empty likesList }">
		    	<div class="temp"><img alt="이미지" src="/img/jjim.png"> </div>
		    </c:if>
		    
			    <ul class="store">
	               	<c:set var="store_admin" value="/store" />
                	<c:forEach items="${likesList }" var="storeList">
                    	<%@ include file="/WEB-INF/view/store/store-li.jsp" %>
                    </c:forEach>
				</ul>
			</div>
		</main>
	</div>
 
    <!-- 하단 메뉴 -->
   	<%@ include file="/WEB-INF/view/include/nav.jsp" %>
    <!-- 하단 메뉴 -->
	
	<!-- 푸터 -->
	<%@ include file="/WEB-INF/view/include/footer.jsp" %>
	<!-- 푸터 -->
	
</body>
</html>
