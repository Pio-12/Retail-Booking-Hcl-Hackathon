package com.example.api_gateway.filter;

import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.cloud.gateway.filter.GlobalFilter;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;

import com.example.api_gateway.util.JwtUtil;

import reactor.core.publisher.Mono;

@Component
@Order(-1)
public class JwtAuthenticationFilter implements GlobalFilter, Ordered {

    @Override
    public int getOrder() {
        return -1;
    }

    @Override
    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {

        String path = exchange.getRequest().getURI().getPath();
        System.out.println("PATH: " + path);

        // ✅ Allow OPTIONS
        if (exchange.getRequest().getMethod() == HttpMethod.OPTIONS) {
            return chain.filter(exchange);
        }

        // ✅ VERY IMPORTANT: skip auth endpoints FIRST
        if (path.startsWith("/user-service/auth")) {
            System.out.println("Skipping auth for login/register");
            return chain.filter(exchange);
        }

        // 🔐 AUTH LOGIC STARTS HERE ONLY
        String authHeader = exchange.getRequest()
                .getHeaders()
                .getFirst(HttpHeaders.AUTHORIZATION);

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);
            return exchange.getResponse().setComplete();
        }

        String token = authHeader.substring(7);

        if (!JwtUtil.validateToken(token)) {
            exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);
            return exchange.getResponse().setComplete();
        }

        String userId = JwtUtil.extractUserId(token);
        String username = JwtUtil.extractUsername(token); // ADD


        ServerWebExchange mutatedExchange = exchange.mutate()
                .request(builder -> builder
                .header("userId", userId)
                .header("userEmail", username)) // ADD
                .build();

        return chain.filter(mutatedExchange);
    }
}