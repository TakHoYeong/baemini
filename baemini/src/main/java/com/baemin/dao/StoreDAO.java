package com.baemin.dao;

import java.util.List;
import java.util.Map;

import com.baemin.dto.Food;
import com.baemin.dto.FoodOption;
import com.baemin.dto.Review;
import com.baemin.dto.Store;

public interface StoreDAO {
	List<Store> storeList(Map<String, Object> map);
	
	Store storeDetail(long storeId, long userId);
	
	List<Food> foodList(long storeId);
	
	List<FoodOption> foodOption(int foodId);
	
	void reviewWrite(Review review);
	
	List<Review> reviewList(long id);
	
	void reviewModify(Review review);
	
	void addLikes(Map<String, Long> map);
	 
	void deleteLikes(Map<String, Long> map);
	
	List<Store> likesList(long userId);
	
	List<Store> likesListNonUser(String likes);
	
	List<Store> storeSearch(Map<String, Object> map);

}
