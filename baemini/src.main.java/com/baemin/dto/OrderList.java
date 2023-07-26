package com.baemin.dto;

import java.util.Date;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class OrderList {
	
	private String orderNum; 
	private long storeId; 
	private long userId; 
	private Date orderDate; 
	private String deleveryStatus; 
	private int deleveryAddress1; 
	private String deleveryAddress2; 
	private String deleveryAddress3; 
	private String payMethod; 
	private int totalPrice;
	private int usedPoint;
	private String phone;
	private String request;
	private String foodInfo;
	
	private String storeName;
	private String storeImg;
	private String storeThumb;
	private int deleveryTip;
	
	private String reviewContent;
	private int score;
    private String reviewImg;
    private int listCount; // 목록 총 갯수
}
