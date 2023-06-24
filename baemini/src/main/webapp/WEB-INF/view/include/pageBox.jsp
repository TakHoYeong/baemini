<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fm" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<style>
	
.page_box {display: flex; justify-content: center; margin: 20px 0; }
 
.page_box li { border: 1px solid #999; border-right: none; width: 35px; height: 35px; text-align: center; line-height: 35px; }
 
.page_box li:last-child { border-right: 1px solid #999; }
 
.page_box li a { display: block; width: 100%; height: 100%; }
 
.now_page { background: #30DAD9; color: #fff; cursor: default; }
 
.now_page:hover { color: #fff; }
 
@media(max-width :767px) {
	.page_box { margin-top: 20px; }
	.page_box li { width: 25px; height: 25px; line-height: 25px; font-size: 12px; }
}	
</style>
<c:set var="queryString" value="${requestScope['javax.servlet.forward.query_string']}" />
<c:if test="${!empty queryString}"> 
	<c:set var="queryString" value="${'?'}${queryString}" />
</c:if>
 
<c:set var="uri" value="${requestScope['javax.servlet.forward.request_uri']}" />
<c:set var="pathValiable" value="${'/' }${page.nowPage }" />
<c:set var="path" value="${fn:replace(uri, pathValiable, '') }${'/' }" /> 
 
 
<ul class="page_box">
	<c:if test="${page.pageCount < page.firstPage }">
        <li><a href="${path }${page.prevPage }${queryString }">이전</a></li>
    </c:if>
    <c:forEach begin="${page.firstPage }" end="${page.firstPage + page.pageCount - 1 }" var="i">
    	<c:if test="${i <= page.totalPage}">
           <c:if test="${i != page.nowPage }">
               <li><a href="${path }${i }${queryString }">${i }</a></li>
           </c:if>
           <c:if test="${i == page.nowPage }">
               <li><a class="now_page" onclick="return false;" href="${path }${i }${queryString }">${i }</a></li>
           </c:if>
         </c:if> 
    </c:forEach>
    <c:if test="${page.firstPage + page.pageCount <= page.totalPage }">
        <li><a href="${path }${page.nextPage }${queryString }">다음</a></li>
    </c:if>
</ul>
