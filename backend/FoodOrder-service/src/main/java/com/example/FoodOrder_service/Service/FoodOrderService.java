package com.example.FoodOrder_service.Service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.FoodOrder_service.Entity.Order;
import com.example.FoodOrder_service.Entity.OrderItem;
import com.example.FoodOrder_service.Repository.FoodOrderItemRepository;
import com.example.FoodOrder_service.Repository.FoodOrderRepository;
import com.example.FoodOrder_service.feign.CartClient;
import com.example.FoodOrder_service.feign.MenuClient;
import com.example.FoodOrder_service.model.FoodCart;
import com.example.FoodOrder_service.model.StockRequest;

@Service
public class FoodOrderService {

    @Autowired
    private FoodOrderRepository foodOrderRepository;

    @Autowired
    private FoodOrderItemRepository foodOrderItemRepository;

    @Autowired
    private CartClient cartClient;

    @Autowired
    private MenuClient menuClient; // ✅ NEW

    @Autowired
    private EmailService emailService;

    public String placeOrder(Long userId, String email) {

        List<FoodCart> cartItems = cartClient.getCartItemsByUserId(userId);

        if (cartItems.isEmpty()) {
            throw new RuntimeException("Cart is empty");
        }

        // 2. Create order
        Order order = new Order();
        order.setUserId(userId);
        order.setStatus("PLACED");

        order = foodOrderRepository.save(order);

        double total = 0;
        List<StockRequest> stockRequests = new ArrayList<>();

        // 3. Process cart items
        for (FoodCart c : cartItems) {

            if (c.getFoodId() == null) {
                throw new RuntimeException("FoodId is NULL!");
            }

            // Save OrderItem
            OrderItem item = new OrderItem();
            item.setFoodId(c.getFoodId());
            item.setQuantity(c.getQuantity());
            item.setPrice(100.0);

            total += item.getPrice() * item.getQuantity();

            foodOrderItemRepository.save(item);

            // Prepare stock request
            StockRequest stock = new StockRequest();
            stock.setFoodId(c.getFoodId());
            stock.setQuantity(c.getQuantity());

            stockRequests.add(stock);
        }

        // 4. Reduce stock (Menu Service)
        menuClient.reduceStock(stockRequests);

        // 5. Clear cart
        cartClient.clearCartByUserId(userId);

        // 6. Update total
        order.setTotalAmount(total);
        foodOrderRepository.save(order);

        // 7. Send email
        String emailText = "Order placed successfully!\n"
                + "Order ID: " + order.getId()
                + "\nTotal Amount: " + total;

        emailService.sendOrderEmail(email, emailText);

        return "Order placed successfully!";
    }
}