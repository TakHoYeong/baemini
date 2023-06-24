<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/view/include/link.jsp" %>
<link rel="stylesheet" href="/css/layout/nav.css" >
<link rel="stylesheet" href="/css/store/search.css" >
<link rel="stylesheet" href="/css/store/store-li.css">
<%@ include file="/WEB-INF/view/include/header.jsp" %>
 
 
 
	<main>
	  	<form action="/store/search" method="get" onsubmit="return check()" >
		  	<div class="input_box">
			  	<div>
					<label for="submit">
						<i class="fas fa-search"></i>
					</label>
					<input type="submit" id="submit">
				</div>
				<div>	
					<input type="text" class="search" name="keyword" maxlength="33" value="${keyword }" placeholder="어떤 가게를 찾으시나요?" autofocus >
					<div class="info">현재 주소지를 기준으로 검색됩니다.</div>
					<input type="hidden" value="${BMaddress.address1 }" name="address1" id="deleveryAddress1">
					<%@ include file="/WEB-INF/view/include/modifyAddress.jsp" %> 
				</div>
				<div>
					<button type="button" class="word_delete"><i class="fas fa-times"></i></button>
				</div>
			
			</div>
		</form>
		
		<div class="search_word_head">
			<h2>최근 검색어</h2>
			<button>전체삭제</button>
		</div>
		<div class="search_word">
		
			<ul>
				<c:if test="${!empty keywordList }">
				<c:forEach items="${keywordList }" var="keywordList">
				
					<li>
						<span>${keywordList }</span>
						<button><i class="fas fa-times"></i></button>
					</li>
					
				</c:forEach>
				</c:if>
			</ul>
		</div>
		
		<div class="box">
			<c:if test="${noSearch }"> 
				<div class="no_search">검색 결과가 없습니다</div>
			</c:if>
			
			<ul class="store">
			<c:forEach items="${storeList }" var="storeList" >
				<%@ include file="/WEB-INF/view/store/store-li.jsp" %>
			</c:forEach>
                    
			</ul>
		</div>
           
            <c:if test="${!empty storeList }"> 
 				<%@ include file="/WEB-INF/view/include/pageBox.jsp" %>
 			</c:if>
            	
	</main>
 
  
	<%@ include file="/WEB-INF/view/include/nav.jsp" %>
 
	<%@ include file="/WEB-INF/view/include/footer.jsp" %>
  
 
  	<script type="text/javascript" src="/js/store/search.js" ></script>
  
</body>
</html>
