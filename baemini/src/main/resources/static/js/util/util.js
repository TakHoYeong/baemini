function usernameCheck(username) {
	const regUsername =  /^[A-Za-z0-9]{4,15}$/;
	
	if(regUsername.test(username)) {
		return true;
	} else {
		return false;
	}
}
 
function emailCheck(email){
	const regEmail = /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;
	
	if(regEmail.test(email)) {
		return true;
	} else {
		return false;
	}
}
 
function phoneCheck(phone){
	const regPhone = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;
	if(regPhone.test(phone)) {
		return true;
	} else {
		return false;
	}
}
 
 
function nicknameCheck(nickname) {
	const regNickname = /^[가-힣|a-z|A-Z|0-9|]+$/;
	if (regNickname.test(nickname)) {
		return true;
	} else {
		return false;
	}
}
 
 
 
function lenthCheck(e, length) {
	if(e.value.length >= length) {
		return false;
	}
	
	$(this).off().focusout(function(){
		if(e.value.length > length) {
			e.value = "";
		}
	})
	
	return true; 
}

function openModal(modal) {
	const size = window.innerWidth;
	
	if (size > 767) {
		modal.css("transition", "0s").css("top", "0%");
		console.log("pc");
	} else {
		modal.css("transition", "0.2s").css("top", "0%");
		console.log("mobile");
	}
	$("#modal_bg").show();
	$("body").css("overflow", "hidden");
	$("body").css("overflow-y", "hidden");
	
	
	$(".closeA").click(function() {
		closeModal();
	});
	
	$("#modal_bg").click(function() {
		closeModal();
	});
	
	$(".closeB").click(function() {
		closeModal();
	});
}

function closeModal(){
	$("#modal_bg").hide();
	$(".modal").css("top", "100%");
    $(".modal_box").scrollTop(0);
	$("body").css("overflow", "visible");
	$(".modal input[type='checkBox']").prop("checked", false);
	
	$("#amount").val(1);
};

function imgPreview(e,target){
	const previewBox = target.siblings("div");
	const preview = previewBox.find(".preview");
	const fileReader = new FileReader();
 
	fileReader.readAsDataURL(e.target.files[0]);
 
	fileReader.onload = function() {
		preview.attr("src", fileReader.result);
		previewBox.css("display", "block");
	}
}
	
	
function imgClose() {
	$(".preview").attr("src", "");
	$(".img").val("");
	$(".img_box div").css("display", "none");
}

