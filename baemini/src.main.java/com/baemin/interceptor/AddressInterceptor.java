package com.baemin.interceptor;

import java.net.URLDecoder;
import java.util.Map;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.web.servlet.HandlerInterceptor;

import com.google.gson.Gson;

public class AddressInterceptor implements HandlerInterceptor {
	 
	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
		HttpSession session = request.getSession();
		
		Map<String, String> addMap = (Map<String, String>)session.getAttribute("BMaddress");
		
		if(addMap == null) {
			Cookie[] cookies = request.getCookies();
			System.out.println(cookies.length);
			for (int i = 0; i < cookies.length; i++) {
				if(cookies[i].getName().equals("BMaddress")) {
					Gson gson = new Gson();
					addMap = gson.fromJson(URLDecoder.decode(cookies[i].getValue(), "UTF-8"), Map.class);
					session.setMaxInactiveInterval(3600 * 3);
					session.setAttribute("BMaddress", addMap);
				}
			}
		}
		return true;
	}
}

