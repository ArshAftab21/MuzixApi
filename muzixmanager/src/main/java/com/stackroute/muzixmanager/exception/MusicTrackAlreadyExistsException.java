package com.stackroute.muzixmanager.exception;

@SuppressWarnings("serial")
public class MusicTrackAlreadyExistsException extends Exception {

	String message;

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public MusicTrackAlreadyExistsException(String message) {
		super();
		this.message = message;
	}

}
