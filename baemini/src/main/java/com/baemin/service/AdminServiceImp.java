package com.baemin.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.baemin.dao.AdminDAO;
import com.baemin.dto.Food;
import com.baemin.dto.OrderList;
import com.baemin.dto.Store;
import com.baemin.util.Page;

@Service
public class AdminServiceImp implements AdminService{
	
	@Autowired
	private AdminDAO adminDAO;
	
	@Override
	public List<Store> myStore(long userId){
		return adminDAO.myStore(userId);
	}
	
	@Override
	public List<Long> getMyStoreId(long userId){
		return adminDAO.getMyStoreId(userId);
	}
	
	@Override
	public void storeInfoUpdate(Store store) {
		adminDAO.storeInfoUpdate(store);
	}
	
	@Override
	public void addMenu(Food food, String[] foodOption, Integer[] foodOptionPrice) {
		long foodId = adminDAO.addMenu(food);
		
		if(foodOption != null) {
			List<Map<String, Object>> optionList = new ArrayList<>();
			
			for(int i=0;i<foodOption.length;i++) {
				Map<String, Object> optionMap = new HashMap<>();
				optionMap.put("optionName", foodOption[i]);
				optionMap.put("optionPrice", foodOptionPrice[i]);
				optionMap.put("foodId", foodId);
				optionList.add(optionMap);
			}
			
			adminDAO.addMenuOption(optionList);
		}
	}
	
	@Transactional
	@Override
	public void updateMenu(Food food, String[] foodOption, Integer[] foodOptionPrice, Integer[] optionId) {
		Map<String, Object> map = new HashMap<>();
		if(foodOption == null) {
			adminDAO.deleteMenuOption(food.getId());
		}else {
			List<Map<String, Object>> optionList = new ArrayList<>();
			
			for(int i=0; i<foodOption.length; i++) {
				Map<String, Object> optionMap = new HashMap<>();
				long oid = -1;
				if(optionId.length !=0 && optionId[i] != null) {
					oid = optionId[i];
				}
				
				optionMap.put("optionId", oid);
				optionMap.put("optionName", foodOption[i]);
				optionMap.put("optionPrice", foodOptionPrice[i]);
				
				optionList.add(optionMap);
			}
			
			map.put("optionList", optionList);
		}
		map.put("food", food);
		adminDAO.updateMenu(map);
	}

	@Override
	public void deleteMenu(long storeId, long[] deleteNumber) {
		adminDAO.deleteMenu(storeId, deleteNumber);
	}

	@Override
	public String bossComment(long storeId, String orderNum, String bossComment) {
		bossComment = bossComment.replace("\n", "<br>").replaceAll(" ", "&nbsp");
		adminDAO.bossComment(storeId, orderNum, bossComment);
		return bossComment;
	}

	@Override
	public List<OrderList> order(long storeId, String list, int page) {
		Page p = new Page(page);
		
		Map<String, Object> map = new HashMap<>();
		map.put("storeId", storeId);
		map.put("list", list);
		map.put("firstList", p.getFirstList());
		map.put("lastList", p.getLastList());
		
		return adminDAO.order(map);
	}

	@Override
	public void orderAccept(String orderNum, int time, long userId) {
		adminDAO.orderAccept(orderNum, time, userId);
	}
	
	
	
}
