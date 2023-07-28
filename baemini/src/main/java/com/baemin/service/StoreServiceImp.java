package com.baemin.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.baemin.dao.StoreDAO;
import com.baemin.dto.Food;
import com.baemin.dto.FoodOption;
import com.baemin.dto.Review;
import com.baemin.dto.Store;
import com.baemin.dto.StoreDetail;
import com.baemin.util.Page;

@Service
public class StoreServiceImp implements StoreService {
	
	@Autowired
	private StoreDAO storeDAO;
	
	
	
	@Override
	public List<Store> storeList(int category, int address) {
	    return storeList(category, address, "주문접수 대기 중", 1);
	}
	
	@Override
	public List<Store> storeList(int category, int address1, String sort, int page) {
	    Page p = new Page(page, 8);
	    Map<String, Object> map = new HashMap<>();
	    map.put("category", category);
	    map.put("address1", address1);
	    map.put("firstList", p.getFirstList());
	    map.put("lastList", p.getLastList());
	    map.put("sort", sort);
	    System.out.println("페이지 시작 = " + p.getFirstList() + " 페이지 끝 = " + p.getLastList());
	    return storeDAO.storeList(map);
	}
	
	@Override
	public StoreDetail storeDetail(long storeId, long userId) {
		Store storeInfo = storeDAO.storeDetail(storeId, userId); 
		List<Food> foodList = storeDAO.foodList(storeId);
		List<Review> reviewList = storeDAO.reviewList(storeId);
		
		return new StoreDetail(storeInfo, foodList, reviewList);
	}
	
	@Override
	public List<FoodOption> foodOption(int foodId) {
		return storeDAO.foodOption(foodId);
	}

	@Override
	public void reviewWrite(Review review) {
		storeDAO.reviewWrite(review);
	}
	
	@Override
	public void reviewModify(Review review) {
		storeDAO.reviewModify(review);
	}
	
	@Override
	public void likes(long storeId, String likes, long userId) {
		 Map<String, Long> map = new HashMap<>();
		    map.put("storeId", storeId);
		    map.put("userId", userId);
		    
		    if(likes.equals("on")) {
		        storeDAO.addLikes(map);
		    } else {
		        storeDAO.deleteLikes(map);
		    }
	}

	@Override
	public List<Store> likesList(long userId) {
		return storeDAO.likesList(userId);
	}
	
	@Override
	public List<Store> likesListNonUser(String likes){
		return storeDAO.likesListNonUser(likes);
	}
	
	@Override
	public List<Store> storeSearch(String keyword, int address, Page p) {
	    Map<String, Object> map = new HashMap<>();
	    map.put("keyword", keyword);
	    map.put("address", address);
	    map.put("firstList", p.getFirstList());
	    map.put("lastList", p.getLastList());
	    
	    return storeDAO.storeSearch(map);
	}

	
	
}
