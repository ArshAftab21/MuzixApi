package com.stackroute.muzixmanager.services;

import java.util.List;

import com.stackroute.muzixmanager.domain.Music;
import com.stackroute.muzixmanager.exception.MusicTrackAlreadyExistsException;
import com.stackroute.muzixmanager.exception.MusicTrackNotFoundException;

public interface MuzixService {

	boolean saveMusic(Music music) throws MusicTrackAlreadyExistsException;

	boolean deleteMusicById(int id) throws MusicTrackNotFoundException;

    List<Music> getMyMusics(String userId);

}
