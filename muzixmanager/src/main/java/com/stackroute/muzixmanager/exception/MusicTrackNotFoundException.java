package com.stackroute.muzixmanager.exception;

@SuppressWarnings("serial")
public class MusicTrackNotFoundException extends Exception {

	String message;

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public MusicTrackNotFoundException(String message) {
		super();
		this.message = message;
	}

}
