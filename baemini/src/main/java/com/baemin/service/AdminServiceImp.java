package com.baemin.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.baemin.dao.AdminDAO;
import com.baemin.dto.Store;

@Service
public class AdminServiceImp implements AdminService{
	
	@Autowired
	private AdminDAO adminDAO;
	
	@Override
	public List<Long> getMyStoreId(long userId){
		return adminDAO.getMyStoreId(userId);
	}
	
	@Override
	public void storeInfoUpdate(Store store) {
		adminDAO.storeInfoUpdate(store);
	}
	
}
