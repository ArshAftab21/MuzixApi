package com.stackroute.accountmanager.services;

import java.util.Map;

import com.stackroute.accountmanager.domain.User;

public interface SecurityTokenGenerator {
	
	Map<String,String> generateToken(User user);

}

