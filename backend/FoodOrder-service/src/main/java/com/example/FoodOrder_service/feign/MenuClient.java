package com.example.FoodOrder_service.feign;

import java.util.List;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.example.FoodOrder_service.model.StockRequest;

@FeignClient(name = "menu-service")
public interface MenuClient {
	@PutMapping("/menu/reduce")
    void reduceStock(@RequestBody List<StockRequest> items);


}
