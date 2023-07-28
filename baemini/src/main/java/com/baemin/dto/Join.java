package com.baemin.dto;

import javax.validation.constraints.Pattern;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class Join {
	
	@Pattern(regexp = "[A-Za-z0-9]{4,15}$", message = "영어, 숫자를 조합하여 4~15자리를 입력해주세요.")
	private String username;
	
	private String password;
	
	@Pattern(regexp = "^([0-9a-zA-Z_\\.-]+)@([0-9a-zA-Z_-]+)(\\.[0-9a-zA-Z_-]+){1,2}$" , message = "올바른 이메일 형식이 아닙니다")
	private String email;
	
	@Pattern(regexp = "^[가-힣|a-z|A-Z|0-9|]+$", message = "닉네임은 한글, 영어, 숫자만 4 ~10자리로 입력 가능합니다")
	private String nickname;
	
	@Pattern(regexp = "^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$", message = "휴대폰번호를 확인해 주세요")
	private String phone;
}
