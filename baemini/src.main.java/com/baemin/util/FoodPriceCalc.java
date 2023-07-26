package com.baemin.util;

import com.baemin.dto.Cart;

public class FoodPriceCalc {
	
	public static int foodPriceCalc(Cart cart) {
		int[] optionPrice = cart.getOptionPrice();
		
		int optionPriceTotal = 0;
		if(optionPrice != null) {
			for(int i=0;i<optionPrice.length;i++) {
				optionPriceTotal += optionPrice[i];
			}
		}
		
		int foodPrice = cart.getFoodPrice() * cart.getAmount();
		
		return foodPrice + (optionPriceTotal * cart.getAmount());
	}
}
