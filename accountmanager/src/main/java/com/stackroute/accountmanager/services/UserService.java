package com.stackroute.accountmanager.services;

import com.stackroute.accountmanager.domain.User;
import com.stackroute.accountmanager.exception.UserAlreadyExistsException;
import com.stackroute.accountmanager.exception.UserNotFoundException;

public interface UserService {

	boolean saveUser(User user) throws UserAlreadyExistsException;

	public User findByUserIdAndPassword(String userId, String password) throws UserNotFoundException;
}
