package com.baemin.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@NoArgsConstructor
@AllArgsConstructor
@ToString
@Getter
@Setter
public class StoreDetail {
	private Store storeInfo;
	private List<Food> foodList;
	private List<Review> reviewList;
}
