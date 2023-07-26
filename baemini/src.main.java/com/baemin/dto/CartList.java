package com.baemin.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@AllArgsConstructor
public class CartList {
	
	private long storeId;
	private String storeName;
	int cartTotal;
	private int deleveryTip;
	
	List<Cart> cart;
}
