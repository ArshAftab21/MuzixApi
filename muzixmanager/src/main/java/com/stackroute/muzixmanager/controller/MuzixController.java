package com.stackroute.muzixmanager.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.stackroute.muzixmanager.domain.Music;
import com.stackroute.muzixmanager.exception.MusicTrackAlreadyExistsException;
import com.stackroute.muzixmanager.exception.MusicTrackNotFoundException;
import com.stackroute.muzixmanager.services.MuzixService;
import io.jsonwebtoken.Jwts;

@RestController
@CrossOrigin
@RequestMapping("/api/music")
public class MuzixController {
	
	@Autowired
	private MuzixService muzixService;

	public MuzixController(MuzixService muzixService) {
		super();
		this.muzixService = muzixService;
	}
	
	@PostMapping
	public ResponseEntity<?> saveNewMusic(@RequestBody final Music music,HttpServletRequest request) {
		ResponseEntity<?> responseEntity;
		String userId=getUserId(request);
		try {
			music.setUserId(userId);
			muzixService.saveMusic(music);
			responseEntity = new ResponseEntity<Music>(music, HttpStatus.CREATED);
		} 
		catch (MusicTrackAlreadyExistsException e) {
			responseEntity = new ResponseEntity<String>("{ \"message\": \"" + e.getMessage() + "\"}", HttpStatus.CONFLICT);
		}
		return responseEntity;
		
	}
	
	
	@DeleteMapping(path = "/{id}")
	public ResponseEntity<?> deleteMusicById(@PathVariable("id") final int id) {
		ResponseEntity<?> responseEntity;
		try {
			muzixService.deleteMusicById(id);
			responseEntity = new ResponseEntity<String>("Movie deleted successfully", HttpStatus.OK);
		} 
		catch (MusicTrackNotFoundException e) {
			responseEntity = new ResponseEntity<String>("{ \"message\": \"" + e.getMessage() + "\"}", HttpStatus.NOT_FOUND);
		}
		
		return responseEntity;
	}
	
	
	@GetMapping
	public ResponseEntity<List<Music>> fetchAllMusic(HttpServletRequest request)
	{
    	String userId = getUserId(request);
		return new ResponseEntity<List<Music>>(muzixService.getMyMusics(userId),HttpStatus.OK);
	}
	
	public String getUserId(HttpServletRequest request)
	{
		final String authHeader = request.getHeader("authorization");
    	final String token = authHeader.substring(7);
    	String userId = Jwts.parser().setSigningKey("secretkey").parseClaimsJws(token).getBody().getSubject();
	    return userId;
	}


}
