package com.example.FoodOrder_service.feign;

import java.util.List;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.example.FoodOrder_service.Entity.OrderItem;

@FeignClient(name = "inventory-service")
public interface InventoryClient {
	
	    @PostMapping("/inventory/reduce")
	    void reduceStock(@RequestBody List<OrderItem> items);


}
