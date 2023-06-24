<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<%@ include file="/WEB-INF/view/include/link.jsp"%>

<link rel="stylesheet" href="/css/store/store-li.css">

<style>
main h1 {
	text-align: center;
	margin: 20px;
}

.box .store .is_open {
	display: none;
}
</style>

<%@ include file="/WEB-INF/view/include/header.jsp"%>

<main>
	<h1>운영중인 가게</h1>
	<div class="box">
		<ul class="store">
			<c:set var="store_admin" value="/admin/management" />
			<c:forEach items="${storeList }" var="storeList">
				<%@ include file="/WEB-INF/view/store/store-li.jsp"%>
			</c:forEach>
		</ul>
	</div>
</main>
</body>
</html>