package com.example.FoodOrder_service.model;

public class StockRequest {
	private Long foodId;
    private int quantity;
    public StockRequest() {
		
	}
    public StockRequest(Long foodId, int quantity) {
    	this.foodId = foodId;
    	this.quantity = quantity;
    	
    }
    	public Long getFoodId() {
    		return foodId;
    	}
    	public void setFoodId(Long foodId) {
			this.foodId = foodId;
		}
    	public int getQuantity() {
			return quantity;
		}
		public void setQuantity(int quantity) {
			this.quantity = quantity;
		}

}
