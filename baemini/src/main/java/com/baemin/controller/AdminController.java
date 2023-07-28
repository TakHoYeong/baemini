package com.baemin.controller;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.multipart.MultipartFile;

import com.baemin.aop.IsMyStore;
import com.baemin.dto.Cart;
import com.baemin.dto.Food;
import com.baemin.dto.OrderList;
import com.baemin.dto.Store;
import com.baemin.dto.StoreDetail;
import com.baemin.login.LoginService;
import com.baemin.service.AdminService;
import com.baemin.service.StoreService;
import com.baemin.util.FoodInfoFromJson;
import com.baemin.util.UploadFile;

@Controller
public class AdminController {
	
	@Autowired
	private StoreService storeService;
	
	@Autowired
	private AdminService adminService;
	
	@Autowired
	private UploadFile uploadFile;
	
	@GetMapping("/admin/myStore") 
	public String myStore(@AuthenticationPrincipal LoginService user, Model model){ 
		long userId = user.getUser().getId();
		List<Store> storeList = adminService.myStore(userId);
		
		model.addAttribute("storeList", storeList); 
		return "admin/myStore"; 
	}
	
	@IsMyStore
	@GetMapping("/admin/management/detail/{id}") 
	public String detail(@PathVariable long id, @AuthenticationPrincipal LoginService user, Model model) {
		long userId = user.getUser().getId();
		StoreDetail storeDetail = storeService.storeDetail(id, userId);
		model.addAttribute("store", storeDetail);
		model.addAttribute("adminPage", true);
		
		return "admin/detail";
	}
	
	@GetMapping("admin/main")
	public String adminPage(@AuthenticationPrincipal LoginService user, Model model) {
		long userId = user.getUser().getId();
		List<Long> storeList = adminService.getMyStoreId(userId);
		model.addAttribute("storeList", storeList);
		return "admin/myStore";
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
	
	@IsMyStore
	@PatchMapping("admin/management/menu")
	public ResponseEntity<Food> updateMenu(Food food, String[] foodOption, Integer[] foodOptionPrice,
			Integer[] optionId, MultipartFile file) throws Exception{
		
		System.out.println(food);
		if(file.isEmpty()) {
			String img = File.separator + "img" + File.separator + "none,gif";
			food.setFoodImg(img);
			food.setFoodThumb(img);
		}else {
			String img = uploadFile.fildUpload(file);
			food.setFoodImg(img);
			food.setFoodThumb(img);
		}
		
		adminService.updateMenu(food, foodOption, foodOptionPrice, optionId);
		return new ResponseEntity<Food>(food, HttpStatus.OK);
	}
	
	@IsMyStore
	@DeleteMapping("/admin/management/menu")
	public ResponseEntity<Object> deleteMenu(long storeId, long[] deleteNumber){
		adminService.deleteMenu(storeId, deleteNumber);
		return new ResponseEntity<>(HttpStatus.OK);
	}
	
	@IsMyStore
	@PatchMapping("admin/management/bossComment")
	public ResponseEntity<String> bossComment(long storeId, String orderNum, 
			String bossComment, HttpServletResponse response) throws IOException{
		
		String reviewContent = adminService.bossComment(storeId, orderNum, bossComment);
		return new ResponseEntity<String>(reviewContent, HttpStatus.OK);
	}
	
	@IsMyStore
	@GetMapping("/admin/management/order/{id}")
	public String order(@PathVariable long id) {
		return "admin/order";
	}
	
	@IsMyStore
	@GetMapping("/admin/management/orderList")
	public ResponseEntity<Map<String, Object>> orderList(long storeId, String list, int page){
		
		System.out.println(storeId);
		System.out.println(list);
		System.out.println("page=" + page);
		List<OrderList> orderList = adminService.order(storeId, list, page);
		
		Map<String, Object> map = new HashMap<>();
		List<List<Cart>> menuList = new ArrayList<>();
		System.out.println(orderList);
		if(orderList.size() != 0 && orderList.get(0).getFoodInfo() != null) {
			for (int i=0;i<orderList.size();i++) {
				menuList.add(FoodInfoFromJson.foodInfoFromJson(orderList.get(i).getFoodInfo()));
			}
		}
		
		map.put("orderList", orderList);
		map.put("cartList", menuList);
		return new ResponseEntity<Map<String, Object>>(map, HttpStatus.OK);
	}
	
	@IsMyStore
	@PatchMapping("admin/management/orderAccept")
	public ResponseEntity<String> orderAccept(String orderNum, int time, long userId){
		adminService.orderAccept(orderNum, time, userId);
		
		return new ResponseEntity<>(HttpStatus.OK);
	}
	
}
