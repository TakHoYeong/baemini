package com.baemin.service;

import java.util.List;

import com.baemin.dto.Store;

public interface AdminService {
	
	List<Long> getMyStoreId(long userId);
	
	void storeInfoUpdate(Store store);
}
