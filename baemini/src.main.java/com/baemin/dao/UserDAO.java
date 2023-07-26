package com.baemin.dao;

import com.baemin.dto.Join;

public interface UserDAO {
	void join(Join join);
	int overlapCheck(String value, String valueType);
}
