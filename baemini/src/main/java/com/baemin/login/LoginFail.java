package com.baemin.login;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.InternalAuthenticationServiceException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.stereotype.Component;

@Component
public class LoginFail implements AuthenticationFailureHandler {

	@Override
	public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response,
			AuthenticationException exception) throws IOException, ServletException {
		if(exception instanceof BadCredentialsException
				|| exception instanceof InternalAuthenticationServiceException) {
			request.setAttribute("loginFailMsg", "아이디와 비밀번호를 확인해주세요");
		}
		request.getRequestDispatcher("/WEB-INF/view/user/login.jsp").forward(request, response);
	}

}
