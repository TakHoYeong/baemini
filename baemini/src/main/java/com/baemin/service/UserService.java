package com.baemin.service;

import com.baemin.dto.Join;

public interface UserService {
	void join(Join join);
	
	int overlapCheck(String value, String valueType);
}
