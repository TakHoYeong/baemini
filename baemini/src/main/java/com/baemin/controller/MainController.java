package com.baemin.controller;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class MainController {
	
	@GetMapping("/")
	public String main() {
		System.out.println("main");
		return "home";
	}
	
	@ResponseBody
	@PostMapping("/addressModify")
	public void addressModify(String address1, String address2, HttpServletResponse response,
			HttpSession session)
		throws UnsupportedEncodingException{
		
		System.out.println("address1 =" + address1);
		System.out.println("address2 =" + address2);
		
		String address = "{\"address1\" : \"" + address1 + "\",\"address2\" : \"" + address2 + "\"}";
		
		Cookie cookie = new Cookie("BMaddress", URLEncoder.encode(address, "UTF-8"));
		
		int age = 60*60*24*7;
		cookie.setMaxAge(age);
		
		response.addCookie(cookie);
		
		Map<String, String> addMap = new HashMap<>();
		addMap.put("address1", address1);
		addMap.put("address2", address2);
		session.setMaxInactiveInterval(3600*3);
		session.setAttribute("BMaddress", addMap);
	}
}
