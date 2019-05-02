package com.stackroute.muzixmanager.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.stackroute.muzixmanager.domain.Music;


@Repository
public interface MuzixRepository extends JpaRepository<Music, Integer> {

	List<Music> findByUserId(String userId);
	
	

}
