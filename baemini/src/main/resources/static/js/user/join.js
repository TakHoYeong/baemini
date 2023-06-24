$(".login_btn").css("background", "#ddd");
 
 
const isSubmit = (function(){
	let usernameCheck = false;
	let passwordCheck = false;
	let emailCheck = false;
	let nicknameCheck = false;
	let phoneCheck = false;
	
	const setUsernameCheck = function(set){
		usernameCheck = set ? true : false;
		isSubmit();
	}
	const setpasswordCheck = function(set){
		passwordCheck = set ? true : false;
		isSubmit();
	}
	const setemailCheck = function(set){
		emailCheck = set ? true : false;
		isSubmit();
	}
	const setnicknameCheck = function(set){
		nicknameCheck = set ? true : false;
		isSubmit();
	}
	const setphoneCheck = function(set){
		phoneCheck = set ? true : false;
		isSubmit();
	}
	
	const isSubmit = function(){
		if(usernameCheck && passwordCheck && emailCheck && nicknameCheck && phoneCheck) {
			$(".login_btn").css("background", "#2AC1BC");
			return true;
		} else {
			$(".login_btn").css("background", "#ddd");
			return false;
		}
	}
	
	return {
		setUsernameCheck : setUsernameCheck,
		setpasswordCheck : setpasswordCheck,
		setemailCheck : setemailCheck,
		setnicknameCheck : setnicknameCheck,
		setphoneCheck : setphoneCheck,
		isSubmit : isSubmit
	}
})();
 
 
 
 
 
function overlapCheck(data) {
	let isUseable = false;
	$.ajax({
		url: "/overlapCheck",
		type: "get",
		data: data,
		async: false
	})
	.done(function(result){
		if(result == 0 ) {
			isUseable = true;
		} 
	})
	.fail(function(){
		alert("에러");
	});
	
	return isUseable;
}
 
 
 
 
function pwdCheck() {
	const password1 = $(".password1").val().replaceAll(" ", "");
	const password2 = $(".password2").val().replaceAll(" ", "");
	const msgBox = $(".password2").siblings(".msg_box"); 
	
	if(password1 && password2) {
		if(password1.includes(" ")  || password2.includes(" ")) {
			msgBox.text("비밀번호를 확인해 주세요");
			isSubmit.setpasswordCheck(false);
			return;
		}
		
		if(password1 != password2) {
			msgBox.text("비밀번호를 확인해 주세요");
			isSubmit.setpasswordCheck(false);
		} else {
			msgBox.text("");
			console.log("사용가능");
			isSubmit.setpasswordCheck(true);
		}
	}
	
}
 
 
 
 
 
$(".username").focusout(function(){
	const username = $(".username").val().replaceAll(" ", "");
	const msgBox = $(this).siblings(".msg_box"); 
	
	if(!username) {
		msgBox.text("아이디를 입력해주세요");
		isSubmit.setUsernameCheck(false);
		return;
	}
	
	if(!usernameCheck(username)) {
		msgBox.text("사용할수 없는 아이디입니다");
		isSubmit.setUsernameCheck(false);
		return;
	}
	
	const data = {
		value : username,
		valueType : "username" 
	};
	
	
	if(overlapCheck(data)) {
		msgBox.text("사용 가능합니다");
		isSubmit.setUsernameCheck(true);
	} else {
		msgBox.text("이미 사용중인 아이디입니다");
		isSubmit.setUsernameCheck(false);
	}
});
 
 
$(".password1").focusout(function() {
	pwdCheck();
});
 
$(".password2").focusout(function() {
	pwdCheck();
});
 
 
 
$(".email").focusout(function() {
	const email = $(".email").val();
	const msgBox = $(this).siblings(".msg_box"); 
 
	if (!email) {
		msgBox.text("이메일을 입력해 주세요");
		isSubmit.setemailCheck(false);
		return;
	}
 
	if(!emailCheck(email)) {
		msgBox.text("사용 불가능합니다");
		isSubmit.setemailCheck(false);
	} else {
		msgBox.text("");
		isSubmit.setemailCheck(true);
	}
}); 
 
 
 
 
$(".nickname").focusout(function() {
	const nickname = $(".nickname").val();
	const msgBox = $(this).siblings(".msg_box"); 
 
	if (!nickname) {
		msgBox.text("닉네임을 입력 해주세요");
		isSubmit.setnicknameCheck(false);
		return;
	}
 
	if (!nicknameCheck(nickname)) {
		msgBox.text("닉네임은 한글, 영어, 숫자만 4 ~10자리로 입력 가능합니다.");
		isSubmit.setnicknameCheck(false);
		return;
	}
 
	let data = {
		value: nickname,
		valueType : "nickname" 
	};
	
	if(!overlapCheck(data)){
		msgBox.text("이미 사용중인 닉네임입니다");
		isSubmit.setnicknameCheck(false);
	} else {
		msgBox.text("사용 가능합니다");
		isSubmit.setnicknameCheck(true);
	}
 
}); // nickname check 
 
 
 
 
$(".phone").focusout(function() {
	const phone = $(".phone").val();
	const msgBox = $(this).siblings(".msg_box"); 
	
	if(!phone) {
		isSubmit.setphoneCheck(false);
		return;
	}
	
	if(!phoneCheck(phone)) {
		msgBox.text("휴대폰번호를 확인해 주세요");
		isSubmit.setphoneCheck(false);
	} else {
		msgBox.text("");
		isSubmit.setphoneCheck(true);
	}
});
