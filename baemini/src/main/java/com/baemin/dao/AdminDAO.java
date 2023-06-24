package com.baemin.dao;

import java.util.List;

import com.baemin.dto.Store;

public interface AdminDAO {
	
	int pointUpdate(long userId, String info, int point);
	
	List<Long> getMyStoreId(long userId);
	
	void storeInfoUpdate(Store store);
}
