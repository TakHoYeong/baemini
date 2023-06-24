 
inputCheck();
 
$("input[name='keyword']").keyup(function(key){
    inputCheck();
    
    // 모바일 검색버튼
    if(key.keyCode == 13) {
        $("#submit").click();
    }
})	
 
 
// 검색창 텍스트 지우기버튼
$(".word_delete").click(function(){
    $("input[name='keyword']").val("");
    
    inputCheck();
})
 
 
// 검색어 전체삭제
$(".search_word_head button").click(function(){
        $.ajax({
        url : "/store/keyword-all",
        type : "DELETE",
        success : function(){
            $(".search_word li").css("display" , "none");
            
                
        } // success
    }); // ajax
})
 
 
 
 
 
// 검색어 1개 삭제
$(document).on("click", ".search_word li button", function(){ 
    const keyword = $(this).siblings().text();
    const index = $(this).parent("li").index();
    
    $.ajax({
        url : "/store/keyword-one",
        type : "DELETE",
        data : {keyword : keyword},
        success : function(){
            $(".search_word li").eq(index).remove();
        } // success
    }); // ajax
})
 
 
 
 
 
//	최근 검색어 클릭시 재검색
$(document).on("click" ,".search_word span" , function(){
    
    $(".search").val($(this).text());
    
    $("#submit").click();
    
    inputCheck();
    
})
    
function inputCheck(){
    $("input[name='keyword']").val() == "" ? 
            $(".word_delete").css("display" , "none") : $(".word_delete").css("display" , "block") 
}
    
 
function check() {
    const keyword = $(".search").val().replaceAll(" ","");
        
    if(keyword == "" ) {
        return false;
    }
    
    if($("#deleveryAddress1").val() == "" ) {
        modifyAddress();
        swal({
            title: "주소를 입력해주세요",
            text: "현재 주소지를 기준으로 검색됩니다." 
        });
        return false;
    }
    
    return true;
}
