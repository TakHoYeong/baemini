package com.baemin.login;

import java.util.UUID;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import com.baemin.dao.UserDAO;
import com.baemin.dto.Join;
import com.baemin.dto.User;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class OauthUserService extends DefaultOAuth2UserService {
	
	@Autowired
	private SqlSession sql;
	
	@Autowired
	private UserDAO userDAO;
	
	private final BCryptPasswordEncoder encodePwd;
	
	@Override
	public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
		
		OAuth2User oauth2user = super.loadUser(userRequest);
		
		String provider = userRequest.getClientRegistration().getRegistrationId();
		
		String username = provider + "_" + oauth2user.getAttribute("sub"); 
		
		User user = sql.selectOne("user.login", username);
		
		if(user == null) {
			// 회원가입
			UUID uid = UUID.randomUUID();
			String password = encodePwd.encode(uid.toString());
			String email = oauth2user.getAttribute("email");
			String phone = oauth2user.getAttribute("phone") == null ? "": oauth2user.getAttribute("phone");
			
			Join join = new Join();
			join.setUsername(username);
			join.setPassword(password);
			join.setEmail(email);
			join.setNickname(username);
			join.setPhone(phone);
			
			userDAO.join(join);
			
			user = sql.selectOne("user.login", username);
			
//			user = new User("아이디", "비번", "이메일", "닉네임", "전화번호");
			
		}
 		
		LoginService loginService = new LoginService();
		loginService.setUser(user);
		
		return loginService;
	}
}
