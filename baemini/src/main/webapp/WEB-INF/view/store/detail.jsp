<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/view/include/link.jsp"%>
<script type="text/javascript"
	src="//dapi.kakao.com/v2/maps/sdk.js?appkey=c576415305a208127dea97ebf2c1e26b&libraries=services,clusterer,drawing"></script>
<link rel="stylesheet" href="/css/modal.css">
<link rel="stylesheet" href="/css/store/detail.css">


<%@ include file="/WEB-INF/view/include/header.jsp"%>


<!-- 메인 -->
<%@ include file="/WEB-INF/view/store/storeDetail.jsp"%>
<!-- 메인 -->

<!-- 푸터 -->
<%@ include file="/WEB-INF/view/include/footer.jsp"%>
<!-- 푸터 -->

<!-- 메뉴 모달 -->
<%@ include file="/WEB-INF/view/modal/modal_food.jsp"%>
<!-- 메뉴 모달 -->




<script type="text/javascript" src="/js/store/storeDetail.js"></script>
</body>
</html>