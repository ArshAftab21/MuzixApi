package com.stackroute.muzixmanager.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.stackroute.muzixmanager.domain.Music;
import com.stackroute.muzixmanager.exception.MusicTrackAlreadyExistsException;
import com.stackroute.muzixmanager.exception.MusicTrackNotFoundException;
import com.stackroute.muzixmanager.repository.MuzixRepository;

@Service
public class MuzixServiceImpl implements MuzixService{
	
	@Autowired
	private MuzixRepository muzixRepo;

	public MuzixServiceImpl(MuzixRepository muzixRepo) {
		super();
		this.muzixRepo = muzixRepo;
	}

	@Override
	public boolean saveMusic(Music music) throws MusicTrackAlreadyExistsException {
		final Optional<Music> object=muzixRepo.findById(music.getId());
		if(object.isPresent())
		{
			throw new MusicTrackAlreadyExistsException("Could not save music , music already exits");
		}
		muzixRepo.save(music);
		return true;
	}

	@Override
	public boolean deleteMusicById(int id) throws MusicTrackNotFoundException {
		final Music music=muzixRepo.findById(id).orElse(null);
		if (music == null) {
			throw new MusicTrackNotFoundException("Could not delete. Music not found");
		}
		muzixRepo.delete(music);
		return true;
	}

	@Override
	public List<Music> getMyMusics(String userId) {
		return muzixRepo.findByUserId(userId);
	}

}
