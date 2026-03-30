package com.example.Menu_Service.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.Menu_Service.Entity.Menu;
import com.example.Menu_Service.Repository.MenuRepository;
import com.example.Menu_Service.model.StockRequest;

@Service

public class MenuService {
	@Autowired
	private MenuRepository menuRepository;
	
public List<Menu> getAllMenu() {
	return menuRepository.findAll();
}
public List<Menu> getByCategory(String category) {
	return menuRepository.findBycategory(category);
}
public Menu addMenu(Menu menu) {
	return menuRepository.save(menu);
}
public Menu updateMenu(Long id, Menu updatedMenu) {

    Menu menu = menuRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Menu not found"));

    menu.setName(updatedMenu.getName());
    menu.setCategory(updatedMenu.getCategory());
    menu.setPrice(updatedMenu.getPrice());
    menu.setStock(updatedMenu.getStock());
    menu.setImageUrl(updatedMenu.getImageUrl());

    return menuRepository.save(menu);
}
public Menu getByLocation(String location) {
	return menuRepository.findBylocation(location).stream().findFirst().orElse(null);
}
public void deleteMenu(Long id) {
	menuRepository.deleteById(id);
}
public void reduceStock(List<StockRequest> items) {

    for (StockRequest item : items) {

        Menu menu = menuRepository.findById(item.getFoodId())
                .orElseThrow(() -> new RuntimeException("Food not found"));

        if (menu.getStock() < item.getQuantity()) {
            throw new RuntimeException("Out of stock");
        }

        menu.setStock(
                menu.getStock() - item.getQuantity()
        );

        menuRepository.save(menu);
    }
}


}
