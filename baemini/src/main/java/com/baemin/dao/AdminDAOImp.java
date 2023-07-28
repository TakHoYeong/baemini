package com.baemin.dao;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.baemin.dto.Food;
import com.baemin.dto.OrderList;
import com.baemin.dto.Store;

@Repository
public class AdminDAOImp implements AdminDAO {
	
	@Autowired
	private SqlSession sql;
	
	@Override
	public List<Store> myStore(long userId){
		return sql.selectList("admin.myStore", userId);
	}
	
	@Override
	public int pointUpdate(long userId, String info, int point) {
		Map<String, Object> map = new HashMap<>();
		map.put("userId", userId);
		map.put("info", info);
		map.put("point", point);
		
		return sql.insert("admin.pointUpdate", map); 
	}
	
	@Override
	public List<Long> getMyStoreId(long userId) {
		return sql.selectList("admin.getMyStoreId", userId);
	}

	@Override
	public void storeInfoUpdate(Store store) {
		sql.update("admin.storeInfoUpdate", store);
	}

	@Override
	public long addMenu(Food food) {
		sql.insert("admin.addMenu", food);
		return food.getId();
	}

	@Override
	public void addMenuOption(List<Map<String, Object>> optionList) {
		sql.insert("admin.addMenuOption", optionList);
	}

	@Override
	public void updateMenu(Map<String, Object> map) {
		sql.update("admin.updateMenu", map);
	}
	
	@Override
	public void deleteMenu(long storeId, long[] deleteNumber) {
		Map<String, Object> map = new HashMap<>();
		map.put("storeId", storeId);
		map.put("deleteNumber", deleteNumber);
		
		sql.delete("admin.deleteMenu", map);
	}

	@Override
	public void deleteMenuOption(long foodId) {
		sql.delete("admin.deleteMenuOption", foodId);
	}

	@Override
	public void bossComment(long storeId, String orderNum, String bossComment) {
		Map<String, Object> map = new HashMap<>();
		map.put("storeId", storeId);
		map.put("orderNum", orderNum);
		map.put("bossComment", bossComment);
		
		sql.update("admin.bossComment", map);
		
	}

	@Override
	public List<OrderList> order(Map<String, Object> map) {
		return sql.selectList("admin.orderList", map);
	}

	@Override
	public void orderAccept(String orderNum, int time, long userId) {
		Map<String, Object> map = new HashMap<>();
		map.put("orderNum", orderNum);
		map.put("time", time);
		map.put("userId", userId);
		sql.update("admin.orderAccept", map);
	}
	
	
	
}
