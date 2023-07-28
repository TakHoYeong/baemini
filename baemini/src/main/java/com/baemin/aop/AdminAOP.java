package com.baemin.aop;

import java.io.IOException;
import java.util.List;

import javax.servlet.http.HttpSession;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import com.baemin.dto.Food;
import com.baemin.dto.Store;
import com.baemin.login.LoginService;
import com.baemin.service.AdminService;

@Aspect
@Component
public class AdminAOP {
	
	@Autowired
	private AdminService adminService;
	
	@Around("@annotation(com.baemin.aop.IsMyStore)")
	public Object myStore(ProceedingJoinPoint j) throws Throwable   {
		long storeId = 0;
		Object[] args = j.getArgs();
		if(args.length > 0) {
			Object arg = args[0];
			
			if(arg instanceof Long) {
				storeId = (long) arg;
			} else if(arg instanceof Store) {
				storeId = ((Store) arg).getId();
			} else if(arg instanceof Food) {
				storeId = ((Food) arg).getStoreId();
			} 
		}
		if(!isMyStore(storeId)) { 
			System.out.println("aop 에러");
			return new ResponseEntity<Object>(HttpStatus.UNAUTHORIZED);
		}
		Object returnObj = j.proceed();
		return returnObj;
	}
	
	public boolean isMyStore(long storeId) throws IOException {
		ServletRequestAttributes attr = (ServletRequestAttributes)RequestContextHolder.currentRequestAttributes();
		HttpSession session = attr.getRequest().getSession();
		List<Long> storeIdList = (List<Long>)session.getAttribute("myStore");
		
		if(storeIdList == null) {
			SecurityContext sc = (SecurityContext) session.getAttribute("SPRING_SECURITY_CONTEXT");
			LoginService user = (LoginService) sc.getAuthentication().getPrincipal();
			long userId = user.getUser().getId();
			storeIdList = adminService.getMyStoreId(userId);
	        	session.setAttribute("myStore", storeIdList);
		} 
		
		if(storeIdList.size() == 0) {
			return false;
		} else {
			if(storeIdList.contains(storeId)) {
				return true;
			} else {
				return false;
			}
		}
	}
   
}
