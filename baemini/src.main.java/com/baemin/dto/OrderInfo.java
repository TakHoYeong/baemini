package com.baemin.dto;

import java.util.Date;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class OrderInfo {
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
	
	//private String impUidString = ""; //아임포트 결제번호 추가
}
