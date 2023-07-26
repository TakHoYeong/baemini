package com.baemin.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class FoodOption {
	private long id;
	private long foodId;
	private String optionName;
	private long optionPrice;
}
