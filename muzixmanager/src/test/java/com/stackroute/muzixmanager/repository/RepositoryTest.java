package com.stackroute.muzixmanager.repository;

import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.Assert.assertEquals;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase.Replace;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.junit4.SpringRunner;

import com.stackroute.muzixmanager.domain.Music;

@RunWith(SpringRunner.class)
@DataJpaTest
@AutoConfigureTestDatabase(replace = Replace.NONE)
@Transactional
public class RepositoryTest {
	
	@Autowired
	private transient MuzixRepository muzixRepository;

	public MuzixRepository getMuzixRepository() {
		return muzixRepository;
	}

	public void setMuzixRepository(MuzixRepository muzixRepository) {
		this.muzixRepository = muzixRepository;
	}
	
private transient Music music;
	
	@Before
	public void setUp()
	{
		music = new Music("xyz","xyz","xyz","xyz","arshaftab");
		music.setId(1);
	}
	
	@Test
	public void testSaveMusic() throws Exception {
		muzixRepository.save(music);
		final Music fetchedMusic = muzixRepository.getOne(1);
		assertThat(fetchedMusic.getArtistName()).isEqualTo("xyz");
	}
	
	@Test
	public void testGetMusic() throws Exception {
		muzixRepository.save(music);
		final Music fetchedMusic = muzixRepository.getOne(1);
		assertEquals("xyz",fetchedMusic.getArtistName());
	}
	
	@Test
	public void testGetMyMusic() throws Exception {
		muzixRepository.save(music);
		final List<Music> musics = muzixRepository.findByUserId("arshaftab");
		assertEquals(musics.size(),1);
	}

	@Test
	public void testDeleteMusic() throws Exception {
		muzixRepository.save(music);
		final Music fetchedmusic = muzixRepository.getOne(1);
		assertEquals("xyz", fetchedmusic.getArtistName());
		muzixRepository.delete(fetchedmusic);
		assertEquals(Optional.empty(), muzixRepository.findById(1));
	}


}
