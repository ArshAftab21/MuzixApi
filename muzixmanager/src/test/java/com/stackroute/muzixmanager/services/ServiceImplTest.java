package com.stackroute.muzixmanager.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertTrue;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import org.junit.Before;
import org.junit.Test;
import org.mockito.Mockito;

import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import com.stackroute.muzixmanager.domain.Music;
import com.stackroute.muzixmanager.exception.MusicTrackAlreadyExistsException;
import com.stackroute.muzixmanager.exception.MusicTrackNotFoundException;
import com.stackroute.muzixmanager.repository.MuzixRepository;

public class ServiceImplTest {

	@Mock
	MuzixRepository muzixRepository;

	private transient Music music;

	@InjectMocks
	private transient MuzixServiceImpl muzixServiceImpl;

	transient Optional<Music> options;

	@Before
	public void setupMock() {
		MockitoAnnotations.initMocks(this);
		music = new Music("xyz","xyz","xyz","xyz","arshaftab");
		music.setId(1);
		options = Optional.of(music);
	}

	@Test
	public void testMockCreation() {
		assertNotNull("JpaRepository creation failed: use @InjectMocks on muzixServiceImpl", music);
	}

	@Test
	public void testSaveMusicSuccess() throws MusicTrackAlreadyExistsException {
		when(muzixRepository.save(music)).thenReturn(music);
		final boolean flag = muzixServiceImpl.saveMusic(music);
		assertTrue("saving music passed", flag);
		verify(muzixRepository, times(1)).save(music);
	}

	@Test(expected = MusicTrackAlreadyExistsException.class)
	public void testSaveMusicFailure() throws MusicTrackAlreadyExistsException {
		when(muzixRepository.findById(1)).thenReturn(options);
		when(muzixRepository.save(music)).thenReturn(music);
		final boolean flag = muzixServiceImpl.saveMusic(music);
	}

	@Test
	public void testDeleteMusicById() throws MusicTrackNotFoundException {
		when(muzixRepository.findById(1)).thenReturn(options);
		doNothing().when(muzixRepository).delete(music);
		final boolean flag = muzixServiceImpl.deleteMusicById(1);
		assertTrue("deleting movie passed", flag);
		verify(muzixRepository, times(1)).delete(music);
		verify(muzixRepository, times(1)).findById(music.getId());
	}

	@Test(expected = MusicTrackNotFoundException.class)
	public void testDeleteMusicByIdFailure() throws MusicTrackNotFoundException {
		//when(muzixRepository.findById(1)).thenReturn(null);
		doNothing().when(muzixRepository).delete(music);
		final boolean flag = muzixServiceImpl.deleteMusicById(1);
	}

	@Test
	public void testGetAllMusics() {
		final List<Music> musics = new ArrayList<>();
		musics.add(music);
		when(muzixRepository.findByUserId("100")).thenReturn(musics);
		final List<Music> musics1 = muzixServiceImpl.getMyMusics("100");
		assertEquals(musics, musics1);
		verify(muzixRepository, times(1)).findByUserId(Mockito.anyString());
	}

}
