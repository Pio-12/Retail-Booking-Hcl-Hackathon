package com.example.user_service.security;

import java.security.Key;
import java.util.Date;

import com.example.user_service.entity.User;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

public class JwtUtil {

 private static final String SECRET ="mysecretkeymysecretkeymysecretkey";

 private static final Key key =Keys.hmacShaKeyFor(SECRET.getBytes());

 public static String generateToken(User user) {
	    return Jwts.builder()
	            .setSubject(user.getEmail())
	            .claim("userId", user.getId().toString())  // ✅ IMPORTANT
	            .setIssuedAt(new Date())
	            .setExpiration(new Date(System.currentTimeMillis() + 86400000))
	            .signWith(key)
	            .compact();
	}


}