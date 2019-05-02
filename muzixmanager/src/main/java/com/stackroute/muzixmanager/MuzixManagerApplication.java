package com.stackroute.muzixmanager;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;

import com.stackroute.muzixmanager.filter.JwtFilter;

@SpringBootApplication
public class MuzixManagerApplication {

	public static void main(String[] args) {
		SpringApplication.run(MuzixManagerApplication.class, args);
	}
	
	@Bean
	public FilterRegistrationBean jwtFilter() {
		final FilterRegistrationBean registerBean = new FilterRegistrationBean();
		registerBean.setFilter(new JwtFilter());
		registerBean.addUrlPatterns("/api/*");
		return registerBean;
	}


}

