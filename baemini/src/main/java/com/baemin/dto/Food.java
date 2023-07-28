package com.baemin.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class Food {
	private long id;
	private long storeId;
    private String foodName;
    private String foodPrice;
    private String foodDec;
    private String foodImg;
    private String foodThumb;
	
}
