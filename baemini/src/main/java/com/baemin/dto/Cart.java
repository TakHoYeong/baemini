package com.baemin.dto;

import java.util.Arrays;
import java.util.Objects;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class Cart {
	private long foodId;
	private String foodName;
	private int foodPrice;
	private int amount;
	private int totalPrice;
 
	private String[] optionName;
	private int[] optionPrice;
	private long[] optionId;
	
	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + Arrays.hashCode(optionId);
		result = prime * result + Arrays.hashCode(optionName);
		result = prime * result + Arrays.hashCode(optionPrice);
		result = prime * result + Objects.hash(foodId, foodName, foodPrice);
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Cart other = (Cart) obj;
		return foodId == other.foodId && Objects.equals(foodName, other.foodName) && foodPrice == other.foodPrice
				&& Arrays.equals(optionId, other.optionId) && Arrays.equals(optionName, other.optionName)
				&& Arrays.equals(optionPrice, other.optionPrice);
	}
	
}
