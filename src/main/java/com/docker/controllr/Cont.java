package com.docker.controllr;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class Cont {
	@GetMapping("/test")
	public String getData()
	{
		return "Continuous Monitoring on Docker";
	}


}
