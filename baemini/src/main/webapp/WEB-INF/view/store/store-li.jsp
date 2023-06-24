<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fm" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
    
    <c:set var="uri" value="${requestScope['javax.servlet.forward.request_uri']}" />
    <c:choose>
	    <c:when test="${fn:split(uri, '/')[0] == 'admin'}">
	    	<c:set var="path" value="/admin/management" />
	    </c:when>
	    <c:otherwise>
	    	<c:set var="path" value="/store" />
	    </c:otherwise>
    </c:choose>
    
    
<li>
	<div class="img_box">
		<a href="${path }/detail/${storeList.id }"><img src="${storeList.storeImg }" alt="이미지"></a>
	</div>
 
	<div class="info_box">
	
		<h2><a href="${path }/detail/${storeList.id }">${storeList.storeName }</a></h2>
		
		<a href="${path }/detail/${storeList.id }">
			<span>
				<span>평점 ${storeList.score }</span>
				
				<span class="score_box">
					<c:forEach begin="0" end="4" var="i">
						<c:if test="${Math.round(storeList.score) > i }">
							<i class="far fas fa-star"></i>
						</c:if>
						<c:if test="${Math.round(storeList.score) <= i }">
							<i class="far fa-star"></i>
						</c:if>
					</c:forEach>
				</span>
			</span>
			
		<span>
			<span>리뷰 ${storeList.reviewCount }</span>
			<span>사장님 댓글 ${storeList.bossCommentCount }</span>
		</span>
		
		<span>
			<span>최소주문금액 <fm:formatNumber value="${storeList.minDelevery }" pattern="###,###" />원</span>
			<span>배달팁 <fm:formatNumber value="${storeList.deleveryTip }" pattern="###,###" />원</span>
		</span>
		<span>배달시간 ${storeList.deleveryTime }분</span>
		</a>
	</div>
		
	<c:if test="${!storeList.isOpen}">
		<div class="is_open">
			<a href="/store/detail/${storeList.id }">지금은 준비중입니다</a>
		</div>
	</c:if>
</li>