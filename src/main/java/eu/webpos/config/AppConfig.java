package eu.webpos.config;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;


@Configuration 
@ComponentScan("eu.webpos") 
@EnableWebMvc   
public class AppConfig {  
	
	
}