package com.baemin.controller;

import java.io.File;
import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.multipart.MultipartFile;

import com.baemin.aop.IsMyStore;
import com.baemin.dto.Food;
import com.baemin.dto.Store;
import com.baemin.dto.StoreDetail;
import com.baemin.login.LoginService;
import com.baemin.service.AdminService;
import com.baemin.service.StoreService;
import com.baemin.util.UploadFile;

@Controller
public class AdminController {
	
	@Autowired
	private StoreService storeService;
	
	@Autowired
	private AdminService adminService;
	
	@Autowired
	private UploadFile uploadFile;
	
	@GetMapping("admin/main")
	public String adminPage(@AuthenticationPrincipal LoginService user, Model model) {
		long userId = user.getUser().getId();
		List<Long> storeList = adminService.getMyStoreId(userId);
		model.addAttribute("storeList", storeList);
		return "admin/myStore";
	}
	
	/*
	 * @GetMapping("/admin/myStore") public String myStore(@AuthenticationPrincipal
	 * CustomUserDetails principal, Model model) { long userId = principal.getId();
	 * List<Store> storeList = adminService.myStore(userId);
	 * 
	 * model.addAttribute("storeList", storeList); return "admin/myStore"; }
	 */
	
	@IsMyStore
	@GetMapping("/admin/management/detail/{id}") 
	public String detail(@PathVariable long id, @AuthenticationPrincipal LoginService user, Model model) {
		long userId = user.getUser().getId();
		StoreDetail storeDetail = storeService.storeDetail(id, userId);
		model.addAttribute("store", storeDetail);
		model.addAttribute("adminPage", true);
		
		return "admin/detail";
	}
	
	@IsMyStore
	@PatchMapping("/admin/management/storeInfo")
	public ResponseEntity<Store> storeInfoUpdate(Store store, MultipartFile file) throws IOException {
		if(!file.isEmpty()){
			String img = uploadFile.fildUpload(file);
			store.setStoreImg(img);
			store.setStoreThumb(img);
		}
		adminService.storeInfoUpdate(store);
		return new ResponseEntity<Store>(store,HttpStatus.OK);
	}
	
	@IsMyStore
	@PostMapping("/admin/management/menu")
	public ResponseEntity<Food> addMenu(Food food, String[] foodOption, Integer[] foodOptionPrice, MultipartFile file) throws IOException {
		if(file.isEmpty()) {
			String img = File.separator + "img" + File.separator + "none.gif";
			food.setFoodImg(img);
			food.setFoodThumb(img);
		} else {
			String img = uploadFile.fildUpload(file);
			food.setFoodImg(img);
			food.setFoodThumb(img);
		}
		
		adminService.addMenu(food, foodOption, foodOptionPrice);
		return new ResponseEntity<Food>(food,HttpStatus.OK);
	}


	
}
