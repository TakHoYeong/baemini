package com.baemin.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class Store {
	private long id;
	private int category;
	private String storeName;
	private int storeAddress1;
	private String storeAddress2;
	private String storeAddress3;
	private String storePhone;
	private String storeImg;
	private String storeThumb;
	private int openingTime;
	private int closingTime;
	private int minDelevery;
	private int deleveryTime;
	private int deleveryTip;
	private String storeDes;
	
	private float score;
	private int orderCount;
	private int reviewCount;
	private int bossCommentCount;
	private int likesCount;
	
	private int score1; // 리뷰 1점
	private int score2; // 리뷰 2점
	private int score3; // 리뷰 3점
	private int score4; // 리뷰 4점
	private int score5; // 리뷰 5점	
	
	//오픈중?
	private String isOpen;
	
	private int isLikes;	// 0 찜x, 1 찜o
	
	private int listCount; //매장 수

}
