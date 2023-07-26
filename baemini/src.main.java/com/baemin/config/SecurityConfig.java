package com.baemin.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

import com.baemin.login.LoginDetailService;
import com.baemin.login.LoginFail;
import com.baemin.login.LoginSuccess;
import com.baemin.login.OauthUserService;

@EnableWebSecurity
@Configuration
public class SecurityConfig {
	
	@Autowired
	private LoginFail loginFail;
	
	@Autowired
	private LoginSuccess loginSuccess;
	
	@Autowired
	private LoginDetailService loginDetailService;
	
	@Autowired
	private OauthUserService oauthUserService;
	
//	@Bean
//	public SecurityFilterChain filterChain(HttpSecurity http) throws Exception{
//		http.csrf().disable();
//		
//		http.authorizeRequests()
//			.antMatchers("/admin/**").hasRole("ADMIN")
//			.antMatchers("/user/**").hasAnyRole("ADMIN, USER")
//			.anyRequest().permitAll()
//		.and()
//			.formLogin()
//			.loginPage("/") // 인증 필요한 페이지 접근시 이동페이지
//			.loginProcessingUrl("/login")
//		.and()
//			.logout()
//			.logoutSuccessUrl("/myPage");
//		return http.build();
//	}
	
	@Bean
	public SecurityFilterChain filterchain(HttpSecurity http) throws Exception {
		http.csrf().disable();
		
		http.authorizeRequests()
			.antMatchers("/admin/**").hasRole("ADMIN")
			.antMatchers("/user/**").hasAnyRole("ADMIN, USER")
			.anyRequest().permitAll()
		.and()
			.formLogin()
			.loginPage("/") // 인증 필요한 페이지 접근시 이동페이지
			.loginProcessingUrl("/login")
			.successHandler(loginSuccess)
			.failureHandler(loginFail)
		.and()
			.logout()
			.logoutSuccessUrl("/myPage")
		.and()
			.rememberMe()
			.key("rememberKey")
			.rememberMeCookieName("rememberMeCookieName")
			.rememberMeParameter("remember-me")
			.tokenValiditySeconds(60 * 60 * 24 * 7)
			.userDetailsService(loginDetailService)
		.and()
			.oauth2Login()
			.loginPage("/")
			.userInfoEndpoint()
			.userService(oauthUserService)
		
		;
		return http.build();
		
	}
	
}
