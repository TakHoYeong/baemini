package com.baemin.dao;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.baemin.dto.Store;

@Repository
public class AdminDAOImp implements AdminDAO {
	
	@Autowired
	private SqlSession sql;
	
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
	
	
}
