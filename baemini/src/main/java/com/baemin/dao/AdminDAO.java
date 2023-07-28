package com.baemin.dao;

import java.util.List;
import java.util.Map;

import com.baemin.dto.Food;
import com.baemin.dto.OrderList;
import com.baemin.dto.Store;

public interface AdminDAO {
	
	List<Store> myStore(long userId);
	
	int pointUpdate(long userId, String info, int point);
	
	List<Long> getMyStoreId(long userId);
	
	void storeInfoUpdate(Store store);
	
	long addMenu(Food food);
	
	void addMenuOption(List<Map<String, Object>> optionList);
	
	void updateMenu(Map<String, Object> map);
	
	void deleteMenu(long storeId, long[] deleteNumber);
	
	void deleteMenuOption(long foodId);
	
	void bossComment(long storeId, String orderNum, String bossComment);
	
	List<OrderList> order(Map<String, Object> map);
	
	void orderAccept(String orderNum, int time, long userId);
	
}
